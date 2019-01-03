<template>
  <div class="service">
    <el-form ref="formList">
      <div class="select-group zx-flex between">
        <div class="select-item">
          <el-button type="primary"
                     icon="zxicon zx-xinzeng2"
                     class="margin_5"
                     @click="newProUp(false,'新增-机构资质',{})">新增</el-button>
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
                           prop='rowno'></el-table-column>
          <el-table-column prop="detectaptitude"
                           label="资质名称"
                           align="center">
          </el-table-column>
          <el-table-column prop="creator"
                           label="上传人"
                           align="center">
          </el-table-column>
          <el-table-column prop="createtime"
                           label="上传时间"
                           align="center">
          </el-table-column>
          <el-table-column label="状态"
                           align="center">
            <template slot-scope="scope">
              <span v-text="scope.row.status==='0'?'禁用':'启用'"></span>
            </template>
          </el-table-column>
          <el-table-column label="操作"
                           align="center">
            <template slot-scope="scope">
              <el-button type="text"
                         size="small"
                         @click="newProUp(true,'详情-机构资质',scope.row)">详情</el-button>
              <el-button type="text"
                         size="small"
                         v-text="scope.row.status==='1'?'禁用':'启用'"
                         @click='forbiddenEnable(scope.row.status,scope.row.id)'></el-button>

            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <institutional-popup :showDialog='showDialog'
                         :row='row'
                         :isstate='isstate'
                         :title='dialogTitle'
                         @serviceDialog="serviceDialog"></institutional-popup>

  </div>
</template>
<script>
import institutionalPopup from './institutionalPopup'
import '@/views/ShareService/serviceManager/service.css'
import './InManagementList.css'
import { getQualificationsList, enableShutdown } from '@/api/systemManagementApi'
export default {
  components: {
    institutionalPopup
  },
  data () {
    return {
      loading: false, // 加载
      tableData: [], // 表格列表数据
      dialogVisible: false,
      row: {}, // 单条数据源
      dialogTitle: '', // 标题
      sTitle: '',
      isstate: false,
      showDialog: false,
      formQualifications: {
        pageIndex: 1,
        pageSize: 10
      }// 列表
    }
  },
  methods: {
    // 获取列表数据
    getQualificationsListGM () {
      this.loading = true
      getQualificationsList(this.formQualifications).then(res => {
        if (res.data.success) {
          console.log(res.data)
          this.tableData = res.data.resultList
        }
        this.loading = false
      })
    },
    // 禁用 启用
    forbiddenEnable (status, id) {
      let qurey = {
        id: id
      }
      if (status === '1') {
        qurey.status = 0
        this.sTitle = '禁用'
      } else {
        qurey.status = 1
        this.sTitle = '启用'
      }
      enableShutdown(qurey).then(res => {
        if (res.data.success) {
          this.$message.success(this.sTitle + '成功')
        } else {
          this.$message.error('设置失败')
        }
        this.getQualificationsListGM()
      })
    },

    // 新增 详情
    newProUp (val, tiele, row) {
      this.showDialog = true
      this.isstate = val
      this.dialogTitle = tiele
      this.row = row
      console.log(val, tiele, row)
    },
    serviceDialog (val) {
      console.log(val)
      this.showDialog = false
      this.getQualificationsListGM()
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


