import { Action } from '../../../utils/utils';
import { getAreas, getRooms } from '@/services/em'

export default {
  name: 'em',
  state: {
    areaList: [],
    roomList: [],
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  },
  effects: {
    *getAreas({ payload }, { call, put }) {
      const { data: areaList } = yield call(getAreas, payload);
      yield put(Action('save', {
        areaList
      }))
    },
    *getRooms({ payload }, { call, put }) {
      const { data: roomList } = yield call(getRooms, payload.value);
      yield put(Action('save', {
        roomList
      }))
    }
  }
}
