import request from '@/utils/request';
import { stringify } from 'qs';

export async function getFoodComplaintList(params) {
  return request(`/server/api/et_manage/getFoodComplaintList?${stringify(params)}`);
}

export async function getUser() {}
