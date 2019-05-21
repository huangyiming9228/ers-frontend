import { Action, formatDatetime } from '../../../../utils/utils';
import { getAreaList, getRoomList, getTechHandingList } from '../../../../services/etmaintain';

export default {
  name: 'techhanding',
  state: {
    areaList: [],
    roomList: [],
    queryForm: {
      area: { value: null },
      room: { value: null },
      time: { value: [null, null] },
    },
    techhandingList: [],
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *getAreaList(_, { call, put }) {
      const { data: areaList } = yield call(getAreaList);
      yield put(Action('save', { areaList }));
    },
    *getRoomList({ payload }, { call, put }) {
      const { data: roomList } = yield call(getRoomList, payload.value);
      yield put(Action('save', { roomList }));
    },
    *submit(_, { call, put, select }) {
      const {
        queryForm: {
          area: { value: area_id },
          room: { value: room_id },
          time: { value: timeRange },
        }
      } = yield select(state => state.faulthanding);
      let [start_time = '', end_time = ''] = timeRange;
      if (start_time && end_time) {
        start_time = formatDatetime(start_time, 'YYYY-MM-DD');
        end_time = formatDatetime(end_time, 'YYYY-MM-DD');
      }
      const { data } = yield call(getTechHandingList, {
        area_id,
        room_id,
        start_time,
        end_time,
      });
      const techhandingList = data.map((item, index) => ({ ...item, ln: index + 1 }));
      yield put(Action('save', { techhandingList }));
    }
  },
};
