<template>
  <div class="unitUser zx-flex column">
    <!-- 筛选条件 -->
    <div class="select-group zx-flex between">
      <div class="select-item">
        <search-select :options="searchCompanyOptions"
                       ref="unittype"
                       :titleVal="'单位类型'"
                       @returnSelectVal="val => { unittype = val }"></search-select>
      </div>
      <div class="select-item">
        <search-select :options="searchRoleOptions"
                       ref="unitrole"
                       :titleVal="'单位角色'"
                       @returnSelectVal="val => { unitrole = val }"></search-select>
      </div>
      <div class="select-item">
        <search-select :options="searchCouponOptions"
                       ref="isvouchers"
                       :titleVal="'是否接收创新券'"
                       @returnSelectVal="val => { isvouchers = val }"></search-select>
      </div>
      <div class="select-item">
        <search-select :options="searchCouponOptions"
                       ref="isusevouchers"
                       :titleVal="'是否能使用创新券'"
                       @returnSelectVal="val => { isusevouchers = val }"></search-select>
      </div>
      <div class="select-item">
        <div class="operation-button zx-flex align">
          <el-button type="primary"
                     icon="zxicon zx-shenpi"
                     @click.stop.prevent="goChecks(type2 = 2)">批量拒绝</el-button>
        </div>
      </div>
      <div class="select-item">
        <div class="operation-button zx-flex align">
          <el-button type="primary"
                     icon="zxicon zx-piliangshenhe"
                     @click.stop.prevent="goChecks(type2 = 1)">批量通过</el-button>
        </div>
      </div>
      <div class="select-item">
        <div class="operation-button zx-flex align">
          <el-button type="primary"
                     icon="zxicon zx-zhongzhi"
                     @click.stop.prevent="resetting">重置</el-button>
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
            <el-table-column prop="unitname"
                             align="center"
                             label="机构名称">
            </el-table-column>
            <el-table-column prop="schoolcode"
                             align="center"
                             label="统一社会信用代码（院校代码）"
                             width="150">
            </el-table-column>
            <el-table-column prop="unittype"
                             align="center"
                             label="单位类型">
            </el-table-column>
            <el-table-column prop="unitrole"
                             align="center"
                             label="单位角色">
            </el-table-column>
            <el-table-column prop="isvouchers"
                             align="center"
                             label="是否能接收创新券">
              <template slot-scope="scope">
                <span v-text="scope.row.isvouchers==='0'?'否':'是'"
                      :class="{'no-public': scope.row.isvouchers === '0'}"></span>
              </template>
            </el-table-column>
            <el-table-column prop="isvouchers"
                             align="center"
                             label="是否能使用创新券">
              <template slot-scope="scope">
                <span v-text="scope.row.isusevouchers==='0'?'否':'是'"
                      :class="{'no-public': scope.row.isusevouchers === '0'}"></span>
              </template>
            </el-table-column>
            <el-table-column prop="sbsl"
                             align="center"
                             label="管理员姓名">
            </el-table-column>
            <el-table-column prop="jcfwl"
                             align="center"
                             label="管理员电话">
            </el-table-column>
            <el-table-column prop="fjcfwl"
                             align="center"
                             label="管理员身份证号">
            </el-table-column>
            <el-table-column prop="status"
                             align="center"
                             label="单位状态">
              <template slot-scope="scope">
                <span v-text="scope.row.status==='1'?'正常':'禁用'"
                      :class="{'no-public': scope.row.status === 0 }"></span>
              </template>
            </el-table-column>
            <el-table-column prop="source"
                             align="center"
                             label="申请日期">
            </el-table-column>
            <el-table-column prop="address"
                             align="center"
                             label="操作"
                             width="110">
              <template slot-scope="scope">
                <span class="particulars"
                      @click.stop.prevent="goCheck(scope.row)">审核</span>
                <!-- <span class="grey-1 cursor"
                      @click.stop.prevent="">人员列表</span> -->
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
    <check-unit-user-detail :showDialog=showcheckUnitUserDetailDialog
                            :detailData=unitUserDetailList
                            @returnBool="bool => { showcheckUnitUserDetailDialog = bool;}"></check-unit-user-detail>
  </div>
</template>

