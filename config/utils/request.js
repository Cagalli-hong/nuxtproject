import axios from 'axios'
import { Message } from 'element-ui'

const baseurl = process.env.NODE_ENV === 'dev' ? '' : '/api'
// console.log('request_NODE_ENV', process.env.NODE_ENV)
const service = axios.create({
  baseURL: baseurl,
  timeout: 15000
})

service.interceptors.request.use(config => {
  config.headers['Authorization'] = '6a709fa8-5ea1-4c65-9d45-8e346fd06d4e' // 给所有调用接口在header配置一个Authorization参数
  return config
}, error => {
  Promise.reject(error)
})

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== '0000') {
      let msg = ''
      switch (res.code) {
        case '10000':
          msg = '操作失败'
          break
        case '10001':
          msg = '服务失败'
          break
        case '10002':
          msg = '服务出错'
          break
        case '30001':
          msg = '未登录'
          break
        case '30002':
          msg = '登录失败'
          break
        case '30003':
          msg = '用户名或密码错误'
          break
        case '30004':
          msg = '没有权限'
          break
        case '30005':
          msg = '权限错误'
          break
        default:
          msg = '未知错误'
          break
      }
      Message({
        message: res.msg || msg,
        type: 'error',
        duration: 5 * 1000
      })
      // 后端接口返回错误
      console.log('error: ', res)
      return Promise.reject(res)
    } else {
      return response.data
    }
  },
  error => {
    console.log('error', error)
    // http协议错误
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
