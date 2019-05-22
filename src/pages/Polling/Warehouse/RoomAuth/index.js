import React from 'react';
import { Card, Spin } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import QueryForm from './QueryForm';
import RoomList from './RoomList';

@connect(({ loading }) => ({
  loading: loading.global,
}))
class RoomAuth extends React.Component {
  render() {
    const { loading } = this.props;
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Spin spinning={loading}>
            <QueryForm />
            <RoomList />
          </Spin>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default RoomAuth;
