<template>
  <div class="is-component">
    <HeaderWrapper />
    <div class="app-wrapper"
         :class="{hideSidebar:!sidebar.opened}">
      <div class="wrapper_scroll">
        <div class="scroll_wrap">
          <sidebar class="sidebar-container"
                   @leftMenu="leftMenu"
                   @getSubTitle="getSubTitle"></sidebar>
          <sub-menu v-show="ShowSubMenu"
                    class="sub-menu"
                    style="position:fixed;"
                    :navSubActive=navSubActive
                    @subMenuClick="subMenuClick"
                    @getSubTitle="getSubTitle"></sub-menu>
          <div class="main-container"
               :class="ShowSubMenu&&subMenuOpen?'margin-left-230':'margin-left-50'">
            <order-title v-show="ShowSubMenu && subTitle"
                         :titleVal='subTitle'></order-title>
            <app-main></app-main>
          </div>
        </div>

        <!-- <head-deal></head-deal> -->

      </div>
      <!-- <Bfooter />  -->
    </div>

  </div>
</template>

<script>
import {
  Navbar,
  Sidebar,
  AppMain,
  HeaderWrapper,
  Bfooter
  // SubMenu
} from '@/views/layout/components'
import SubMenu from './components/Sidebar/SubMenu'
import OrderTitle from './components/title/orderTitle'
// import headDeal from '@/components/dialog/headDeal'  // 待办事项
export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    HeaderWrapper,
    Bfooter,
    SubMenu,
    OrderTitle

  },
  data () {
    return {
      subMenuOpen: true,   // 侧边栏是否打开，true:打开   false：关闭
      subTitle: '',
      ShowSubMenu: true,    // 是否显示侧边栏，点击首页没有侧边栏，包括按钮   true：显示   false：隐藏
      navSubActive: -1
    }
  },
  created () {
    // 首页不显示 侧边二级菜单
    if (this.$route.path === '/index') this.ShowSubMenu = false
    // TODO: 导航二级菜单 subTitle 刷新没有保存值
    sessionStorage.getItem('subTitle') ? this.subTitle = sessionStorage.getItem('subTitle') : this.subTitle = ''
  },
  computed: {
    sidebar () {
      return this.$store.state.app.sidebar
    }
  },
  methods: {
    // 点击收缩二级导航
    subMenuClick (val) {
      this.subMenuOpen = val
    },
    // 点击一级导航
    leftMenu (val) {
      val === '3' ? this.ShowSubMenu = false : this.ShowSubMenu = true
      this.navSubActive = Math.random() // 触发二级菜单 初始化
    },
    getSubTitle (val) {
      sessionStorage.setItem('subTitle', val)
      this.subTitle = val
    }
  },
  watch: {
    $route (to, from) {
      if (to.path === '/index') {
        this.ShowSubMenu = false
        this.subTitle = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
