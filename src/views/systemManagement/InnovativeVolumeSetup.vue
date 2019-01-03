<template>
  <div class="service">
    <el-form ref="formList">
      <div class="select-group zx-flex between">
        <div class="select-item">
          <el-button type="primary"
                     icon="zxicon zx-xinzeng2"
                     class="margin_5"
                     @click="newProUp(false,'新增-创新卷免责协议',{},'1')">新增</el-button>
        </div>
      </div>
    </el-form>
    <div class="service-table">
      <div v-loading="loading">
        <el-table :data="tableData"
                  border
                  style="width: 100%"
                  tooltip-effect="dark"
                  ref="multipleTable">
          <el-table-column label="序号"
                           align="center"
                           type='index'></el-table-column>
          <el-table-column prop="name"
                           label="协议名称"
                           align="center">
          </el-table-column>
          <el-table-column prop="username"
                           label="上传人"
                           align="center">
          </el-table-column>
          <el-table-column prop="uploadtime"
                           label="上传时间"
                           align="center">
          </el-table-column>
          <el-table-column prop="statusdesc"
                           label="状态"
                           align="center">
          </el-table-column>
          <el-table-column label="操作"
                           align="center">
            <template slot-scope="scope">
              <el-button type="text"
                         size="small"
                         @click="newProUp(true,'详情-创新卷免责协议',scope.row,'1')">详情</el-button>
              <el-button type="text"
                         size="small"
                         v-text="scope.row.status==='1'?'禁用':'启用'"
                         @click='forbiddenEnable(scope.row.status,scope.row.id)'></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <orders-popup :showDialog='showDialog'
                  :row='row'
                  :isstate='isstate'
                  :title='dialogTitle'
                  :type='type'
                  @serviceDialog="serviceDialog"></orders-popup>
  </div>
</template>
<script>
import ordersPopup from './ordersPopup'
import '@/views/ShareService/serviceManager/service.css'
import { getProtocolList, updateProtocolStatus } from '@/api/systemManagementApi'
export default {
  components: {
    ordersPopup
  },
  data () {
    return {
      loading: false, // 加载
      tableData: [], // 表格列表数据
      dialogVisible: false,
      row: {}, // 单条数据源
      dialogTitle: '', // 标题
      isstate: false,
      showDialog: false,
      type: '',
      sTitle: '',
      forbiddenEnableForm: {
        type: 1,
        status: '',
        id: ''
      }
    }
  },
  methods: {
    getProtocolListGM () {
      this.loading = true
      getProtocolList(1).then(res => {
        if (res.data.success) {
          console.log(res.data)
          this.tableData = res.data.list
        }
        this.loading = false
      })
    },
    // 禁用 启用
    forbiddenEnable (status, id) {
      this.forbiddenEnableForm.id = id
      if (status === '1') {
        this.forbiddenEnableForm.status = 0
        this.sTitle = '禁用'
      } else {
        this.forbiddenEnableForm.status = 1
        this.sTitle = '启用'
      }
      updateProtocolStatus(this.forbiddenEnableForm).then(res => {
        if (res.data.success) {
          this.$message.success(this.sTitle + '成功')
        } else {
          this.$message.error(this.sTitle + '失败')
        }
        this.getProtocolListGM()
      })
    },
    // 新增 详情
    newProUp (val, tiele, row, type) {
      this.showDialog = true
      this.isstate = val
      this.dialogTitle = tiele
      this.row = row
      this.type = type
      console.log(val, tiele, row)
    },
    serviceDialog (val) {
      console.log(val)
      this.showDialog = false
      this.getProtocolListGM()
    }

  },
  created () {
    this.getProtocolListGM()
  },
  watch: {
  }

}
</script>
<style scoped>
.common-dialog .is-background {
  margin-top: 20px;
}
.service .select-group {
  padding-top: 0;
}
</style>


