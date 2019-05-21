import React from 'react';
import { Table, } from 'antd';
import { connect } from 'dva';
import moment from 'moment'

@connect(({ etcheckout }) => ({
  ...etcheckout,
}))
class CheckoutList extends React.Component {

  render() {
    const columns = [
      {
        title: '序号',
        dataIndex: 'ln',
        sorter: (a, b) => a.ln - b.ln,
      },
      {
        title: '设备编码',
        dataIndex: 'et_no',
      },
      {
        title: '设备名称',
        dataIndex: 'et_name',
      },
      {
        title: '外借单位',
        dataIndex: 'checkout_unit',
      },
      {
        title: '外借人员',
        dataIndex: 'checkout_name',
      },
      {
        title: '联系人',
        dataIndex: 'contacts',
      },
      {
        title: '电话',
        dataIndex: 'tel',
      },
      {
        title: '外借事由',
        dataIndex: 'reason',
      },
      {
        title: '外借时间',
        dataIndex: 'checkout_date',
        sorter: (a, b) => moment(b.checkout_date).isAfter(a.checkout_date)
      },
      {
        title: '归还时间',
        dataIndex: 'return_date',
        sorter: (a, b) => moment(a.return_date).isAfter(b.return_date)
      },
      {
        title: '经办人',
        dataIndex: 'audit_person',
      },
      {
        title: '同意外借领导',
        dataIndex: 'leader',
      },
      {
        title: '设备照片',
        dataIndex: 'image_url',
        render: value => <a href={value} target="_blank" rel="noopener noreferrer">点击查看</a>
      },
    ];
    const { checkoutList } = this.props;
    return (
      <div>
        <Table
          columns={columns}
          dataSource={checkoutList}
          rowKey={record => record.id}
          scroll={{ x: 1280 }}
        />
      </div>
    );
  }
}

export default CheckoutList;
