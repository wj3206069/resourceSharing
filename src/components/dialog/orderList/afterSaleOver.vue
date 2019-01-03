<template>
  <div class="afterSale">
    <div class="common-dialog">
      <el-dialog title="售后终止"
                 :visible.sync="dialogFormVisible">
        <div class="info"
             v-if="afterSaleOverData">
          <div class="info-item zx-flex align">
            <span class="small-title">买房申请</span>
            <p class="flex-1">{{afterSaleOverData.afterclassDesc}}</p>
          </div>
          <div class="info-item zx-flex align">
            <span class="small-title">说明：</span>
            <p class="flex-1 line-3">{{afterSaleOverData.apply_instructions}}</p>
          </div>
          <div class="info-item zx-flex align">
            <span class="small-title">时间：</span>
            <p class="flex-1">{{afterSaleOverData.createtime}}</p>
          </div>
          <div class="info-item zx-flex align">
            <span class="small-title">卖方回复：</span>
            <p class="flex-1">{{afterSaleOverData.saletalk}}</p>
          </div>
          <div class="info-item zx-flex align">
            <span class="small-title">说明：</span>
            <p class="flex-1 line-3">{{afterSaleOverData.audittypeDesc}}</p>
          </div>
        </div>
        <div slot="footer"
             class="dialog-footer">
          <el-button class="primary-btn"
                     @click="dialogFormVisible = false">返 回</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'afterSale',
  props: {
    ShowAfterSaleOver: {
      type: Boolean,
      default: false
    },
    afterSaleOverData: [Object]
  },
  watch: {
    ShowAfterSaleOver () {
      this.dialogFormVisible = this.ShowAfterSaleOver
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
  }
}
</script>

<style lang="less" >
.afterSale {
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
        p {
          min-height: 24px;
          line-height: 24px;
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