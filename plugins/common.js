/**
 * 用户信息保存封装
 */
import Vue from 'vue'
import _ from 'lodash'
import Util from '~/plugins/util'

const Common = {
  // 获取跟路径
  getRootPath: () => {
    return 'https://' + window.location.host
  },

  // 服务器时间传输损耗
  serverTimeLoss: () => {
    return 0 // 1000毫秒
  },

  // 隐藏页面插件
  plugInHide: () => {
    // eslint-disable-next-line no-undef
    let ids = $('body > div')
    if (Object.prototype.toString.call(ids) === '[object Object]') {
      _.each(ids, function (value, key) {
        // console.log('value-id:>', value.id)
        if (value.id !== '' && value.id.indexOf('xunlei_com_thunder_helper') >= 0) {
          // eslint-disable-next-line no-undef
          $(value).hide()
        }
      })
    }
  }
}

Vue.prototype.$common = Common // VUE全局变量
export default Common
