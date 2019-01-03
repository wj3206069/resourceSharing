<template>
  <div class="unitUser zx-flex column pd-20">
    <div class="unitUser-header zx-flex between">
      <!-- 搜索框 -->
      <div class="search">
        <el-input v-model="searchVal"
                  placeholder="请输入仪器名称或型号"></el-input>
        <el-button type="primary"
                   icon="el-icon-search"
                   @click="initTableData">搜索</el-button>
      </div>
      <!-- 操作按钮 -->
      <div class="operation-button zx-flex align">
        <el-upload class="zx-flex align"
                   :action="importFile"
                   multiple
                   :limit="9"
                   :on-progress="onProgress"
                   :on-success="onSuccess"
                   :on-error="onError">
          <el-button type="primary"
                     icon="zxicon zx-daoru">导入</el-button>
        </el-upload>
        <el-button type="primary"
                   icon="zxicon zx-daochu"
                   @click.stop.prevent="goExportFile">导出</el-button>
        <!-- <el-button type="primary"
                   icon="zxicon zx-gx-shenghe">审核</el-button> -->
        <el-button type="primary"
                   icon="zxicon zx-xinzeng2"
                   @click.stop.prevent="showCreateNnitDialog = true">新增</el-button>
        <el-button type="primary"
                   icon="zxicon zx-zhongzhi"
                   @click.stop.prevent="resetting">重置</el-button>
      </div>
    </div>
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
        <search-select :options="searchUnitStatusOptions"
                       ref="status"
                       :titleVal="'单位状态'"
                       @returnSelectVal="val => { status = val }"></search-select>
      </div>
      <div class="select-item">
        <search-select :options="searchUnitSourceOptions"
                       ref="source"
                       :titleVal="'用户来源'"
                       @returnSelectVal="val => { source = val }"></search-select>
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
                             label="单位性质">
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
                             label="设备数量（台/套）">
            </el-table-column>
            <el-table-column prop="jcfwl"
                             align="center"
                             label="设备服务数量">
            </el-table-column>
            <el-table-column prop="fjcfwl"
                             align="center"
                             label="商业服务数量">
            </el-table-column>
            <el-table-column prop="iskeyserviceorg"
                             align="center"
                             label="是否重点服务机构">
              <template slot-scope="scope">
                <span v-text="scope.row.iskeyserviceorg==='0'?'否':'是'"
                      :class="{'no-public': scope.row.iskeyserviceorg === '0'}"></span>
              </template>
            </el-table-column>
            <el-table-column prop="status"
                             align="center"
                             label="单位状态">
              <template slot-scope="scope">
                <span v-text="scope.row.status==='1'?'正常':'禁用'"
                      :class="{'no-public': scope.row.status !== '1' }"></span>
              </template>
            </el-table-column>
            <el-table-column prop="source"
                             align="center"
                             label="来源">
            </el-table-column>
            <el-table-column prop="recorddate"
                             align="center"
                             label="注册日期">
            </el-table-column>
            <el-table-column prop="address"
                             align="center"
                             label="操作"
                             width="150">
              <template slot-scope="scope">
                <span class="particulars"
                      @click.stop.prevent="goDetail(scope.row)">详情</span>
                <span class="particulars"
                      style="margin: 0 5px;"
                      @click.stop.prevent="goEdit(scope.row)">编辑</span>
                <span class="particulars"
                      @click.stop.prevent="goList(scope.row)">人员列表</span>
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
    <!-- 新增 -->
    <create-unit-temp :showDialog=showCreateNnitDialog
                      :unitTypeOptions=searchCompanyOptions
                      :unitroleOptions=searchRoleOptions
                      @returnBool="bool => { showCreateNnitDialog = bool;}"></create-unit-temp>
    <!-- 编辑 -->
    <unit-edit :showDialog=showUnitEditlDialog
               :detailData=unitUserDetailList
               :unitTypeOptions=searchCompanyOptions
               :unitroleOptions=searchRoleOptions
               @returnBool="bool => { showUnitEditlDialog = bool;}"></unit-edit>
    <!-- 详情 -->
    <unit-detail :showDialog=showUnitDetailDialog
                 :detailData=unitUserDetailList
                 @returnBool="bool => { showUnitDetailDialog = bool;}"></unit-detail>
  </div>
</template>

