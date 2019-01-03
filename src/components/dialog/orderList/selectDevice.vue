<template>
  <div class="changeDevice">
    <div class="common-dialog">
      <el-dialog title="变更设备"
                 :visible.sync="dialogFormVisible">
        <div class="common-table">
          <el-table :data="tableData"
                    border
                    current-row-key
                    style="width: 100%">
            <el-table-column prop="number"
                             align="center"
                             label="序号">
            </el-table-column>
            <el-table-column prop="deviceName"
                             align="center"
                             label="设备名称">
            </el-table-column>
            <el-table-column prop="typeNumber"
                             align="center"
                             label="型号规格">
            </el-table-column>
            <el-table-column prop="shareType"
                             align="center"
                             label="共享类型">
            </el-table-column>
            <el-table-column prop="aboutTime"
                             align="center"
                             label="单次标准工作时间（小时）">
            </el-table-column>
            <el-table-column prop="realTime"
                             align="center"
                             label="实际工作时长（小时）">
              <template slot-scope="scope">
                <el-input v-model="realTime[scope.$index]"
                          placeholder="请输入"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="handle"
                             align="center"
                             label="操作">
              <template slot-scope="scope">
                <span class='cursor'>查看</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div slot="footer"
             class="dialog-footer">
          <el-button class="primary-btn"
                     @click="dialogFormVisible = false">确 定</el-button>
          <el-button class="cancel"
                     @click="dialogFormVisible = false">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'changeDevice',
  props: {
    ShowChangeDevice: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    ShowChangeDevice () {
      this.dialogFormVisible = this.ShowChangeDevice
    },
    dialogFormVisible () {
      this.$emit('ChangeDevicetDialog', this.dialogFormVisible)
    }
  },
  data () {
    return {
      dialogFormVisible: false,
      tableData: [
        {
          number: '1',
          deviceName: '光仪器',
          typeNumber: 'SKD123331',
          shareType: '外部共享',
          aboutTime: '5',
          realTime: '5',
          remark: '变更设备'
        }, {
          number: '2',
          deviceName: '热仪器',
          typeNumber: 'SSD125421',
          shareType: '内部共享',
          aboutTime: '4',
          realTime: '4',
          remark: '变更设备'
        }
      ],
      realTime: []
    }
  }
}
</script>

<style lang="less" >
.changeDevice {
  .el-dialog__wrapper .el-dialog .el-dialog__body {
    padding-top: 30px;
  }
}
</style>