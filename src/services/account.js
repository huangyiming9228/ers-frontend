import request from '@/utils/request';

export async function queryUsers(params) {
  return request(`/server/api/base/queryUsers?user_name=${params.user_name}&user_no=${params.user_no}`);
}

export async function addUser(params) {
  return request('/server/api/base/addUser', {
    method: 'POST',
    data: params
  })
}

export async function deleteUser(params) {
  return request(`/server/api/base/deleteUser?user_no=${params.user_no}`)
}

export async function updateUser(params) {
  return request('/server/api/base/updateUser', {
    method: 'POST',
    data: params
  })
}
