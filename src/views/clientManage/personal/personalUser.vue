<template>
  <div class="unitUser zx-flex column">
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
                   @click.stop.prevent="showCreateDialog = true">新增</el-button>
        <el-button type="primary"
                   icon="zxicon zx-zhongzhi"
                   @click.stop.prevent="resetting">重置</el-button>
      </div>
    </div>
    <!-- 筛选条件 -->
    <div class="select-group zx-flex between">
      <div class="select-item">
        <search-select :options="whetherexpertOptions"
                       ref="whetherexpert"
                       :titleVal="'是否专家'"
                       @returnSelectVal="val => { whetherexpert = val }"></search-select>
      </div>
      <div class="select-item">
        <search-select :options="statusOptions"
                       ref="status"
                       :titleVal="'用户状态'"
                       @returnSelectVal="val => { status = val }"></search-select>
      </div>
      <div class="select-item">
        <search-select :options="sourceOptions"
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
            <el-table-column prop="username"
                             align="center"
                             label="用户名称">
            </el-table-column>
            <el-table-column prop="sex"
                             align="center"
                             label="性别"
                             width="150">
            </el-table-column>
            <el-table-column prop="idcard"
                             align="center"
                             label="身份证号">
            </el-table-column>
            <el-table-column prop="phone"
                             align="center"
                             label="手机号">
            </el-table-column>
            <el-table-column prop="corporatename"
                             align="center"
                             label="绑定公司">
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
            </el-table-column>
            <el-table-column prop="whetherexpert"
                             align="center"
                             label="是否专家">
              <template slot-scope="scope">
                <span class="grey-1 cursor">{{scope.whetherexpert ? '是' : '否'}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="usersource"
                             align="center"
                             label="用户来源">
            </el-table-column>
            <el-table-column prop="userstatus"
                             align="center"
                             label="用户状态">
              <template slot-scope="scope">
                <span v-text="scope.row.userstatus==='1'?'正常':'游客'"
                      :class="{'no-public': scope.row.status === 0 }"></span>
              </template>
            </el-table-column>
            <el-table-column prop="registrationdate"
                             align="center"
                             label="注册日期">
            </el-table-column>
            <el-table-column align="center"
                             label="操作"
                             width="110">
              <template slot-scope="scope">
                <span class="particulars"
                      @click.stop.prevent="goDetail(scope.row)">详情</span>
                <span class="grey-1 cursor"
                      @click.stop.prevent="goEdit(scope.row)">编辑</span>
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

    <personal-user-detail :showDialog=showDetailDialog
                          :detailData=detailList
                          @returnBool="bool => { showDetailDialog = bool;}"></personal-user-detail>
    <create-temp :showDialog=showCreateDialog
                 @returnBool="bool => { showCreateDialog = bool;}"></create-temp>
    <personal-user-edit :showDialog=showEditDialog
                        :detailData=detailList
                        @returnBool="bool => { showEditDialog = bool;}"></personal-user-edit>
  </div>
</template>

<script>
// 筛选条件组件
import searchSelect from '@/views/layout/components/searchSelect/searchSelect'
// 详情
import personalUserDetail from './personalUserDetail'
// 编辑
import personalUserEdit from './personalUserEdit'

import createTemp from './createTemp'
// api
import { personalList, importFile, exportFile, userSource, personalDetail } from '@/api/clientManage'
export default {
  name: 'unitUser',
  components: { searchSelect, personalUserDetail, createTemp, personalUserEdit },
  data () {
    return {
      searchVal: '',            // 搜索条件input框 机构名称
      whetherexpertOptions: [
        {
          value: '1',
          label: '是'
        }, {
          value: '0',
          label: '否'
        }
      ],                        // 搜索条件select框-是否专家-数据
      whetherexpert: '',        // 搜索条件select框-是否专家-选中值
      status: '',               // 搜索条件select框-用户状态-选中值
      statusOptions: [
        {
          value: '1',
          label: '正常'
        }, {
          value: '0',
          label: '禁用'
        }
      ],                        // 搜索条件select框-用户状态-数据
      source: '',           // 搜索条件select框-用户来源-选中值
      sourceOptions: [],    // 搜索条件select框-用户来源-数据
      total: 0,             // 总页数
      currentPage: 1,       // 当前页
      pageSize: 10,         // 每页条数
      tableLoading: false,  // 表格加载效果  true:加载中   false：移除加载效果
      tableData: [],        // 列表数据
      importFile: importFile,  // 导入
      selectAll: [],            // 全选
      // -------
      showCreateDialog: false, // 新增弹窗 true:显示   false：隐藏
      showDetailDialog: false, // 详情弹窗 true:显示   false：隐藏
      showEditDialog: false, // 编辑弹窗 true:显示   false：隐藏
      detailList: {}       // 详情数据
    }
  },
  created () {
    this.initTableData()
    this.getUserSource()
  },
  methods: {
    // 获取用户来源
    getUserSource () {
      userSource({
        type: 1
      }).then(res => {
        if (res.data.success && res.data.dateList) {
          res.data.dateList.map((item) => {
            this.sourceOptions.push({
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
        whetherexpert: this.whetherexpert,  // 是否能使用创新券
        status: this.status,                // 单位状态
        unitname: this.searchVal,            // 机构名称
        auditstatus: '',                    // 查询通过审核的
        source: this.source,                // 来源
        pageIndex: this.currentPage,        // 开始页数（必填）
        pageSize: this.pageSize                // 页数大小（必填）
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
    // 搜索框重置
    resetting () {
      this.searchVal = ''
      this.$refs.whetherexpert.reset()
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
    nextStepSuccess (val) {
      // this.$set(this.dialogFooter[1], name, '保存')
      this.dialogFooter = [{
        name: '上一步',
        color: 'background: #61A3FE;',
        isShow: val >= 2
      }, {
        name: '保存',
        color: 'background: #61A3FE;',
        isShow: true
      }, {
        name: '取消',
        color: 'background: #ccc;',
        isShow: true
      }]
      this.step = val
    },
    // 详情
    goDetail (item) {
      this.getPersonalDetail(item).then(() => {
        this.showDetailDialog = true
      })
    },
    goEdit (item) {
      this.getPersonalDetail(item).then(() => {
        this.showEditDialog = true
      })
    },
    getPersonalDetail (item) {
      if (this.sameId && this.sameId === item.id) return Promise.resolve()
      this.sameId = item.id
      let loading = this.$loading()
      return new Promise((resolve, reject) => {
        personalDetail({
          id: item.id
        }).then(res => {
          console.log(res)
          loading.close()
          if (res.data.success) {
            this.detailList = res.data.resultList
            resolve(res.data.resultList)
          } else {
            this.$message.error(res.data.message)
            loading.close()
          }
        }).catch(() => {
          loading.close()
          this.sameId = ''
        })
      })
    }
  }
}
</script>

<style lang='less' scoped>
.unitUser {
  padding: 20px;
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
