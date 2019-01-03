<template>
  <div class="common-dialog">
    <el-dialog el-dialog
               :title="title"
               :visible.sync="dialogVisible">
      <slot></slot>
      <span slot="footer"
            class="dialog-footer">
        <el-button v-for="(item, index) in dialogFooter"
                   :key="index"
                   :style="item.color"
                   v-show="item.isShow"
                   @click.stop.prevent="onDialogFooter(index)">{{item.name}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'createUnit',
  data () {
    return {
      dialogVisible: false
    }
  },
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    dialogFooter: {
      type: Array,
      default: () => {
        return [{
          name: '上一步',
          color: 'background: #61A3FE;',
          isShow: false
        }, {
          name: '保存',
          color: 'background: #61A3FE;',
          isShow: true
        }, {
          name: '取消',
          color: 'background: #ccc;',
          isShow: true
        }]
      }
    },
    url: {
      type: Array,
      deafult: []
    }
  },
  watch: {
    showDialog () {
      this.dialogVisible = this.showDialog
    },
    dialogVisible () {
      this.$emit('returnBool', this.dialogVisible)
    }
  },
  methods: {
    onDialogFooter (index) {
      switch (index) {
        case 0:
          // 上一步
          this.$emit('nextStepSuccess', 1)
          break
        case 1:
          // 保存
          let _url
          (this.url.length === 1) || (_url = this.url[0])
          this.dialogFooter[0].isShow && this.url.length > 1 ? _url = this.url[1] : _url = this.url[0]

          this.stepSave(_url).then((res) => {
            this.$emit('nextStepSuccess', 2)
          })
          break
        default:
          // 取消
          this.dialogVisible = false
          break
      }
    },
    // 保存
    stepSave (_url) {
      //  Promise
      return new Promise((resolve, reject) => {
        // ajax
        this.$message.success('保存成功' + _url)
        resolve('成功')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-button {
  border: none;
  border-radius: 10px;
  color: #fff;
}
</style>