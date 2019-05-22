import React from 'react'
import { Modal, Form, Select } from 'antd'
import { connect } from 'dva'
import { Action } from '@/utils/utils';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
// eslint-disable-next-line prefer-destructuring
const Option = Select.Option;

@connect(({ machine_roomauth, loading }) => ({
  ...machine_roomauth,
  confirmLoading: loading.effects['machine_roomauth/updateRoomUser']
}))
@Form.create({
  mapPropsToFields(props) {
    const { authForm = null } = props;
    return Object.entries(authForm).reduce((item, [key, value]) => {
      // eslint-disable-next-line no-param-reassign
      item[key] = Form.createFormField({ ...value });
      return item;
    }, {});
  },
  onFieldsChange(props, changedFields) {
    const { dispatch, authForm } = props;
    const changedItems = Object.entries(changedFields).reduce((item, [key, value]) => {
      // eslint-disable-next-line no-param-reassign
      item[key] = { ...value };
      return item;
    }, {});
    dispatch(
      Action('machine_roomauth/save', {
        authForm: {
          ...authForm,
          ...changedItems,
        },
      })
    );
  },
})
class AuthModal extends React.Component{
  render() {
    const {
      form: { getFieldDecorator },
      modalVisible,
      handleCancel,
      handleOk,
      confirmLoading,
      userList,
      authForm: {
        user_no: { value: userNo }
      }
    } = this.props;
    return (
      <Modal
        title="选择负责人"
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
        destroyOnClose
        confirmLoading={confirmLoading}
        okButtonProps={{
          disabled: !userNo
        }}
      >
        <Form layout="horizontal">
          <FormItem {...formItemLayout} label="负责人">
            {getFieldDecorator('user_no', {
              rules: [{
                required: true,
                message: '请选择负责人！'
              }],
            })(
              <Select
                showSearch
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {userList.map(item =>
                  <Option
                    value={item.user_no}
                    key={item.user_no}
                  >
                    {`${item.user_name} - ${item.user_no} - ${item.auth_name}`}
                  </Option>)}
              </Select>
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

export default AuthModal
