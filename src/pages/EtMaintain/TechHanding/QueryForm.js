import React from 'react';
import { Form, Button, Row, Col, DatePicker, Select } from 'antd';
import { connect } from 'dva';
import { Action } from '../../../utils/utils';

const FormItem = Form.Item;
const FormItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const { RangePicker } = DatePicker;
const { Option } = Select;

@connect(({ techhanding }) => ({
  ...techhanding,
}))
@Form.create({
  mapPropsToFields(props) {
    const { queryForm } = props;
    return Object.entries(queryForm).reduce((item, [key, value]) => {
      item[key] = Form.createFormField({ ...value });
      return item;
    }, {});
  },
  onFieldsChange(props, changedFields) {
    const { dispatch, queryForm } = props;
    const changedItems = Object.entries(changedFields).reduce((item, [key, value]) => {
      item[key] = { ...value };
      return item;
    }, {});
    dispatch(
      Action('techhanding/save', {
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
    this.props.dispatch(Action('techhanding/getAreaList'));
  }

  handleAreaChange = value => {
    const {
      dispatch,
      form: { setFieldsValue },
    } = this.props;
    dispatch(Action('techhanding/getRoomList', { value })).then(() => {
      setFieldsValue({
        room: null,
      });
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      form: { validateFields },
      dispatch,
    } = this.props;
    validateFields(errors => {
      if (!errors) {
        dispatch(Action('techhanding/submit'));
      }
    });
  }

  render() {
    const {
      form: { getFieldDecorator },
      areaList,
      roomList,
    } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} layout="horizontal">
        <Row gutter={24}>
          <Col span={6}>
            <FormItem label="选择区域" {...FormItemLayout}>
              {getFieldDecorator('area')(
                <Select onChange={this.handleAreaChange}>
                  {areaList.map(item => (
                    <Option key={item.id}>{item.area_name}</Option>
                  ))}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="选择教室" {...FormItemLayout}>
              {getFieldDecorator('room')(
                <Select>
                  {roomList.map(item => (
                    <Option key={item.id}>{item.room_name}</Option>
                  ))}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="选择时间范围" {...FormItemLayout}>
              {getFieldDecorator('time')(
                <RangePicker />
              )}
            </FormItem>
          </Col>
          <Col span={4}>
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
