<template>
  <div class="changeDevice">
    <div class="common-dialog">
      <el-dialog title="变更设备"
                 :visible.sync="dialogFormVisible">
        <div class="common-table">
          <el-table :data="changeDeviceData"
                    border
                    current-row-key
                    style="width: 100%">
            <el-table-column type="index"
                             label="序号"
                             width="80"
                             header-align="center"
                             align="center">
            </el-table-column>
            <el-table-column prop="cname"
                             align="center"
                             label="设备名称">
            </el-table-column>
            <el-table-column prop="specification"
                             align="center"
                             label="型号规格">
            </el-table-column>
            <el-table-column prop="sharingtype"
                             align="center"
                             label="共享类型">
            </el-table-column>
            <el-table-column prop="standard"
                             align="center"
                             label="单次标准工作时间（小时）">
            </el-table-column>
            <el-table-column align="center"
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
                <span class='cursor'
                      @click="toSelectDevice(scope.row, scope.$index)">变更设备</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div slot="footer"
             class="dialog-footer">
          <el-button class="primary-btn"
                     @click="_confirmChangeDevice">确 定</el-button>
          <el-button class="cancel"
                     @click="dialogFormVisible = false">取 消</el-button>
        </div>
      </el-dialog>

      <!-- 选择变更设备弹窗 -->
      <el-dialog id="select-device"
                 title="选择变更设备"
                 :visible.sync="dialogFormVisible_select">
        <div class="flex">
          <div class="flex">
            <div class="flex shebei_c">
              <span style="width: 95px;">设备名称：</span>
              <el-input style="width:150px"
                        v-model="instrumentName"
                        placeholder="请输入设备名称"></el-input>
            </div>
            <div class="flex shebei_c">
              <span style="width: 95px;">设备型号：</span>
              <el-input style="width:150px"
                        v-model="instrumentType"
                        placeholder="请输入设备型号"></el-input>
            </div>
          </div>
          <div class="flex btn_pos">
            <el-button type="primary"
                       @click.stop.prevent="goQuery">查询</el-button>
            <el-button type="danger"
                       @click.stop.prevent="goReset">重置</el-button>
          </div>
        </div>
        <div class="common-table">
          <el-table :data="sameDevice"
                    border
                    current-row-key
                    style="width: 100%">
            <el-table-column type="index"
                             label="序号"
                             width="80"
                             header-align="center"
                             align="center">
            </el-table-column>
            <el-table-column prop="cname"
                             align="center"
                             label="设备名称">
            </el-table-column>
            <el-table-column prop="specification"
                             align="center"
                             label="型号规格">
            </el-table-column>
            <el-table-column prop="application"
                             align="center"
                             label="设备适用范围">
            </el-table-column>
            <el-table-column prop="standard"
                             align="center"
                             label="单次标准工作时间（小时）">
            </el-table-column>
            <el-table-column prop="handle"
                             align="center"
                             label="操作">
              <template slot-scope="scope">
                <span class='cursor'
                      @click.stop.prevent="confirmTheChoice(scope.row)">选择</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div slot="footer"
             class="dialog-footer">
          <!-- <el-button class="primary-btn"
                     @click="dialogFormVisible_select = false">确 定</el-button> -->
          <!-- 分页 -->
          <el-pagination v-if="sameDevice.length > 0"
                         background
                         layout="prev, pager, next"
                         :page-size="pageSize"
                         :total="totalRecord"
                         class="mg-t-20 text-c"
                         :current-page="currentPage"
                         @current-change="currentChange">
          </el-pagination>
          <el-button class="cancel"
                     @click="dialogFormVisible_select = false">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// 获取数据api
import { getCheckDevice, confirmChangeDevice } from '@/api/order'
export default {
  name: 'changeDevice',
  props: {
    ShowChangeDevice: {
      type: Boolean,
      default: false
    },
    changeDeviceData: {
      type: Array,
      dafault: []
    },
    orderId: {
      type: String,
      dafault: ''
    }
  },
  watch: {
    ShowChangeDevice () {
      this.dialogFormVisible = this.ShowChangeDevice
    },
    dialogFormVisible () {
      this.$emit('returnBool', this.dialogFormVisible)
    }
  },
  data () {
    return {
      dialogFormVisible: false,
      dialogFormVisible_select: false,
      realTime: [],
      sameDevice: [],
      currentPage: 1,
      pageSize: 5,
      instrumentName: '',
      instrumentType: '',
      instrument_id: '',
      totalRecord: '',
      selectIndex: ''
    }
  },
  methods: {
    // 获取数据
    getData () {
      let loading = this.$loading()
      let query = {
        orderId: this.orderId,
        instrumentId: this.instrument_id,
        pageIndex: this.currentPage,
        pageSize: this.pageSize,
        instrumentName: this.instrumentName,
        instrumentType: this.instrumentType
      }
      getCheckDevice(query).then(res => {
        loading.close()
        if (res.data.success) {
          this.sameDevice = res.data.list
          this.totalRecord = res.data.pageInfo.totalRecord
          this.dialogFormVisible_select = true
        } else {
          this.$message.error(res.data.message)
        }
      }).catch(() => {
        loading.close()
      })
    },
    // 查询同类型的设备
    toSelectDevice (item, index) {
      this.instrument_id = item.instrument_id
      this.selectIndex = index
      // this.selectIndex = this.changeDeviceData.findIndex((val, index) => {
      //   if (val === item) return index
      // })
      this.getData()
    },
    // 查询
    goQuery () {
      this.getData()
    },
    // 重置
    goReset () {
      this.instrumentName = ''
      this.instrumentType = ''
      this.getData()
    },
    // 下一页
    currentChange (val) {
      this.currentPage = val // 改变当前页码
      this.getData()
    },
    // 选择更改项
    confirmTheChoice (item) {
      this.changeDeviceData.splice(this.selectIndex, 1, item)
      this.dialogFormVisible_select = false
    },
    // 确认
    _confirmChangeDevice () {
      let tmep = []
      this.changeDeviceData.map((item, index) => {
        tmep.push({
          instrumentId: item.instrument_id,
          actualTime: this.realTime[index] ? this.realTime[index] : item.actual_time
        })
      })
      let query = {
        orderId: this.orderId,
        instrumentJson: JSON.stringify(tmep)
      }
      confirmChangeDevice(query).then(res => {

      })
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
.shebei_c {
  padding-bottom: 20px;
  align-items: center;
  text-align: -webkit-center;
}
.btn_pos {
  height: 40px;
  width: 100%;
  justify-content: flex-end;
  padding-right: 10px;
}
#select-device {
  top: 100px;
  right: 20px;
  height: 600px;
  .el-dialog {
    width: 860px !important;
    height: auto;
  }
  .el-dialog__body {
    height: auto;
  }
}
</style>