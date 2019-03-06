<template>
 <div>
  <div>
   <span>part1: 倒计时</span>
   <div v-if="countcontinue" class="payment-left-time">
    剩余时间：<span class="left-time">{{countDown.h}}:{{countDown.m}}:{{countDown.s}} </span>
   </div>
   <div else>倒计时结束</div>
  </div>
 </div>
</template>

<script>
 export default {
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