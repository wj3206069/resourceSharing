<template>
  <div class="Register">
    <div class="register-content">
      <div class="title zx-flex align end fs-16">
        <!-- <div class="grey-2">科创委业务管理账号可同步登录共享平台，</div>
        <div class="blue"
             @click.stop.prevent="$router.push({name: 'login'})">立即登录</div> -->
      </div>
      <div class="register-box bg-white zx-flex justify align column">
        <div style="    margin-bottom: 20px;">
          <div class="zx-flex">
            <div class="item_person"
                 @click="toIdentIfy(1)">
              <span style="position: absolute;top: 54px;">个人认证</span>
              <div class="item_content">
                <p>个人购买服务</p>
                <p>发布项目</p>
              </div>
            </div>
            <div class="item_person"
                 @click="toIdentIfy(2)">
              <span style="position: absolute;top: 54px;">服务机构认证</span>
              <div class="item_content">
                <p>服务机构发布服务</p>
                <p>处理订单</p>
                <p>发布活动</p>
              </div>
            </div>
          </div>
          <div class="zx-flex">
            <div class="item_person"
                 @click="toIdentIfy(3)">
              <span style="position: absolute;top: 54px;">单位认证</span>
              <div class="item_content">
                <p>单位购买服务</p>
                <p>发布项目</p>
              </div>
            </div>
            <div class="item_person"
                 @click="toIdentIfy(4)">
              <span style="position: absolute;top: 54px;">专家认证</span>
              <div class="item_content">
                <p>参与设备评审 </p>
                <p>购买服务</p>
                <p>发布项目</p>
              </div>
            </div>
          </div>
          <div class="zx-flex justify">
            <span style="margin-right:5px">暂不认证，先</span>
            <span style="color:#387EE8;cursor:pointer">随便逛逛</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SlideVerify from 'vue-monoplasty-slide-verify'
import countDown from '@/components/countDown/countDown'
import { API } from '@/api/index'
import { register, registerTelCode, getPicCode } from '@/api/user'
export default {
  name: 'Register',
  components: {
    SlideVerify,
    countDown
  },
  data () {
    var validatePass2 = (rule, value, callback) => {
      console.log('rule, value', rule, value)
      if (value === '') {
        callback(new Error('请输入密码'))
      }
      if (value !== this.registerForm.passWord) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      isPass: false, // 是否通过验证
      registerDisabled: true,
      InputRight: [],
      changeTitle: 0,
      isAgreeUserName: '',
      isAgreeTel: '',
      imgUrl: '',
      isAgreeTo: false,
      registerForm: {
        userName: '',
        passWord: '',
        confirmPassWord: '',
        telNumber: '',
        picCode: '',
        // NickName: '',
        telcode: '',
        picTel: ''
      },
      rules: {
        userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        // NickName: [{ required: true, message: '请输入您的昵称', trigger: 'blur' }],
        passWord: [{ required: true, message: '请输入您的密码', trigger: 'blur' }],
        confirmPassWord: [{ required: true, validator: validatePass2, trigger: 'blur' }],
        telNumber: [{ required: true, message: '请输入您的手机号', trigger: 'blur' }],
        picCode: [{ required: true, message: '请输入图形验证码', trigger: 'blur' }],
        telcode: [{ required: true, message: '请输入短信验证码', trigger: 'blur' }]
      },
      isDisabled: true // 禁用获取验证码按钮
    }
  },
  created () {
    this.getLoginIDcode()
  },
  methods: {
    // 图形验证码---与登录接口共用
    getLoginIDcode () {
      getPicCode().then(res => {
        this.imgUrl = API + '/login/captcha'
        this.ShowDisposeDialog = true // 获取数据成功显示
      }).catch(() => {
        console.log('图片获取失败')
        this.imgUrl = ''
      })
    },
    isAgree (isAgreeUserName) {
      console.log('1', isAgreeUserName)
      this.isAgreeTo = isAgreeUserName
    },
    // 跳转到认证页面
    toIdentIfy (num) {
      switch (num) {
        case 1:
          this.$router.push({ name: 'personIdentify' })
          break
        case 2:
          this.$router.push({ name: 'serivceIdentify' })
          break
        case 3:
          this.$router.push({ name: 'unitIdentify' })
          break
        case 4:
          this.$router.push({ name: 'expretIdentify' })
          break

        default:
          break
      }
    },
    // 提交注册数据
    registerBtn () {
      this.isPass = true
      let err
      if (!this.registerForm.userName || !this.registerForm.telNumber || !this.registerForm.picCode || !this.registerForm.telcode) {
        err = '请输入必填项'
      }
      if (err) {
        this.$message({
          message: err,
          type: 'warning'
        })
        return
      }
      if (!this.isAgreeTo) return
      register({
        username: this.registerForm.userName,
        // name: this.registerForm.NickName,
        password: this.registerForm.passWord,
        newpassword: this.registerForm.confirmPassWord,
        phone: this.registerForm.telNumber,
        captcha: this.registerForm.picCode,
        shortMessage: this.registerForm.telcode,
        deptname: '',
        deptid: '',
        idcard: '',
        customertype: ''
      }).then(res => {
        console.log(res)
        if (res.data.success) {
          this.$message({
            message: '注册成功',
            type: 'success'
          })
        } else {
          this.$message.error(res.data.message)
          console.log('注册失败', res.data.message)
        }
        // 登入成功后 记住正确的用户名
      })
    },
    checkForm (boolean, object) {
      console.log('registerForm', boolean, object)
      this.toObj1(boolean, object)
      this.registerDisabled = !object
    },
    toObj1 (key, val) {
      var data = {}
      data[key] = val
      this.InputRight.forEach((ele, idx) => {
        console.log('ele')
        if (ele.value !== val) {
          this.InputRight.push(data)
        }
      })
      console.log('InputRight', this.InputRight)
      return data
    },

    // 获取短信验证码
    getCode () {
      if (!this.registerForm.telNumber) {
        this.$message({
          message: '请先输入手机号码'
        })
        return
      }
      registerTelCode({
        phone: this.registerForm.telNumber
      }).then(res => {
        this.$message({
          message: '发送成功',
          type: 'success'
        })
      }).catch(() => {

      })
      this.$refs.nameIsCountDown.countDown()
    }
  }
}
</script>

