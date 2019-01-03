<template>
  <div class="service">

    <div class="service-header zx-flex between">
      <div class="search">
        <el-input v-model="search"
                  placeholder="请输入仪器名称或型号"></el-input>
        <el-button type="primary"
                   icon="el-icon-search"
                   @click="initTableData">搜索</el-button> 
      </div>
      <div class="operation-button">
        <!-- <el-button type="primary"
                   icon="zxicon zx-daoru"
                   @click="importFile">导入</el-button>
        <el-button type="primary"
                   icon="zxicon zx-daochu">导出</el-button> -->
        <el-button type="primary"
                   icon="zxicon zx-xinzeng2"
                   @click="showAddDialog(false,'新增',{})">新增</el-button>

        <el-popover placement="top"
                    width="160"
                    v-model="DeletePopover1"
                    style="text-align:center;">
          <p>您确定要删除吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini"
                       type="text"
                       @click="DeletePopover1 = false">取消</el-button>
            <el-button type="primary"
                       size="mini"
                       @click="DeleteData('',1)">确定</el-button>
          </div>
          <el-button type="primary"
                     slot="reference"
                     class="delete"
                     icon="zxicon zx-trash">批量删除</el-button>
        </el-popover>

        <el-button type="primary"
                   icon="zxicon zx-zhongzhi"
                   @click="resetting">重置</el-button>
      </div>
    </div>
    <div class="select-group zx-flex between">
      <div class="select-item">
        <label for="">所属单位：</label>
        <el-select v-model="Company"
                   @change="initTableData">
          <el-option v-for="item in searchCompany"
                     :key="item.unit_id"
                     :label="item.unitname"
                     :value="item.unitname"></el-option>
          <!-- <el-option label="区域二"
                     value="beijing"></el-option> -->
        </el-select>

      </div>
      <div class="select-item">
        <label for="">所属创新载体：</label>
        <el-select v-model="platform"
                   @change="initTableData">
          <el-option v-for="(item,index) in searchplatform"
                     :key="index"
                     :label="item.name"
                     :value="item.id"></el-option>
          <!--<el-option label="假数据2"
                     value="2"></el-option> -->
        </el-select>
      </div>
      <div class="select-item">
        <label for="">设备分类：</label>
        <el-select v-model="classify"
                   @change="initTableData">
          <el-option v-for="item in searchclassify"
                     :key="item.levelcode"
                     :label="item.fieldname"
                     :value="item.levelcode"></el-option>
        </el-select>
      </div>
      <div class="select-item">
        <label for="">设备小类：</label>
        <el-select v-model="subclass"
                   @change="initTableData">
          <el-option v-for="item in searchsubclass"
                     :key="item.fieldcode"
                     :label="item.fieldname"
                     :value="item.fieldcode"></el-option>
        </el-select>
      </div>
      <div class="select-item">
        <label for="">共享类型：</label>
        <el-select v-model="sharingtype"
                   @change="initTableData">
          <el-option v-for="item in searchsharingtype"
                     :key="item.fieldcode"
                     :label="item.fieldname"
                     :value="item.fieldcode"></el-option>
        </el-select>
      </div>
    </div>
    <div class="service-table">
      <el-table :data="tableData"
                v-loading="loading"
                border
                style="width: 100%"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection"
                         align="center"
                         width="50">
        </el-table-column>
        <el-table-column prop="rowno"
                         align="center"
                         label="序号"
                         width="50">
        </el-table-column>
        <el-table-column prop="cname"
                         align="center"
                         label="仪器中文名称">
          <!-- <template>
              <span></span>
              </template>              -->
        </el-table-column>
        <el-table-column prop="unitname"
                         align="center"
                         label="所属单位">
        </el-table-column>
        <el-table-column prop="platform_id"
                         align="center"
                         label="所属创新载体">
        </el-table-column>
        <el-table-column prop="specification"
                         align="center"
                         label="型号规格">
        </el-table-column>
        <el-table-column prop="sharingtype"
                         align="center"
                         label="共享类型">
          <template slot-scope="scope">
            <span v-if="scope.row.sharingtype==='1'">内部共享</span>
            <span v-if="scope.row.sharingtype==='2'">外部共享</span>
          </template>
        </el-table-column>
        <el-table-column prop="price"
                         align="center"
                         label="仪器价格(万元)">
        </el-table-column>
        <el-table-column prop="status"
                         align="center"
                         label="状态">
          <template slot-scope="scope">
            <!-- <span v-text="scope.row.status=='0'?'未审核':'已审核'"
                  :class="scope.row.status=='0'?'no-public':''"></span> -->
            <span v-if="scope.row.status==1">待送审</span>
            <span v-if="scope.row.status==2">审核中</span>
            <span v-if="scope.row.status==3">审核通过</span>
            <span v-if="scope.row.status==4">审核不通过</span>
          </template>
        </el-table-column>
        <el-table-column prop="address"
                         align="center"
                         label="操作">
          <template slot-scope="scope">

            <span class="particulars"
                  @click="showAddDialog(true,'详情',scope)">查看详情</span>
            <span class="particulars"
                  @click="recorded(scope)">审核记录</span>
            <span class=" particulars"
                  v-if="scope.row.status==1||scope.row.status==4"
                  @click="showAddDialog(false,'编辑',scope)">编辑</span>

            <!-- <span class=" particulars"
                  @click="DeleteData(scope,0)">删除</span> -->
            <el-popover placement="top"
                        width="160"
                        v-model="scope.row.visible2">
              <p>您确定要删除吗？</p>
              <div style="text-align: center; margin: 0">
                <el-button size="mini"
                           type="text"
                           @click="scope.row.visible2 = false">取消</el-button>
                <el-button type="primary"
                           size="mini"
                           @click="DeleteData(scope,0)">确定</el-button>
              </div>
              <span class="particulars"
                    slot="reference">删除</span>
            </el-popover>

          </template>
        </el-table-column>
      </el-table>
      <el-pagination background
                     layout="prev, pager, next"
                     :total="total"
                     @current-change="CurrentPage"></el-pagination>
    </div>

    <add-equip :showDialog='showDialog'
               :isDesable='isRevise'
               :title='dialogTitle'
               :companyList='searchCompany'
               :InnovationList="searchplatform"
               :classifyList='searchclassify'
               :row='row'
               :sharingTypeList='searchsharingtype'
               @closeAddDialog="closeAddDialog"></add-equip>
    <audit-record :showRecord='showRecordStstus'
                  :auditList='auditList'
                  @showRecordDialog="hiddenAuditRecord"></audit-record>
  </div>
