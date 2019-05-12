import { stringify } from 'qs';
import request from '@/utils/request';

export async function getAreas(params) {
  return request('http://localhost/ers/api/base/getAreas', {
    data: params,
    method: 'GET'
  });
}

export async function getRooms(params) {
  return request(`http://localhost/ers/api/base/getRooms?id=${params}`)
}

