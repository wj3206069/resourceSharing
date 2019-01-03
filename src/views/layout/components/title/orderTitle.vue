<template>
  <div class="zx-title zx-flex align bg-white line-bottom fs-16 c-grey">{{titleVal}}</div>
</template>

<script>
export default {
  name: 'zxTitle',
  props: ['titleVal']
}
</script>

<style lang="less" scoped>
@import '../../../../assets/style/color.less';
.zx-title {
  position: relative;
  height: 50px;
  padding-left: 45px;
  &::before {
    content: ' ';
    position: absolute;
    left: 20px;
    top: 14px;
    width: 6px;
    height: 22px;
    background-color: @primary;
  }
}
</style>
