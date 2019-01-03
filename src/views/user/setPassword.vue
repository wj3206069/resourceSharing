<template>
  <div class="Register">
    <div class="register-content">
      <div class="title zx-flex align end fs-16">
        <div class="grey-2">科创委业务管理账号可同步登录共享平台，</div>
        <div class="blue"
             @click.stop.prevent="$router.push({name: 'login'})">立即登录</div>
      </div>
      <div class="register-box bg-white">
        <div class="back">
          <img width="30"
               height="30"
               src="../../assets/images/getBack.png"
               alt="">
        </div>
        <span class="getBPassw">设置新密码</span>
        <div class="register-container">
          <el-form v-show="changeTitle === 0"
                   :model="registerForm"
                   :rules="rules"
                   ref="registerForm"
                   label-width="100px">
            <el-form-item label="新密码"
                          prop="passWord">
              <el-input v-model="registerForm.passWord"
                        type="password"
                        placeholder="请输入密码">
              </el-input>
            </el-form-item>
            <el-form-item label="确认密码"
                          prop="confirmPassWord">
              <el-input v-model="registerForm.confirmPassWord"
                        type="password"
                        placeholder="请再次确认密码">
              </el-input>
            </el-form-item>
            <el-form-item>
            </el-form-item>
            <el-form-item>
              <el-button class="register-btn fs-18 c-white"
                         :class="{'bg-grey-4 ':registerDisabled}"
                         @click="registerBtn">提交</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SlideVerify from 'vue-monoplasty-slide-verify'
import countDown from '@/components/countDown/countDown'
// import { API } from '@/api/index'
import { resetPassword, registerTelCode } from '@/api/user'
export default {
  name: 'setpassword',
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
      registerDisabled: true,
      InputRight: [],
      id: '', // 改变密码的id
      changeTitle: 0,
      isAgreeUserName: '',
      isAgreeTel: '',
      imgUrl: '',
      isAgreeTo: false,
      registerForm: {
        passWord: '',
        confirmPassWord: ''
      },
      rules: {
        passWord: [{ required: true, message: '请输入您的密码', trigger: 'blur' }],
        confirmPassWord: [{ required: true, validator: validatePass2, trigger: 'blur' }]
      },
      isDisabled: true // 禁用获取验证码按钮
    }
  },
  created () {
    this.id = this.$route.params.id
  },
  methods: {
    isAgree (isAgreeUserName) {
      console.log('1', isAgreeUserName)
      this.isAgreeTo = isAgreeUserName
    },
    // 提交注册数据
    registerBtn () {
      let err
      if (!this.registerForm.passWord || !this.registerForm.confirmPassWord) {
        err = '请输入必填项'
      }
      if (err) {
        this.$message({
          message: err,
          type: 'warning'
        })
        return
      }
      resetPassword({
        id: this.id,
        password: this.registerForm.passWord,
        newpassword: this.registerForm.confirmPassWord
      }).then(res => {
        console.log(res)
        if (res.data.success) {
          this.$message({
            message: '重置密码成功',
            type: 'success'
          })
        } else {
          this.$message.error(res.data.message)
          console.log('重置密码失败', res.data.message)
        }
        // 登入成功后 记住正确的用户名
      })
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
.Register {
  width: 100%;
  height: 100%;
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
    .getBPassw {
      position: absolute;
      left: 47%;
      top: 30%;
    }
    .yzm {
      position: absolute;
      top: 8%;
      right: 5px;
    }
    .register-container {
      position: absolute;
      top: 40%;
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
