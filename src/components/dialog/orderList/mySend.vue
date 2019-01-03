<template>
  <div class="mySend">
    <div class="common-dialog">
      <el-dialog title="我的寄件"
                 :visible.sync="dialogFormVisible">
        <div class="common-table">
          <el-table :data="tableData"
                    border
                    style="width: 100%">
            <el-table-column prop="number"
                             align="center"
                             label="快递单号">
            </el-table-column>
            <el-table-column prop="company"
                             align="center"
                             label="快递公司">
            </el-table-column>
            <el-table-column prop="time"
                             align="center"
                             label="上传时间">
            </el-table-column>
            <el-table-column prop="remark"
                             align="center"
                             label="快递说明">
            </el-table-column>
          </el-table>
        </div>
        <div slot="footer"
             class="dialog-footer">
          <!-- <el-button class="primary-btn"
                     @click="dialogFormVisible = false">确 定</el-button> -->
          <el-button class="cancel"
                     @click="dialogFormVisible = false">返 回</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mySend',
  props: {
    ShowMySendDialog: {
      type: Boolean,
      default: false
    },
    mySendData: {
      type: Array,
      default: []
    }
  },
  watch: {
    ShowMySendDialog () {
      this.dialogFormVisible = this.ShowMySendDialog
      this.ShowMySendDialog ? this.tableData = this.mySendData : this.tableData = []
    },
    dialogFormVisible () {
      this.$emit('returnBool', this.dialogFormVisible)
    }
  },
  data () {
    return {
      dialogFormVisible: false,
      tableData: [
        // {
        //   number: '86651651616',
        //   company: '圆通快递',
        //   time: '2018-05-12',
        //   remark: '备注说明备注说明'
        // }, {
        //   number: '98548156156',
        //   company: '顺丰快递',
        //   time: '2018-10-26',
        //   remark: '备注说明备注说明'
        // }
      ]

    }
  }
}
</script>

<style lang="less" >
.mySend {
  .el-dialog__wrapper .el-dialog .el-dialog__body {
    padding: 30px 20px;
  }
}
</style>