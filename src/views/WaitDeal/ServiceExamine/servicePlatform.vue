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
                     icon="zxicon zx-piliangshenhe"
                     @click="batchReview"
                     v-show="formList.auditType==='1'">批量审核</el-button>
          <el-button type="primary"
                     class="margin_5"
                     @click="resetForm"
                     icon="zxicon zx-zhongzhi">重置</el-button>
        </div>
      </div>

      <div class="select-group zx-flex between">
        <div class="select-item">
          <label for="">审核状态：</label>
          <el-select placeholder="请选择"
                     clearable
                     v-model="formList.auditType"
                     @change="selectData">
            <el-option label="待审核"
                       value="1"></el-option>
            <el-option label="已审核"
                       value="2"></el-option>
          </el-select>

        </div>
        <div class="select-item">
          <label for="">所属单位：</label>
          <el-select placeholder="请选择"
                     clearable
                     v-model="formList.unit_id"
                     @change="selectData">
            <el-option :label="item.username"
                       :value="item.id"
                       v-for="item in Subordinate_units"
                       :key="item.id"></el-option>
          </el-select>
        </div>
        <div class="select-item">
          <label for="">共享类型：</label>
          <el-select v-model="formList.sharingtype"
                     @change="selectData">
            <el-option :label="item.fieldname"
                       :value="item.fieldcode"
                       v-for="item in SharingTypeList"
                       :key="item.fieldcode"></el-option>
          </el-select>
        </div>
        <div class="select-item">
          <label for="">服务类型：</label>
          <el-select v-model="formList.type"
                     @change="selectData">
            <el-option :label="item.fieldname"
                       :value="item.fieldcode"
                       v-for="item in ServiceTypeList"
                       :key="item.fieldcode"></el-option>
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
      <div v-loading="loading">
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
                           prop="rn"></el-table-column>
          <el-table-column prop="servicename"
                           label="服务名称"
                           width="220"
                           align="center">
          </el-table-column>
          <el-table-column prop="unitname"
                           label="所属单位"
                           align="center">
          </el-table-column>
          <el-table-column prop="unitname"
                           label="所属创新载体"
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
                           align="center"
                           prop='sharingTypeDesc'>
          </el-table-column>
          <el-table-column prop="Instrument_price"
                           label="价格(元)"
                           width="100"
                           align="center">
          </el-table-column>
          <el-table-column prop="pubdate"
                           label="发布时间"
                           width="140"
                           align="center">
          </el-table-column>
          <el-table-column label="状态"
                           align="center"
                           width="100"
                           prop='statusDesc'>
          </el-table-column>
          <el-table-column label="操作"
                           width="200"
                           align="center">
            <template slot-scope="scope">
              <!-- <el-button type="text"
                         size="small"
                         @click="addManager(false,'编辑',scope)"
                         v-if='scope.row.status===2'>审核</el-button> -->
              <el-button type="text"
                         size="small"
                         v-if="scope.row.status!==1"
                         @click="auditRecords(scope.row.serviceid)">审核记录</el-button>

            </template>
          </el-table-column>
        </el-table>
        <el-pagination background
                       layout="prev, pager, next"
                       :total="total"
                       @current-change="handleCurrentChange"></el-pagination>
      </div>
    </div>
    <!-- 批量审核-->
    <div class="common-dialog">
      <el-dialog title="批量审核"
                 :visible.sync="batch_form">
        <el-form label-position="right"
                 :model="batch_forms"
                 class="service_price_from margin_top_10">
          <el-form-item label="审核:"
                        prop='paymethod'>
            <el-radio v-model="batch_forms.type"
                      label="1">同意</el-radio>
            <el-radio v-model="batch_forms.type"
                      label="0">不同意</el-radio>
          </el-form-item>
          <el-form-item label="审批意见:"
                        class="textarea_h80">
            <el-input v-model="batch_forms.opinion"
                      type="textarea"
                      placeholder="请输入内容"
                      maxlength="200"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button class="submit primary-btn"
                     type="primary"
                     @click="Batchapproval">确定</el-button>
          <el-button class="cancel"
                     type="primary"
                     @click="batch_form=false">取消</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 审核记录 -->
    <div class="common-dialog">
      <el-dialog title="审核记录"
                 :visible.sync="Audit_records">
        <div class="tab_color"
             v-loading="loadingService"
             element-loading-text="拼命加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0,0,0,0.8)">
          <el-table ref="multipleTable"
                    tooltip-effect="dark"
                    style="width: 100%"
                    :data="tableDataList">
            <el-table-column prop="auditname"
                             label="审核人"
                             align="center">
            </el-table-column>
            <el-table-column prop="isagree"
                             label="审核状态"
                             align="center">
            </el-table-column>
            <el-table-column prop="audittime"
                             label="时间"
                             align="center">
            </el-table-column>
            <el-table-column prop="auditrem"
                             label="备注"
                             align="center">
            </el-table-column>
          </el-table>
        </div>
        <div slot="footer"
             class="dialog-footer">
          <el-button class="cancel"
                     type="primary"
                     @click="Audit_records=false">取消</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 审核 -->
    <add-manager :showDialog='showDialog'
                 :row='row'
                 :isstate='isstate'
                 :title='dialogTitle'
                 @serviceDialog="serviceDialog"></add-manager>
  </div>
