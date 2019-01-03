<template>
  <div class="sampleReceived">
    <div class="common-dialog">
      <el-dialog title="样品接收"
                 :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item>
            <el-radio v-model="radio"
                      label="1">样品正常</el-radio>
            <el-radio style="margin-left: 45%;"
                      v-model="radio"
                      label="2">样品异常</el-radio>
          </el-form-item>
          <el-form-item label="异常说明：">
            <el-input type="textarea"
                      :disabled="radio === '1'"
                      v-model="errDesc"
                      placeholder="请输入样品异常说明">
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button class="primary-btn"
                     @click="goCheckSample">确 定</el-button>
          <el-button class="cancel"
                     @click="dialogFormVisible = false">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// 获取数据api
import { checkSample } from '@/api/order'
export default {
  name: 'SampleReceived',
  props: {
    ShowSamRecDialog: {
      type: Boolean,
      default: false
    },
    orderId: [String]
  },
  watch: {
    ShowSamRecDialog () {
      this.dialogFormVisible = this.ShowSamRecDialog
    },
    dialogFormVisible () {
      this.$emit('returnBool', this.dialogFormVisible)
    }
  },
  data () {
    return {
      dialogFormVisible: false,
      radio: '1',
      errDesc: '',
      form: {}
    }
  },
  methods: {
    goCheckSample () {
      let query = {
        orderId: this.orderId,
        status: this.radio,
        badDesc: this.radio === '2' ? this.errDesc : ''
      }
      checkSample(query).then(res => {
        if (res.data.success) {
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.dialogFormVisible = false
        } else {
          this.$message({
            type: 'warning',
            message: 'res.data.message'
          })
        }
      })
    }
  }
}
</script>

<style lang="less" >
.sampleReceived {
  .el-dialog__body {
    padding-top: 20px;
    .el-radio__input.is-checked .el-radio__inner {
      border-color: #939393;
      background: #939393;
    }
    .el-radio__input.is-checked + .el-radio__label {
      color: #939393;
    }
  }
}
</style>