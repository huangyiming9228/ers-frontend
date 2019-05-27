import React, { memo } from 'react';
import { Row, Col, Card, Tabs, DatePicker } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import numeral from 'numeral';
import styles from './Analysis.less';
import { Bar } from '@/components/Charts';

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const rankingListData = [];
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: formatMessage({ id: 'app.analysis.test' }, { no: i }),
    total: 323234,
  });
}

let rankingData = [
  {
    title: '测试用户4',
    total: 273
  },
  {
    title: '测试用户2',
    total: 236
  },
  {
    title: '李亮',
    total: 188
  },
  {
    title: '蒋兰',
    total: 151
  },
  {
    title: '左建国',
    total: 134
  },
  {
    title: '测试用户3',
    total: 122
  },
  {
    title: '李旭',
    total: 115
  },
  {
    title: '测试用户1',
    total: 88
  },
]

const changeListData = (param) => {
  if (param === 'today') {
    rankingData = [
      {
        title: '测试用户1',
        total: 4
      },
      {
        title: '左建国',
        total: 2
      },
      {
        title: '蒋兰',
        total: 2
      },
      {
        title: '测试用户2',
        total: 1
      },
      {
        title: '测试用户3',
        total: 1
      },
      {
        title: '李旭',
        total: 0
      },
      {
        title: '李亮',
        total: 0
      },
      {
        title: '测试用户4',
        total: 5
      },
    ]
  }
  if (param === 'week') {
    rankingData = [
      {
        title: '测试用户2',
        total: 23
      },
      {
        title: '测试用户1',
        total: 19
      },
      {
        title: '左建国',
        total: 14
      },
      {
        title: '李旭',
        total: 10
      },
      {
        title: '蒋兰',
        total: 5
      },
      {
        title: '测试用户3',
        total: 3
      },
      {
        title: '李亮',
        total: 3
      },
      {
        title: '测试用户4',
        total: 2
      },
    ]
  }
  if (param === 'month') {
    rankingData = [
      {
        title: '测试用户4',
        total: 73
      },
      {
        title: '测试用户1',
        total: 66
      },
      {
        title: '蒋兰',
        total: 51
      },
      {
        title: '左建国',
        total: 34
      },
      {
        title: '测试用户3',
        total: 22
      },
      {
        title: '李亮',
        total: 18
      },
      {
        title: '李旭',
        total: 16
      },
      {
        title: '测试用户2',
        total: 10
      },
    ]
  }
  if (param === 'year') {
    rankingData = [
      {
        title: '测试用户4',
        total: 273
      },
      {
        title: '测试用户2',
        total: 236
      },
      {
        title: '李亮',
        total: 188
      },
      {
        title: '蒋兰',
        total: 151
      },
      {
        title: '左建国',
        total: 134
      },
      {
        title: '测试用户3',
        total: 122
      },
      {
        title: '李旭',
        total: 115
      },
      {
        title: '测试用户1',
        total: 88
      },
    ]
  }
}

const SalesCard = memo(
  ({ rangePickerValue, salesData, isActive, handleRangePickerChange, loading, selectDate }) => (
    <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
      <div className={styles.salesCard}>
        <Tabs
          tabBarExtraContent={
            <div className={styles.salesExtraWrap}>
              <div className={styles.salesExtra}>
                <a
                  className={isActive('today')}
                  onClick={() => {
                    selectDate('today')
                    changeListData('today')
                  }}
                >
                  <FormattedMessage id="app.analysis.all-day" defaultMessage="All Day" />
                </a>
                <a
                  className={isActive('week')}
                  onClick={() => {
                    selectDate('week')
                    changeListData('week')
                  }}
                >
                  <FormattedMessage id="app.analysis.all-week" defaultMessage="All Week" />
                </a>
                <a
                  className={isActive('month')}
                  onClick={() => {
                    selectDate('month')
                    changeListData('month')
                  }}
                >
                  <FormattedMessage id="app.analysis.all-month" defaultMessage="All Month" />
                </a>
                <a
                  className={isActive('year')}
                  onClick={() => {
                    selectDate('year')
                    changeListData('year')
                  }}
                >
                  <FormattedMessage id="app.analysis.all-year" defaultMessage="All Year" />
                </a>
              </div>
              <RangePicker
                value={rangePickerValue}
                onChange={handleRangePickerChange}
                style={{ width: 256 }}
              />
            </div>
          }
          size="large"
          tabBarStyle={{ marginBottom: 24 }}
        >
          <TabPane
            tab="设备维修工作量统计"
            key="sales"
          >
            <Row>
              <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesBar}>
                  <Bar
                    height={295}
                    title="全年工作量"
                    data={salesData}
                  />
                </div>
              </Col>
              <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesRank}>
                  <h4 className={styles.rankingTitle}>
                    工作量排名
                  </h4>
                  <ul className={styles.rankingList}>
                    {rankingData.map((item, i) => (
                      <li key={item.title}>
                        <span
                          className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''}`}
                        >
                          {i + 1}
                        </span>
                        <span className={styles.rankingItemTitle} title={item.title}>
                          {item.title}
                        </span>
                        <span className={styles.rankingItemValue}>
                          {numeral(item.total).format('0,0')}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
            </Row>
          </TabPane>
          {/* <TabPane
            tab={<FormattedMessage id="app.analysis.visits" defaultMessage="Visits" />}
            key="views"
          >
            <Row>
              <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesBar}>
                  <Bar
                    height={292}
                    title={
                      <FormattedMessage
                        id="app.analysis.visits-trend"
                        defaultMessage="Visits Trend"
                      />
                    }
                    data={salesData}
                  />
                </div>
              </Col>
              <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesRank}>
                  <h4 className={styles.rankingTitle}>
                    <FormattedMessage
                      id="app.analysis.visits-ranking"
                      defaultMessage="Visits Ranking"
                    />
                  </h4>
                  <ul className={styles.rankingList}>
                    {rankingListData.map((item, i) => (
                      <li key={item.title}>
                        <span
                          className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''}`}
                        >
                          {i + 1}
                        </span>
                        <span className={styles.rankingItemTitle} title={item.title}>
                          {item.title}
                        </span>
                        <span>{numeral(item.total).format('0,0')}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
            </Row>
          </TabPane> */}
        </Tabs>
      </div>
    </Card>
  )
);

export default SalesCard;
