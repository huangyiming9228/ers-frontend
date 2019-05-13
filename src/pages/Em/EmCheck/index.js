import React from 'react';
import { Card, Spin } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import QueryForm from './QueryForm';
import EquipmentList from './EquipmentList';

@connect(({ loading }) => ({
  loading: loading.models.em,
}))
class EmCheck extends React.Component {
  render() {
    const { loading } = this.props;
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Spin spinning={loading}>
            <QueryForm />
            <EquipmentList />
          </Spin>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default EmCheck;
