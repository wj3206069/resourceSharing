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
        <span class="getBPassw">找回密码</span>
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
                   @click="getLoginIDcode"
                   class="yzm"
                   style="cursor: pointer;"
                   width="125"
                   height="43">
            </el-form-item>
            <el-form-item>
              <el-button class="register-btn fs-18 c-white"
                         :class="{'bg-grey-4 ':registerDisabled}"
                         @click.stop.prevent="registerBtn">下一步</el-button>
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
import { getPicCode, registerTelCode, forgetPassword } from '@/api/user'
import { API } from '@/api/index'
export default {
  name: 'Register',
  components: {
    SlideVerify,
    countDown
  },
  data () {
    return {
      registerDisabled: true,
      InputRight: [],
      changeTitle: 0,
      isAgreeTel: '',
      imgUrl: '',
      changePwdId: '',
      registerForm: {
        userName: '',
        telNumber: '',
        picCode: '',
        telcode: ''
      },
      rules: {
        userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
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
      if (this.imgUrl) {
        this.imgUrl = ''
      }
      getPicCode().then(res => {
        this.imgUrl = API + '/login/captcha'
        this.ShowDisposeDialog = true // 获取数据成功显示
      }).catch(() => {
        console.log('图片获取失败')
        this.imgUrl = ''
      })
    },
    // 提交重置数据
    registerBtn () {
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
      forgetPassword({
        account: this.registerForm.userName,
        phone: this.registerForm.telNumber,
        captcha: this.registerForm.picCode,
        shortMessage: this.registerForm.telcode
      }).then(res => {
        console.log(res)
        if (res.data.success) {
          this.$message({
            message: '下一步',
            type: 'success'
          })
          this.changePwdId = res.data.datalist.id
          this.$router.push({ name: 'setpassword', params: { id: this.changePwdId } })
        } else {
          this.$message.error(res.data.message)
          this.getLoginIDcode()
          console.log('错误', res.data.message)
        }
        // 登入成功后 记住正确的用户名
      })
    },
    // checkForm (boolean, object) {
    //   console.log('registerForm', boolean, object)
    //   this.toObj1(boolean, object)
    //   this.registerDisabled = !object
    // },
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
  .getBPassw {
    position: absolute;
    left: 47%;
    top: 20%;
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
      top: 220px;
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
