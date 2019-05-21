import React from 'react';
import { Table, Popover } from 'antd';
import { connect } from 'dva';
import moment from 'moment';

@connect(({ faulthanding }) => ({
  ...faulthanding,
}))
class FaultHandingList extends React.Component {

  render() {
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
        title: '教室',
        dataIndex: 'room_name',
      },
      {
        title: '故障设备',
        dataIndex: 'et_info',
        render: value => {
          const content = (
            <div>
              <div>设备名称：{value.et_name}</div>
              <div>设备型号：{value.et_no}</div>
            </div>
          );
          return (
            <Popover content={content}>
              <a>{value.et_type}</a>
            </Popover>
          )
        }
      },
      {
        title: '故障点',
        dataIndex: 'fault_list',
        render: value => {
          if (value.length === 1) {
            return value[0].fault_name;
          }
          return value.map((item, index) => <div>{index + 1}.{item.fault_name}</div>)
        }
      },
      {
        title: '处理时间',
        dataIndex: 'submit_time',
        sorter: (a, b) => moment(a.submit_time).isBefore(b.submit_time)
      },
      {
        title: '处理人',
        dataIndex: 'user_name',
      },
    ];
    const { faulthandingList } = this.props;
    return (
      <div>
        <Table
          columns={columns}
          dataSource={faulthandingList}
          rowKey={record => record.id}
        />
      </div>
    );
  }
}

export default FaultHandingList;
