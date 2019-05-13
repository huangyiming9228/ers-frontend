import React from 'react';
import { Form, Select, Button, Row, Col } from 'antd';
import { connect } from 'dva';
import { Action } from '../../../utils/utils';

const FormItem = Form.Item;
const FormItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
// eslint-disable-next-line prefer-destructuring
const Option = Select.Option;

@connect(({ em }) => ({
  ...em,
}))
@Form.create({
  mapPropsToFields(props) {
    const { queryForm } = props;
    return Object.entries(queryForm).reduce((item, [key, value]) => {
      // eslint-disable-next-line no-param-reassign
      item[key] = Form.createFormField({ ...value });
      return item;
    }, {});
  },
  onFieldsChange(props, changedFields) {
    const { dispatch, queryForm } = props;
    const changedItems = Object.entries(changedFields).reduce((item, [key, value]) => {
      // eslint-disable-next-line no-param-reassign
      item[key] = { ...value };
      return item;
    }, {});
    dispatch(
      Action('em/save', {
        queryForm: {
          ...queryForm,
          ...changedItems,
        },
      })
    );
  },
})
class QueryForm extends React.Component {
  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.dispatch(Action('em/getAreas'));
  }

  handleSubmit = e => {
    e.preventDefault();
    const {
      form: { validateFields },
      dispatch,
    } = this.props;
    validateFields(errors => {
      if (!errors) {
        dispatch(Action('em/getEquipments'));
      }
    });
  };

  handleAreaChange = value => {
    const {
      dispatch,
      form: { setFieldsValue },
    } = this.props;
    dispatch(Action('em/getRooms', { value })).then(() => {
      setFieldsValue({
        room: null,
      });
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      areaList,
      roomList,
    } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} layout="horizontal">
        <Row gutter={24}>
          <Col span={8}>
            <FormItem label="选择区域" {...FormItemLayout}>
              {getFieldDecorator('area', {
                rules: [
                  {
                    required: true,
                    message: '请选择区域！',
                  },
                ],
              })(
                <Select onChange={this.handleAreaChange}>
                  {areaList.map(item => (
                    <Option key={item.id}>{item.area_name}</Option>
                  ))}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="选择教室" {...FormItemLayout}>
              {getFieldDecorator('room', {
                rules: [
                  {
                    required: true,
                    message: '请选择教室！',
                  },
                ],
              })(
                <Select>
                  {roomList.map(item => (
                    <Option key={item.id}>{item.room_name}</Option>
                  ))}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <Button type="primary" htmlType="submit" style={{ marginTop: '3px' }}>
              查询
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default QueryForm;
