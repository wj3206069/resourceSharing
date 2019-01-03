<template>
  <div class="scroll-container" ref="scrollContainer" @wheel.prevent="handleScroll">
    <!-- <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger> -->
    <div class="scroll-wrapper" ref="scrollWrapper" :style="{top: top + 'px'}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
// import Hamburger from '@/components/Hamburger'
const delta = 15
export default {
  name: 'scrollBar',
  // components: {
  //   Hamburger
  // },
  data () {
    return {
      top: 0
    }
  },
  methods: {
    handleScroll (e) {
      const eventDelta = e.wheelDelta || -e.deltaY * 3
      const $container = this.$refs.scrollContainer
      const $containerHeight = $container.offsetHeight
      const $wrapper = this.$refs.scrollWrapper
      const $wrapperHeight = $wrapper.offsetHeight
      if (eventDelta > 0) {
        this.top = Math.min(0, this.top + eventDelta)
      } else {
        if ($containerHeight - delta < $wrapperHeight) {
          if (this.top < -($wrapperHeight - $containerHeight + delta)) {
            this.top = this.top
          } else {
            this.top = Math.max(this.top + eventDelta, $containerHeight - $wrapperHeight - delta)
          }
        } else {
          this.top = 0
        }
      }
    }
    // toggleSideBar () {
    //   this.$store.dispatch('ToggleSideBar')
    // }
  },
  computed: {
    // ...mapGetters([
    //   'sidebar'
    // ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../styles/variables.scss';

.scroll-container {
  position: relative;
  width: 100%;
  // height: 100%;
  background: $menuBg;
  border-right: 1px $menuBg solid; 
  .scroll-wrapper {
    position: absolute;
     width: 100%!important;
  }
}
</style>