</template>
<script>
import addManager from './reviewSteps'
import '@/views/ShareService/serviceManager/service.css'  // queryPlatformServiceAuditList
import { queryPlatformServiceAuditList, addSharingType, addServiceType, getUserformationByUnitId, goWorkflow, queryAuditRecordList } from '@/api/serviceManagerPlatformApi'
export default {
  components: {
    addManager
  },
  data () {
    return {
      title: '服务平台',
      batch_form: false,
      Audit_records: false,
      loadingService: true,
      SharingTypeList: [], // 共享类型
      tableDataList: [], // 审核记录列表
      ServiceTypeList: [], // 服务类型
      loading: true, // 加载
      total: 1,
      batch_forms: {
        type: '1',
        opinion: ''
      }, // 批量审核
      formList: {
        serviceName: '', // 服务列表
        auditType: '1', // 审核状态，1待审核，2已审核
        sharingType: '', // 共享类型
        priceLeft: '', // 价格左
        priceRight: '', // 价格右
        pageIndex: 1, // 当前页
        pageSize: 10, // 每页数量
        unit_id: '', // 所属单位
        type: ''// 服务类型
      },
      tableData: [], // 表格列表
      multipleSelection: [],
      row: {}, // 单条数据源
      dialogTitle: '', // 标题
      Subordinate_units: [], // 所属单位
      isstate: false,
      dialogVisible: false,
      showDialog: false,
      idArry: ''

    }
  },
  methods: {
    // 列表显示-----------------------------------
    getServiceListInformationGM () {
      this.loading = true
      queryPlatformServiceAuditList(this.formList).then(res => {
        if (res.data.success) {
          this.tableData = res.data.list
          this.total = res.data.pageInfo.totalRecord
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    // 重置
    resetForm () {
      let formList = {
        serviceName: '',
        auditType: '1',
        sharingType: '',
        priceLeft: '',
        priceRight: '',
        pageIndex: 1,
        pageSize: 10,
        unit_id: ''
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
      getUserformationByUnitId().then(res => {
        this.Subordinate_units = res.data.unitinformationlist
        console.log(res.data.unitinformationlist)
      })
    },
    // 搜索服务名称
    search () {
      this.formList.pageIndex = 1
      this.getServiceListInformationGM()
    },
    //  查询
    onSubmit () {
      this.formList.pageIndex = 1
      // 价格替换
      let price1 = this.formList.priceLeft
      let price2 = this.formList.priceRight
      console.log(price1, price2)
      if (parseInt(price1) > parseInt(price2)) {
        this.formList.priceRight = price1
        this.formList.priceLeft = price2
      } else if (price1 === '' && price2 !== '') {
        this.formList.priceLeft = '0'
      } else if (price1 !== '' && price2 === '') {
        this.formList.priceRight = price1
        this.formList.priceLeft = '0'
      }
      this.getServiceListInformationGM()
    },
    // 下拉选择条件
    selectData () {
      this.formList.pageIndex = 1
      this.getServiceListInformationGM()
    },
    // 批量审核
    batchReview () {
      if (this.idArry === '') {
        this.$message('请选择数据')
        return false
      }
      this.batch_form = true
      this.batch_forms.ids = this.idArry
    },
    // 批量审核确定
    Batchapproval () {
      goWorkflow(this.batch_forms).then(res => {
        console.log(res.data)
        if (res.data.success) {
          this.$message.success('批量审核成功')
        } else {
          this.$message.error('批量审核失败')
        }
        this.getServiceListInformationGM()
        this.batch_form = false
        this.idArry = ''
        this.batch_forms = {
          type: '1',
          opinion: ''
        }
      })
    },
    // 审核记录
    auditRecords (id) {
      this.Audit_records = true
      queryAuditRecordList(id).then(res => {
        console.log(res.data)
        if (res.data.success) {
          this.tableDataList = res.data.list
          this.loadingService = false
        }
      })
    },

    // 复选框-------=--------
    handleSelectionChange (val) {
      let ids = []
      this.multipleSelection = val
      console.log(this.multipleSelection)
      for (var i = 0; i < this.multipleSelection.length; i++) {
        ids.push(this.multipleSelection[i].exampleid)
      }
      this.idArry = ids.join(',')
      console.log(this.idArry)
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
      console.log(val, tiele, row)
    },
    serviceDialog (val) {
      console.log(val)
      this.showDialog = false
      this.getServiceListInformationGM()
    }

  },
  created () {
    this.getServiceListInformationGM()

    this.initialCall()
  }
}
</script>



