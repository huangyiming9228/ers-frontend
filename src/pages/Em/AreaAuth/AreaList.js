import React from 'react';
import { Table, Button } from 'antd';
import { connect } from 'dva';
import AuthModal from './AuthModal';
import { Action } from '../../../utils/utils';


@connect(({ areaauth }) => ({
  ...areaauth,
}))
class AreaList extends React.Component {
  state = {
    modalVisible: false,
  };

  componentDidMount() {
    this.props.dispatch(Action('areaauth/getUsers'));
    this.props.dispatch(Action('areaauth/getAreas'));
  }

  handleCancel = () => this.setState({ modalVisible: false });

  handleOk = () => this.props.dispatch(Action('areaauth/updateAreaUser'))
    .then(() => this.handleCancel())

  hanldeSelectedKeysChange = selectedRowKeys  => this.props.dispatch(Action('areaauth/save', { selectedRowKeys }));

  handleAuthClick = record => () => {
    this.setState({ modalVisible: true });
    this.props.dispatch(Action('areaauth/save', {
      selectedRowKeys: [record.id]
    }))
  }

  handleBatchAuthClick = () => this.setState({ modalVisible: true })

  render() {
    const { modalVisible } = this.state;
    const { areaList, selectedRowKeys } = this.props;
    const columns = [
      {
        title: '序号',
        dataIndex: 'ln',
        sorter: (a, b) => a.ln - b.ln,
      },
      {
        title: '区域',
        dataIndex: 'area_name',
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
          dataSource={areaList}
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

export default AreaList;
