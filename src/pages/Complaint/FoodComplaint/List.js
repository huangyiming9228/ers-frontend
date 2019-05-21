import React from 'react';
import { Table, } from 'antd';
import { connect } from 'dva';
import moment from 'moment';

@connect(({ foodcomplaint }) => ({
  ...foodcomplaint,
}))
class FoodComplaintList extends React.Component {

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
        dataIndex: 'user_name',
      },
      {
        title: '投诉项',
        dataIndex: 'complaint_text',
        render: (value, record) => {
          const textArray = [];
          if (record.dust) {
            textArray.push('讲台粉尘多');
          }
          if (record.paper) {
            textArray.push('讲台废纸多');
          }
          return textArray.join('，');
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

export default FoodComplaintList;
