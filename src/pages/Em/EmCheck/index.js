import React from 'react';
import { Table, Card, Spin } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import QueryForm from './QueryForm';

@connect(({ loading }) => ({
  loading: loading.models.em
}))
class EmCheck extends React.Component {
  render() {
    const { loading } = this.props;
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Spin spinning={loading}>
            <QueryForm />
          </Spin>
        </Card>
      </PageHeaderWrapper>
    )
  }
}

export default EmCheck;
