import { Action, formatDatetime } from '@/utils/utils';
import { getAreas, getRooms, getMachineCheckList } from '@/services/machine';

export default {
  name: 'machine_checklist',
  state: {
    areaList: [],
    roomList: [],
    queryForm: {
      area: { value: null },
      room: { value: null },
      time: { value: [null, null] },
    },
    checkList: [],
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *getAreaList(_, { call, put }) {
      const { data: areaList } = yield call(getAreas);
      yield put(Action('save', { areaList }));
    },
    *getRoomList({ payload }, { call, put }) {
      const { data: roomList } = yield call(getRooms, payload.value);
      yield put(Action('save', { roomList }));
    },
    *submit(_, { call, put, select }) {
      const {
        queryForm: {
          area: { value: area_id },
          room: { value: room_id },
          time: { value: timeRange },
        }
      } = yield select(state => state.machine_checklist);
      let [start_time = '', end_time = ''] = timeRange;
      if (start_time && end_time) {
        start_time = formatDatetime(start_time, 'YYYY-MM-DD');
        end_time = formatDatetime(end_time, 'YYYY-MM-DD');
      }
      const { data } = yield call(getMachineCheckList, {
        area_id,
        room_id,
        start_time,
        end_time,
      });
      const checkList = data.map((item, index) => ({ ...item, ln: index + 1 }));
      yield put(Action('save', { checkList }));
    }
  },
};