</template>

<script>

import { successTips, failTips, failDelete } from '@/until/showTips'
import AddEquip from '@/components/dialog/EquipManager/addEquip'
import AuditRecord from '@/components/dialog/audit/auditRecord'
import { queryAuditRecordList } from '@/api/serviceManagerPlatformApi'
import {
  getSelectData,
  getMultilevelSelect,
  getTableData,
  deleteList,
  companyInfo,
  getInnovation
} from '@/api/EquipService/EquipManagerAPI.js'

export default {
  components: { AddEquip, AuditRecord },
  data () {
    return {
      showRecordStstus: false, // 是否显示审核记录弹框
      search: '',              // 搜索条件input框
      searchCompany: [],       // 搜索条件select框-所属单位
      searchplatform: [],      // 搜索条件select框-所属创新载体
      searchclassify: [],      // 搜索条件select框-设备分类
      searchsubclass: [],      // 搜索条件select框-设备小类
      searchsharingtype: [],   // 搜索条件select框-共享类型
      Company: '',          // 所属单位
      platform: '',         // 所属创新载体
      classify: '',         // 设备分类
      subclass: '',         // 设备小类
      sharingtype: '',      // 共享类型
      multipleSelection: [], // 表格选中行的数组
      row: {},        // 编辑或者查看详情时记录当前行的信息，传递给addEquip
      title: '设备管理',
      region: '',
      tableData: [],    // 仪器table数据
      page: '1',        // 当前页数
      total: 1,       // 总页数
      DeletePopover1: false, // 批量删除popover1
      showDialog: false,
      isRevise: true,    // 是否可编辑    true:不可编辑   false: 可编辑
      dialogTitle: '',   // 新增dialog标题
      loading: true,      // 表格加载效果  true:加载中   false：移除加载效果
      auditList: []       //  审核记录列表
    }
  },
  watch: {
    // 监听设备分类变量
    classify () {
      for (var i = 0; i < this.searchclassify.length; i++) {
        if (this.searchclassify[i].levelcode === this.classify) {
          this.searchsubclass = this.searchclassify[i].children
          // this.subclass = this.searchsubclass[0].fieldcode
          this.subclass = ''
          break
        }
      }
    }
  },
  created () {
    // 先登录，然后获取单位信息和人员信息
    this.initTableData()
    // 获取下拉框单位信息
    companyInfo().then(res => {
      const data = res.data
      if (data.success) {
        this.searchCompany = data.unitinformation
      }
    })
    // 获取下拉框创新载体列表
    getInnovation().then(res => {
      const data = res.data
      if (data.success) {
        this.searchplatform = data.innovationCarrierList
        console.log(this.searchplatform)
      }
    })

    // 获取5个搜索下拉框的列表值
    getMultilevelSelect('EquiClassification').then(res => {
      const data = res.data
      if (data.success) {
        console.log(data)
        this.searchclassify = data.list
      }
    })

    getSelectData('SharingType').then(res => {
      const data = res.data
      if (data.success) {
        this.searchsharingtype = data.list
      }
    })
  },
  methods: {
    // 获取设备列表
    initTableData () {
      this.loading = true
      let query = {
        cname: this.search,             // 仪器名称（或者型号）
        unitname: this.Company,         // 单位
        platform: this.platform,        // 创新载体
        classify: this.classify,        // 设备分类
        subclass: this.subclass,        // 设备小类
        sharingtype: this.sharingtype,  // 共享类型
        status: '',       // 审核状态
        pageIndex: this.page,   // 开始页数（必填）
        pageSize: '10'    // 页数大小（必填）
      }

      getTableData(query).then(res => {
        const data = res.data
        if (data.success) {
          console.log(data)
          this.tableData = data.resultList
          this.total = parseInt(data.pageInfo.totalRecord)
          this.loading = false
        }
      }).catch(() => {
        this.loading = false
      })
    },

    // 新增、查看详情、编辑
    showAddDialog (val, til, row) {
      this.showDialog = true
      this.isRevise = val
      this.dialogTitle = til
      this.row = row
    },
    closeAddDialog (val) {
      this.showDialog = false
      if (this.dialogTitle !== '详情') {
        this.initTableData()
      }
    },
    // 表格多选
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    // 搜索框重置
    resetting () {
      this.search = ''
      this.Company = ''
      this.platform = ''
      this.classify = ''
      this.subclass = ''
      this.sharingtype = ''
      this.initTableData()
    },
    // 审核记录
    recorded (scope) {
      this.showRecordStstus = true
      queryAuditRecordList(scope.row.id).then(res => {
        console.log(res.data)
        if (res.data.success) {
          this.auditList = res.data.list
        }
      })
    },
    // 隐藏审核记录弹框
    hiddenAuditRecord (val) {
      console.log(1)
      this.showRecordStstus = val
    },
    // 表格单个、批量删除
    DeleteData (val, status) {
      let deleteIds = ''
      // status为删除类型   0:单个删除   1：批量删除
      if (status === 0) {
        // relations  0:可删除   其他值：不可删除
        if (val.row.relations !== '0') {
          failDelete(this)
          return
        }
        deleteIds = val.row.id
        val.row.visible2 = false
      } else {
        this.DeletePopover1 = false
        if (this.multipleSelection.length === 0) return
        for (let i = 0; i < this.multipleSelection.length; i++) {
          if (this.multipleSelection[i].relations !== '0') {
            failDelete(this)
            return
          }
          console.log(this.multipleSelection[i].relations)
          deleteIds = this.multipleSelection[i].id + ',' + deleteIds
        }
        deleteIds = deleteIds.substring(0, deleteIds.length - 1)
      }

      deleteList({
        id: deleteIds,
        type: status
      }).then(res => {
        const data = res.data
        if (data.success) {
          successTips(this)
          this.initTableData()
        } else {
          failTips(this)
        }
      }).catch(() => {
        failTips(this)
      })
    },
    // 获取当前页
    CurrentPage (val) {
      this.page = val
      this.initTableData()
    },
    // 导入
    importFile () {
      console.log('导入')
      //   importFilePlat({
      //     auditType: '',
      //     file: 'file'
      //   }).then(res => {
      //     const data = res.data
      //     if (data.success) {
      //       console.log(data)
      //     }
      //   })
    }
  }
}
</script>

<style lang='less' >
.service {
  padding: 20px;
  width: 100%;
  .service-header {
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
  .service-table {
    height: 660px;
    padding-top: 20px;
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
