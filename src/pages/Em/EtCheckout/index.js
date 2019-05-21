import React from 'react';
import { Card, Spin } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import QueryForm from './QueryForm';
import List from './List'

@connect(({ loading }) => ({
  loading: loading.models.etcheckout,
}))
class EtCheckout extends React.Component {
  render() {
    const { loading = false } = this.props;
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Spin spinning={loading}>
            <QueryForm />
            <List />
          </Spin>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default EtCheckout;
