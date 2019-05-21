import request from '@/utils/request';
import { stringify } from 'qs';

export async function getEtCheckoutList(params) {
  return request(`/server/api/et_manage/getEtCheckoutList?${stringify(params)}`);
}

export async function getUser() {

}
