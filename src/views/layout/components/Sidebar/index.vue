<template>
  <scroll-bar>
    <el-menu mode="vertical"
             :default-active="routePath"
             unique-opened
             background-color="#3c4d53"
             :collapse="isCollapse"
             text-color="#fff"
             active-text-color="#00deff">
      <sidebar-item :routes="permission_routers"
                    @leftMenu='leftMenu'></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'

export default {
  components: {
    SidebarItem,
    ScrollBar
    // SubMenu
  },
  computed: {
    ...mapGetters(['permission_routers', 'sidebar']),
    routePath () {
      let arr = this.$route.path.split('/')
      let path = ''
      if (arr.length > 2) {
        path = `/${arr[1]}/${arr[2]}`
      } else {
        path = `/${arr[1]}`
      }
      return path
    },
    isCollapse () {
      return !this.sidebar.opened
    }
  },
  methods: {
    ...mapMutations({
      setMenuList: 'setMenuList'
    }),
    leftMenu (val) {
      this.$emit('leftMenu', val)
      if (val === '3') return
      this.setMenuList(this.permission_routers[val])
      let name = this.permission_routers[val].children[0].name
      let title = this.permission_routers[val].children[0].title
      // 点击一级菜单自动显示一级菜单的第一个子菜单的内容
      this.$router.push({ name: name })
      // 点击一级菜单自动显示一级菜单的第一个子菜单的标题
      this.$emit('getSubTitle', title)
    }
  }
}
</script>

<style>
</style>
