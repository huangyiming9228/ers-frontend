import request from '@/utils/request';
import { stringify } from 'qs';

export async function getAreas() {
  return request('/server/api/polling/getUpsAreas');
}

export async function getAreaUsers() {
  return request('/server/api/base/getAreaUsers')
}

export async function updateAreaUser(params) {
  return request('/server/api/polling/updateUpsAreaUser', {
    method: 'POST',
    data: params
  })
}

export async function addArea(params) {
  return request('/server/api/polling/addUpsArea', {
    method: 'POST',
    data: params
  })
}

export async function deleteArea(params) {
  return request(`/server/api/polling/deleteUpsArea?area_id=${params}`)
}

export async function getRooms(params) {
  return request(`/server/api/polling/getUpsRooms?id=${params}`);
}

export async function getRoomUsers() {
  return request('/server/api/base/getRoomUsers')
}

export async function updateRoomUser(params) {
  return request('/server/api/polling/updateUpsRoomUser', {
    method: 'POST',
    data: params
  })
}

export async function addRoom(params) {
  return request('/server/api/polling/addUpsRoom', {
    method: 'POST',
    data: params
  })
}

export async function deleteRoom(params) {
  return request(`/server/api/polling/deleteUpsRoom?room_id=${params}`)
}

export async function getUpsCheckList(params) {
  return request(`/server/api/polling/getUpsCheckList?${stringify(params)}`);
}
