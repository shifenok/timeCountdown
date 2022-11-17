<script setup>
import { nextTick, onMounted, reactive } from "vue";
// import { invoke } from "@tauri-apps/api/tauri";

const counterClass = reactive({
  isShowInput: false,
  inputCounter: '',
  currentCountdownTime: 600,
  isCountdownStop: true,
})

const timerClass = reactive({
  timer: null,
  d: '0',
  h: '00',
  i: '00',
  s: '00',
})
const refreshTime = () => {
  counterClass.currentCountdownTime = counterClass.inputCounter ? +counterClass.inputCounter * 60 : 600
  clearInterval(timerClass.timer)
  nextTick(() => {
    counterClass.isCountdownStop = false
    handleStartCountdown()
  })
}
const handleKeyPress = ({keyCode}) => {
  if (keyCode === 13) {
    if (counterClass.inputCounter) {
      counterClass.currentCountdownTime = +counterClass.inputCounter * 60
      clearInterval(timerClass.timer)
      nextTick(() => {
        counterClass.inputCounter = ''
        handleStartCountdown()
      })
    }
    counterClass.isShowInput = false
  }
  if (keyCode === 27) {
    counterClass.isShowInput = false
  }
}
const handleStopCountdown = () => {
  counterClass.isCountdownStop = !counterClass.isCountdownStop
  counterClass.isCountdownStop && clearInterval(timerClass.timer)
  !counterClass.isCountdownStop && handleStartCountdown()
}
const handleStartCountdown = () => {
  timerClass.timer = setInterval(() => {
    counterClass.currentCountdownTime--
    countDown(counterClass.currentCountdownTime)
  }, 1000)
}
// 倒计时计算
const countDown = (seconds) => {
  let [day, hour, minute, second] = [0, 0, 0, 0];
  if (seconds > 0) {
    day = Math.floor(seconds / (60 * 60 * 24)) || 0;
    hour = Math.floor(seconds / (60 * 60)) - day * 24 || 0;
    minute = Math.floor(seconds / 60) - hour * 60 - day * 24 * 60 || 0;
    second = Math.floor(seconds) - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60;
  }
  timerClass.d = day
  timerClass.h = `00${hour}`.slice(-2)
  timerClass.i = `00${minute}`.slice(-2)
  timerClass.s = `00${second}`.slice(-2)
}
const handleCustomTime = () => {
  counterClass.isShowInput = true
}
const onBlur = () => {
  counterClass.isShowInput = false
  counterClass.inputCounter = ''
}
const handleCloseWindow = () => {

}
onMounted(() => {
  if(timerClass.timer) clearInterval(timerClass.timer)
})
</script>

<template>
  <div class="container">
    <div class="container-base">
      <div class="btn-wrap" v-if="!counterClass.isShowInput">
        <icon-replay-music theme="outline" size="26" fill="#747bff"  @click="refreshTime" title="重置时间" />
        <icon-pause-one v-if="!counterClass.isCountdownStop" theme="outline" size="26" fill="#269b73" title="暂停时间" @click="handleStopCountdown" />
        <icon-play v-else theme="outline" size="26" fill="#269b73" title="开始时间" @click="handleStopCountdown" />
        <icon-text theme="outline" size="26" fill="#d574ff" title="自定义" @click="handleCustomTime"/>
        <icon-off-screen-one theme="outline" size="25" fill="#269b73" title="" @click="handleCloseWindow"/>
      </div>
      <input v-else id="greet-input" v-model="counterClass.inputCounter" placeholder="时间单位·分" @keypress="handleKeyPress" @blur="onBlur" />
      <div class="count-down" data-tauri-drag-region>
        {{ `${timerClass.i}:${timerClass.s}` }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px outset #747bff;
  border-radius: 8px;
  padding: 6px 0 12px;
  background-color: rgba(0, 0, 0, .25);
  backdrop-filter: invert(80%);
}
.container-base {
  /* width: 200px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}
.logo.vite:hover {
  filter: drop-shadow(0 0 2em #747bff);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #249b73);
}
.btn-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
.btn-wrap .i-icon {
  margin: 0 4px;
}
.btn-wrap .i-icon:hover {
  transform: scale(1.2);
  transition: transform .2s ease-in-out;
}
#greet-input {
  margin-bottom: 20px;
}
.count-down {
  font-size: 50px;
  font-family: 'AaTangYuanTi';
  font-weight: normal;
  font-style: normal;
  color: #ff7474;
  cursor: move;
}
</style>
