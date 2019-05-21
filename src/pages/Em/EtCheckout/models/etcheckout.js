import { Action, formatDatetime } from '../../../../utils/utils';
import { getEtCheckoutList } from '../../../../services/etcheckout';

export default {
  name: 'etcheckout',
  state: {
    queryForm: {
      time: { value: [null, null ] }
    },
    checkoutList: [],
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *submit(_, { call, put, select }) {
      const { queryForm: { time: { value } } } = yield select(state => state.etcheckout);
      const [start_time, end_time] = value;
      const params = {
        start_time: formatDatetime(start_time, 'YYYY-MM-DD'),
        end_time: formatDatetime(end_time, 'YYYY-MM-DD')
      };
      const { data } = yield call(getEtCheckoutList, params);
      const checkoutList = data.map((item, index) => ({ ...item, ln: index + 1 }));
      yield put(Action('save', {
        checkoutList
      }));
    }
  },
};
