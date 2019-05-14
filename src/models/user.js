import { message } from 'antd';
import { query as queryUsers, getCurrentUser, updateUserInfo, updatePassword } from '@/services/user';
import { Action } from '../utils/utils';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(getCurrentUser);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *updateUserInfo({ payload }, { call, put, select }) {
      let { currentUser } = yield select(state => state.user);
      currentUser = { ...currentUser, ...payload };
      const { data, status } = yield call(updateUserInfo, currentUser);
      if (status === 'ok') {
        yield put(Action('saveCurrentUser', { ...data }));
        message.success('更新成功！');
      } else {
        message.error('更新失败！');
      }
    },
    *updatePassword({ payload }, { call }) {
      const { status } = yield call(updatePassword, payload);
      return status;
    }
  },

  reducers: {
    setState(state, { payload }) {
      return { ...state, ...payload };
    },
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
