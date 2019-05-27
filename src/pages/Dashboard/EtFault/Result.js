import React from 'react';
import { Bar } from '@/components/Charts';
import { connect } from 'dva';

@connect(({ fault_analysis }) => ({
  ...fault_analysis
}))
class Result extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <div>
        <Bar
          height={400}
          title="设备故障次数统计"
          data={data}
          autoLabel={false}
        />
      </div>
    )
  }
}

export default Result;
