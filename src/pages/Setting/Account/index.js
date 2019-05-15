import React from 'react';
import { Card, Spin } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import QueryForm from './QueryForm';
import UserList from './UserList';

@connect(({ loading }) => ({
  loading: loading.models.account,
}))
class Account extends React.Component {
  render() {
    const { loading } = this.props;
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Spin spinning={loading}>
            <QueryForm />
            <UserList />
          </Spin>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Account;
