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
        <div class="register-container">
          <el-form v-show="changeTitle === 0"
                   :model="registerForm"
                   :rules="rules"
                   ref="registerForm"
                   label-width="100px">
            <el-form-item label="登录用户名"
                          prop="userName"
                          verify
                          :minLength='3'
                          empty>
              <el-input v-model="registerForm.userName"
                        placeholder="请输入用户名">
              </el-input>
            </el-form-item>
            <!-- <el-form-item label="用户昵称"
                          verify
                          :minLength='3'
                          prop="NickName">
              <el-input v-model="registerForm.NickName"
                        placeholder="请输入用户昵称">
              </el-input>
            </el-form-item> -->
            <el-form-item label="登录密码"
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
            <el-form-item label="手机号"
                          prop="telNumber"
                          verify
                          phone>
              <el-input v-model="registerForm.telNumber"
                        placeholder="请输入手机号">
              </el-input>
            </el-form-item>
            <el-form-item label="短信验证码"
                          prop="telcode"
                          verifyCode
                          verify
                          class="get-code">
              <el-input v-model="registerForm.telcode"
                        type="text"
                        placeholder="请输入短信验证码">
                <i slot="suffix"
                   style="font-style:normal">
                  <div @click.stop.prevent="getCode">
                    <count-down ref="nameIsCountDown"
                                :isDisabled="isDisabled"></count-down>
                  </div>
                </i>
              </el-input>
            </el-form-item>
            <el-form-item label="验证码"
                          verify
                          :length="5"
                          prop="picCode">
              <el-input v-model="registerForm.picCode"
                        placeholder="请输入图形验证码">
              </el-input>
              <img :src="imgUrl"
                   class="yzm"
                   width="125"
                   height="43">
            </el-form-item>
            <el-form-item>
              <div class="zx-flex align fs-12">
                <el-checkbox v-model="isAgreeUserName"
                             @change="isAgree(isAgreeUserName)">我已阅读并同意</el-checkbox>
                <p class="zx-flex align c-primary block cursor">《深圳市大型科学仪器设施资源共享平台注册协议》</p>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button class="register-btn fs-18 c-white"
                         :class="{'bg-grey-4 ':registerDisabled}"
                         @click="registerBtn">注册</el-button>
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
import { API } from '@/api/index'
import { register, getPicCode, registerTelCode } from '@/api/user'
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
    // 是否同意协议
    isAgree (isAgreeUserName) {
      console.log('1', isAgreeUserName)
      this.isAgreeTo = isAgreeUserName
    },
    // 提交注册数据
    registerBtn () {
      this.$router.push({ name: 'identificationAll' })
      let err
      if (!this.registerForm.userName || !this.registerForm.passWord || !this.registerForm.confirmPassWord || !this.registerForm.telNumber || !this.registerForm.picCode || !this.registerForm.telcode) {
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
      // 注册接口
      register({
        username: this.registerForm.userName,
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
      })
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
  .getBPassw {
    position: absolute;
    left: 46%;
    top: 35%;
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
    .yzm {
      position: absolute;
      top: 8%;
      right: 5px;
    }
    .register-container {
      position: absolute;
      top: 120px;
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
