<template>
  <div class="ExpertExamine unitUser zx-flex column">
    <!-- 筛选条件 -->
    <div class="select-group zx-flex between">
      <div class="select-item">
        <label for="">状态：</label>
        <el-select v-model="status"
                   @change="initTableData">
          <el-option label="待审核"
                     value="2"></el-option>
          <el-option label="已审核"
                     value="3"></el-option>
        </el-select>
      </div>
      <div class="select-item">
        <div class="operation-button zx-flex align">
          <el-button v-if="status==2"
                     type="primary"
                     icon="zxicon zx-piliangshenhe"
                     @click.stop.prevent="showAuditManyDialog">批量审核</el-button>
        </div>
      </div>
    </div>
    <!-- 列表 -->
    <div class="flex-1"
         style="min-height: 100px;">
      <el-scrollbar style="height: 100%;">
        <div class="unitUser-table common-table mg-t-20">
          <el-table :data="tableData"
                    border
                    v-loading="loading"
                    @selection-change="handleSelectionChange"
                    style="width: 100%">
            <el-table-column type="selection"
                             align="center"
                             width="50">
            </el-table-column>
            <el-table-column prop="rowno"
                             align="center"
                             label="序号"
                             width="50">
            </el-table-column>
            <el-table-column prop="username"
                             align="center"
                             label="用户名称">
            </el-table-column>
            <el-table-column prop="idcard"
                             align="center"
                             label="身份证号"
                             width="150">
            </el-table-column>
            <el-table-column prop="phone"
                             align="center"
                             label="手机号">
            </el-table-column>
            <el-table-column prop="experttitle"
                             align="center"
                             label="专家职称">
              <template slot-scope="scope">
                <p v-if="scope.row.experttitle===item.fieldcode"
                   v-for="item in exportTitle"
                   :key="item.fieldcode"
                   v-text="item.fieldname"></p>
              </template>
            </el-table-column>
            <el-table-column prop="technicalfield"
                             align="center"
                             label="专业领域">
            </el-table-column>
            <el-table-column prop="usersource"
                             align="center"
                             label="用户来源">
            </el-table-column>
            <el-table-column prop="auditstatus"
                             align="center"
                             label="审核状态">
              <template slot-scope="scope">
                <span v-text="scope.row.auditstatus==='2'?'审核中':'已审核'"></span>
              </template>
            </el-table-column>
            <el-table-column prop="createtime"
                             align="center"
                             label="申请日期">
            </el-table-column>
            <el-table-column prop="createtime"
                             align="center"
                             label="操作"
                             width="110">
              <template slot-scope="scope">
                <span class="particulars"
                      v-if="scope.row.auditstatus==='2'&&status==='1'"
                      @click.stop.prevent="showAuditDialog(scope.row)">审核</span>
              </template>
            </el-table-column>
          </el-table>
          <div class="deal-page">
            <el-pagination background
                           layout="prev, pager, next"
                           :total="total"
                           @current-change="CurrentPage"></el-pagination>
          </div>
        </div>
      </el-scrollbar>
    </div>

    <!-- 单个审核弹框 -->
    <exp-audit :showDialog="showDialog"
               :row="row"
               :exportTitle="exportTitle"
               @returnBool="closeAuditDialog"></exp-audit>

    <!-- 批量审核弹框 -->
    <audit-many :showDialog='showDialogMany'
                :rowList='rowList'
                :myParent=3
                @closeAuditManyDialog="closeAuditManyDialog"></audit-many>
  </div>
</template>

<script>
import ExpAudit from '@/components/dialog/audit/ExpAuditDialog'
import AuditMany from '@/components/dialog/AuditManyDialog'
import { exportList } from '@/api/waitDeal/EquExaAPI.js'
import { getSelectData } from '@/api/EquipService/EquipManagerAPI.js'

export default {
  name: 'ExpertExamine',
  components: {
    ExpAudit,
    AuditMany
  },
  data () {
    return {
      loading: true,
      status: '2',           // select框--审核状态--默认待审核
      multipleSelection: [],
      showDialog: false,      // 单个审核弹框
      row: {},                // 单个审核所选行的信息
      showDialogMany: false,  // 批量审核弹框
      rowList: [],       // 批量删除传给子组件的列表
      page: '1',        // 当前页数
      total: 1,         // 总页数
      exportTitle: [],   // 专家职称
      tableData: []

    }
  },
  created () {
    this.initTableData()

    getSelectData('ExpertTitle').then(res => {
      const data = res.data
      if (data.success) {
        this.exportTitle = data.list
      }
    })
  },
  methods: {
    initTableData () {
      this.loading = true
      let query = {
        whetherexpert: '1', //   是否专家
        userstatus: '',    //   用户状态
        usersource: '',    //    用户来源
        username: '',      //   用户名称
        auditstatus: this.status,   //   审核状态（2，表示审核列表）
        unit_id: '',        //    单位id（如果传入id，那么就会是人员列表）
        pageIndex: this.page,  // 当前页
        pageSize: '10'  // 每页数量
      }
      exportList(query).then(res => {
        const data = res.data
        if (data.success) {
          this.tableData = data.resultList
          this.total = parseInt(data.pageInfo.totalRecord)
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 获取当前页
    CurrentPage (val) {
      this.page = val
      this.initTableData()
    },
    // 单个审核弹框
    showAuditDialog (val) {
      this.row = val
      this.showDialog = true
    },
    closeAuditDialog (val) {
      this.showDialog = false
      this.initTableData()
    },
    // 批量审核弹框
    showAuditManyDialog () {
      if (this.multipleSelection.length === 0) return
      this.rowList = this.multipleSelection
      this.showDialogMany = true
    },
    closeAuditManyDialog () {
      this.showDialogMany = false
      this.initTableData()
    }
  }
}
</script>

<style lang='less' scoped>
.unitUser {
  padding: 20px;
  width: 100%;
  .operation-button {
    button {
      padding: 11px 16px;
      background-color: #61a3fe;
      border: none;
      border-radius: 10px;
    }
  }
  .select-group {
    padding-top: 20px;
    .select-item {
      margin-left: 10px;
      label {
        font-size: 14px;
      }
      .el-select {
        width: 150px;
        height: 36px;
        input {
          height: 36px;
          border: 1px solid #939393;
        }
      }
    }
  }
  .unitUser-table {
    overflow-y: auto;
    .el-table {
      th {
        background-color: #61a3fe;
        color: white;
      }
      .no-public {
        color: #ff5129;
      }
      .particulars {
        color: #61a3fe;
        cursor: pointer;
      }
    }
    .el-table--border th,
    .el-table--border td {
      border-right: none;
      height: 50px;
    }
    .el-table th.is-leaf,
    .el-table td {
      border: none;
    }
    .el-pagination.is-background {
      padding-top: 20px;
      text-align: center;
    }
  }
}
</style>