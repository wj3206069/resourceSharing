<template>
  <div class="service">
    <el-form ref="formList"
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
                     icon="zxicon zx-xinzeng2"
                     @click="addManager(false,'新增',{})">新增</el-button>
          <el-button type="primary"
                     icon="zxicon zx-xiajia"
                     class="background_c"
                     @click="Batchbelow">批量下架</el-button>
          <el-button type="primary"
                     icon="zxicon zx-shangjia"
                     @click="Batchshelves">批量上架</el-button>
          <el-button type="primary"
                     class="margin_5"
                     @click="resetForm"
                     icon="zxicon zx-zhongzhi">重置</el-button>
        </div>
      </div>
      <div class="select-group zx-flex between">
        <div class="select-item">
          <label for="">服务状态：</label>
          <el-select v-model="formList.status"
                     @change="searchContent">
            <el-option :label="item.fieldname"
                       :value="item.fieldcode"
                       v-for="item in serviceStateList"
                       :key='item.id'></el-option>
          </el-select>
        </div>
        <div class="select-item">
          <label for="">共享类型：</label>
          <el-select v-model="formList.sharingtype"
                     @change="searchContent">
            <el-option :label="item.fieldname"
                       :value="item.fieldcode"
                       v-for="item in SharingTypeList"
                       :key='item.id'></el-option>
          </el-select>
        </div>
        <div class="select-item time_start_end">
          <label for="">时间范围：</label>
          <el-date-picker v-model="formList.starpubdate"
                          type="date"
                          placeholder="开始日期"
                          :picker-options="pickerOptions0">
          </el-date-picker>
          <span class="texe_s">至</span>
          <el-date-picker v-model="formList.endpubdate"
                          type="date"
                          placeholder="结束日期"
                          :picker-options="pickerOptions1"
                          @change="searchContent">
          </el-date-picker>

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
    </el-form>
    <div class="service-table">
      <div v-loading="loading"
           element-loading-text="拼命加载中"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(0,0,0,0.8)">
        <el-table :data="tableData"
                  border
                  style="width: 100%"
                  @selection-change="handleSelectionChange"
                  tooltip-effect="dark"
                  ref="multipleTable">
          <el-table-column type="selection"
                           align="center"
                           width="50">
          </el-table-column>
          <el-table-column label="序号"
                           width="80"
                           align="center"
                           prop="rowno"></el-table-column>
          <el-table-column prop="servicename"
                           label="服务名称"
                           align="center"
                           width="160">
          </el-table-column>
          <el-table-column prop="unitname"
                           label="所属单位"
                           align="center">
          </el-table-column>
          <el-table-column prop="username"
                           label="发布人"
                           width="120"
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
          <el-table-column prop="pubdate"
                           label="创建时间"
                           width="120"
                           align="center">
          </el-table-column>
          <el-table-column label="状态"
                           align="center"
                           width="80">
            <template slot-scope="scope">
              <div :class="scope.row.status == 3 ?'':'class_s'">
                <span v-if="scope.row.status == '1'">
                  待送审
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
                           width="260"
                           align="center">
            <template slot-scope="scope">
              <el-button type="text"
                         size="small"
                         @click="addManager(false,'编辑',scope)">
                <span v-if="scope.row.status == '1'||scope.row.status == '4'">
                  编辑
                </span>
              </el-button>
              <el-switch v-model="scope.row.isupdown"
                         active-color="#61A3FE"
                         inactive-color="#474747"
                         active-value="1"
                         inactive-value="0"
                         @change="standUpDown(scope.row.isupdown,scope.row.id)"
                         :disabled="scope.row.status !== '3'">
              </el-switch>
              <span size="small"
                    v-text="scope.row.isupdown==1?'上架':'下架'"
                    style="position: relative;left: -40px;font-size: 12px;color: #fff;"
                    :class="scope.row.isupdown==1?'up_and_down':''">
              </span>
              <el-button type="text"
                         size="small"
                         v-show="scope.row.status!==1"
                         @click="auditRecordS(scope.row.id)"
                         class='mg_lf'>审核记录</el-button>

            </template>
          </el-table-column>

        </el-table>
        <el-pagination background
                       layout="prev, pager, next"
                       :total="total"
                       @current-change="handleCurrentChange"></el-pagination>
      </div>
    </div>
    <!-- 新增  编辑-->
    <add-manager :showDialog='showDialog'
                 :row='row'
                 :isstate='isstate'
                 :title='dialogTitle'
                 :orders_lists='orders_lists'
                 :electronic_contract_lists='electronic_contract_lists'
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
import { addSharingType, serviceState, getServiceListInformationOrganic, upperFrameServiceInformation, queryAuditRecordList, getProtocolList2, getProtocolList3 } from '@/api/serviceManagerPlatformApi'
export default {
  components: {
    addManager,
    auditRecord
  },
  data () {
    return {
      value1: true,
      value2: true,
      total: 1,
      title: '服务平台',
      loading: true, // 加载
      formList: {
        servicename: '', // 服务名称
        status: '',     // 审核状态
        sharingtype: '', // 共享类型
        starpubdate: '', //
        endpubdate: '', // 发布时间
        starprices: '',
        endprices: '', // 价格区间
        type: '', // 1代表机构，2代表平台（必填）
        pageIndex: '1', // 页数（必填）
        pageSize: '10' // 页数大小（必填）

      },
      pickerOptions0: {
        disabledDate: time => {
          if (this.formList.endpubdate !== '') {
            return time.getTime() > Date.now() || time.getTime() > this.formList.endpubdate
          } else {
            return time.getTime() > Date.now()
          }
        }
      },
      pickerOptions1: {
        disabledDate: time => {
          return time.getTime() < this.formList.starpubdate || time.getTime() > Date.now()
        }
      },
      search_name: '',
      tableData: [], // 表格列表数据
      multipleSelection: [],
      service_qualification: false,
      dialogImageUrl: '',
      dialogVisible: false,
      showDialog: false,
      disabled: false,
      SharingTypeList: [], // 共享类型
      serviceStateList: [], // 服务状态
      idArry: '',
      row: {}, // 单条数据源
      dialogTitle: '', // 标题
      isstate: false,
      auditList: [], // 审核记录数据
      showRecord: false,
      electronic_contract_lists: [], // 电子合同
      orders_lists: [], // 委托单
      statusList: []// 状态

    }
  },
  methods: {
    //  初始调用-------------------------------
    initialCall () {
      // 共享类型
      addSharingType().then(res => {
        this.SharingTypeList = res.data.list
      })
      // 服务状态
      serviceState().then(res => {
        this.serviceStateList = res.data.list
      })
    },
    // 服务结构列表.....
    getServiceListInformationOrganicGM () {
      this.loading = true
      getServiceListInformationOrganic(this.formList).then(res => {
        console.log(res)
        if (res.data.success) {
          this.total = res.data.pageInfo.totalRecord
          this.tableData = res.data.resultList
          this.loading = false
        }
      })
    },
    // 委托单与电子合同
    getProtocolListGM () {
      // 电子合同
      getProtocolList2().then(res => {
        if (res.data.success) {
          this.electronic_contract_lists = res.data.list
        }
      })
      // 委托单
      getProtocolList3().then(res => {
        if (res.data.success) {
          this.orders_lists = res.data.list
        }
      })
    },
    // 重置
    resetForm () {
      let formList = {
        servicename: '',
        status: '',
        sharingtype: '',
        starpubdate: '',
        endpubdate: '',
        starprices: '',
        endprices: '',
        type: '',
        pageIndex: '1',
        pageSize: '10'
      }
      this.formList = formList
      this.getServiceListInformationOrganicGM()
    },
    // 搜索服务名称
    search () {
      this.formList.pageIndex = 1
      this.getServiceListInformationOrganicGM()
    },
    searchContent () {
      if (this.formList.starpubdate !== '') {
        this.formList.starpubdate = this.$moment(this.formList.starpubdate).format('YYYY-MM-DD')
        this.formList.endpubdate = this.$moment(this.formList.endpubdate).format('YYYY-MM-DD')
      }
      this.formList.pageIndex = 1
      this.getServiceListInformationOrganicGM()
    },
    //  查询
    onSubmit () {
      this.formList.pageIndex = 1
      // 价格替换
      let price1 = this.formList.starprices
      let price2 = this.formList.endprices
      console.log(price1, price2)
      if (parseInt(price1) > parseInt(price2)) {
        this.formList.endprices = price1
        this.formList.starprices = price2
      } else if (price1 === '' && price2 !== '') {
        this.formList.starprices = '0'
      } else if (price1 !== '' && price2 === '') {
        this.formList.endprices = price1
        this.formList.starprices = '0'
      }
      this.getServiceListInformationOrganicGM()
    },

    // 复选框
    handleSelectionChange (val) {
      let ids = []
      this.statusList = []
      this.multipleSelection = val
      console.log(this.multipleSelection)
      for (var i = 0; i < this.multipleSelection.length; i++) {
        ids.push(this.multipleSelection[i].id)
        this.statusList.push(this.multipleSelection[i].status)
      }
      this.idArry = ids.join(',')
      console.log(this.idArry)
      console.log(this.statusList)
    },
    //  分页
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.formList.pageIndex = val
      this.getServiceListInformationOrganicGM()
    },
    submit () {

    },
    // 批量上架
    Batchshelves () {
      if (this.idArry === '') {
        this.$message('请选择数据')
        return false
      }
      for (let i = 0; i < this.statusList.length; i++) {
        if (this.statusList[i] !== '3') {
          this.$message({
            message: '审核未通过不能上下架',
            type: 'warning'
          })
          return false
        }
      }
      let qurey = {
        type: '1',
        business_id: this.idArry,
        isupdown: '1'
      }
      this.loading = true
      upperFrameServiceInformation(qurey).then(res => {
        if (res.data.success) {
          this.getServiceListInformationOrganicGM()
          this.loading = false
        }
      })
    },
    // 批量下架
    Batchbelow () {
      if (this.idArry === '') {
        this.$message('请选择数据')
        return false
      }
      for (let i = 0; i < this.statusList.length; i++) {
        if (this.statusList[i] !== '3') {
          this.$message({
            message: '审核未通过不能上下架',
            type: 'warning'
          })
          return false
        }
      }
      this.loading = true
      let qurey = {
        type: '1',
        business_id: this.idArry,
        isupdown: '0'
      }
      upperFrameServiceInformation(qurey).then(res => {
        console.log(res.data)
        if (res.data.success) {
          this.getServiceListInformationOrganicGM()
          this.loading = false
        }
      })
    },
    // 单一上下架
    standUpDown (isupdown, id) {
      let status = ''
      console.log(isupdown)
      if (isupdown === '0') {
        status = 0
      } else {
        status = 1
      }
      this.loading = true
      let qurey = {
        type: '0',
        business_id: id,
        isupdown: status
      }
      upperFrameServiceInformation(qurey).then(res => {
        if (res.data.success) {
          this.loading = false
          this.getServiceListInformationOrganicGM()
        }
      })
    },

    // 上下架
    changeSwitch (data) {
      console.log(data)
    },
    // 新增 编辑
    addManager (val, tiele, row) {
      console.log()
      this.showDialog = true
      this.isstate = val
      this.dialogTitle = tiele
      this.row = row
      this.getProtocolListGM()
      console.log(val, tiele, row)
    },

    serviceDialog (val) {
      this.showDialog = false
      this.getServiceListInformationOrganicGM()
    },
    // 审核记录
    showRecordDialog () {
      this.showRecord = false
      this.getServiceListInformationOrganicGM()
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
    this.getServiceListInformationOrganicGM()
    this.initialCall()
  }
}
</script>

