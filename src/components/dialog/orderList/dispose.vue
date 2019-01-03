<template>
  <div class="dispose">
    <div class="common-dialog">
      <el-dialog title="售后管理"
                 :visible.sync="dialogFormVisible">

        <div class="info">
          <div class="info-item">
            <span class="small-title">买方申请：</span>
            <span>{{disposeData.afterclassDesc}}</span>
          </div>
          <div class="info-item">
            <span class="small-title">退款金额：</span>
            <span style="color:#FF2424;">{{disposeData.refund}} 元</span>
          </div>
          <div class="info-item">
            <span class="small-title">支付方式：</span>
            <span>{{disposeData.paymentDesc}}</span>
          </div>
          <div class="info-item">
            <span class="small-title">订单状态：</span>
            <span>{{disposeData.orderstatusDesc}}</span>
          </div>
          <div class="info-item">
            <span class="small-title">联系方式：</span>
            <span>{{disposeData.phone}}</span>
          </div>
          <div class="info-item">
            <span class="small-title">联系人：</span>
            <span>{{disposeData.username}}</span>
          </div>
          <div class="info-item">
            <span class="small-title">说明：</span>
            <span>{{disposeData.apply_instructions}}</span>
          </div>

        </div>
        <el-form>
          <el-form-item label="是否同意：">
            <el-radio v-model="radio1"
                      label="1">同意</el-radio>
            <el-radio style="margin-left: 45%;"
                      v-model="radio1"
                      label="2">不同意</el-radio>
          </el-form-item>
          <el-form-item label="说明：">
            <div>
              <div class="radio-item">
                <el-radio v-model="radio2"
                          label="3">与买家协商取消售后</el-radio>
              </div>
              <div class="radio-item">
                <el-radio v-model="radio2"
                          label="4">要求不合理</el-radio>
              </div>
              <div class="radio-item">
                <el-radio v-model="radio2"
                          label="5">其他</el-radio>
              </div>
            </div>

          </el-form-item>
          <el-form-item>
            <el-input type="textarea"
                      v-model="remark"
                      placeholder="请输入说明">
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button class="primary-btn"
                     @click="sendReplyDispose">确 定</el-button>
          <el-button class="cancel"
                     @click="dialogFormVisible = false">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// 获取数据api
import { replyDispose } from '@/api/order'
export default {
  name: 'dispose',
  props: {
    ShowDisposeDialog: {
      type: Boolean,
      default: false
    },
    disposeData: {
      type: Object,
      dafault: {}
    }
  },
  watch: {
    ShowDisposeDialog () {
      this.dialogFormVisible = this.ShowDisposeDialog
    },
    dialogFormVisible () {
      this.$emit('returnBool', this.dialogFormVisible)
    }
  },
  data () {
    return {
      dialogFormVisible: false,
      radio1: '1',
      radio2: '5',
      remark: ''

    }
  },
  methods: {
    sendReplyDispose () {
      let loading = this.$loading()
      let query = {
        orderId: this.disposeData.orderId,
        status: this.radio1,
        auditType: this.radio2,
        remark: this.remark,
        afterClass: this.disposeData.afterClass
      }
      replyDispose(query).then(res => {
        loading.close()
        if (res.data.success) {
          this.$message.success('操作成功')
          this.dialogFormVisible = false
        } else {
          this.$message.warning(res.data.message)
        }
      }).catch(() => {
        loading.close()
      })
    }
  }
}
</script>

<style lang="less" >
.dispose {
  .el-dialog__body {
    .el-radio__input.is-checked .el-radio__inner {
      border-color: #939393;
      background: #939393;
    }
    .el-radio__input.is-checked + .el-radio__label {
      color: #939393;
    }
    .info {
      margin: 0 20px;
      padding: 25px;
      border-bottom: 1px solid #dddddd;
      .info-item {
        .small-title {
          display: inline-block;
          width: 40%;
          text-align: right;
          padding: 15px;
        }
      }
    }
    .el-form {
      padding-top: 30px;
      .el-form-item__content {
        display: block;
        .radio-item {
          padding: 10px 0;
        }
      }
    }
  }
}
</style>