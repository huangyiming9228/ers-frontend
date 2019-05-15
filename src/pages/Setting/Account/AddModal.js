import React from 'react'
import { Modal, Form, Input, Select } from 'antd'
import { connect } from 'dva'
import { Action } from '../../../utils/utils'

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const Option = Select.Option;

@connect(({ account, loading }) => ({
  ...account,
  confirmLoading: loading.effects['account/addUser']
}))
@Form.create({
  mapPropsToFields(props) {
    const { addForm = null } = props;
    return Object.entries(addForm).reduce((item, [key, value]) => {
      item[key] = Form.createFormField({ ...value });
      return item;
    }, {});
  },
  onFieldsChange(props, changedFields) {
    const { dispatch, addForm } = props;
    const changedItems = Object.entries(changedFields).reduce((item, [key, value]) => {
      item[key] = { ...value };
      if (key === 'auth') {
        switch (value.value) {
          case 'admin':
            item['auth_name'] = { value: '科室长' }
            break;
          case 'area_admin':
            item['auth_name'] = { value: '区域管理员' }
            break;
          case 'room_admin':
            item['auth_name'] = { value: '教室管理员' }
            break;
          default:
            break;
        }
      }
      return item;
    }, {});
    dispatch(
      Action('account/save', {
        addForm: {
          ...addForm,
          ...changedItems,
        },
      })
    );
  },
})
class AddModal extends React.Component {

  handleOk = () => {
    const {
      form: { validateFields },
      dispatch,
      handleAddModalCancel,
    } = this.props;
    validateFields((errors) => {
      if (!errors) {
        dispatch(Action('account/addUser')).then(() => handleAddModalCancel())
      }
    })
  }

  render() {
    const {
      form: { getFieldDecorator },
      addModalVisible,
      handleAddModalCancel,
      confirmLoading,
    } = this.props;
    return (
      <Modal
        title="新增用户"
        visible={addModalVisible}
        onOk={this.handleOk}
        onCancel={handleAddModalCancel}
        maskClosable={false}
        destroyOnClose
        confirmLoading={confirmLoading}
      >
        <Form layout="horizontal">
          <FormItem {...formItemLayout} label="用户名">
            {getFieldDecorator('user_name', {
              rules: [{
                required: true,
                message: '请输入用户名！'
              }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="员工号">
            {getFieldDecorator('user_no', {
              rules: [{
                required: true,
                message: '请输入员工号！'
              }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="联系电话">
            {getFieldDecorator('tel')(
              <Input />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="邮箱">
            {getFieldDecorator('email')(
              <Input />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="权限">
            {getFieldDecorator('auth', {
              rules: [{
                required: true,
                message: '请选择权限！'
              }],
            })(
              <Select>
                <Option value="admin">科室长</Option>
                <Option value="area_admin">区域管理员</Option>
                <Option value="room_admin">教室管理员</Option>
              </Select>
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

export default AddModal
