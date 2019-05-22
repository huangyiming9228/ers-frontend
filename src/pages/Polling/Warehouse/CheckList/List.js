import React from 'react';
import { Table, Tag } from 'antd';
import { connect } from 'dva';
import moment from 'moment';

@connect(({ warehouse_checklist }) => ({
  ...warehouse_checklist,
}))
class List extends React.Component {

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
        title: '库房',
        dataIndex: 'room_name',
      },
      {
        title: '门窗是否关闭',
        dataIndex: 'door_flag',
        render: value => value === 1 ? <Tag color="green">是</Tag> : <Tag color="volcano">否</Tag>
      },
      {
        title: '环境是否安全',
        dataIndex: 'env_flag',
        render: value => value === 1 ? <Tag color="green">是</Tag> : <Tag color="volcano">否</Tag>
      },
      {
        title: '设备是否正常存放',
        dataIndex: 'et_flag',
        render: value => value === 1 ? <Tag color="green">是</Tag> : <Tag color="volcano">否</Tag>
      },
      {
        title: '检查时间',
        dataIndex: 'submit_time',
        sorter: (a, b) => moment(a.submit_time).isBefore(b.submit_time)
      },
      {
        title: '备注',
        dataIndex: 'comments',
      },
      {
        title: '检查照片',
        dataIndex: 'image_list',
        render: value => value.map((item, index) => {
          return (
            <a
              href={item.image_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-block', marginRight: '6px' }}
            >
              照片{index + 1}
            </a>
          )
        })
      },
      {
        title: '检查人员',
        dataIndex: 'user_name',
      },
    ];
    const { checkList } = this.props;
    return (
      <div>
        <Table
          columns={columns}
          dataSource={checkList}
          rowKey={record => record.id}
          scroll={{ x: 1680 }}
        />
      </div>
    );
  }
}

export default List;