<style lang="less" scoped>
@import ".../../../../assets/style/color.less";
.item_person {
  cursor: pointer;
  margin-bottom: 40px;
  margin-right: 40px;
  position: relative;
  width: 224px;
  height: 233px;
  border: 1px solid rgba(56, 126, 232, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  span {
    width: 190px;
    height: 29px;
    font-size: 30px;
    font-family: MicrosoftYaHei-Bold;
    font-weight: bold;
    color: rgba(71, 71, 71, 1);
    line-height: 41px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 61px;
  }
}
.item_content {
  position: absolute;
  top: 110px;
  p {
    width: 190px;
    height: 30px;
    font-size: 18px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(71, 71, 71, 1);
    line-height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.Register {
  width: 100%;
  height: 87%;
  background: url("../../assets/images/register-bg.png") no-repeat;
  background-size: cover;
  .blue {
    color: @blueActive;
  }

  .back {
    width: 50px;
    height: 50px;
    background-color: #387ee8;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    position: absolute;
    top: 16%;
    left: 4%;
  }
  .getBPassw {
    position: absolute;
    left: 29%;
    top: 43%;
  }
  .register-content {
    position: absolute;
    top: 90px;
    left: 50%;
    min-width: 1170px;
    transform: translateX(-585px);
    .title {
      height: 73px;
    }
    .register-box {
      width: 100%;
      height: 650px;
      border-radius: 5px;
      overflow: hidden;
      .type-name {
        width: 400px;
        height: 40px;
        margin: 0 auto;
        margin-top: 30px;
        color: #ccc;
        .type-item {
          height: 100%;
          border-bottom: 4px solid transparent;
        }
        .active {
          color: @blueActive;
          border-color: @blueActive;
        }
      }
    }
    .yzm {
      position: absolute;
      top: 8%;
      right: 5px;
    }
    .register-container {
      position: absolute;
      top: 320px;
      width: 500px;
      left: 50%;
      transform: translateX(-250px);
      margin-left: -50px;
      .el-input el-input--prefix {
        width: 400px;
      }
      .register-btn {
        width: 400px;
        height: 40px;
        border-radius: 3px;
        border: none;
        background-color: @blueActive;
      }
    }
  }
}
</style>