<script>
// 筛选条件组件 unitEdit
import searchSelect from '@/views/layout/components/searchSelect/searchSelect'
import zxDialog from '@/components/dialog'
// 新建
import createUnitTemp from './createUnitTemp'
// 编辑
import unitEdit from './unitEdit'
// 详情
import unitDetail from './unitDetail'
// import { setSession, getSessios } from '@/until/storage'
// api
import { unitUserList, importFile, exportFile, userSource, unitUserDetail } from '@/api/clientManage'
// 数据字典
import { getDataDictionary } from '@/api'
export default {
  name: 'unitUser',
  components: { searchSelect, zxDialog, createUnitTemp, unitEdit, unitDetail },
  data () {
    return {
      searchVal: '',                // 搜索条件input框-机构名称
      unittype: '',                 // 搜索条件select框-按单位类型
      searchCompanyOptions: [],     // 搜索条件select框-按单位类型-数据
      unitrole: '',                 // 搜索条件select框-所属角色-选中值
      searchRoleOptions: [],        // 搜索条件select框-所属角色-数据
      isvouchers: '',               // 搜索条件select框-是否使用创新券-选中值
      searchCouponOptions: [
        {
          value: '1',
          label: '是'
        }, {
          value: '0',
          label: '否'
        }
      ],                            // 搜索条件select框-创新券-数据
      isusevouchers: '',            // 搜索条件select框-是否接收创新券-选中值
      status: '',                   // 搜索条件select框-单位状态-选中值
      searchUnitStatusOptions: [
        {
          value: '1',
          label: '正常'
        }, {
          value: '0',
          label: '禁用'
        }
      ],                            // 搜索条件select框-单位状态-数据
      source: '',                   // 搜索条件select框-用户来源-选中值
      searchUnitSourceOptions: [],  // 搜索条件select框-用户来源-数据
      total: 0,                     // 总页数
      currentPage: 1,               // 当前页
      pageSize: 10,                 // 每页条数
      tableLoading: false,          // 表格加载效果  true:加载中   false：移除加载效果
      tableData: [],                // 列表数据
      importFile: importFile,       // 导入
      selectAll: [],                // 全选
      showCreateNnitDialog: false,  // 新增 弹窗 true:显示   false：隐藏
      dialogFooter: [{
        name: '上一步',
        color: 'background: #61A3FE;',
        isShow: false
      }, {
        name: '保存',
        color: 'background: #61A3FE;',
        isShow: true
      }, {
        name: '取消',
        color: 'background: #ccc;',
        isShow: true
      }],
      showUnitEditlDialog: false,     // 编辑 弹窗 true:显示   false：隐藏
      showUnitDetailDialog: false,    // 详情 弹窗 true:显示   false：隐藏
      unitUserDetailList: {},          // 详情 数据
      sameId: ''  // 查看同一条信息
    }
  },
  created () {
    this.initTableData()
    this.getDictionary()
    this.getUserSource()
  },
  methods: {
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
    // 获取用户来源
    getUserSource () {
      userSource({
        type: 1
      }).then(res => {
        if (res.data.success) {
          res.data.dateList.map((item) => {
            this.searchUnitSourceOptions.push({
              value: item.type,
              label: item.usersource
            })
          })
        }
      })
    },
    // 获取设备列表
    initTableData () {
      this.tableLoading = true
      let query = {
        unittype: this.unittype,            // 单位类型
        unitrole: this.unitrole,            // 单位角色
        isvouchers: this.isvouchers,        // 是否接收创新券
        isusevouchers: this.isusevouchers,  // 是否能使用创新券
        status: this.status,                // 单位状态
        unitname: this.searchVal,           // 机构名称
        auditstatus: '',                    // 查询通过审核的
        source: this.source,                // 来源
        pageIndex: this.currentPage,        // 开始页数（必填）
        pageSize: this.pageSize             // 页数大小（必填）
      }
      unitUserList(query).then(res => {
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
    // 搜索框重置
    resetting () {
      this.searchVal = ''
      this.$refs.unittype.reset()
      this.$refs.unitrole.reset()
      this.$refs.isvouchers.reset()
      this.$refs.isusevouchers.reset()
      this.$refs.status.reset()
      this.$refs.source.reset()
      this.tableData = []
      this.initTableData()
    },
    // 导入
    onProgress (event, file, fileList) {
      console.log(event, file, fileList)
      this.loading = this.$loading()
    },
    onSuccess (response, file, fileList) {
      // console.log(response, file, fileList)
      this.loading.close()
      if (response.success) {
        this.$message.success('上传成功')
      } else {
        this.$message.success('上传失败')
      }
    },
    onError (err, file, fileList) {
      console.log(err, file, fileList)
      this.loading.close()
      this.$message.error('上传失败')
    },
    // 全选
    handleSelectionChange (val) {
      this.selectAll = val
    },
    // 导出
    goExportFile () {
      let ids = []
      if (this.selectAll.length > 0) {
        this.selectAll.forEach(item => {
          ids.push(item.id)
        })
      } else {
        this.tableData.forEach(item => {
          ids.push(item.id)
        })
      }
      let { href } = this.$router.resolve({ path: `${exportFile}?id=${ids.join(',')}` })
      window.open(href)
    },
    // 详情
    goDetail (item) {
      this.getUnitUserDetail(item).then(res => {
        this.showUnitDetailDialog = true
      })
    },
    // 编辑
    goEdit (item) {
      this.getUnitUserDetail(item).then(res => {
        this.showUnitEditlDialog = true
      })
    },
    // 获取详情
    getUnitUserDetail (item) {
      if (this.sameId && this.sameId === item.id) return Promise.resolve()
      this.sameId = item.id
      let loading = this.$loading()
      return new Promise((resolve, reject) => {
        unitUserDetail({
          id: item.id
        }).then(res => {
          console.log(res)
          loading.close()
          if (res.data.success) {
            resolve(res.data.resultList)
            this.unitUserDetailList = res.data.resultList
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {
          loading.close()
          this.sameId = ''
        })
      })
    },
    // 人员列表
    goList (item) {
      this.$router.push({ name: 'unitPersonal', params: { id: item.id } })
    }
  }
}
</script>

<style lang='less' scoped>
.unitUser {
  width: 100%;
  .unitUser-header {
    .search {
      div {
        width: 300px;
        height: 36px;
        input {
          border: 1px solid #939393;
          height: 36px;
        }
      }
      button {
        background-color: #61a3fe;
        border: none;
        border-radius: 10px;
        padding: 11px 16px;
      }
    }
    .operation-button {
      button {
        padding: 11px 16px;
        background-color: #61a3fe;
        border: none;
        border-radius: 10px;
      }
      .delete {
        background-color: #ff5129;
      }
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
