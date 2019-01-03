<template>
  <div class="menu-wrapper">
    <!-- <template v-for="item in routes"
              v-if="!item.hidden&&item.children">
      <template v-if="hasOneShowingChildren(item.children) && !item.children[0].children&&!item.alwaysShow">
        <router-link :to="item.path+'/'+item.children[0].path"
                     class="active"
                     :key="item.children[0].name">
          <el-menu-item :index="item.path+'/'+item.children[0].path"
                        :class="{'submenu-title-noDropdown':!isNest}">
            <span v-if="item.children[0].meta&&item.children[0].title"
                  slot="title">{{item.children[0].title}}</span>
          </el-menu-item>
        </router-link>
      </template>
      <el-submenu v-else
                  :index="item.name||item.path"
                  :key="item.name">
        <template slot="title">
          <span v-if="item.meta&&item.title"
                slot="title">{{item.title}}</span>
        </template>

        <template v-for="child in item.children"
                  v-if="!child.hidden">
          <sidebar-item :is-nest="true"
                        class="nest-menu"
                        v-if="child.children&&child.children.length>0&&!child.childHidden"
                        :routes="[child]"
                        :key="child.path"></sidebar-item>
          <template v-else>
            <router-link :to="item.path+'/'+child.path"
                         :key="child.name">
              <el-menu-item :index="item.path+'/'+child.path">
                <span v-if="child.meta&&child.title"
                      slot="title">{{child.title}}</span>
              </el-menu-item>
            </router-link>
          </template>
        </template>
      </el-submenu>
    </template> -->

    <template v-for="(item,index) in routes"
              v-if="!item.hidden">
      <template v-if="item.name=='index'">
        <router-link :to="item.path"
                     :key="item.title">
          <el-menu-item class="submenu-title-noDropdown"
                        :index="index.toString()"
                        @click="handleLeftMenu">
            <i :class="item.icon"></i>
            <span>{{item.title}}</span>
          </el-menu-item>
        </router-link>
      </template>
      <template v-else>
        <el-menu-item class="submenu-title-noDropdown"
                      :index="index.toString()"
                      :key="item.name"
                      @click="handleLeftMenu">
          <i :class="item.icon"></i>
          <span>{{item.title}}</span>
        </el-menu-item>
      </template>
    </template>
  </div>
</template>

<script>

export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  created () {
    // console.log(this.routes)
  },
  methods: {
    hasOneShowingChildren (children) {
      const showingChildren = children.filter(item => {
        return !item.hidden
      })
      if (showingChildren.length === 1) {
        return true
      }
      return false
    },
    // 点击左边菜单
    handleLeftMenu (val) {
      console.log(val, 'val')
      this.$emit('leftMenu', val.index)
      sessionStorage.removeItem('subActive')
    }
  }
}
</script>
