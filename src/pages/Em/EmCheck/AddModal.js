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

@connect(({ em, loading }) => ({
  ...em,
  confirmLoading: loading.effects['em/addEquipment']
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
      Action('em/save', {
        addForm: {
          ...addForm,
          ...changedItems,
        },
      })
    );
  },
})
class AddModal extends React.Component {

  handleAreaChange = value => {
    const {
      dispatch,
      form: { setFieldsValue },
    } = this.props;
    dispatch(Action('em/getRooms', { value })).then(() => {
      setFieldsValue({
        room_id: null,
      });
    });
  };

  handleOk = () => {
    const {
      form: { validateFields },
      dispatch,
      handleAddModalCancel,
    } = this.props;
    validateFields((errors) => {
      if (!errors) {
        dispatch(Action('em/addEquipment')).then(() => handleAddModalCancel())
      }
    })
  }

  render() {
    const {
      form: { getFieldDecorator },
      addModalVisible,
      handleAddModalCancel,
      confirmLoading,
      areaList,
      equipmentClassList,
      roomList
    } = this.props;
    return (
      <Modal
        title="新增设备"
        visible={addModalVisible}
        onOk={this.handleOk}
        onCancel={handleAddModalCancel}
        maskClosable={false}
        destroyOnClose
        confirmLoading={confirmLoading}
      >
        <Form layout="horizontal">
          <FormItem {...formItemLayout} label="设备类别">
            {getFieldDecorator('class_id', {
              rules: [{
                required: true,
                message: '请选择设备类别！'
              }],
            })(
              <Select>
                {equipmentClassList.map(item => (
                  <Option key={item.id}>{item.text}</Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="设备名称">
            {getFieldDecorator('et_name', {
              rules: [{
                required: true,
                message: '请输入设备名称！'
              }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="设备型号">
            {getFieldDecorator('et_no', {
              rules: [{
                required: true,
                message: '请输入设备型号！'
              }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="所属区域">
            {getFieldDecorator('area_id', {
              rules: [{
                required: true,
                message: '请选择所属区域！'
              }],
            })(
              <Select onChange={this.handleAreaChange}>
                {areaList.map(item => (
                  <Option key={item.id}>{item.area_name}</Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="所属教室">
            {getFieldDecorator('room_id', {
              rules: [{
                required: true,
                message: '请选择所属教室！'
              }],
            })(
              <Select>
                {roomList.map(item => (
                  <Option value={item.id} key={item.id}>
                    {item.room_name}
                  </Option>
                ))}
              </Select>
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

export default AddModal
