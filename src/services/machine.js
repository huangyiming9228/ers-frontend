import request from '@/utils/request';
import { stringify } from 'qs';

export async function getAreas() {
  return request('/server/api/polling/getMachineAreas');
}

export async function getAreaUsers() {
  return request('/server/api/base/getAreaUsers')
}

export async function updateAreaUser(params) {
  return request('/server/api/polling/updateMachineAreaUser', {
    method: 'POST',
    data: params
  })
}

export async function addArea(params) {
  return request('/server/api/polling/addMachineArea', {
    method: 'POST',
    data: params
  })
}

export async function deleteArea(params) {
  return request(`/server/api/polling/deleteMachineArea?area_id=${params}`)
}

export async function getRooms(params) {
  return request(`/server/api/polling/getMachineRooms?id=${params}`);
}

export async function getRoomUsers() {
  return request('/server/api/base/getRoomUsers')
}

export async function updateRoomUser(params) {
  return request('/server/api/polling/updateMachineRoomUser', {
    method: 'POST',
    data: params
  })
}

export async function addRoom(params) {
  return request('/server/api/polling/addMachineRoom', {
    method: 'POST',
    data: params
  })
}

export async function deleteRoom(params) {
  return request(`/server/api/polling/deleteMachineRoom?room_id=${params}`)
}

export async function getMachineCheckList(params) {
  return request(`/server/api/polling/getMachineCheckList?${stringify(params)}`);
}
