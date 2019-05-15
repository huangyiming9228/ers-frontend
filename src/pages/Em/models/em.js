import { message } from 'antd';
import { Action } from '../../../utils/utils';
import {
  getAreas,
  getRooms,
  getEquipments,
  getEquipmentClass,
  getEquipmentInfo,
  updateEquipmentInfo,
  addEquipment,
  deleteEquipment,
} from '@/services/em';

const defaultAddForm = {
  class_id: { value: null },
  et_name: { value: null },
  et_no: { value: null },
  room_id: { value: null },
  et_status: { value: 1 },
}

export default {
  name: 'em',
  state: {
    areaList: [],
    roomList: [],
    equipmentList: [],
    equipmentClassList: [],
    editingEquipment: {
      id: { value: null },
      class_id: { value: null },
      et_name: { value: null },
      et_no: { value: null },
      et_status: { value: null },
      room_id: { value: null },
      area_id: { value: null },
    },
    queryForm: {
      area: null,
      room: null,
    },
    addForm: defaultAddForm
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
    *getRooms({ payload }, { call, put }) {
      const { data: roomList } = yield call(getRooms, payload.value);
      yield put(
        Action('save', {
          roomList,
        })
      );
    },
    *getEquipments(_, { call, put, select }) {
      const {
        queryForm: {
          room: { value: room },
        },
      } = yield select(state => state.em);
      const { data } = yield call(getEquipments, room);
      const equipmentList = data.map((item, index) => ({ ...item, ln: index + 1 }));
      yield put(
        Action('save', {
          equipmentList,
        })
      );
    },
    *getEquipmentClass(_, { call, put }) {
      const { data } = yield call(getEquipmentClass);
      const equipmentClassList = data.map(item => ({
        text: item.equipment_name,
        value: item.equipment_name,
        id: item.id
      }));
      yield put(
        Action('save', {
          equipmentClassList,
        })
      );
    },
    *getEquipmentInfo({ payload }, { call, put }) {
      const { data } = yield call(getEquipmentInfo, payload.id);
      const editingEquipment = {
        id: { value: data.id },
        class_id: { value: data.class_id },
        et_name: { value: data.et_name },
        et_no: { value: data.et_no },
        et_status: { value: data.et_status },
        room_id: { value: data.room_id },
        area_id: { value: data.area_id },
      };
      yield put(Action('getRooms', { value: data.area_id }));
      yield put(
        Action('save', {
          editingEquipment,
        })
      );
    },
    *updateEquipmentInfo(_, { call, put, select }) {
      const { editingEquipment } = yield select(state => state.em);
      const params = {
        id: editingEquipment.id.value,
        class_id: editingEquipment.class_id.value,
        et_name: editingEquipment.et_name.value,
        et_no: editingEquipment.et_no.value,
        et_status: editingEquipment.et_status.value,
        room_id: editingEquipment.room_id.value,
        area_id: editingEquipment.area_id.value,
      };
      const { status } = yield call(updateEquipmentInfo, params);
      if (status === 'ok') {
        yield put(Action('getEquipments'));
        message.success('更新成功！');
      } else {
        message.error('更新失败！');
      }
    },
    *addEquipment(_, { call, put, select }) {
      const {
        addForm: {
          class_id: { value: class_id },
          et_name: { value: et_name },
          et_no: { value: et_no },
          room_id: { value: room_id },
          et_status: { value: et_status },
        },

      } = yield select(state => state.em);
      const { status, message: messages } = yield call(addEquipment, {
        class_id,
        et_name,
        et_no,
        room_id,
        et_status
      });
      if (status === 'ok') {
        yield put(Action('save', {
          addForm: defaultAddForm
        }));
        message.success(messages);
      } else {
        message.error(messages);
      }
    },
    *deleteEquipment({ payload }, { call, put }) {
      const { status, message: messages } = yield call(deleteEquipment, payload.et_id);
      if (status === 'ok') {
        yield put(Action('getEquipments'));
        message.success(messages);
      } else {
        message.error(messages);
      }
    }
  },
};
