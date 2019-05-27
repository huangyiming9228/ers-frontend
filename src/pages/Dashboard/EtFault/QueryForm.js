import React from 'react';
import { Form, Button, Row, Col, DatePicker, Select } from 'antd';
import { connect } from 'dva';
import { Action } from '@/utils/utils';

const FormItem = Form.Item;
const FormItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const { RangePicker } = DatePicker;
const Option = Select.Option;

@connect(({ fault_analysis }) => ({
  ...fault_analysis,
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
      Action('fault_analysis/save', {
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
    this.props.dispatch(Action('fault_analysis/getEtClass'))
  }

  handleSubmit = e => {
    e.preventDefault();
    const {
      form: { validateFields },
      dispatch,
    } = this.props;
    validateFields(errors => {
      if (!errors) {
        dispatch(Action('fault_analysis/submit'));
      }
    });
  }

  render() {
    const {
      form: { getFieldDecorator },
      equipmentClassList
    } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} layout="horizontal">
        <Row gutter={24}>
          <Col span={8}>
            <FormItem label="选择时间范围" {...FormItemLayout}>
              {getFieldDecorator('time', {
                rules: [
                  {
                    required: true,
                    message: '请选择查询时间范围！',
                  },
                ],
              })(
                <RangePicker />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="选择设备类型" {...FormItemLayout}>
              {getFieldDecorator('type', {
                rules: [
                  {
                    required: true,
                    message: '请选择设备类型！',
                  },
                ],
              })(
                <Select>
                  {equipmentClassList.map(item => <Option value={item.equipment_name}>{item.equipment_name}</Option>)}
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
