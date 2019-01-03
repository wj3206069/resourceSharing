<template>
  <div>
    <h3 class="navbar-title">
      <!-- {{list[list.length - 1].title}} -->
      {{routername}}
    </h3>
    <!-- <el-menu class="navbar">
      <breadcrumb :list="list"></breadcrumb>
    </el-menu> -->
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'

export default {
  components: {
    Breadcrumb
  },
  data() {
    return {
      list: null,
      routername: null
    }
  },
  created() {
    this.getRoute()
  },
  watch: {
    $route() {
      this.getRoute()
    }
  },
  methods: {
    getRoute() {
      let matched = this.$route.matched.filter(item => item.name)
      // const first = matched[0]
      // if (first && first.name !== 'index') {
      //   matched = [{path: '/index', meta: {title: '首页'}}].concat(matched)
      // }
      this.list = matched
      this.routername = []
      this.getAllRoute(this.list[this.list.length - 1])
      this.routername.reverse()
      this.routername = this.routername.join(' > ')
    },
    getAllRoute(row) {
      if (row.meta.show || row.meta.show === undefined) {
        this.routername.push(row.title)
      }
      if (row.parent) {
        this.getAllRoute(row.parent)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  &-title {
    margin: 0;
    font-size: 23px;
    font-weight: 500;
    padding-bottom: 15px;
  }
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  border-right: none !important;
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
}
</style>

