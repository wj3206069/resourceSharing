<template>
  <div class="EquipExamine">
    <div class="flex between search-header">
      <div class="select-item search-input">
        <el-input v-model="search"
                  placeholder="请输入仪器名称或型号"></el-input>
        <el-button type="primary"
                   icon="el-icon-search"
                   @click="initTableData">搜索</el-button>

        <label for="">状态：</label>
        <el-select v-model="status"
                   @change="initTableData">
          <el-option label="待审核"
                     value="1"></el-option>
          <el-option label="已审核"
                     value="2"></el-option>
        </el-select>
      </div>
      <div>
        <el-button v-if="status==1"
                   type="primary"
                   icon="zxicon zx-piliangshenhe"
                   @click="showAuditManyDialog">批量审核</el-button>
        <el-button type="primary"
                   icon="zxicon zx-zhongzhi"
                   @click="resetting">重置</el-button>
      </div>
    </div>
    <div class="flex between search-header">
      <div class="select-item">
        <label for="">所属单位：</label>
        <el-select v-model="Company"
                   @change="initTableData">
          <el-option v-for="item in searchCompany"
                     :key="item.unit_id"
                     :label="item.unitname"
                     :value="item.unit_id"></el-option>
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

    <div class="common-table deal-table">
      <el-table stripe
                border
                style="width: 100%"
                :data="tableData"
                v-loading="loading"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection"
                         align="center"
                         width="50">
        </el-table-column>
        <el-table-column prop="rn"
                         label="序号"
                         align="center"
                         width="80">
        </el-table-column>
        <el-table-column prop="cname"
                         label="仪器中文名称"
                         align="center">
        </el-table-column>
        <el-table-column prop="unitname"
                         align="center"
                         label="所属单位">
        </el-table-column>
        <el-table-column prop="platformname"
                         align="center"
                         label="所属创新载体">
        </el-table-column>
        <el-table-column prop="name"
                         align="center"
                         label="型号规格">
        </el-table-column>
        <el-table-column prop="specification"
                         align="center"
                         width="150"
                         label="共享类型">
        </el-table-column>
        <el-table-column prop="price"
                         align="center"
                         label="设备价格(万元)"
                         width="150">
        </el-table-column>
        <el-table-column prop="nextwfname"
                         align="center"
                         label="下一环节">
        </el-table-column>
        <el-table-column prop="statusDesc"
                         align="center"
                         label="状态"
                         width="150">
          <!-- <template slot-scope="scope"> -->
          <!-- <span class="editing"
                  v-if="scope.row.status===1">填报中</span>
            <span class="report"
                  v-if="scope.row.status===2">上报待审核</span> -->
          <!-- <span v-if="scope.row.status===1">待审核</span>
            <span v-if="scope.row.status===2">已审核</span> -->
          <!-- <span class="nopass"
                  v-if="scope.row.status===5">不通过</span>
            <span class="published"
                  v-if="scope.row.status===6">已发布</span> -->
          <!-- </template> -->
        </el-table-column>
        <el-table-column prop="status"
                         align="center"
                         label="操作"
                         width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.status==2&&status==='1'"
                  @click="showAuditDialog(scope)">审核</span>
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
    <!-- 单条审核弹框 -->
    <equ-audit :showDialog='showDialog'
               :companyList='searchCompany'
               :InnovationList="searchplatform"
               :classifyList='searchclassify'
               :row='row'
               :sharingTypeList='searchsharingtype'
               @closeAddDialog="closeAddDialog"></equ-audit>
    <!-- 批量审核弹框 -->
    <audit-many :showDialog='showDialogMany'
                :rowList='rowList'
                :myParent=1
                @closeAuditManyDialog="closeAuditManyDialog"></audit-many>
  </div>
</template>

<script>
import EquAudit from '@/components/dialog/audit/EquAuditDialog'
import AuditMany from '@/components/dialog/AuditManyDialog'
import { tablelist } from '@/api/waitDeal/EquExaAPI.js'
import { getSelectData, getMultilevelSelect, companyInfo, getInnovation } from '@/api/EquipService/EquipManagerAPI.js'

