<template>
  <div class="toSend">
    <div class="common-dialog">
      <el-dialog title="我要寄件"
                 :visible.sync="dialogFormVisible">
        <el-form :model="form"
                 :rules="rules">
          <el-form-item label="快递公司："
                        prop='compamy'>
            <el-select v-model="form.compamy"
                       placeholder="请选择">
              <el-option v-for="item in DHL"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="快递单号："
                        prop="number">
            <el-input v-model="form.number"
                      autocomplete="off"
                      placeholder="请输入快递单号"></el-input>
          </el-form-item>
          <el-form-item label="快递说明："
                        prop="remark">
            <el-input type="textarea"
                      v-model="form.remark"
                      placeholder="请备注快递说明">
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button class="primary-btn"
                     @click="sendExpressage">确 定</el-button>
          <el-button class="cancel"
                     @click="dialogFormVisible = false">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { goExpressage } from '@/api/order'
export default {
  name: 'toSend',
  props: {
    ShowToSendDialog: {
      type: Boolean,
      default: false
    },
    DHL: {
      type: Array,
      default: []
    },
    orderId: {
      type: String,
      default: ''
    }
  },
  watch: {
    ShowToSendDialog () {
      this.dialogFormVisible = this.ShowToSendDialog
    },
    dialogFormVisible () {
      this.$emit('returnBool', this.dialogFormVisible)
    }
  },
  data () {
    return {
      dialogFormVisible: false,
      form: {
        compamy: '',
        number: '',
        remark: ''
      },
      rules: {
        compamy: [
          { required: true, message: '请选择快递公司', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '请输入快递单号', trigger: 'blur' }
        ],
        remark: [
          { required: false, message: '请备注快递说明', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    sendExpressage () {
      let query = {
        orderId: this.orderId,
        dhl: this.form.compamy,
        expressNo: this.form.number,
        rem: this.form.remark ? this.form.remark : ''
      }
      goExpressage(query).then(res => {
        if (res.data.success) {
          this.dialogFormVisible = false
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: res.data.message,
            type: 'warning'
          })
        }
      })
    }
  }
}
</script>

<style lang="less" >
.toSend {
  .el-dialog__wrapper .el-dialog .el-dialog__body {
    padding-top: 30px;
  }
}
</style>