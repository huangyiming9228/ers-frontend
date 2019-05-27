import React from 'react';
import { Card, Spin } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import QueryForm from './QueryForm';
import Result from './Result'

@connect(({ loading }) => ({
  loading: loading.global,
}))
class FoodComplaint extends React.Component {
  render() {
    const { loading } = this.props;
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Spin spinning={loading}>
            <QueryForm />
            <Result />
          </Spin>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default FoodComplaint;
