import React, { Component, Fragment } from 'react';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { Form, Input, Upload, Button } from 'antd';
import { connect } from 'dva';
import styles from './BaseView.less';
import { Action } from '../../../utils/utils';
// import { getTimeDistance } from '@/utils/utils';

const FormItem = Form.Item;

// 头像组件 方便以后独立，增加裁剪之类的功能
// eslint-disable-next-line no-unused-vars
const AvatarView = ({ avatar }) => (
  <Fragment>
    <div className={styles.avatar_title}>
      <FormattedMessage id="app.settings.basic.avatar" defaultMessage="Avatar" />
    </div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <Upload fileList={[]}>
      <div className={styles.button_view}>
        <Button icon="upload">
          <FormattedMessage id="app.settings.basic.change-avatar" defaultMessage="Change avatar" />
        </Button>
      </div>
    </Upload>
  </Fragment>
);

@connect(({ user, loading }) => ({
  currentUser: user.currentUser,
  loading: loading.effects['user/updateUserInfo'],
}))
@Form.create()
class BaseView extends Component {
  componentDidMount() {
    this.setBaseInfo();
  }

  setBaseInfo = () => {
    const { currentUser, form } = this.props;
    Object.keys(form.getFieldsValue()).forEach(key => {
      const obj = {};
      obj[key] = currentUser[key] || null;
      form.setFieldsValue(obj);
    });
  };

  getAvatarURL() {
    const { currentUser } = this.props;
    if (currentUser.avatar) {
      return currentUser.avatar;
    }
    const url = 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png';
    return url;
  }

  getViewDom = ref => {
    this.view = ref;
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      form: { validateFields },
      dispatch,
    } = this.props;
    validateFields((errors, values) => {
      if (!errors) {
        dispatch(
          Action('user/updateUserInfo', {
            ...values,
          })
        );
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      loading,
    } = this.props;
    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <div className={styles.left}>
          <Form layout="vertical" onSubmit={this.handleSubmit} hideRequiredMark>
            <FormItem label="员工号">{getFieldDecorator('no')(<Input disabled />)}</FormItem>
            <FormItem label="姓名">{getFieldDecorator('name')(<Input disabled />)}</FormItem>
            <FormItem label="联系电话">{getFieldDecorator('tel')(<Input />)}</FormItem>
            <FormItem label="邮箱">{getFieldDecorator('email')(<Input />)}</FormItem>
            <FormItem label={formatMessage({ id: 'app.settings.basic.profile' })}>
              {getFieldDecorator('profile')(
                <Input.TextArea
                  placeholder={formatMessage({ id: 'app.settings.basic.profile-placeholder' })}
                  rows={4}
                />
              )}
            </FormItem>
            {/* <FormItem label={formatMessage({ id: 'app.settings.basic.country' })}>
              {getFieldDecorator('country', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.basic.country-message' }, {}),
                  },
                ],
              })(
                <Select style={{ maxWidth: 220 }}>
                  <Option value="China">中国</Option>
                </Select>
              )}
            </FormItem>
            <FormItem label={formatMessage({ id: 'app.settings.basic.geographic' })}>
              {getFieldDecorator('geographic', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.basic.geographic-message' }, {}),
                  },
                  {
                    validator: validatorGeographic,
                  },
                ],
              })(<GeographicView />)}
            </FormItem>
            <FormItem label={formatMessage({ id: 'app.settings.basic.address' })}>
              {getFieldDecorator('address', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.basic.address-message' }, {}),
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label={formatMessage({ id: 'app.settings.basic.phone' })}>
              {getFieldDecorator('phone', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.basic.phone-message' }, {}),
                  },
                  { validator: validatorPhone },
                ],
              })(<PhoneView />)}
            </FormItem> */}
            <Button type="primary" htmlType="submit" loading={loading}>
              <FormattedMessage
                id="app.settings.basic.update"
                defaultMessage="Update Information"
              />
            </Button>
          </Form>
        </div>
        {/* <div className={styles.right}>
          <AvatarView avatar={this.getAvatarURL()} />
        </div> */}
      </div>
    );
  }
}

export default BaseView;
