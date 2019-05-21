import React from 'react';
import { Table, } from 'antd';
import { connect } from 'dva';
import moment from 'moment';

@connect(({ faultcomplaint }) => ({
  ...faultcomplaint,
}))
class FaultComplaint extends React.Component {

  render() {
    const columns = [
      {
        title: '序号',
        dataIndex: 'ln',
        sorter: (a, b) => a.ln - b.ln,
      },
      {
        title: '投诉区域',
        dataIndex: 'area_name',
      },
      {
        title: '投诉教室',
        dataIndex: 'room_name',
      },
      {
        title: '教室负责人',
        dataIndex: 'room_user_name',
      },
      {
        title: '故障点',
        dataIndex: 'fault_list',
        render: (value, record) => {
          const faultList = [];
          if (record.pe) faultList.push('投影设备');
          if (record.computer) faultList.push('计算机');
          if (record.se) faultList.push('音响设备');
          if (record.desc) faultList.push('讲桌');
          if (record.power) faultList.push('电源控制器');
          return faultList.map((item, index) => <div>{`${index + 1}.${item}`}</div>)
        }
      },
      {
        title: '备注',
        dataIndex: 'other',
      },
      {
        title: '投诉时间',
        dataIndex: 'submit_time',
        sorter: (a, b) => moment(a.submit_time).isBefore(b.submit_time)
      },
      {
        title: '投诉照片',
        dataIndex: 'image_list',
        render: value => value.map((item, index) => {
          return (
            <a
              href={item.image_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'block' }}
            >
              照片{index + 1}
            </a>
          )
        })
      },
    ];
    const { complaintList } = this.props;
    return (
      <div>
        <Table
          columns={columns}
          dataSource={complaintList}
          rowKey={record => record.id}
        />
      </div>
    );
  }
}

export default FaultComplaint;
