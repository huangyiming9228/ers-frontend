import request from '@/utils/request';

export async function getEtFaultResult(params) {
  return request(`/api/getEtFaultResult?type=${params}`);
}
