<template>
 <div>
  <div class="partitem">
   <span>part1: 倒计时</span>
   <div v-if="countcontinue" class="payment-left-time">
    剩余时间：<span class="left-time">{{countDown.h}}:{{countDown.m}}:{{countDown.s}} </span>
   </div>
   <div else>倒计时结束</div>
  </div>
  <div class="partitem">
   <span>part2: 穿梭器</span>
   <div>
    <el-transfer v-model="value1" :data="data"></el-transfer>
   </div>
  </div>
 </div>
</template>

<script>
 export default {
  name: 'detail',
  asyncData () {
   const generateData = _ => {
    const data = [];
    for (let i = 1; i <= 15; i++) {
     data.push({
      key: i,
      label: `备选项 ${ i }`,
      disabled: i % 4 === 0
     })
    }
    console.log('data', data)
     return data
   }
     return {
      data: generateData(),
      value1: [1, 4]
    }
  },
  data () {
   return {
    // 倒计时
    countDown: {
     d: '00', h: '00', m: '00', s: '00'
    },
    countcontinue: true // 倒计时继续
     }
    },
    mounted () {
     let t = this

     // 倒计时
     let starttime = '2019-02-01 07:00:00'
     let endtime = '2019-02-01 08:00:00'
     t.$count.doCountDown(starttime, endtime, function (data) {
      if (data.result) {
       t.countDown = data.countcount
      } else {
       t.countcontinue = false
       // t.$emit('getOrderList', 'getOrderList')
      }
     })
    },
    methods: {

    }
 }
</script>

<style lang="scss">
 //noinspection CssUnknownTarget
 @import '~/assets/sass/pages/detail.scss';
</style>