import { message } from 'antd';
import { Action } from '../../../../utils/utils';
import {
  queryUsers,
  addUser,
  deleteUser,
  updateUser
} from '@/services/account';

const defaultAddForm = {
  user_name: { value: null },
  user_no: { value: null },
  tel: { value: null },
  email: { value: null },
  auth: { value: null },
  auth_name: { value: null },
}

export default {
  name: 'account',
  state: {
    queryForm: {
      user_name: { value: '' },
      user_no: { value: '' },
    },
    userList: [],
    addForm: defaultAddForm,
    editForm: defaultAddForm,
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *queryUsers(_, { call, put, select }) {
      const {
        queryForm: {
          user_name: { value: user_name },
          user_no: { value: user_no }
        }
      } = yield select(state => state.account);
      const { data } = yield call(queryUsers, { user_name, user_no });
      const userList = data.map((item, index) => ({ ...item, ln: index + 1 }));
      yield put(Action('save', {
        userList
      }));
    },
    *addUser(_, { call, put, select }) {
      const {
        addForm: {
          user_name: { value: user_name },
          user_no: { value: user_no },
          tel: { value: tel },
          email: { value: email },
          auth: { value: auth },
          auth_name: { value: auth_name },
        } 
      } = yield select(state => state.account);
      const { status, message: messages } = yield call(addUser, {
        user_name,
        user_no,
        tel,
        email,
        auth,
        auth_name
      });
      if (status === 'ok') {
        yield put(Action('queryUsers'));
        yield put(Action('save', {
          addForm: defaultAddForm
        }));
        message.success(messages);
      } else {
        message.error(messages);
      }
    },
    *deleteUser({ payload }, { call, put }) {
      const { status, message: messages } = yield call(deleteUser, payload);
      if (status === 'ok') {
        yield put(Action('queryUsers'));
        message.success(messages);
      } else {
        message.error(messages);
      }
    },
    *updateUser(_, { call, put, select }) {
      const {
        editForm: {
          user_name: { value: user_name },
          user_no: { value: user_no },
          tel: { value: tel },
          email: { value: email },
          auth: { value: auth },
          auth_name: { value: auth_name },
        } 
      } = yield select(state => state.account);
      const { status, message: messages } = yield call(updateUser, {
        user_name,
        user_no,
        tel,
        email,
        auth,
        auth_name
      });
      if (status === 'ok') {
        yield put(Action('queryUsers'));
        message.success(messages);
      } else {
        message.error(messages);
      }
    },
  },
};
