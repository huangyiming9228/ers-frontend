import React from 'react';
import { Modal, Form, Input, Select, Spin } from 'antd';
import { connect } from 'dva';
import { Action } from '../../../utils/utils';

const FormItem = Form.Item;
const FormItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
// eslint-disable-next-line prefer-destructuring
const Option = Select.Option;
const requiredRules = [
  {
    required: true,
    message: '此项必填！',
  },
];

@connect(({ em, loading }) => ({
  ...em,
  confirmLoading: loading.effects['em/updateEquipmentInfo'],
  getRoomLoading: loading.effects['em/getRooms'],
}))
@Form.create({
  mapPropsToFields(props) {
    const { editingEquipment } = props;
    return Object.entries(editingEquipment).reduce((item, [key, value]) => {
      // eslint-disable-next-line no-param-reassign
      item[key] = Form.createFormField({ ...value });
      return item;
    }, {});
  },
  onFieldsChange(props, changedFields) {
    const { dispatch, editingEquipment } = props;
    const changedItems = Object.entries(changedFields).reduce((item, [key, value]) => {
      // eslint-disable-next-line no-param-reassign
      item[key] = { ...value };
      return item;
    }, {});
    dispatch(
      Action('em/save', {
        editingEquipment: {
          ...editingEquipment,
          ...changedItems,
        },
      })
    );
  },
})
class EditModal extends React.Component {
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
      handleCancel,
    } = this.props;
    validateFields(errors => {
      if (!errors) {
        dispatch(Action('em/updateEquipmentInfo')).then(() => handleCancel());
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      handleCancel,
      modalVisible,
      areaList,
      roomList,
      confirmLoading,
      getRoomLoading,
    } = this.props;
    return (
      <Modal
        title="编辑设备信息"
        visible={modalVisible}
        onOk={this.handleOk}
        onCancel={handleCancel}
        maskClosable={false}
        destroyOnClose
        confirmLoading={confirmLoading}
      >
        <Spin spinning={getRoomLoading}>
          <Form layout="horizontal">
            <FormItem {...FormItemLayout} label="设备名称">
              {getFieldDecorator('et_name', {
                rules: requiredRules,
              })(<Input />)}
            </FormItem>
            <FormItem {...FormItemLayout} label="设备型号">
              {getFieldDecorator('et_no', {
                rules: requiredRules,
              })(<Input />)}
            </FormItem>
            <FormItem {...FormItemLayout} label="所属区域">
              {getFieldDecorator('area_id', {
                rules: requiredRules,
              })(
                <Select onChange={this.handleAreaChange}>
                  {areaList.map(item => (
                    <Option value={item.id} key={item.id}>
                      {item.area_name}
                    </Option>
                  ))}
                </Select>
              )}
            </FormItem>
            <FormItem {...FormItemLayout} label="所属教室">
              {getFieldDecorator('room_id', {
                rules: requiredRules,
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
            <FormItem {...FormItemLayout} label="状态">
              {getFieldDecorator('et_status', {
                rules: requiredRules,
              })(
                <Select>
                  <Option value={1}>正常</Option>
                  <Option value={2}>故障</Option>
                </Select>
              )}
            </FormItem>
          </Form>
        </Spin>
      </Modal>
    );
  }
}

export default EditModal;
