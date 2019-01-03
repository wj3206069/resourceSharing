<template>
  <div class="service">
    <div ref="formList"
         :model="formList">
      <div class="service-header zx-flex between">
        <div class="search">
          <el-input v-model="formList.servicename"
                    placeholder="请输入内容"></el-input>
          <el-button type="primary"
                     icon="el-icon-search"
                     @click="search">搜索</el-button>
        </div>
        <div class="operation-button">
          <el-button type="primary"
                     icon="zxicon zx-daochu">导出</el-button>
          <el-button type="primary"
                     class="margin_5"
                     @click="resetForm"
                     icon="zxicon zx-zhongzhi">重置</el-button>
        </div>
      </div>
      <div class="select-group zx-flex between">
        <div class="select-item">
          <label for="">所属单位：</label>
          <el-select placeholder="请选择"
                     clearable
                     v-model="formList.unit_id"
                     @change="searchContent">
            <el-option :label="item.unitname"
                       :value="item.unit_id"
                       v-for="item in SubordinateUnitsList"
                       :key="item.unit_id"></el-option>
          </el-select>
        </div>
        <div class="select-item">
          <label for="">共享类型：</label>
          <el-select v-model="formList.sharingtype"
                     @change="searchContent">
            <el-option :label="item.fieldname"
                       :value="item.fieldcode"
                       v-for="item in SharingTypeList"
                       :key="item.id"></el-option>
          </el-select>
        </div>
        <div class="select-item">
          <label for="">服务类型：</label>
          <el-select v-model="formList.types"
                     @change="searchContent">
            <el-option :label="item.fieldname"
                       :value="item.fieldcode"
                       v-for="item in ServiceTypeList"
                       :key="item.id"></el-option>
          </el-select>
        </div>

        <div class="select-item confirmation">
          <label for="">价格区间：</label>
          <el-input v-model="formList.starprices"
                    type="number"></el-input>
          <span class="zhi">至</span>
          <el-input v-model="formList.endprices"
                    type="number"></el-input>
          <el-button type="primary"
                     class="margin_5"
                     @click="onSubmit">确认</el-button>
        </div>
      </div>
    </div>
    <div class="service-table">
      <div v-loading="loading"
           element-loading-text="拼命加载中"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(0, 0, 0, 0.8)">
        <el-table :data="tableData"
                  border
                  style="width: 100%"
                  @selection-change="handleSelectionChange"
                  tooltip-effect="dark">
          <el-table-column type="selection"
                           align="center"
                           width="40">
          </el-table-column>
          <el-table-column label="序号"
                           width="50"
                           align="center"
                           prop="rowno"></el-table-column>
          <el-table-column prop="servicename"
                           label="服务名称"
                           width="220"
                           align="center">
          </el-table-column>
          <el-table-column prop="unitname"
                           label="所属单位"
                           align="center">
          </el-table-column>
          <el-table-column prop="username"
                           label="发布人"
                           width="100"
                           align="center">
          </el-table-column>
          <el-table-column prop="mobile"
                           label="联系电话"
                           width="120"
                           align="center">
          </el-table-column>
          <el-table-column label="共享类型"
                           width="120"
                           align="center">
            <template slot-scope="scope">
              <span v-text="scope.row.sharingtype === '1'?'内部共享' : '外部共享'"></span>
            </template>
          </el-table-column>
          <el-table-column prop="Instrument_price"
                           label="价格(元)"
                           width="100"
                           align="center">
          </el-table-column>
          <el-table-column prop="pubdate"
                           label="创建时间"
                           width="140"
                           align="center">
          </el-table-column>
          <el-table-column label="状态"
                           align="center"
                           width="100">
            <template slot-scope="scope">
              <div :class="scope.row.status == 3 ?'':'class_s'">
                <span v-if="scope.row.status == '1'">
                  待审核
                </span>
                <span v-else-if="scope.row.status == '2'">
                  审核中
                </span>
                <span v-else-if="scope.row.status == '3'">
                  审核通过
                </span>
                <span v-else>
                  审核未通过
                </span>
              </div>
            </template>

          </el-table-column>
          <el-table-column label="操作"
                           width="200"
                           align="center">
            <template slot-scope="scope">
              <el-button type="text"
                         size="small"
                         @click="addManager(true,'详情',scope)">查看详情</el-button>
              <el-button type="text"
                         size="small"
                         v-show="scope.row.status!==1"
                         @click="auditRecordS(scope.row.id)">审核记录</el-button>

            </template>
          </el-table-column>
        </el-table>
        <el-pagination background
                       layout="prev, pager, next"
                       :total="total"
                       @current-change="handleCurrentChange"></el-pagination>
      </div>
    </div>
    <!-- 查看详情 -->
    <add-manager :showDialog='showDialog'
                 :row='row'
                 :isstate='isstate'
                 :title='dialogTitle'
                 @serviceDialog="serviceDialog"></add-manager>
    <!-- 审核记录 -->
    <audit-record :showRecord='showRecord'
                  :auditList='auditList'
                  @showRecordDialog="showRecordDialog"></audit-record>
  </div>
