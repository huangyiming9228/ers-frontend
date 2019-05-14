import React from 'react';
import { Table, Button } from 'antd';
import { connect } from 'dva';
import { Action } from '../../../utils/utils';
import AuthModal from './AuthModal'

@connect(({ roomauth }) => ({
  ...roomauth,
}))
class RoomList extends React.Component {
  state = {
    modalVisible: false,
  };

  componentDidMount() {
    this.props.dispatch(Action('roomauth/getUsers'));
  }

  handleCancel = () => this.setState({ modalVisible: false });

  handleOk = () => this.props.dispatch(Action('roomauth/updateRoomUser'))
    .then(() => this.handleCancel())

  hanldeSelectedKeysChange = selectedRowKeys  => this.props.dispatch(Action('roomauth/save', { selectedRowKeys }));

  handleAuthClick = record => () => {
    this.setState({ modalVisible: true });
    this.props.dispatch(Action('roomauth/save', {
      selectedRowKeys: [record.id]
    }))
  }

  handleBatchAuthClick = () => this.setState({ modalVisible: true })

  render() {
    const { modalVisible } = this.state;
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
        title: '教室',
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
            </span>
          );
        },
      },
    ];
    return (
      <div>
        <div style={{ textAlign: 'right', height: '40px' }}>
          <Button
            disabled={!selectedRowKeys.length}
            type="primary"
            onClick={this.handleBatchAuthClick}
          >
            批量授权
          </Button>
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
      </div>
    );
  }
}

export default RoomList;
