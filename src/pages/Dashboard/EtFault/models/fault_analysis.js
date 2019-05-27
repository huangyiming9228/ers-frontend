import { Action } from '@/utils/utils';
import { getEquipmentClass } from '@/services/em';
import { getEtFaultResult } from '@/services/analysis';

export default {
  name: 'fault_analysis',
  state: {
    queryForm: {
      time: { value: null },
      type: { value: null },
    },
    equipmentClassList: [],
    data: []
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *getEtClass(_, { call, put }) {
      const { data } = yield call(getEquipmentClass);
      yield put(Action('save',  { equipmentClassList: data }));
    },
    *submit(_, { call, put, select }) {
      const { queryForm: { type: { value } } } = yield select(state => state.fault_analysis);
      const { data } = yield call(getEtFaultResult, value);
      yield put(Action('save', { data }));
    }
  },
};
