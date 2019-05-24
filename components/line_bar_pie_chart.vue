<template>
  <div>
    <div :id="id" class="chartstyle"></div>
  </div>
</template>

<script>
require('echarts/lib/component/dataset')
require('echarts/lib/chart/line')
require('echarts/lib/chart/bar')
require('echarts/lib/chart/pie')
// require('echarts/lib/chart/scatter')
// require('echarts/lib/chart/radar')
// require('echarts/lib/chart/map')
// require('echarts/lib/chart/tree')
// require('echarts/lib/chart/treemap')
// require('echarts/lib/chart/graph')
// require('echarts/lib/chart/gauge')
// require('echarts/lib/chart/funnel')
// require('echarts/lib/chart/parallel')
// require('echarts/lib/chart/sankey')
// require('echarts/lib/chart/boxplot')
// require('echarts/lib/chart/candlestick')
// require('echarts/lib/chart/effectScatter')
// require('echarts/lib/chart/lines')
// require('echarts/lib/chart/heatmap')
// require('echarts/lib/chart/pictorialBar')
// require('echarts/lib/chart/themeRiver')
// require('echarts/lib/chart/sunburst')
// require('echarts/lib/chart/custom')
// require('echarts/lib/component/graphic')
require('echarts/lib/component/grid')
require('echarts/lib/component/legendScroll')
require('echarts/lib/component/tooltip')
// require('echarts/lib/component/axisPointer')
// require('echarts/lib/component/polar')
// require('echarts/lib/component/geo')
// require('echarts/lib/component/parallel')
// require('echarts/lib/component/singleAxis')
// require('echarts/lib/component/brush')
// require('echarts/lib/component/calendar')
require('echarts/lib/component/title')
// require('echarts/lib/component/dataZoom')
// require('echarts/lib/component/visualMap')
// require('echarts/lib/component/markPoint')
// require('echarts/lib/component/markLine')
// require('echarts/lib/component/markArea')
// require('echarts/lib/component/timeline')
// require('echarts/lib/component/toolbox')
// require('zrender/lib/vml/vml')
// require('zrender/lib/svg/svg')

export default {
  props: {
    id: {
      type: String,
      default() {
        return 'main'
      }
    },
    opts: {
      type: Object,
      default: function() {
        return {
          // devicePixelRatio: , // 设备像素比
          renderer: 'svg', // 'canvas' 或者 'svg'
          width: 500,
          height: 500
        }
      }
    },
    theme: {
      type: String,
      default() {
        return 'light' // 'light','dark','normal'
      }
    }
  },
  data() {
    return {
      myChart: null
    }
  },
  components: {

  },
  mounted() {
    this.myChart = this.$echarts.init(document.getElementById(this.id), this.theme, this.opts)
    this.myChart.showLoading()
  },
  methods: {
    setoption(option) {
      // 绘制图表
      this.myChart.hideLoading()
      this.myChart.setOption(option)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
</style>