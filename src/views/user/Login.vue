<template>
  <div class="login" @keyup.enter="enterLogin">
    <div class="head zx-flex align justify">
      <div class="img-box">
        <img src="../../assets/images/login-title.png"
             alt=""
             width="100%"
             height="100%">
      </div>
    </div>
    <div class="login-box bg-white">
      <p class="title text-c">用户登录</p>
      <div style="margin-top: 40px;">
        <el-input class="fs-18"
                  :class="{'isFocus': isFocus1}"
                  @focus="isFocus1 = true"
                  @blur="isFocus1 = false"
                  placeholder="请输入用户名"
                  v-model="userName">
          <i slot="prefix"
             class="el-input__icon zxicon zx-xingming fs-30"></i>
        </el-input>
      </div>
      <div class="mg-t-30">
        <el-input class="fs-18"
                  :class="{'isFocus': isFocus2}"
                  type="password"
                  @focus="isFocus2 = true"
                  @blur="isFocus2 = false"
                  placeholder="请输入密码"
                  v-model="password">
          <i slot="prefix"
             class="el-input__icon zxicon zx-xingming fs-30"></i>
        </el-input>
      </div>
      <div class="mg-t-30 zx-flex align get-code">
        <el-input class="fs-18"
                  style="position:relative"
                  :class="{'isFocus': isFocus3}"
                  @focus="isFocus3 = true"
                  @blur="isFocus3 = false"
                  placeholder="请输入验证码"
                  v-model="Code">
          <i slot="prefix"
             class="el-input__icon zxicon zx-xingming fs-30"></i>
        </el-input>
        <img :src="imgUrl"
             @click.stop.prevent="getLoginIDcode"
             style="cursor: pointer;"
             class="yzm">
      </div>

      <div class="zx-flex between">
        <div class="remember zx-flex align between fs-16 mg-t-20">
          <el-checkbox v-model="rememberName">记住用户名</el-checkbox>
        </div>
        <div class="zx-flex align between fs-14 mg-t-10"
             style="color: #1156F3;">
          <!-- <div>
            <span class="fotgetPwd cursor"
                  @click.stop.prevent="$router.push({name: 'ForgetUserName'})">忘记用户名?</span>
          </div> -->
        </div>
      </div>
      <div class="mg-t-30">
        <el-button class="login-btn fs-20 c-white"
                   style="color:#fff"
                   @click.stop.prevent="login">登录</el-button>
      </div>
      <div class="zx-flex align between fs-14 mg-t-10"
           style="color: #1156F3;">
        <!-- <div>
          <span class="grey-3">还没有账号？</span>
          <span class="register cursor"
                @click.stop.prevent="$router.push({name: 'register'})">立即注册</span>
        </div> -->
        <div>
          <span class="fotgetPwd cursor"
                @click.stop.prevent="$router.push({name: 'ForgetUserName'})">忘记用户名?</span>
        </div>
        <div>
          <span class="fotgetPwd cursor"
                @click.stop.prevent="$router.push({name: 'forgetPwd'})">忘记密码?</span>
        </div>
      </div>
      <!-- <div class="mg-t-30 fs-18 text-c">
        <span class="another-login">其他方式</span>
      </div>
      <div class="zx-flex align mg-t-30 around">
        <i class="zxicon zx-qq fs-30"
           style="margin-left: 15px; color: #18b6ed;"></i>
        <i class="zxicon zx-weixin fs-30"
           style="margin-left: 15px; color: #5087ff;"></i>
        <i class="zxicon zx-zhifubao fs-30"
           style="margin-left: 15px; color: #08ba06;"></i>
        <img src="../../assets/images/niu.png"
             width="30"
             height="30">
      </div> -->
    </div>
  </div>
