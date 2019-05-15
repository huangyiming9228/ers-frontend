import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { connect } from 'dva';
import { Action } from '../../../utils/utils';

const FormItem = Form.Item;
const FormItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

@connect(({ account }) => ({
  ...account,
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
      Action('account/save', {
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
    this.props.dispatch(Action('account/queryUsers'));
  }

  handleSubmit = e => {
    e.preventDefault();
    const {
      form: { validateFields },
      dispatch,
    } = this.props;
    validateFields(errors => {
      if (!errors) {
        dispatch(Action('account/queryUsers'));
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} layout="horizontal">
        <Row gutter={24}>
          <Col span={8}>
            <FormItem label="用户名" {...FormItemLayout}>
              {getFieldDecorator('user_name')(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="员工号" {...FormItemLayout}>
              {getFieldDecorator('user_no')(
                <Input />
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
