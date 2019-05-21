import { Action, formatDatetime } from '../../../../utils/utils';
import { getFaultComplaintList } from '../../../../services/complaint';

export default {
  name: 'faultcomplaint',
  state: {
    queryForm: {
      time: { value: [null, null ] }
    },
    complaintList: [],
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *submit(_, { call, put, select }) {
      const { queryForm: { time: { value } } } = yield select(state => state.faultcomplaint);
      const [start_time, end_time] = value;
      let params = {};
      if (start_time) {
        params = {
          start_time: formatDatetime(start_time, 'YYYY-MM-DD'),
          end_time: formatDatetime(end_time, 'YYYY-MM-DD')
        };
      } else {
        params = {
          start_time: '',
          end_time: ''
        };
      }
      const { data } = yield call(getFaultComplaintList, params);
      const complaintList = data.map((item, index) => ({ ...item, ln: index + 1 }));
      yield put(Action('save', {
        complaintList
      }));
    }
  },
};
