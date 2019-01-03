<template>
  <div class="service">
    <el-form ref="formList">
      <div class="select-group zx-flex between">
        <div class="select-item">
          <el-button type="primary"
                     icon="zxicon zx-xinzeng2"
                     class="margin_5"
                     @click="newProUp(false,'新增-机构资质',{},'3')">新增</el-button>
        </div>
      </div>
    </el-form>
    <div class="service-table">
      <div v-loading="loading"
           element-loading-text="拼命加载中"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(0,0,0,0.8)">
        <el-table :data="tableData"
                  border
                  style="width: 100%"
                  tooltip-effect="dark"
                  ref="multipleTable">
          <el-table-column label="序号"
                           align="center"
                           type="index"></el-table-column>
          <el-table-column prop="name"
                           label="资质名称"
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
                         @click="newProUp(true,'详情-委托单',scope.row,'3')">详情</el-button>
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
import ordersPopup from '../ordersPopup'
import '@/views/ShareService/serviceManager/service.css'
import { getQualificationsList } from '@/api/systemManagementApi'
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
      forbiddenEnableForm: {
        type: 3,
        status: '',
        id: ''
      },
      formQualifications: {
        pageIndex: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    // 获取列表数据
    getQualificationsListGM () {
      this.loading = true
      getQualificationsList({
        pageIndex: 1,
        pageSize: 10
      }).then(res => {
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
      } else {
        this.forbiddenEnableForm.status = 1
      }
    },

    // 新增 详情
    newProUp (val, tiele, row, type) {
      this.showDialog = true
      this.isstate = val
      this.dialogTitle = tiele
      this.row = row
      this.type = type
      console.log(val, tiele, row, type)
    },
    serviceDialog (val) {
      console.log(val)
      this.showDialog = false
    }

  },
  created () {
    this.getQualificationsListGM()
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