<script>
// 筛选条件组件
import searchSelect from '@/views/layout/components/searchSelect/searchSelect'
// 创建 UnitType
import checkUnitUserDetail from './checkUnitUserDetail'
// import { setSession, getSessios } from '@/until/storage'
// api
import { unitUserList, unitUserDetail, unitUserAudit } from '@/api/clientManage'
// 数据字典
import { getDataDictionary } from '@/api'
export default {
  name: 'unitUser',
  components: { searchSelect, checkUnitUserDetail },
  data () {
    return {
      unittype: '',         // 搜索条件select框-按单位类型
      searchCompanyOptions: [],   // 搜索条件select框-按单位类型-数据
      unitrole: '',            // 搜索条件select框-所属角色-选中值
      searchRoleOptions: [],    // 搜索条件select框-所属角色-数据
      isvouchers: '',       // 搜索条件select框-是否使用创新券-选中值
      searchCouponOptions: [
        {
          value: '1',
          label: '是'
        }, {
          value: '0',
          label: '否'
        }
      ],                      // 搜索条件select框-创新券-数据
      isusevouchers: '',     // 搜索条件select框-是否接收创新券-选中值
      status: '',      // 搜索条件select框-单位状态-选中值
      source: '',       // 搜索条件select框-用户来源-选中值
      total: 0,           // 总页数
      currentPage: 1,     // 当前页
      pageSize: 10,       // 每页条数
      tableLoading: false,     // 表格加载效果  true:加载中   false：移除加载效果
      tableData: [],      // 列表数据
      selectAll: [],     // 全选
      showcheckUnitUserDetailDialog: false, // 详情弹窗 true:显示   false：隐藏
      unitUserDetailList: {} // 详情数据
    }
  },
  watch: {
    unittype () {
      this.filtrate()
    },
    unitrole () {
      this.filtrate()
    },
    isvouchers () {
      this.filtrate()
    },
    isusevouchers () {
      this.filtrate()
    }
  },
  created () {
    this.initTableData()
    this.getDictionary()
  },
  methods: {
    // 筛选
    filtrate () {
      this.currentPage = 1
      this.initTableData()
    },
    // 搜索框重置
    resetting () {
      this.$refs.unittype.reset()
      this.$refs.unitrole.reset()
      this.$refs.isvouchers.reset()
      this.$refs.isusevouchers.reset()
      this.tableData = []
      this.initTableData()
    },
    // 数据字典
    getDictionary () {
      getDataDictionary('UnitType').then(res => {
        res.data.list.map((item) => {
          this.searchCompanyOptions.push({
            value: item.fieldcode,
            label: item.fieldname
          })
        })
      })
      getDataDictionary('UnitRole').then(res => {
        res.data.list.map((item) => {
          this.searchRoleOptions.push({
            value: item.fieldcode,
            label: item.fieldname
          })
        })
      })
    },
    // 获取列表
    initTableData () {
      this.tableLoading = true
      let query = {
        unittype: this.unittype,            // 单位类型
        unitrole: this.unitrole,            // 单位角色
        isvouchers: this.isvouchers,        // 是否接收创新券
        isusevouchers: this.isusevouchers,  // 是否能使用创新券
        auditstatus: 2,                    // 查询通过审核的
        pageIndex: this.currentPage,        // 开始页数（必填）
        pageSize: this.pageSize                // 页数大小（必填）
      }
      unitUserList(query).then(res => {
        console.log(res)
        this.tableLoading = false
        if (res.data.success) {
          this.tableData = res.data.resultList
          this.total = res.data.pageInfo.totalRecord
        }
      }).catch(err => {
        this.tableLoading = false
        this.$message.error(err.data.message)
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
    // 审核
    goCheck (item) {
      let loading = this.$loading()
      unitUserDetail({
        id: item.id
      }).then(res => {
        console.log(res)
        loading.close()
        if (res.data.success) {
          this.showcheckUnitUserDetailDialog = true
          this.unitUserDetailList = res.data.resultList
        } else {
          this.$message.error(res.data.message)
          loading.close()
        }
      }).catch(() => {
        loading.close()
      })
    },
    // 批量审核
    goChecks (type2) {
      if (this.selectAll.length === 0) {
        this.$message('请选择机构')
        return
      }
      let busied = this.selectAll.map(item => item.id)
      let query = {
        busied: busied.join(','),
        auditopinion: '', // 备注
        type: type2,  // 审核 是否 通过
        type2: type2, // 批量操作
        types: 2      // 单位
      }
      unitUserAudit(query).then(res => {
        console.log(res)
        if (res.data.success) {
          this.selectAll = []
          this.initTableData()
          this.$message.success('操作成功')
        } else {
          this.$message.error('操作失败，请重新操作')
        }
      }).catch(() => {

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
