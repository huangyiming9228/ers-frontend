import React from 'react';
import { Form, Select, Button, Row, Col } from 'antd';
import { connect } from 'dva';
import { Action } from '@/utils/utils';

const FormItem = Form.Item;
const FormItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const Option = Select.Option;

@connect(({ warehouse_roomauth }) => ({
  ...warehouse_roomauth,
}))
@Form.create({
  mapPropsToFields(props) {
    const { queryForm = null } = props;
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
      Action('warehouse_roomauth/save', {
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
    this.props.dispatch(Action('warehouse_roomauth/getAreas'));
  }

  handleSubmit = e => {
    e.preventDefault();
    const {
      form: { validateFields },
      dispatch,
    } = this.props;
    validateFields(errors => {
      if (!errors) {
        dispatch(Action('warehouse_roomauth/getRooms'));
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      areaList,
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
                <Select>
                  {areaList.map(item => (
                    <Option key={item.id}>{item.area_name}</Option>
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
