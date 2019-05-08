import React from 'react';
import { Form, Input, Modal, message } from 'antd';
import { connect } from 'dva';
import { Action } from '../../../utils/utils';

const FormItem = Form.Item;
const FormItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}
const passwordLengthRules = [
  {
    min: 6,
    message: '密码最小长度为6位！',
  },
  {
    max: 18,
    message: '密码最大长度为18位！'
  }
];

@connect(({ user, loading }) => ({
  passwordForm: user.passwordForm,
  loading: loading.effects['user/updatePassword'],
}))
@Form.create()
class ModifyPasswordModal extends React.Component {

  handleOk = () => {
    const {
      form: { validateFields, setFields },
      dispatch,
      handleCancel
    } = this.props;
    validateFields((errors, values) => {
      if (!errors) {
        if (values.newPassword1 !== values.newPassword2) {
          setFields({
            newPassword1: {
              value: values.newPassword1,
              errors: [new Error('两次输入的新密码不一致！')],
            },
            newPassword2: {
              value: values.newPassword2,
              errors: [new Error('两次输入的新密码不一致！')],
            }
          })
        } else if (values.newPassword1 === values.oldPassword) {
          setFields({
            oldPassword: {
              value: values.oldPassword,
              errors: [new Error('新密码与原密码不能一致！')],
            },
            newPassword1: {
              value: values.newPassword1,
              errors: [new Error('新密码与原密码不能一致！')],
            },
            newPassword2: {
              value: values.newPassword2,
              errors: [new Error('新密码与原密码不能一致！')],
            }
          })
        } else {
          dispatch(Action('user/updatePassword', {
            ...values
          })).then((res) => {
            if (res === 'ok') {
              handleCancel();
              message.success('修改成功！');
            } else {
              message.error('原密码错误，修改失败！');
            }
          })
        }
      }
    })
  }

  render() {
    const {
      modalVisible = false,
      handleCancel,
      loading,
      form: { getFieldDecorator }
    } = this.props;
    return (
      <div>
        <Modal
          title="修改密码"
          visible={modalVisible}
          onOk={this.handleOk}
          onCancel={handleCancel}
          maskClosable={false}
          destroyOnClose
          confirmLoading={loading}
        >
          <Form layout="horizontal">
            <FormItem {...FormItemLayout} label="原密码">
              {getFieldDecorator('oldPassword', {
                rules: [
                  {
                    required: true,
                    message: '原密码必填！',
                  }
                ],
              })(
                <Input type="password" />
              )}
            </FormItem>
            <FormItem {...FormItemLayout} label="新密码">
              {getFieldDecorator('newPassword1', {
                rules: [
                  {
                    required: true,
                    message: '新密码必填！',
                  },
                  ...passwordLengthRules
                ],
              })(
                <Input type="password" />
              )}
            </FormItem>
            <FormItem {...FormItemLayout} label="确认新密码">
              {getFieldDecorator('newPassword2', {
                rules: [
                  {
                    required: true,
                    message: '新密码必填！',
                  },
                  ...passwordLengthRules
                ],
              })(
                <Input type="password" />
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default ModifyPasswordModal;
