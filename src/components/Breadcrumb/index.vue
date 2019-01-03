<template>
  <el-breadcrumb class="app-breadcrumb">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in list"
                          :key="item.path"
                          v-if="item.title">
        <span v-if="item.redirect==='noredirect'||index==list.length - 1"
              class="no-redirect">{{item.title}}</span>
        <router-link v-else
                     :to="item.redirect||item.path">{{item.title}}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'breadcrumb',
  props: {
    list: {
      type: Array,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  font-size: 14px;
  display: inline-block;
  line-height: 50px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>

