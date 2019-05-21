import React from 'react';
import { Form, Button, Row, Col, DatePicker } from 'antd';
import { connect } from 'dva';
import { Action } from '../../../utils/utils';

const FormItem = Form.Item;
const FormItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const { RangePicker } = DatePicker;

@connect(({ faultcomplaint }) => ({
  ...faultcomplaint,
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
      Action('faultcomplaint/save', {
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
    this.props.dispatch(Action('faultcomplaint/submit'))
  }

  handleSubmit = e => {
    e.preventDefault();
    const {
      form: { validateFields },
      dispatch,
    } = this.props;
    validateFields(errors => {
      if (!errors) {
        dispatch(Action('faultcomplaint/submit'));
      }
    });
  }

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} layout="horizontal">
        <Row gutter={24}>
          <Col span={12}>
            <FormItem label="选择查询时间范围" {...FormItemLayout}>
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
