<template>
  <div class="unitUser zx-flex column">
    <!-- 筛选条件 -->
    <div class="select-group zx-flex">
      <div class="select-item">
        <div class="operation-button zx-flex align">
          <el-button type="primary"
                     icon="zxicon zx-shenpi"
                     @click.stop.prevent="showcCreateDialog = true">新增</el-button>
        </div>
      </div>
    </div>
    <!-- 列表 -->
    <div class="flex-1"
         v-loading="tableLoading"
         style="min-height: 100px;">
      <el-scrollbar style="height: 100%;">
        <div class="unitUser-table common-table mg-t-20"
             v-if="tableData.length>0">
          <el-table :data="tableData"
                    border
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
                             label="姓名">
            </el-table-column>
            <el-table-column prop="sex"
                             align="center"
                             label="性别">
            </el-table-column>
            <el-table-column prop="idcard"
                             align="center"
                             label="身份证号">
            </el-table-column>
            <el-table-column prop="phone"
                             align="center"
                             label="手机号">
            </el-table-column>
            <el-table-column prop="account"
                             align="center"
                             label="登录账号">
            </el-table-column>
            <el-table-column prop="dept"
                             align="center"
                             label="所属部门">
            </el-table-column>
            <el-table-column prop="managerialposition"
                             align="center"
                             label="管理职务">
            </el-table-column>
            <el-table-column prop="personalposition"
                             align="center"
                             label="个人职务">
            </el-table-column>
            <el-table-column prop="unitrole"
                             align="center"
                             label="角色权限">
              <!-- whetheradministrator -->
            </el-table-column>
            <el-table-column prop="whetherexpert"
                             align="center"
                             label="是否专家">
              <template slot-scope="scope">
                <span class="grey-1 cursor">{{scope.whetherexpert ? '是' : '否'}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="whetheradministrator"
                             align="center"
                             label="操作"
                             width="150">
              <template slot-scope="scope">
                <span class="particulars"
                      @click.stop.prevent="goDetail(scope.row)">详情</span>
                <span class="grey-1 cursor"
                      style="margin: 0 5px;"
                      @click.stop.prevent="showcEditDialog=true">编辑</span>
                <span class="grey-1 cursor"
                      v-show="scope.row.whetheradministrator !== '1'"
                      @click.stop.prevent="">解绑</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <p v-else
           class="text-c content-item grey fs-14 mg-t-20">{{tableLoading ? '加载中...' : '暂无无数据'}}</p>
      </el-scrollbar>
    </div>
    <el-footer v-if="tableData.length > 0">
      <!-- 分页器 -->
      <el-pagination v-show="total>0"
                     background
                     layout="prev, pager, next"
                     class="text-c mg-t-10"
                     :total="total"
                     :page-size="pageSize"
                     :current-page="currentPage"
                     @current-change="currentChange"></el-pagination>
    </el-footer>
    <unit-personal-detail :showDialog=showcDetailDialog
                          @returnBool="bool => { showcDetailDialog = bool;}"></unit-personal-detail>
    <unit-personal-edit :showDialog=showcEditDialog
                        @returnBool="bool => { showcEditDialog = bool;}"></unit-personal-edit>
    <create-unit-personal :showDialog=showcCreateDialog
                          @returnBool="bool => { showcCreateDialog = bool;}"></create-unit-personal>
  </div>
</template>

<script>
import unitPersonalDetail from './unitPersonalDetail'
import unitPersonalEdit from './unitPersonalEdit'
import createUnitPersonal from './createUnitPersonal'
// api
import { personalList, unitUserDetail } from '@/api/clientManage'
export default {
  name: 'unitPersonalList',
  components: { unitPersonalDetail, unitPersonalEdit, createUnitPersonal },
  data () {
    return {
      showcDetailDialog: false,
      showcEditDialog: false,
      showcCreateDialog: false,
      total: 0,           // 总页数
      currentPage: 1,     // 当前页
      pageSize: 10,       // 每页条数
      tableLoading: false,     // 表格加载效果  true:加载中   false：移除加载效果
      tableData: [],      // 列表数据
      selectAll: [],     // 全选
      unitUserDetailList: {} // 详情数据
    }
  },
  created () {
    this.initTableData()
    // alert(this.$route.params.id)
  },
  methods: {
    // 获取列表
    initTableData () {
      this.tableLoading = true
      let query = {
        unit_id: this.$route.params.id,     // 机构id
        auditstatus: '',                    // 2，表示审核列表
        pageIndex: this.currentPage,        // 开始页数（必填）
        pageSize: this.pageSize             // 页数大小（必填）
      }
      personalList(query).then(res => {
        console.log(res)
        this.tableLoading = false
        if (res.data.success) {
          this.tableData = res.data.resultList
          this.total = res.data.pageInfo.totalRecord
        }
      }).catch(() => {
        this.tableLoading = false
      })
    },
    // 翻页
    currentChange (val) {
      this.currentPage = val // 改变当前页码
      this.selectAll = [] // 还原全选
      // this.tableData = [] // 还原上一页面选中项目
      this.initTableData()
    },
    // 全选
    handleSelectionChange (val) {
      this.selectAll = val
    },
    // 详情
    goDetail (item) {
      let loading = this.$loading()
      unitUserDetail({
        id: item.id
      }).then(res => {
        console.log(res)
        loading.close()
        if (res.data.success) {
          // let array = Object.keys().map(key => res.data.resultList[key])
          // console.log(array)
          this.showcDetailDialog = true
          this.unitUserDetailList = res.data.resultList
        } else {
          this.$message.error(res.data.message)
          loading.close()
        }
      }).catch(() => {
        loading.close()
      })
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
