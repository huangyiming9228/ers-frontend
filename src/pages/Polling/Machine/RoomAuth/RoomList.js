import React from 'react';
import { Table, Button, Divider, Popconfirm } from 'antd';
import { connect } from 'dva';
import AuthModal from './AuthModal';
import AddModal from './AddModal';
import { Action } from '@/utils/utils';


@connect(({ machine_roomauth }) => ({
  ...machine_roomauth,
}))
class RoomList extends React.Component {
  state = {
    modalVisible: false,
    addModalVisible: false,
  };

  componentDidMount() {
    this.props.dispatch(Action('machine_roomauth/getRoomUsers'));
  }

  handleCancel = () => this.setState({ modalVisible: false });

  handleAddModalCancel = () => this.setState({ addModalVisible: false })

  handleAddClick = () => this.setState({ addModalVisible: true })

  handleDelete = record => () => {
    this.props.dispatch(Action('machine_roomauth/deleteRoom', {
      room_id: record.id
    }))
  }

  handleOk = () => this.props.dispatch(Action('machine_roomauth/updateRoomUser'))
    .then(() => this.handleCancel())

  hanldeSelectedKeysChange = selectedRowKeys  => this.props.dispatch(Action('machine_roomauth/save', { selectedRowKeys }));

  handleAuthClick = record => () => {
    this.setState({ modalVisible: true });
    this.props.dispatch(Action('machine_roomauth/save', {
      selectedRowKeys: [record.id]
    }))
  }

  handleBatchAuthClick = () => this.setState({ modalVisible: true })

  render() {
    const { modalVisible, addModalVisible } = this.state;
    const { roomList, selectedRowKeys } = this.props;
    const columns = [
      {
        title: '序号',
        dataIndex: 'ln',
        sorter: (a, b) => a.ln - b.ln,
      },
      {
        title: '所属区域',
        dataIndex: 'area_name',
      },
      {
        title: '机房',
        dataIndex: 'room_name',
      },
      {
        title: '负责人',
        dataIndex: 'user_name',
      },
      {
        title: '操作',
        dataIndex: 'action',
        render: (value, record) => {
          return (
            <span>
              <a onClick={this.handleAuthClick(record)}>授权</a>
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '40px' }}>
          <div>
            <Button
              type="primary"
              onClick={this.handleAddClick}
            >
              新增机房
            </Button>
          </div>
          <div>
            <Button
              disabled={!selectedRowKeys.length}
              type="primary"
              onClick={this.handleBatchAuthClick}
            >
              批量授权
            </Button>
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={roomList}
          rowKey={record => record.id}
          rowSelection={{
            selectedRowKeys,
            onChange: this.hanldeSelectedKeysChange
          }}
        />
        <AuthModal
          modalVisible={modalVisible}
          handleCancel={this.handleCancel}
          handleOk={this.handleOk}
        />
        <AddModal
          addModalVisible={addModalVisible}
          handleAddModalCancel={this.handleAddModalCancel}
        />
      </div>
    );
  }
}

export default RoomList;
