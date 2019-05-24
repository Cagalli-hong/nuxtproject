const pkg = require('./package')
var config = require('./config/index')

module.exports = {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/element-ui', ssr: true }, // element-ui加载
    { src: '~/plugins/util.js', ssr: false }, // 公共工具方法封装管理
    { src: '~/plugins/common.js', ssr: false },
    { src: '~/plugins/echart.js', ssr: false }, // Echart工具
    { src: '~/plugins/count-down.js', ssr: false } // 倒计时工具
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    proxy: true
  },
  proxy: config.dev.proxyTable,

  /*
  ** 环境变量
  */
  env: {
    NODE_ENV: process.env.NODE_ENV
  },

  dev: (process.env.NODE_ENV !== 'production'),

  /*
  ** 设置server
  */
  server: {
    host: "0.0.0.0",
    port: "1234"
  },

  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],

    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        // console.log('ctx.isDev', ctx.isDev, ctx.isClient)
        // Run ESLINT on save
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
          // exclude: [/(node_modules)/, /underscore-simple/, /webrtc/]
        })
      }
    },
    // 自定义 webpack 加载器
    loaders: [
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]'
        }
      }, {
        test: /\.scss$/,
        loader: ['style', 'css', 'sass']
        // loader: 'vue-style-loader!css-loader!sass-loader'
      }
    ]
  },
  router: {
    middleware: 'stats'
  }
}
