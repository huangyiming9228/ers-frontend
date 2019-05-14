import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}

export async function getCurrentUser() {
  return request('/server/api/base/getCurrentUser');
}

export async function updateUserInfo(params) {
  return request('/server/api/base/updateUserInfo', {
    method: 'POST',
    data: params,
  });
}

export async function updatePassword(params) {
  return request('/server/api/base/updatePassword', {
    method: 'POST',
    data: params,
  });
}
