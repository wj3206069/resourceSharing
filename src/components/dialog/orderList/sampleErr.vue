<template>
  <div class="sampleErr">
    <div class="common-dialog">
      <el-dialog title="样品异常"
                 :visible.sync="dialogFormVisible">
        <div class="common-table">
          <el-table :data="sampleErrData"
                    border
                    current-row-key
                    style="width: 100%">
            <el-table-column prop="expressno"
                             align="center"
                             label="快递单号">
            </el-table-column>
            <el-table-column prop="baddesc"
                             align="center"
                             label="异常说明">
            </el-table-column>
            <el-table-column prop="opertename"
                             align="center"
                             label="操作员">
            </el-table-column>
            <el-table-column prop="opertetime"
                             align="center"
                             label="操作时间">
            </el-table-column>
          </el-table>
        </div>
        <div slot="footer"
             class="dialog-footer">
          <el-button class="cancel"
                     @click="dialogFormVisible = false">返回</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  opertename: 'sampleErr',
  props: {
    ShowSampleErr: {
      type: Boolean,
      default: false
    },
    sampleErrData: {
      type: Array,
      default: []
    }
  },
  watch: {
    ShowSampleErr () {
      this.dialogFormVisible = this.ShowSampleErr
    },
    dialogFormVisible () {
      this.$emit('returnBool', this.dialogFormVisible)
    }
  },
  data () {
    return {
      dialogFormVisible: false,
      tableData: [
        {
          expressno: '165465465465',
          baddesc: '样品发热',
          opertename: '李四',
          opertetime: '2018-11-11 20:11'
        }
      ]
    }
  }
}
</script>

<style lang="less" >
.sampleErr {
  .el-dialog__wrapper .el-dialog .el-dialog__body {
    padding-top: 30px;
  }
}
</style>