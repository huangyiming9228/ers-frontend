import { message } from 'antd';
import { Action } from '@/utils/utils';
import {
  getAreas,
  getAreaUsers,
  updateAreaUser,
  addArea,
  deleteArea
} from '@/services/ups';

export default {
  name: 'ups_areaauth',
  state: {
    areaList: [],
    selectedRowKeys: [],
    userList: [],
    authForm: {
      user_no: { value: null }
    },
    addForm: {
      area_name: { value: null },
      user_no: { value: null },
    }
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *getAreas({ payload }, { call, put }) {
      const { data } = yield call(getAreas, payload);
      const areaList = data.map((item, index) => ({ ...item, ln: index + 1 }))
      yield put(
        Action('save', {
          areaList,
        })
      );
    },
    *getAreaUsers(_, { call, put }) {
      const { data: userList } = yield call(getAreaUsers);
      yield put(Action('save', {
        userList
      }))
    },
    *updateAreaUser(_, { call, put, select }) {
      const { selectedRowKeys, authForm: { user_no: { value } } } = yield select(state => state.ups_areaauth);
      const { status } = yield call(updateAreaUser, { keys: selectedRowKeys, user_no: value });
      if (status === 'ok') {
        message.success('更新成功！');
        yield put(Action('getAreas'));
        yield put(Action('save', {
          authForm: {
            user_no: { value: null }
          }
        }));
      } else {
        message.error('更新失败！');
      }
    },
    *addArea({ payload }, { call, put }) {
      const { status, message: messages } = yield call(addArea, payload);
      if (status === 'ok') {
        message.success(messages);
        yield put(Action('getAreas'));
      } else {
        message.error(messages);
      }
    },
    *deleteArea({ payload }, { call, put }) {
      const { status, message: messages } = yield call(deleteArea, payload.area_id);
      if (status === 'ok') {
        message.success(messages);
        yield put(Action('getAreas'));
      } else {
        message.error(messages);
      }
    }
  },
};
