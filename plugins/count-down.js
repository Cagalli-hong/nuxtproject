/*
倒计时
 *@method this.$count.doCountDown
 *@param{string} starttime, endtime '2019-02-01 07:00:00'
 *@return {object} {'result': false,'countcount': {d:'',h:'',m:'',s:''}}
*/
import Util from '~/plugins/util.js'
import Common from '~/plugins/common.js'
import Vue from 'vue'

const count = {
  doCountDown: (serverTime, deadline, callbackFunc) => {
    let countcount = {
      d: '00', h: '00', m: '00', s: '00'
    }
    // let t = this
    const newServerTime = (Util.Date.strToDate(serverTime).getTime()) + Common.serverTimeLoss() // 多加1秒作为传输损耗
    const difference = (new Date().getTime()) - newServerTime
    let timer = null
    // 倒计时方法
    function countDown(difference, deadline) {
      const a = (Util.Date.strToDate(deadline)).getTime() // 截止时间
      const b = (new Date().getTime()) - difference // 这是获取当前时间，是一个不固定的数值
      let [d, s, h, m] = [0, 0, 0, 0] // 定义变量
      d = Math.floor((a - b) / 1000 / 60 / 60 / 24) // 获取剩余天数
      h = Math.floor((a - b) / 1000 / 60 / 60 % 24) // 获取剩余小时
      m = Math.floor((a - b) / 1000 / 60 % 60) // 获取剩余分钟
      s = Math.floor((a - b) / 1000 % 60) // 获取剩余秒数

      // 中间这块区域是用来判断，当前时间数值小于10的时候给他前面加个0，这里可以根据具体情况可加可不加，以下同理
      if (d < 10) {
        d = '0' + d
      } else if (d < 0) {
        d = 0
      }
      if (h < 10) {
        h = '0' + h
      } else if (h < 0) {
        h = 0
      }
      if (m < 10) {
        m = '0' + m
      } else if (m < 0) {
        m = 0
      }
      if (s < 10) {
        s = '0' + s
      } else if (s < 0) {
        s = 0
      }

      countcount = {
        d: d === 0 ? '00' : d,
        h: h === 0 ? '00' : h,
        m: m === 0 ? '00' : m,
        s: s === 0 ? '00' : s
      }
      callbackFunc({
        'result': true,
        'countcount': countcount
      })
      // console.log('countDown' + t.countDown.d + '' + t.countDown.h + '' + t.countDown.m + '' + t.countDown.s + '' + a + '' + b)
      if (a <= b) { // 当我们的时间到期的时候，清除计时器，然后把当前标签的内容设置为0；
        clearTimeout(timer)
        countcount = {
          d: '00',
          h: '00',
          m: '00',
          s: '00'
        }
        callbackFunc({
          'result': false,
          'countcount': countcount
        })
        timer = null
      } else {
        timer = setTimeout(() => {
          countDown(difference, deadline)
        }, 1000)
      }
    }
    countDown(difference, deadline) // 启动倒计时
    return countcount
  }
}
Vue.prototype.$count = count
