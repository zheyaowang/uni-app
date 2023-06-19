<template>
  <view class="audio-card">
    <view class="title">{{ title }}</view>
    <view class="audio">
      <image
        v-if="!isPlay"
        class="play-icon"
        mode="scaleToFill"
        :src="playIcon"
        @click="audioPlay"/>
      <image
        v-if="isPlay"
        class="play-icon"
        mode="scaleToFill"
        :src="pauseIcon"
        @click="audioPause"/>
      <view class="audio-main">
        <slider
          max="100"
          block-size="12"
          class="progress"
          :block-color="sliderColor"
          :activeColor="activeColor"
          :backgroundColor="backgroundColor"
          :value="progress"
          @change="handleChange"
          @changing="handleProgress"/>
        <view class="time">
          <view>{{ dateFormart(currentTime) }}</view>
          <view>{{ dateFormart(duration) }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    audio: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: '语音信息'
    },
    playIcon: {
      type: String,
      default: require('./audio-play.png')
    },
    pauseIcon: {
      type: String,
      default: require('./audio-pause.png')
    },
    sliderColor: {
      type: String,
      default: '#009EFF'
    },
    activeColor: {
      type: String,
      default: '#009EFF'
    },
    backgroundColor: {
      type: String,
      default: '#EFEFEF'
    }
  },
  data () {
    return {
      innerAudioContext: null,
      isPlay: false,
      timer: null,
      currentTime: 0,
      duration: 0,
      progress: 0,
      intervalID: null
    }
  },
  watch: {
    audio: {
      handler(val) {
        this.creatAudio()
      },
      deep: true,
      immediate: true
    }
  },
  destroyed () {
    this.innerAudioContext.destroy()
  },
  methods: {
    creatAudio () {
      this.innerAudioContext = uni.createInnerAudioContext(this)
      this.innerAudioContext.src = encodeURI(this.audio)
      this.innerAudioContext.sessionCategory = "soloAmbient"
      this.innerAudioContext.autoplay = true
      this.innerAudioContext.volume = 0
      this.innerAudioContext.startTime = 0
      // this.innerAudioContext.play() // 这里不能播放，比较多的浏览器不允许初始化默认播放，后续再看看有没啥好的解决方法
      this.innerAudioContext.onTimeUpdate(() => {})
      // this.innerAudioContext.onCanplay(() => {
      //   this.duration = this.innerAudioContext.duration
      // })
      this.innerAudioContext.onCanplay(() => {
        this.intervalID = setInterval(() => {
          if (this.innerAudioContext.duration !== 0) {
            clearInterval(this.intervalID);
            this.duration = this.innerAudioContext.duration
          }
        }, 100);
      })
      setTimeout(() => {
        this.innerAudioContext.pause()
      }, 100)
    },
    // 开始播放
    audioPlay () {
      if (this.dateFormart(this.currentTime) === this.dateFormart(this.duration)) {
        this.progress = 100
      }
      this.innerAudioContext.src = encodeURI(this.audio)
      this.innerAudioContext.startTime = 0
      this.innerAudioContext.volume = 1
      this.innerAudioContext.sessionCategory = "soloAmbient"
      this.innerAudioContext.seek(Number(this.progress) === 100 ? 0 : (this.currentTime ? this.currentTime : 0))
      this.innerAudioContext.startTime = Number(this.progress) === 100 ? 0 : (this.currentTime ? this.currentTime : 0)
      this.innerAudioContext.play()
      this.onCanplay()
      this.isPlay = true
    },
    onCanplay () {
      this.innerAudioContext.onCanplay(() => {
        this.currentTime = this.innerAudioContext.currentTime
      })
      this.innerAudioContext.onTimeUpdate(() => {
        this.currentTime = this.innerAudioContext.currentTime
        this.progress = (this.innerAudioContext.currentTime / this.innerAudioContext.duration * 100).toFixed(2)
      })
      this.innerAudioContext.onEnded(() => {
        if (this.isPlay) {
          this.isPlay = false
        }
      })
    },
    // 暂停播放
    audioPause () {
      this.innerAudioContext.pause()
      this.isPlay = !this.isPlay
    },
    // 拖动进度条
    handleProgress (event) {
      this.innerAudioContext.pause()
    },
    // 拖动进度条结束
    handleChange (event) {
      this.progress = event.detail.value
      this.currentTime = this.duration * (event.detail.value / 100)
      this.audioPlay()
    },
    // 处理时间格式(总时长装换时分秒)
    dateFormart (value) {
      value = Number(value).toFixed(0)
      let hour = Math.floor(value / 3600)
      let minute = Math.floor((value - hour * 3600) / 60)
      let second = value - hour * 3600 - minute * 60
      hour = hour < 10 ? `0${hour}` : hour
      minute = minute < 10 ? `0${minute}` : minute
      second = second < 10 ? `0${Math.floor(second)}` : Math.floor(second)
      return `${minute}:${second}`
    }
  }
}
</script>

<style lang="scss" scoped>
.audio-card {
  height: 100rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  display: flex;
  flex-direction: column;
  padding: 20rpx 24rpx;
  .title {
    color: #333333;
    font-size: 26rpx;
    font-weight: 500;
  }
  .audio {
    margin-top: 15rpx;
    display: flex;
    .play-icon {
      width: 40rpx;
      height: 40rpx;
	  margin-right: 20rpx;
    }
    .audio-main {
      height: 48rpx;
      flex: 1;
      margin-left: 15rpx;
    }
    .progress {
      margin: 0;
    }
    .time {
      width: 100%;
      height: 50rpx;
      font-size: 24rpx;
      font-weight: 400;
      color: #666666;
      margin-top: -15rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
