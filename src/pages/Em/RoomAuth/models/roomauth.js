import { message } from 'antd';
import { Action } from '../../../../utils/utils';
import {
  getAreas,
  getRooms,
  getUsers,
  updateRoomUser,
} from '@/services/em';

export default {
  name: 'roomauth',
  state: {
    queryForm: {
      area: null,
    },
    areaList: [],
    roomList: [],
    selectedRowKeys: [],
    userList: [],
    authForm: {
      user_no: { value: null }
    }
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *getAreas({ payload }, { call, put }) {
      const { data: areaList } = yield call(getAreas, payload);
      yield put(
        Action('save', {
          areaList,
        })
      );
    },
    *getRooms(_, { call, put, select }) {
      const { queryForm: { area: { value } }, areaList } = yield select(state => state.roomauth);
      const { data } = yield call(getRooms, value);
      const areaName = areaList.filter(item => item.id == value)[0].area_name;
      const roomList = data.map((item, index) => ({ ...item, ln: index + 1, area_name: areaName }));
      yield put(
        Action('save', {
          roomList,
          selectedRowKeys: []
        })
      );
    },
    *getUsers(_, { call, put }) {
      const { data: userList } = yield call(getUsers);
      yield put(Action('save', {
        userList
      }))
    },
    *updateRoomUser(_, { call, put, select }) {
      const { selectedRowKeys, authForm: { user_no: { value } } } = yield select(state => state.roomauth);
      const { status } = yield call(updateRoomUser, { keys: selectedRowKeys, user_no: value });
      if (status === 'ok') {
        message.success('更新成功！');
        yield put(Action('getRooms'));
        yield put(Action('save', {
          authForm: {
            user_no: { value: null }
          }
        }));
      } else {
        message.error('更新失败！');
      }
    }
  },
};
