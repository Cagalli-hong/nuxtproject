'use strict'

const proxy = process.env.NODE_ENV === 'dev' ? {
  '/cas-admin-app': {   // 后台管理系统接口服务路由-开发环境接口使用
    target: 'http://10.8.75.132:6098', // 转发开发目标地址-开发环境接口使用
    secure: false,
    changeOrigin: true,               // needed for virtual hosted sites
    logLevel: 'debug',
    ws: true
  },
  '/cas-file-app': {   // 文件存储服务路由-开发环境接口使用
    target: 'http://10.8.75.132:6097', // 转发开发目标地址-开发环境接口使用
    secure: false,
    changeOrigin: true,               // needed for virtual hosted sites
    logLevel: 'debug',
    ws: true
  },
  '/base-org-app': {   // 组织管理应用-开发环境接口使用
    target: 'http://10.8.75.132:6198', // 转发开发目标地址-开发环境接口使用
    secure: false,
    changeOrigin: true,               // needed for virtual hosted sites
    logLevel: 'debug',
    ws: true
  }
} : {
  '/api': {   // 统一转发到后台管理系统，文件存储服务，组织管理应用-测试环境和生产环境接口使用
    target: 'http://10.8.75.140:80', // 测试统一转发地址
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
    ws: true
  }
}

module.exports = {
  dev: {
    proxyTable: proxy
  }
}
