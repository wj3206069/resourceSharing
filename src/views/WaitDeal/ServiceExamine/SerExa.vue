<template>
  <div class="service">
    <el-form ref="formList"
             :model="formList">
      <div class="service-header zx-flex between">
        <div class="search">
          <el-input v-model="formList.servicename"
                    placeholder="请输入服务名称"></el-input>
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
          <el-select v-model="formList.auditType"
                     @change="selectContent">
            <el-option label="待审核"
                       value="1"></el-option>
            <el-option label="已审核"
                       value="2"></el-option>
          </el-select>
        </div>
        <div class="select-item">
          <label for="">共享类型：</label>
          <el-select v-model="formList.sharingtype"
                     @change="selectContent">
            <el-option :label="item.fieldname"
                       :value="item.fieldcode"
                       v-for="item in SharingTypeList"
                       :key='item.id'></el-option>
          </el-select>
        </div>
        <div class="select-item time_start_end">
          <label for="">时间范围：</label>
          <el-date-picker v-model="formList.pubdateLeft"
                          type="date"
                          placeholder="开始日期"
                          :picker-options="pickerOptions0">
          </el-date-picker>
          <span class="texe_s">至</span>
          <el-date-picker v-model="formList.pubdateRight"
                          type="date"
                          placeholder="结束日期"
                          :picker-options="pickerOptions1"
                          @change="selectContent">
          </el-date-picker>

        </div>
        <div class="select-item confirmation">
          <label for="">价格区间：</label>
          <el-input v-model="formList.priceLeft"
                    type="number"></el-input>
          <span class="zhi">至</span>
          <el-input v-model="formList.priceRight"
                    type="number"></el-input>
          <el-button type="primary"
                     class="margin_5"
                     @click="onSubmit">确认</el-button>
        </div>
      </div>
    </el-form>
    <div class="service-table">
      <div v-loading="loading">
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
                           prop="rn"></el-table-column>
          <el-table-column prop="servicename"
                           label="服务名称"
                           align="center"
                           width="">
          </el-table-column>
          <el-table-column prop="unitname"
                           label="所属单位"
                           align="center">
          </el-table-column>
          <el-table-column prop="username"
                           label="发布人"
                           width=""
                           align="center">
          </el-table-column>
          <el-table-column prop="mobile"
                           label="联系电话"
                           width=""
                           align="center">
          </el-table-column>
          <el-table-column label="共享类型"
                           width=""
                           align="center"
                           prop='sharingTypeDesc'>
          </el-table-column>
          <el-table-column prop="pubdate"
                           label="发布时间"
                           width=""
                           align="center">
          </el-table-column>
          <el-table-column prop="nextwfname"
                           align="center"
                           label="下一环节">
          </el-table-column>
          <el-table-column label="状态"
                           align="center"
                           width=""
                           prop='statusDesc'>
          </el-table-column>
          <el-table-column label="操作"
                           width=""
                           align="center">
            <template slot-scope="scope">
              <el-button type="text"
                         size="small"
                         @click="addManager(true,'详情',scope.row)"
                         v-show='scope.row.status===2'>审核</el-button>
              <el-button type="text"
                         size="small"
                         v-show="scope.row.status!==1"
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
            <el-input v-model="batch_forms.auditrem"
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

    <!-- 详情 审核-->
    <add-manager :showDialog='showDialog'
                 :row='row'
                 :isstate='isstate'
                 :title='dialogTitle'
                 @serviceDialog="serviceDialog"></add-manager>

  </div>
</template>
<script>
import addManager from './reviewSteps'
import '@/views/ShareService/serviceManager/service.css'
import { addSharingType, queryOrgServiceAuditList, goWorkflow, queryAuditRecordList } from '@/api/serviceManagerPlatformApi'
export default {
  components: {
    addManager
  },
  data () {
    return {
      value1: true,
      value2: true,
      batch_form: false,
      loadingService: true,
      total: 1,
      title: '服务机构',
      loading: true, // 加载
      Audit_records: false,
      tableDataList: [], // 审核记录列表
      batch_forms: {
        type: '1',
        auditrem: ''
      }, // 批量审核
      formList: {
        serviceName: '', // 服务列表
        auditType: '1', // 审核状态，1待审核，2已审核
        pubdateLeft: '', // 发布时间左区间
        pubdateRight: '', // 发布时间右区间
        sharingType: '', // 共享类型
        priceLeft: '', // 价格左
        priceRight: '', // 价格右
        pageIndex: 1, // 当前页
        pageSize: 10// 每页数量
      },
      pickerOptions0: {
        disabledDate: time => {
          if (this.formList.pubdateRight !== '') {
            return time.getTime() > Date.now() || time.getTime() > this.formList.pubdateRight
          } else {
            return time.getTime() > Date.now()
          }
        }
      },
      pickerOptions1: {
        disabledDate: time => {
          return time.getTime() < this.formList.pubdateLeft || time.getTime() > Date.now()
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
      idArry: '',
      row: {}, // 单条数据源
      dialogTitle: '', // 标题
      isstate: false

    }
  },
  methods: {
    //  初始调用-------------------------------
    initialCall () {
      // 共享类型
      addSharingType().then(res => {
        this.SharingTypeList = res.data.list
      })
    },
    // 服务结构列表.....
    getServiceListInformationOrganicGM () {
      this.loading = true
      queryOrgServiceAuditList(this.formList).then(res => {
        console.log(res)
        if (res.data.success) {
          this.total = res.data.pageInfo.totalRecord
          this.tableData = res.data.list
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
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
        this.getServiceListInformationOrganicGM()
        this.batch_form = false
        this.idArry = ''
        this.batch_forms = {
          type: '1',
          opinion: ''
        }
      })
    },
    // 重置
    resetForm () {
      let formList = {
        serviceName: '',
        auditType: '1',
        pubdateLeft: '',
        pubdateRight: '',
        sharingType: '',
        priceLeft: '',
        priceRight: '',
        pageIndex: 1,
        pageSize: 10
      }
      this.formList = formList
      this.getServiceListInformationOrganicGM()
    },
    // 搜索服务名称
    search () {
      this.formList.pageIndex = 1
      this.getServiceListInformationOrganicGM()
    },

    // 选择内容筛选
    selectContent () {
      this.formList.pageIndex = 1
      if (this.formList.pubdateRight !== '') {
        this.formList.pubdateLeft = this.$moment(this.formList.pubdateLeft).format('YYYY-MM-DD')
        this.formList.pubdateRight = this.$moment(this.formList.pubdateRight).format('YYYY-MM-DD')
      }
      this.getServiceListInformationOrganicGM()
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
      this.getServiceListInformationOrganicGM()
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
    // 复选框
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
      this.getServiceListInformationOrganicGM()
    },
    submit () {

    },
    // 新增 编辑
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
      this.getServiceListInformationOrganicGM()
    }
  },
  created () {
    this.getServiceListInformationOrganicGM()
    this.initialCall()
  }
}
</script>


