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
