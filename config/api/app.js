import request from '../utils/request'

export function uploadimg(data) {
  return request({
    url: '/cas-file-app/image/upload',
    method: 'post',
    data
  })
}

export function getserverTime() {
  return request({
    url: '/cas-admin-app/common/serverTime',
    method: 'get'
  })
}
