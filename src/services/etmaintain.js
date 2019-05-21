import request from '@/utils/request';
import { stringify } from 'qs';

export async function getAreaList() {
  return request('/server/api/et_manage/getAllAreas');
}

export async function getRoomList(params) {
  return request(`/server/api/et_manage/getAllRooms?id=${params}`);
}

export async function getFaultHandingList(params) {
  return request(`/server/api/et_manage/getFaultHandingList?${stringify(params)}`);
}

export async function getTechHandingList(params) {
  return request(`/server/api/et_manage/getTechHandingList?${stringify(params)}`);
}
