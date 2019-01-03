<template>
  <div id="app">
    <div class="loginBox">
      <div class="loginImg">
        <div class="login">
          <div class="img"></div>
          <div class='loginText'>
            <span>
              深圳市大型科学仪器设施资源共享平台
            </span>
          </div>
          <div class="goHome cursor"
               @click.stop.prevent=goHome()>回到首页 ></div>
        </div>
        <div class='loginBottom'>
          <div class="leftImg"></div>
          <div class='loginInput'>
            <div class='title'>登录</div>
            <div class='loginType'>
              <div class='margin-top'>
                <el-input class="el-input"
                          @focus="isFocus1 = true"
                          @blur="isFocus1 = false"
                          placeholder="请输入用户名"
                          v-model="userName"
                          @keyup.enter.native="getToLogin">
                  <i slot="prefix"
                     class="el-input__icon zx-flex align zxicon zx-yonghu "
                     style="font-size:2.142857rem"></i>
                </el-input>
              </div>
              <div class='margin-top'>
                <el-input class="el-input"
                          type="password"
                          @focus="isFocus2 = true"
                          @blur="isFocus2 = false"
                          placeholder="请输入密码"
                          v-model="password"
                          @keyup.enter.native="getToLogin">
                  <i slot="prefix"
                     class="el-input__icon zx-flex align zxicon zx-mima "
                     style="font-size:2.142857rem"></i>
                </el-input>
              </div>
              <div class='auth margin-top'>
                <el-input class="el-input verify"
                          @focus="isFocus3 = true"
                          @blur="isFocus3 = false"
                          placeholder="请输入验证码"
                          v-model="Code"
                          @keyup.enter.native="getToLogin">
                  <i slot="prefix"
                     class="el-input__icon zx-flex align zxicon  zx-dunpai  "
                     style="font-size:2.142857rem"></i>
                </el-input>
                <div class='authCode'>
                  <img :src='imgUrl'
                       @click.stop.prevent="getLoginIDcode"
                       style="cursor: pointer;"
                       width="100%"
                       height="100%">
                </div>
              </div>
            </div>
            <div class="zx-flex between fotgetPwd ">
              <div class="remember zx-flex align between rememberUser">
                <el-checkbox v-model="rememberName"
                             class='rememberUser'>记住用户名</el-checkbox>
              </div>
              <div class="register cursor"
                   @click.stop.prevent="toRegisterPage">立即注册</div>
            </div>
            <div class='loginBtn cursor'
                 @click.stop.prevent="getToLogin">登录</div>
            <div class='pasw '>
              忘记<span class='cursor'
                    @click.stop.prevent="toForgetUserName">账号</span>或<span class='cursor'
                    @click.stop.prevent="toForgetPwd">密码</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  el: '#app',
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
  mounted () {
    this.existuserName()
    this.window = window
    this.getLoginIDcode()
  },
  methods: {
    // 去忘记用户名页面
    toForgetUserName () {
      window.location.href = '../gatewaymanagement/retrieveUserName2'
    },
    // 去注册页面
    toRegisterPage () {
      window.location.href = '../gatewaymanagement/register'
    },
    // 去忘记密码页面
    toForgetPwd () {
      window.location.href = '../gatewaymanagement/ForgetPwd'
    },
    // 记住用户名 判断是否存在用户名
    existuserName () {
      var remember = JSON.parse(localStorage.getItem('rememberUserName'))
      if (!remember) return
      this.userName = remember.username
      this.rememberName = remember.rememberName
    },

    // 记住用户名 存在localStorage
    rememberUserName () {
      localStorage.setItem('rememberUserName', {
        username: this.userName,
        rememberName: this.rememberName
      })
    },
    // 获取图形验证码
    getLoginIDcode () {
      this.imgUrl = getAbsolutePath + '/gatewaymanagement/captcha?random=' + Math.random()
      // if (this.imgUrl) this.imgUrl = ''
      // var url = getAbsolutePath + '/gatewaymanagement/captcha'
      // xhr.post(url).then((res) => {
      //     this.imgUrl = url
      // }).catch(err => {
      //     this.imgUrl = ''
      // })
    },
    postFormData (val) {
      var fm = new FormData()
      for (var attr in val) {
        fm.append(attr, val[attr])
      }
      return fm
    },
    goHome () {
      window.location.href = getAbsolutePath
    },
    getToLogin () {
      // 账号密码登入
      var loading = this.$loading()
      var url = getAbsolutePath + '/gatewaymanagement/gatewayLogin'
      xhr.post(url, {
        username: this.userName,
        password: this.password,
        captcha: this.Code
      }).then(res => {
        console.log('res', res)
        loading.close()
        if (res.data.success) {
          this.$message.success('登录成功')
          if (this.rememberName) {
            // 保存账号名到本地
            localStorage.setItem('rememberUserName', JSON.stringify({
              username: this.userName,
              rememberName: this.rememberName
            }))
          }
          console.log('res', res.data.user)
          var userInfo = JSON.stringify(res.data.user)
          sessionStorage.setItem('userInfo', userInfo) // userInfo
          // sessionStorage.setItem('nickname', res.data.user.nickname)
          if (res.data.user.customertype) {
            /* 去首页 */
            window.location.href = getAbsolutePath
            /* 去个人中心 */
            /*  window.location.href='../gatewaypersonalcenter/myCertification2'   */
          } else {
            // 没有认证
            window.location.href = getAbsolutePath +
              '/gatewaymanagement/authentication'
          }
        } else {
          this.$message.error(res.data.message)
          this.getLoginIDcode()
        }
      })
    }

  },
  watch: {
    rememberName (val) {
      console.log(val)
      if (!this.userName) return
      if (val) {
        localStorage.setItem('rememberUserName', JSON.stringify({
          username: this.userName,
          rememberName: this.rememberName
        }))
      } else {
        localStorage.removeItem('rememberUserName')
      }
    }
  }
}
</script>