</template>
<script>
// 引入api
import { getLogin, getPicCode } from '@/api/user'
// 保存用户登入状态
import { setSate, getState } from '@/until/storage'
import { API } from '@/api/index'
export default {
  name: 'Login',
  data () {
    return {
      userName: '', // 用户名
      password: '',
      Code: '',
      isFocus1: false, // 是否聚焦 用户名
      isFocus2: false, // 是否聚焦 密码
      isFocus3: false, // 是否聚焦  验证码
      rememberName: false,
      imgUrl: ''
    }
  },
  created () {
    this.existuserName()
    this.getLoginIDcode()
  },
  methods: {
    enterLogin() {
      this.login()
    },
    // 判断是否存在用户名
    existuserName () {
      let remember = getState('rememberUserName')
      if (!remember) return
      this.userName = remember.username
      this.rememberName = remember.rememberName
    },
    // 记住用户名 存在localStorage
    rememberUserName () {
      setSate('rememberUserName', {
        username: this.userName,
        rememberName: this.rememberName
      })
    },
    getLoginIDcode () {
      // 验证码刷新
      if (this.imgUrl) this.imgUrl = ''
      getPicCode().then(res => {
        this.imgUrl = API + '/login/captcha'
        this.ShowDisposeDialog = true // 获取数据成功显示
      }).catch(() => {
        this.imgUrl = ''
      })
    },
    // 账号密码登入
    login () {
      let err
      if (!this.userName) {
        err = '请输入用户名'
      } else if (!this.password) {
        err = '请输入密码'
      }
      if (err) {
        this.$message({
          message: err,
          type: 'warning'
        })
        return
      } else {
      }

      getLogin({
        username: this.userName,
        password: this.password,
        captcha: this.Code
      }).then(res => {
        console.log(res)
        if (res.data.success) {
          this.$message({
            message: '登录成功',
            type: 'success'
          })
          var userInfo = JSON.stringify(res.data.user)
          sessionStorage.setItem('userInfo', userInfo) // userInfo
          sessionStorage.setItem('nickname', res.data.user.nickname)
          this.$store.commit('SET_ROLES', res.data.user)
          this.$router.push({ path: '/index' })
        } else {
          this.$message.error(res.data.message)
          this.getLoginIDcode()
          console.log('登录错误', res.data.message)
        }
        // 登入成功后 记住正确的用户名
        if (res.data.success && this.rememberName) this.rememberUserName()
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        this.passRules = valid
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: url("../../assets/images/login-bg.png") no-repeat;
  background-size: cover;
  .head {
    margin-top: 2.857143rem;
    // 40px
    .img-box {
      width: 55rem;
      // 770px
      height: 5rem;
      // 70px
    }
  }
  .login-box {
    position: absolute;
    top: 50%;
    right: 15%;
    width: 37.857143rem;
    // 530px
    // height: 39.285714rem;
    // 550px
    transform: translateY(-50%);
    padding: 2.142857rem 3.928571rem;
    // 30px 55px
    border-radius: 10px;
    margin-top: 1.428571rem;
    .title {
      height: 3.428571rem;
      line-height: 3.428571rem;
      // 48px
      font-size: 2.571429rem;
      // 36px
    }
    .zxicon {
      margin-left: 5px;
    }

    .remember {
      padding-left: 10px;
    }
    .get-code {
      position: relative;
    }
    .login-btn {
      width: 100%;
      height: 3.571429rem;
      // 50px
      border-radius: 1.785714rem;
      // 25px
      border: none;
      background-color: #1156f3;
    }
    .yzm {
      position: absolute;
      top: 1px;
      right: 40px;
      width: 7.142857rem;
      // 100px
      height: 3.428571rem;
      // 48px
    }
    .another-login {
      position: relative;
      display: inline-block;
      width: 72px;
      height: 20px;
      line-height: 20px;
      &::before {
        content: " ";
        position: absolute;
        right: 80px;
        width: 167px;
        top: 50%;
        height: 1px;
        background: linear-gradient(to left, #999, #fff);
        z-index: 9;
      }
      &::after {
        content: " ";
        position: absolute;
        left: 80px;
        width: 167px;
        top: 50%;
        height: 1px;
        background: linear-gradient(to right, #999, #fff);
        z-index: 9;
      }
    }
  }
}
</style>
