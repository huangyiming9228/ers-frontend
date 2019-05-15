import React from 'react';
import { Table, Tag, Divider, Button, Popconfirm } from 'antd';
import { connect } from 'dva';
import { Action } from '../../../utils/utils';
import EditModal from './EditModal';
import AddModal from './AddModal';

@connect(({ em }) => ({
  ...em,
}))
class EquipmentList extends React.Component {
  state = {
    modalVisible: false,
    editingEquipment: {},
    addModalVisible: false,
  };

  componentDidMount() {
    this.props.dispatch(Action('em/getEquipmentClass'));
  }

  handleCancel = () => this.setState({ modalVisible: false });

  handleAddModalCancel = () => this.setState({ addModalVisible: false });

  handleAddClick = () => this.setState({ addModalVisible: true })

  handleEdit = record => () => {
    // eslint-disable-next-line react/destructuring-assignment
    this.props
      .dispatch(
        Action('em/getEquipmentInfo', {
          id: record.id,
        })
      )
      .then(() => this.setState({ modalVisible: true }));
  }

  handleDelete = record => () => this.props.dispatch(Action('em/deleteEquipment', {
    et_id: record.id
  }))

  render() {
    const { modalVisible, editingEquipment, addModalVisible } = this.state;
    const {
      equipmentList,
      equipmentClassList,
    } = this.props;
    const columns = [
      {
        title: '序号',
        dataIndex: 'ln',
        sorter: (a, b) => a.ln - b.ln,
      },
      {
        title: '设备名称',
        dataIndex: 'et_name',
      },
      {
        title: '设备型号',
        dataIndex: 'et_no',
      },
      {
        title: '设备类别',
        dataIndex: 'type',
        filters: equipmentClassList,
        onFilter: (value, record) => record.type === value,
      },
      {
        title: '设备状态',
        dataIndex: 'et_status',
        render: value => {
          return value === 1 ? <Tag color="green">正常</Tag> : <Tag color="volcano">故障</Tag>;
        },
      },
      {
        title: '操作',
        dataIndex: 'action',
        render: (value, record) => {
          return (
            <span>
              <a onClick={this.handleEdit(record)}>编辑</a>
              <Divider type="vertical" />
              <Popconfirm
                title="确定删除？"
                onConfirm={this.handleDelete(record)}
              >
                <a>删除</a>
              </Popconfirm>
            </span>
          );
        },
      },
    ];
    return (
      <div>
        <div style={{ height: '40px' }}>
          <Button
            type="primary"
            onClick={this.handleAddClick}
          >
            新增设备
          </Button>
        </div>
        <Table columns={columns} dataSource={equipmentList} rowKey={record => record.ln} />
        <EditModal
          modalVisible={modalVisible}
          handleCancel={this.handleCancel}
          editingEquipment={editingEquipment}
        />
        <AddModal
          addModalVisible={addModalVisible}
          handleAddModalCancel={this.handleAddModalCancel}
        />
      </div>
    );
  }
}

export default EquipmentList;
