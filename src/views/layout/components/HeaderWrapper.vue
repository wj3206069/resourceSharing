<template>
  <div class="headerWrapper">
    <header class="header">
      <div class="container">
        <div>
          <h1 class="zx-flex align cursor"
              @click.stop.prevent="$router.push({ path: '/index' })">
            <img src="../../../assets/images/logo.png"
                 alt="app-logo"
                 class="nav-logo">
            <span class="fs-24"
                  style="margin-left: 15px;">深圳市大型科学仪器资源共享平台</span>
          </h1>
          <!-- <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger> -->
        </div>
        <ul class="nav">
          <!-- <li class="nav-item zx-flex align">
            <i class="zxicon zx-daiban fs-30"></i>
            <span class="text">待办事项</span>
          </li> -->
          <li class="nav-item zx-flex align">
            <i class="zxicon zx-renwu fs-18"></i>
            <span class="text fs-16">欢迎您{{getUser}}</span>
          </li>
          <li class="nav-item loginOut zx-flex align"
              @click="loginOut">
            <i class="zxicon zx-zhuxiao fs-18"></i>
            <span class="text fs-16">退出</span>
          </li>
        </ul>
      </div>
    </header>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
// import { getToken } from '@/until/auth'
// import logo from '@/assets/logo.png'
export default {
  components: {
    Hamburger
  },
  data () {
    return {
      imgUrl: '../../../assets/images/logo.png',
      dialogFormVisible: true
    }
  },
  computed: {
    ...mapGetters(['sidebar']),
    getUser () {
      if (sessionStorage.getItem('userInfo')) {
        return ',' + JSON.parse(sessionStorage.getItem('userInfo')).nickname
      }
    }
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('ToggleSideBar')
    },
    loginOut () {
      // 删除session并退出
      sessionStorage.removeItem('userInfo')
      sessionStorage.removeItem('nickname')
      this.$router.push({ name: 'login' })
      // this.$confirm('退出登录, 是否继续?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // })
      //   .then(() => {
      //     this.$store.dispatch('LogOut').then(() => {
      //       location.reload()
      //     })
      //   })
      //   .catch(() => {
      //     this.$message({
      //       type: 'info',
      //       message: '已取消退出'
      //     })
      //   })
    }
  }
}
</script>
<style lang="less">
</style>

