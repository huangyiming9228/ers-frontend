import React from 'react';
import { Card, Spin } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import AreaList from './AreaList'

@connect(({ loading }) => ({
  loading: loading.models.areaauth,
}))
class AreaAuth extends React.Component {
  render() {
    const { loading } = this.props;
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Spin spinning={loading}>
            <AreaList />
          </Spin>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default AreaAuth;