export default {
  name: 'EquipExamine',
  components: {
    EquAudit,
    AuditMany
  },
  data () {
    return {
      searchCompany: [],  // 搜索框所属单位信息
      searchplatform: [], // 搜索框所属创新载体信息
      searchclassify: [], // 搜索框设备分类信息
      searchsubclass: [], // 搜索框设备小类信息
      searchsharingtype: [], // 搜索框共享类型信息

      Company: '',      // 所属单位
      platform: '',     // 所属创新载体
      classify: '',     // 设备分类
      subclass: '',     // 设备小类
      sharingtype: '',  // 共享类型
      status: '1',      // 状态
      search: '',       // 搜索框的值
      tableData: [],    // 列表数据
      page: '1',        // 当前页数
      total: 1,         // 总页数
      loading: true,    // 表格加载效果  true:加载中   false：移除加载效果
      row: {},          // 将当前点击的行信息传递给子组件
      showDialog: false, // 是否显示单个审批dialog
      multipleSelection: [],
      showDialogMany: false, // 批量删除弹框
      rowList: []       // 批量删除传给子组件的列表
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
      }
    })

    // 获取设备分类下拉框的列表值
    getMultilevelSelect('EquiClassification').then(res => {
      const data = res.data
      if (data.success) {
        console.log(data)
        this.searchclassify = data.list
      }
    })
    // 获取共享类型下拉框的列表值
    getSelectData('SharingType').then(res => {
      const data = res.data
      if (data.success) {
        this.searchsharingtype = data.list
      }
    })
  },
  methods: {
    // 获取表格列表
    initTableData () {
      this.loading = true
      let query = {
        unit_id: this.Company,  // 所属单位id
        auditType: this.status,  // 审核状态，1待审核，2已审核
        platformId: this.platform,  // 所属创新载体id
        classify: this.classify,  // 仪器分类
        subclass: this.subclass,  // 仪器小类
        key: this.search,  // 仪器名称或型号
        sharingType: this.sharingtype,  // 共享类型
        pageIndex: this.page,  // 当前页
        pageSize: '10'  // 每页数量
      }
      tablelist(query).then(res => {
        const data = res.data
        if (data.success) {
          console.log(data)
          this.tableData = data.list
          this.total = parseInt(data.pageInfo.totalRecord)
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    // 表格多选
    handleSelectionChange (val) {
      console.log(val)
      this.multipleSelection = val
    },
    AuditMany () {

    },
    // 搜索框重置
    resetting () {
      this.search = ''
      this.Company = ''
      this.platform = ''
      this.classify = ''
      this.subclass = ''
      this.sharingtype = ''
      this.auditType = '1'
      this.initTableData()
    },
    // 获取当前页
    CurrentPage (val) {
      this.page = val
      this.initTableData()
    },
    showAuditDialog (val) {
      this.row = val.row
      this.showDialog = true
    },
    closeAddDialog (val) {
      this.showDialog = false
      this.initTableData()
    },
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

<style lang="less">
.EquipExamine {
  padding: 20px;
  width: 100%;
  .search-header {
    margin-bottom: 20px;
    padding: 0 10px;
    .select-item {
      // width: 225px;
      label {
        font-size: 14px;
      }
      .el-select {
        .el-input--suffix {
          .el-input__inner {
            width: 150px;
            height: 36px;
          }
        }
      }
    }
    .search-input {
      .el-input {
        width: 300px;
        input {
          height: 36px;
        }
      }
      label {
        margin-left: 30px;
      }
      .el-select {
        .el-input {
          width: 150px;
        }
      }
    }
    button {
      background-color: #61a3fe;
      border: none;
      border-radius: 10px;
      padding: 11px 16px;
    }
  }
  .deal-table {
    height: 660px;
    margin: 0 10px;
    overflow-y: auto;
    .deal-page {
      padding: 20px 0;
      text-align: center;
    }
  }
}
</style>