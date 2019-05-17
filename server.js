const { Nuxt, Builder } = require('nuxt')
const app = require('express')()
let nuxtconfig = require('./nuxt.config.js')

// 传入配置初始化 Nuxt.js 实例：
const nuxt = new Nuxt(nuxtconfig)
app.use(nuxt.render)//这里是添加nuxt渲染层服务的中间件app.listen(3000)

// 生产模式不需要 build
if (nuxtconfig.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}


app.listen(1234)
// console.log('Server is listening on http://10.150.72.66:1234')