</template>
<script>
import addManager from './addManager'
import auditRecord from '@/components/dialog/audit/auditRecord'
import './service.css'
import { getServiceListInformationList, addSharingType, addServiceType, getUnitInformationByUserId, queryAuditRecordList } from '@/api/serviceManagerPlatformApi'
export default {
  components: {
    addManager,
    auditRecord
  },
  data () {
    return {
      title: '服务列表',
      SharingTypeList: [], // 共享类型
      ServiceTypeList: [], // 服务类型
      SubordinateUnitsList: [], // 所属单位
      loading: true, // 加载
      total: 1,
      qurey: {
        username: 'ycc1',
        password: '8881'
      },
      formList: {
        servicename: '', //    服务名称
        type: '', // 服务类型
        status: '', // 审核状态
        sharingtype: '', // 共享类型
        unit_id: '', // 所属单位 我自己定义的
        starpubdate: '',
        endprices: '', // 价格区间
        types: '', // 1代表机构，2代表平台（必填）
        pageIndex: '1', // 页数（必填）
        pageSize: '10'// 页数大小（必填）
      },
      tableData: [], // 表格列表
      multipleSelection: [],
      row: {}, // 单条数据源
      dialogTitle: '', // 标题
      isstate: false,
      dialogVisible: false,
      showDialog: false,
      auditList: [], // 审核记录数据
      showRecord: false
    }
  },
  methods: {
    // 列表显示-----------------------------------
    getServiceListInformationGM () {
      this.loading = true
      getServiceListInformationList(this.formList).then(res => {
        this.tableData = res.data.resultList
        this.total = res.data.pageInfo.totalRecord
        if (res.data.success) {
          this.loading = false
        }
      })
    },
    // 重置
    resetForm () {
      let formList = {
        servicename: '', //    服务名称
        type: '', // 服务类型
        status: '', // 审核状态
        sharingtype: '', // 共享类型
        unit_id: '', // 所属单位
        endprices: '', // 价格区间
        types: '', // 1代表机构，2代表平台（必填）
        pageIndex: '1', // 页数（必填）
        pageSize: '10' // 页数大小（必填）
      }
      this.formList = formList
      this.getServiceListInformationGM()
    },
    initialCall () {
      // 共享类型
      addSharingType().then(res => {
        this.SharingTypeList = res.data.list
      })

      // 服务类型
      addServiceType().then(res => {
        this.ServiceTypeList = res.data.list
      })
      // 所属单位
      getUnitInformationByUserId().then(res => {
        console.log(res.data)
        this.SubordinateUnitsList = res.data.unitinformation
      })
    },
    // 搜索服务名称
    search () {
      this.formList.pageIndex = 1
      this.getServiceListInformationGM()
    },
    //  下拉框搜索内容
    searchContent () {
      this.formList.pageIndex = 1
      this.getServiceListInformationGM()
    },
    //  查询
    onSubmit () {
      this.formList.pageIndex = 1
      // 价格判断------------------------------
      let price1 = this.formList.starprices
      let price2 = this.formList.endprices
      if (parseInt(price1) > parseInt(price2)) {
        this.formList.endprices = price1
        this.formList.starprices = price2
      } else if (price1 === '' && price2 !== '') {
        this.formList.starprices = '0'
      } else if (price1 !== '' && price2 === '') {
        this.formList.endprices = price1
        this.formList.starprices = '0'
      }
      this.getServiceListInformationGM()
    },
    // 复选框-------=--------
    handleSelectionChange (val) {
      this.multipleSelection = val
    },

    //  分页
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.formList.pageIndex = val
      this.getServiceListInformationGM()
    },
    // 查看详情
    addManager (val, tiele, row) {
      console.log()
      this.showDialog = true
      this.isstate = val
      this.dialogTitle = tiele
      this.row = row
    },
    serviceDialog (val) {
      console.log(val)
      this.showDialog = false
      this.getServiceListInformationGM()
    },
    // 审核记录
    showRecordDialog () {
      this.showRecord = false
      this.getServiceListInformationGM()
    },
    auditRecordS (id) {
      queryAuditRecordList(id).then(res => {
        console.log(res.data)
        if (res.data.success) {
          this.auditList = res.data.list
          console.log(res.data.list)
          this.showRecord = true
        }
      })
    }

  },
  created () {
    this.getServiceListInformationGM()
    this.initialCall()
  }
}
</script>



