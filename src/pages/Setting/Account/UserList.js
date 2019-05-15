import React from 'react';
import { Table, Button, Divider, Popconfirm } from 'antd';
import { connect } from 'dva';
import { Action } from '../../../utils/utils';
import AddModal from './AddModal';
import EditModal from './EditModal';


@connect(({ account }) => ({
  ...account,
}))
class UserList extends React.Component {
  state = {
    addModalVisible: false,
    editModalVisible: false,
  };

  handleAddModalCancel = () => this.setState({ addModalVisible: false })

  handleEditModalCancel = () => this.setState({ editModalVisible: false })

  handleAddClick = () => this.setState({ addModalVisible: true })

  handleDelete = (record) => () => this.props.dispatch(Action('account/deleteUser', {
    user_no: record.user_no
  }))

  handleEditClick = (record) => () => {
    const { dispatch } = this.props;
    dispatch(Action('account/save', {
      editForm: {
        user_name: { value: record.user_name },
        user_no: { value: record.user_no },
        tel: { value: record.tel },
        email: { value: record.email },
        auth: { value: record.auth },
        auth_name: { value: record.auth_name },
      }
    }))
    this.setState({ editModalVisible: true })
  }

  render() {
    const { addModalVisible, editModalVisible } = this.state;
    const { userList } = this.props;
    const columns = [
      {
        title: '序号',
        dataIndex: 'ln',
        sorter: (a, b) => a.ln - b.ln,
      },
      {
        title: '用户名',
        dataIndex: 'user_name',
      },
      {
        title: '员工号',
        dataIndex: 'user_no',
      },
      {
        title: '联系电话',
        dataIndex: 'tel',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
      },
      {
        title: '权限',
        dataIndex: 'auth_name',
      },
      {
        title: '操作',
        dataIndex: 'action',
        render: (value, record) => {
          return (
            <span>
              <a onClick={this.handleEditClick(record)}>编辑</a>
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
              新增用户
            </Button>
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={userList}
          rowKey={record => record.id}
        />
        <AddModal
          addModalVisible={addModalVisible}
          handleAddModalCancel={this.handleAddModalCancel}
        />
        <EditModal
          editModalVisible={editModalVisible}
          handleEditModalCancel={this.handleEditModalCancel}
        />
      </div>
    );
  }
}

export default UserList;
