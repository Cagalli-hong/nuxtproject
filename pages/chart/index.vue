<template>
  <div>
    <div id="main" class="main">
      <line-bar-pie-chart
        :id="line_bar.id"
        :opts="line_bar.opts"
        ref="pieEchart">
      </line-bar-pie-chart>
    </div>
  </div>
</template>

<script>
import { getcarnumchart } from '../../config/api/chart'
import lineBarPieChart from '../../components/line_bar_pie_chart'

export default {
  data() {
    return {
      line_bar: {
        id: 'linebarchart',
        opts: {
          // devicePixelRatio: , // 设备像素比
          renderer: 'svg', // 'canvas' 或者 'svg'
          width: 'auto',
          height: 400
        }
      },
      theme: 'light'
    }
  },
  components: {
    lineBarPieChart
  },
  mounted() {
    this.setdownloadrecordchart()
  },
  methods: {
    setdownloadrecordchart() {
      const t = this
      // 绘制图表
      getcarnumchart().then((data) => {
        const line_bar_form = {
          legend: {
            x: 'center',
            y: 'bottom',
            data: ['蒸发量', '降水量', '平均温度']
          },
          xAxis: [
            {
              type: 'category',
              data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
              axisPointer: {
                type: 'shadow'
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '水量',
              min: 0,
              max: 250,
              interval: 50,
              axisLabel: {
                formatter: '{value} ml'
              }
            }, {
              type: 'value',
              name: '温度',
              min: 0,
              max: 25,
              interval: 5,
              axisLabel: {
                formatter: '{value} °C'
              }
            }
          ],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          series: data.data.series
        }
        t.$refs.pieEchart.setoption(line_bar_form)
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.main{
  width: 400px;
  height: 400px;
}
</style>
