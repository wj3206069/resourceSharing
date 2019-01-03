<template>
  <div class="zx-flex align fs-14 grey">
    <div class="classify-name">{{titleVal}}：</div>
    <el-select v-model="chooseItem"
               filterable
               @change="getValue"
               placeholder="全部（可输入）">
      <el-option v-for="(item, index) in options"
                 :key="index"
                 :label="item.label"
                 :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'classify',
  props: {
    titleVal: [String],
    options: [Array]
  },
  data () {
    return {
      chooseItem: ''
    }
  },
  methods: {
    getValue (val) {
      this.options.find(item => {
        if (item.value === val) {
          this.$emit('returnSelectVal', this.chooseItem)
        }
      })
    },
    // 请款内容
    reset () {
      this.chooseItem = ''
      this.$emit('returnSelectVal', this.chooseItem)
    }
  }
}
</script>

<style lang="less" scoped>
.classify-name {
  margin-right: 5px;
  min-width: 45px;
}
</style>
