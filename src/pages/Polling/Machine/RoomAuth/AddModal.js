import React from 'react'
import { Modal, Form, Input, Select } from 'antd'
import { connect } from 'dva'
import { Action } from '@/utils/utils'

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const Option = Select.Option;

@connect(({ machine_roomauth, loading }) => ({
  ...machine_roomauth,
  confirmLoading: loading.effects['machine_roomauth/addRoom']
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
      return item;
    }, {});
    dispatch(
      Action('machine_roomauth/save', {
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
    validateFields((errors, values) => {
      if (!errors) {
        dispatch(Action('machine_roomauth/addRoom', {
          ...values
        })).then(() => handleAddModalCancel())
      }
    })
  }

  render() {
    const {
      form: { getFieldDecorator },
      addModalVisible,
      handleAddModalCancel,
      confirmLoading,
      userList,
      areaList
    } = this.props;
    return (
      <Modal
        title="新增机房"
        visible={addModalVisible}
        onOk={this.handleOk}
        onCancel={handleAddModalCancel}
        maskClosable={false}
        destroyOnClose
        confirmLoading={confirmLoading}
      >
        <Form layout="horizontal">
          <FormItem {...formItemLayout} label="所属区域">
            {getFieldDecorator('area_id', {
              rules: [{
                required: true,
                message: '请选择所属区域！'
              }],
            })(
              <Select>
                {areaList.map(item => (
                  <Option key={item.id}>{item.area_name}</Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="机房名称">
            {getFieldDecorator('room_name', {
              rules: [{
                required: true,
                message: '请输入机房名称！'
              }],
            })(
              <Input />
            )}
          </FormItem>
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

export default AddModal
