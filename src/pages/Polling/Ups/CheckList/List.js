import React from 'react';
import { Table, Tag } from 'antd';
import { connect } from 'dva';
import moment from 'moment';

@connect(({ ups_checklist }) => ({
  ...ups_checklist,
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
        title: '教室',
        dataIndex: 'room_name',
      },
      {
        title: '主机是否正常',
        dataIndex: 'host_flag',
        render: value => value === 1 ? <Tag color="green">是</Tag> : <Tag color="volcano">否</Tag>
      },
      {
        title: '外壳是否漏电',
        dataIndex: 'shell_flag',
        render: value => value === 1 ? <Tag color="volcano">是</Tag> : <Tag color="green">否</Tag>
      },
      {
        title: '电池是否老化',
        dataIndex: 'power_flag',
        render: value => value === 1 ? <Tag color="volcano">是</Tag> : <Tag color="green">否</Tag>
      },
      {
        title: '空调是否正常',
        dataIndex: 'air_flag',
        render: value => value === 1 ? <Tag color="green">是</Tag> : <Tag color="volcano">否</Tag>
      },
      {
        title: '清洁卫生是否打扫',
        dataIndex: 'clean_flag',
        render: value => value === 1 ? <Tag color="green">是</Tag> : <Tag color="volcano">否</Tag>
      },
      {
        title: '检查时间',
        dataIndex: 'submit_time',
        sorter: (a, b) => moment(a.submit_time).isBefore(b.submit_time)
      },
      {
        title: '室温（℃）',
        dataIndex: 'temperature',
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
