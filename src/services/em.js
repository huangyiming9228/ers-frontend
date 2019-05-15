import request from '@/utils/request';

export async function getAreas(params) {
  return request('/server/api/base/getAreas', {
    data: params,
    method: 'GET',
  });
}

export async function getRooms(params) {
  return request(`/server/api/base/getRooms?id=${params}`);
}

export async function getEquipments(params) {
  return request(`/server/api/base/getEquipments?room=${params}`);
}

export async function getEquipmentClass() {
  return request('/server/api/base/getEquipmentClass');
}

export async function getEquipmentInfo(params) {
  return request(`/server/api/base/getEquipmentInfo?et_id=${params}`);
}

export async function updateEquipmentInfo(params) {
  return request('/server/api/base/updateEquipmentInfo', {
    data: params,
    method: 'POST',
  });
}

export async function getUsers() {
  return request('/server/api/base/getUsers')
}

export async function getRoomUsers() {
  return request('/server/api/base/getRoomUsers')
}

export async function getAreaUsers() {
  return request('/server/api/base/getAreaUsers')
}

export async function updateRoomUser(params) {
  return request('/server/api/base/updateRoomUser', {
    method: 'POST',
    data: params
  })
}

export async function updateAreaUser(params) {
  return request('/server/api/base/updateAreaUser', {
    method: 'POST',
    data: params
  })
}

export async function addArea(params) {
  return request('/server/api/base/addArea', {
    method: 'POST',
    data: params
  })
}

export async function deleteArea(params) {
  return request(`/server/api/base/deleteArea?area_id=${params}`)
}

export async function addRoom(params) {
  return request('/server/api/base/addRoom', {
    method: 'POST',
    data: params
  })
}

export async function deleteRoom(params) {
  return request(`/server/api/base/deleteRoom?room_id=${params}`)
}

export async function addEquipment(params) {
  return request('/server/api/base/addEquipment', {
    method: 'POST',
    data: params
  })
}

export async function deleteEquipment(params) {
  return request(`/server/api/base/deleteEquipment?et_id=${params}`)
}
