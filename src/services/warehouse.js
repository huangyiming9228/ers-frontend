import request from '@/utils/request';
import { stringify } from 'qs';

export async function getAreas() {
  return request('/server/api/polling/getWarehouseAreas');
}

export async function getAreaUsers() {
  return request('/server/api/base/getAreaUsers')
}

export async function updateAreaUser(params) {
  return request('/server/api/polling/updateWarehouseAreaUser', {
    method: 'POST',
    data: params
  })
}

export async function addArea(params) {
  return request('/server/api/polling/addWarehouseArea', {
    method: 'POST',
    data: params
  })
}

export async function deleteArea(params) {
  return request(`/server/api/polling/deleteWarehouseArea?area_id=${params}`)
}

export async function getRooms(params) {
  return request(`/server/api/polling/getWarehouseRooms?id=${params}`);
}

export async function getRoomUsers() {
  return request('/server/api/base/getRoomUsers')
}

export async function updateRoomUser(params) {
  return request('/server/api/polling/updateWarehouseRoomUser', {
    method: 'POST',
    data: params
  })
}

export async function addRoom(params) {
  return request('/server/api/polling/addWarehouseRoom', {
    method: 'POST',
    data: params
  })
}

export async function deleteRoom(params) {
  return request(`/server/api/polling/deleteWarehouseRoom?room_id=${params}`)
}

export async function getWarehouseCheckList(params) {
  return request(`/server/api/polling/getWarehouseCheckList?${stringify(params)}`);
}
