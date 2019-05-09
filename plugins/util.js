/**
 * Created by wuxuanhua on 2017/9/12.
 */
'use strict'
import Vue from 'vue'
import _ from 'lodash'

const Util = (function () {
  const trim = (str) => { // 删除左右两端的空格
    return str.replace(/(^\s*)|(\s*$)/g, '')
  }

  let util = {}

  // IE9 IE10 IE11
  util.isIE = () => { // ie9-ie10
    let flag = false

    // IE10及以下
    if (navigator.appName === 'Microsoft Internet Explorer') {
      if (window.navigator.userAgent.indexOf('MSIE') >= 1) {
        flag = true
      }
    }

    // IE11， IE6-8
    if (!!window.ActiveXObject || 'ActiveXObject' in window) {
      flag = true
    }

    return flag
  }

  // IE9
  util.isIE9 = () => {
    let flag = false

    if (navigator.appName === 'Microsoft Internet Explorer') {
      let appVersion = navigator.appVersion.split(';')[1].replace(/[ ]/g, '')
      if (appVersion === 'MSIE9.0') {
        flag = true
      }
    }

    return flag
  }

  // IE9 IE10
  util.isIE9_10 = () => {
    let flag = false

    if (navigator.appName === 'Microsoft Internet Explorer') {
      let appVersion = navigator.appVersion.split(';')[1].replace(/[ ]/g, '')
      if (appVersion === 'MSIE9.0' || appVersion === 'MSIE10.0') {
        flag = true
      }
    }

    return flag
  }

  // IE11
  util.isIE11 = () => {
    let flag = false
    // ie && !(ie9 | ie10)
    if ((!!window.ActiveXObject || 'ActiveXObject' in window) && !(window.navigator.userAgent.indexOf('MSIE') >= 1)) {
      flag = true
    }
    return flag
  }

  util.Params = {
    query: function (key) { // 里面包含 this ，不能使用箭头函数
      let sHref = window.location.href
      return trim(decodeURIComponent(this.GetArgsFromHref(sHref, key)))
    },

    // 查询url,获取key-value
    queryUrl: function (sHref, key) {
      return trim(decodeURIComponent(this.GetArgsFromHref(sHref, key)))
    },

    /**
     * 函数功能：从href获得参数
     * sHref: http://www.artfh.com/arg.htm?arg1=d&arg2=re
     * sArgName:arg1, arg2
     * return: the value of arg. d, re
     */
    GetArgsFromHref: (sHref, sArgName) => {
      let args = sHref.split('?')
      let retval = ''
      if (args[0] === sHref) { /* 参数为空 */
        return retval
        /* 无需做任何处理 */
      }
      let str = args[1]
      args = str.split('&')
      for (let i = 0; i < args.length; i++) {
        str = args[i]
        let arg = str.split('=')
        if (arg.length <= 1) continue
        if (arg[0] === sArgName) {
          retval = arg[1]
        }
      }
      return retval
    }
  }

  util.Type = { // 安全类型检测
    isArray: (value) => { // 检测数组
      return Object.prototype.toString.call(value) === '[object Array]'
    },
    isFunction: (value) => { // 检测方法
      return Object.prototype.toString.call(value) === '[object Function]'
    },
    isString: (value) => { // 检测数组
      return Object.prototype.toString.call(value) === '[object String]'
    },
    isNumber: (value) => { // 检测数字
      return Object.prototype.toString.call(value) === '[object Number]'
    }
  }

  util.View = (function () {
    let [pageWidth, pageHeight] = [window.innerWidth, window.innerHeight]
    if (Object.prototype.toString.call(pageWidth) === '[object Number]') {
      if (document.compatMode === 'CSS1Compat') { // 检查是否属于标准模式
        pageWidth = document.documentElement.clientWidth
        pageHeight = document.documentElement.clientHeight
      } else {
        pageWidth = document.body.clientWidth
        pageHeight = document.body.clientHeight
      }
    }
    return {
      width: pageWidth,
      height: pageHeight
    }
  })()

  util.Date = {
    // 获取当前时间
    getFormatDate: function (date, type) {
      if (typeof (date) === 'string') {
        date = (date === '') ? new Date() : (new Date(String(date).replace(/-/g, '/')))
      } else if (!isNaN(date)) {
        date = this.timesToDate(date)
      }
      // eslint-disable-next-line no-extend-native
      Date.prototype.Format = function (fmt) {
        let o = {
          'M+': this.getMonth() + 1, // 月份
          'd+': this.getDate(), // 日
          'h+': this.getHours(), // 小时
          'm+': this.getMinutes(), // 分
          's+': this.getSeconds(), // 秒
          'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
          'S': this.getMilliseconds() // 毫秒
        }
        if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        for (let k in o) {
          if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
          }
        }
        return fmt
      }

      if (type === 'datetime') {
        return date.Format('yyyy-MM-dd hh:mm:ss')
      } else if (type === 'day') {
        return date.Format('yyyy-MM-dd')
      } else if (type === 'month') {
        return date.Format('yyyy-MM')
      } else if (type === 'time') {
        return date.Format('hh:mm')
      } else if (type === 'day-time') {
        return date.Format('yyyy-MM-dd') + ' ' + date.Format('hh:mm')
      }
    },
    strToDate: (str) => { // str yyyy-MM-dd HH:mm:ss
      return (new Date(String(str).replace(/-/g, '/')))
    },
    timesToDate: (times) => {
      return new Date(times)
    },
    getTimes: (str) => { // str yyyy-MM-dd HH:mm:ss
      return (new Date(String(str).replace(/-/g, '/'))).getTime()
    }
  }

  util.Str = {
    round: (digit, length) => { // 四舍五入截取一个小数
      length = length ? parseInt(length) : 0
      if (length <= 0) return Math.round(digit)
      digit = Math.round(digit * Math.pow(10, length)) / Math.pow(10, length)
      return digit
    },
    trim: (str = '') => {
      return trim(str)
    },
    /**
     * 验证电话号码 （包括手机号）
     */
    isPhoneNum: (str) => {
      if (!str) {
        return false
      }
      // /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/ //old
      // "^((13[0-9])|(17[0-9]|(15[^4,\D])|(18[0-9])|(166)|(198)|(199)|(14[57]))\d{8}$" 手机号码
      // eslint-disable-next-line no-useless-escape
      return str.match(/^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/) !== null || str.match(/^1\d{10}$/) !== null
      // return (/^((13[0-9])|(17[0-9])|(15[^4,\D])|(18[0-9])|(166)|(198)|(199)|(14[57]))\d{8}$/.test(str));
    },
    /**
     * 手机号码
     * 移动号码段:139、138、137、136、135、134、150、151、152、157、158、159、182、183、187、188、147
     * 联通号码段:130、131、132、136、185、186、145
     * 电信号码段:133、153、180、189
     */
    isMobilePhoneNum: (str) => {
      if (!str) {
        return false
      }
      // /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/ //old
      // "^((13[0-9])|(17[0-9]|(15[^4,\D])|(18[0-9])|(166)|(198)|(199)|(14[57]))\d{8}$" 手机号码
      // return str.match(/^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/) !== null || str.match(/^1\d{10}$/) !== null;
      return (/^((13[0-9])|(17[0-9])|(15[^4,\D])|(18[0-9])|(166)|(198)|(199)|(14[57]))\d{8}$/.test(str))
    },
    isEmail: (str) => {
      if (!str) {
        return false
      }
      // eslint-disable-next-line no-useless-escape
      return str.match(/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g) !== null
    },
    isUserID: (str) => {
      console.log('str:>', str)
      if (!str) {
        return false
      }
      return (/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str))
      // return str.match(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/) !== null
    },
    // 18位身份证正则
    isNewUserID: (str) => {
      console.log('str:>', str)
      if (!str) {
        return false
      }
      return (/(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str))
    },
    // 判断输入的字符是否为:a-z,A-Z,0-9
    isString: (str) => {
      if (!str) {
        return false
      }
      let regExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/
      str = str.trim()
      return (str.length !== 0) ? regExp.test(str) : false
    },
    // 字母和数字组合
    isStringNum: (str) => {
      if (!str) {
        return false
      }
      str = str.trim()
      return (str.length !== 0) ? (/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/).test(str) : false
    },
    isNum: (str) => {
      if (!str) {
        return false
      }
      return str.replace(/\d+/, '') === ''
    },
    // 车牌号 兼容8位新能源
    iscarnum: (str) => {
      if (!str) {
        return false
      }
      let creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/
      let xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/
      if (str.length === 7) {
        return creg.test(str)
      } else if (str.length === 8) {
        return xreg.test(str)
      }
      // return /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/.test(str)
    },
    jsonToStr: (json) => {
      return encodeURI(JSON.stringify(json))
    },
    strToJson: (str) => {
      if (str === null || str === '' || str === undefined) {
        return null
      }
      str = decodeURI(str)
      return JSON.parse(str)
    },
    objecttolink: (object) => {
      let params = '?'
      _.each(object, (item, index) => {
        if (params !== '?') {
          params = params + '&'
        }
        params = params + index + '=' + item
      })
      return params
    },
    // 隐藏部分手机号
    hidePhone: (phoneNum) => {
      phoneNum = phoneNum.toString().replace(/\s*/g, '')
      return phoneNum === '' ? '' : phoneNum.replace(/(\d{3})\d{1,5}(\d{3})/g, '$1*****$2')
    },
    // 隐藏部分名字
    hideUserName: (str) => {
      str = (str + '').replace(/\s*/g, '')
      let len = str.length
      if (len === 1) { // 1位
        return str + '*'
      } else if (str.length === 2) { // 2位
        return str.substring(0, 1) + '*'
      } else { // 3位及以上
        let xing = ''
        for (let i = 0; i < len - 2; i++) {
          xing += '*'
        }
        return str.substring(0, 1) + xing + str.substring(str.length - 1)
      }
    },
    // 隐藏身份证
    hiddenIdCard: (str, frontLen, endLen) => {
      let len = str.length - frontLen - endLen
      let xing = ''
      for (let i = 0; i < len; i++) {
        xing += '*'
      }
      return str.substring(0, frontLen) + xing + str.substring(str.length - endLen)
    },
    // 过滤html标签
    delHtmlTag (str) {
      return str.replace(/<[^>]+>/g, '') // 去掉所有的html标记
    }
  }

  util.win = {
    goTop: () => { // 回到页面顶部
      // eslint-disable-next-line no-undef
      $('html,body').animate({
        scrollTop: 0
      }, 700)
    },
    getScrollTop: function (id) { // 取窗口滚动条高度
      return document.getElementById(id).scrollTop
    },
    getClientHeight: function (id) { // 取窗口可视范围的高度
      return document.getElementById(id).clientHeight
    },
    getScrollHeight: function (id) { // 取文档内容实际高度
      return document.getElementById(id).scrollHeight
    },
    /**
     * 监听窗口滚动
     * @param callback
     */
    monitorWinScroll: function (callback) {
      if (document.addEventListener) {
        document.addEventListener('scroll', () => {
          if (callback) {
            // eslint-disable-next-line standard/no-callback-literal
            callback(true)
          }
        }, false)
      } else {
        // eslint-disable-next-line no-undef
        $(window).scroll(() => {
          if (callback) {
            // eslint-disable-next-line standard/no-callback-literal
            callback(true)
          }
        })
      }
    }
  }

  // 使用中间件代理设置window.name进行跨域
  // crossProxyUrl: 'http://192.168.22.19:8081/', // 用来跨域传递信息（中间代理页，可以是个空页面[本工程页面]）
  // crossTargetUrl: 'http://127.0.0.1:8080' // 跨域目标页（要从该页获取登录信息）
  util.proxy = (url, callback) => {
    const Server = process.env.server

    // 获取数据以后销毁这个iframe，释放内存；这也保证了安全（不被其他域frame js访问）
    function destoryFrame () {
      iframe.contentWindow.document.write('')
      iframe.contentWindow.close()
      document.body.removeChild(iframe)
    }

    let state = 0
    let iframe = document.createElement('iframe')

    // 加载跨域页面
    iframe.src = url

    // onload事件会触发2次，第1次加载跨域页，并留存数据于window.name
    iframe.onload = () => {
      if (state === 1) {
        // 第2次onload(同域proxy页)成功后，读取同域window.name中数据
        callback(iframe.contentWindow.name)
        destoryFrame()
      } else if (state === 0) {
        // 第1次onload(跨域页)成功后，切换到同域代理页面
        // 'http://192.168.22.19:8081/'
        // console.log(Server.crossProxyUrl);
        iframe.contentWindow.location = Server.crossProxyUrl// 使用当前页也可以
        state = 1
      }
    }

    document.body.appendChild(iframe)
  }

  return util
})()

Vue.prototype.$util = Util // VUE全局变量

export default Util
