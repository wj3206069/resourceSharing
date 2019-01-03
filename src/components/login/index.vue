<template>
  <div class="login">
    <div class="login-box">
      <div class="user">
        <div class="svg">
          <svg-icon icon-class="user"></svg-icon>
        </div>
        <el-input placeholder="请输入用户名" prefix-icon="" clearable v-model="user.username">
        </el-input>
      </div>
      <div class="password">
        <div class="svg">
          <svg-icon icon-class="password"></svg-icon>
        </div>
        <el-input placeholder="请输入密码" prefix-icon="" clearable v-model="user.password" type="password">
        </el-input>
      </div>
      <div class="login-btn" @click="login">
        <el-button type="primary" round :loading="loading">登 录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        username: null,
        password: null
      },
      loading: false
    }
  },
  methods: {
    login() {
      this.loading = true
      this.$store.dispatch('Login', this.user).then(res => {
        this.loading = false
        this.$router.push({ path: '/index' })
      }).catch((err) => {
        this.loading = false
        if (err.message) {
          this.$message({
            message: err.message,
            type: 'error'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background: url(../../assets/login.png) no-repeat;
  background-size: 100% 100%;
}
.login-box {
  width: 34%;
  height: 42.7%;
  position: fixed;
  top: 24.8%;
  right: 6%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .user,
  .password,
  .login-btn {
    width: 83%;
    position: relative;
    .el-input .el-input__inner {
      border-radius: 25px !important;
    }
    .svg {
      position: absolute;
      z-index: 99;
      top: 50%;
      left: 10px;
      transform: translateY(-50%);
    }
  }
  .user {
    margin-top: 8.7%;
  }
  .password {
    margin: 7.4% 0 10.8% 0;
  }
}
</style>
