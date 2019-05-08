import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}

export async function updateUserInfo(params) {
  return request('/api/updateUserInfo', {
    method: 'POST',
    data: params,
  });
}

export async function updatePassword(params) {
  return request('/api/updatePassword', {
    method: 'POST',
    data: params,
  });
}
