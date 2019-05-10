// 本地开发环境：sit 开发环境：dev 生产环境：production  正式生产：prd
const env = process.env.NODE_ENV || 'dev'

const serverUrlMap = {

  // 开发环境（开发服务器）
  dev: {
    cdnUrl: '/_nuxt/',
    baseUrl: 'http://139.159.144.111/',
    picUrl: 'http://139.159.144.111/gmall-test/image/', // 图片服务
    uploadPicUrl: 'http://139.159.144.111/gmall-test/gimage/' // 图片服务器--上传图片
  }
}

module.exports = serverUrlMap[env]