<style scoped lang="less">
#app {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-size: cover;
  box-shadow: 0px 3px 29px 0px rgba(0, 72, 105, 0.2);
}

#app .loginBox {
  background-image: url("../../assets/images/new-login-bg.png");
  width: 100%;
  height: 100%;
  position: relative;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  box-shadow: 0px 3px 29px 0px rgba(0, 72, 105, 0.2);
}

#app .loginBox .loginImg {
  background-image: url("../../assets/images/login-box-bg.png");
  width: 85.9375rem;
  height: 50rem;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  background-size: 100% 100%;
}

#app .loginBox .loginImg .login {
  height: 3.5625rem;
  margin-top: 2.5rem;
  margin-left: 8.8125rem;
  position: relative;
  display: flex;
  flex: 1;
}

#app .loginBox .loginImg .login .img {
  background-image: url("../../assets/images/logo.png");
  width: 3.5625rem;
  height: 3.6875rem;
  background-size: 100% 100%;
  margin: 0 1.9375rem;
}

#app .loginBox .loginImg .login .loginText {
  font-size: 1.75rem;
  height: 100%;
  line-height: 3.5625rem;
  color: #40a9da;
  border-color: #40a9da;
}

#app .loginBox .loginImg .login .loginText >span {
  width: 34.25rem;
  height: 1.75rem;
  font-size: 1.875rem;
  font-weight: 400;
  color: rgba(64, 169, 218, 1);
  line-height: 1.75rem;
  border-left: 1px solid #40a9da;
  padding-left: 1.75rem;
}

#app .loginBox .loginImg .loginInput {
  width: 23.8125rem;
}

#app .loginBox .loginImg .loginInput .title {
  text-align: center;
  font-weight: 400;
  color: rgba(6, 0, 46, 1);
  font-size: 1.625rem;
}

#app .loginBox .loginImg .loginInput .loginType {
}

#app .loginBox .loginImg .loginInput .loginType .el-input {
  width: 23.625rem;
  height: 3.571429rem;
}

.el-input__inner {
  border: none;
  border-bottom: 1px solid;
  border-color: rgba(189, 189, 189, 1);
  margin-left: 0.625rem;
}

#app .loginBox .loginImg .loginInput .loginType .verify {
  width: 15.875rem;
}

.cursor {
  line-height: 3rem;
}

.loginBtn {
  width: 23.8125rem;
  height: 3.125rem;
  background: rgba(64, 169, 217, 1);
  border-radius: 1.5625rem;
  font-size: 1.5rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 3.125rem;
  text-align: center;
  margin-top: 3.125rem;
}

.pasw {
  font-size: 0.875rem;
  font-weight: normal;
  color: rgba(6, 0, 46, 1);
  line-height: 1.8125rem;
  opacity: 0.5;
  text-align: center;
  margin-top: 4.1875rem;
}

.pasw > span {
  color: rgba(64, 169, 218, 1);
}

.register {
  font-size: 0.875rem;
  font-weight: 400;
  color: rgba(64, 169, 217, 1);
}

.fotgetPwd {
  margin-top: 1.3125rem;
}

.rememberUser {
  font-weight: 400;
  color: rgba(6, 0, 46, 1);
  font-size: 0.875rem;
  margin-left: 0.35rem;
}

.el-checkbox__inner {
  border: 1px solid rgba(64, 169, 218, 1);
  border-radius: 3px;
}

.el-checkbox__label {
  font-weight: 400;
  color: rgba(6, 0, 46, 1);
  font-size: 0.875rem;
  vertical-align: middle;
}

.leftImg {
  background-image: url("../../assets/images/login-img.png");
  width: 24.25rem;
  height: 25.375rem;
  background-size: 100% 100%;
  z-index: 100;
  margin-top: 6.9375rem;
}

.loginBottom {
  display: flex;
  justify-content: space-evenly;
}

.el-input__icon {
  color: rgba(64, 169, 217, 1);
}

.authCode {
  width: 6.8125rem;
  height: 3.2rem;
  background-size: 100% 100%;
}

.auth {
  display: flex;
  justify-content: space-between;
}

.margin-top {
  margin-top: 3.0625rem;
}

.goHome {
  color: rgba(64, 169, 217, 1);
  font-size: 1.125rem;
  position: relative;
  right: -27.625rem;
  top: -4.125rem;
}
</style>
