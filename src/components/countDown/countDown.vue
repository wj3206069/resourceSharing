<template>
  <div class="code-count"
       :ref="nameSpace">
    <div v-show="!codeCount"
         class="send-btn zx-flex align justify fs-16"
         :class="{'bg-grey-3': isDisabled, 'active': !isDisabled}">发送验证码</div>
    <div v-show="codeCount"
         class="send-btn zx-flex align justify fs-16 bg-warning">{{codeCount}}s后发送</div>
  </div>
</template>

<script>
import { TIME_COUNT } from '@/assets/utils/constant.js'
export default {
  name: 'codeCount',
  props: {
    nameSpace: {
      type: String
    },
    isDisabled: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      codeCount: '', // 倒计时
      timer: null // 定时器
    }
  },
  methods: {
    countDown () {
      // TODO: 此处应该避免重复操作
      if (!this.timer) {
        this.codeCount = TIME_COUNT
        this.sendCode = false
        this.timer = setInterval(() => {
          if (this.codeCount > 0 && this.codeCount <= TIME_COUNT) {
            this.codeCount--
          } else {
            // 倒计时结束清除定时器
            this.sendCode = true
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.code-count {
  height: 36px;
  .send-btn {
    min-width: 110px;
    height: inherit;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
  }
  .active {
    background-color: rgb(17, 86, 243);
  }
}
</style>
