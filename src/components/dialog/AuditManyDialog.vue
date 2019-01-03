<template>
  <div class="AuditManyDialog">
    <!-- 批量审核-->
    <div class="common-dialog ">
      <el-dialog title="批量审核"
                 :visible.sync="dialogFormVisible">
        <div class="AuditManyForm">

          <el-form label-position="right"
                   :model="form"
                   class="service_price_from margin_top_10">
            <el-form-item label="审核:"
                          prop='paymethod'>
              <el-radio v-model="form.type"
                        label="1">同意</el-radio>
              <el-radio v-model="form.type"
                        label="0">不同意</el-radio>
            </el-form-item>
            <el-form-item label="审批意见:"
                          class="textarea_h80">
              <el-input v-model="form.auditrem"
                        type="textarea"
                        placeholder="请输入内容"
                        maxlength="200"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer"
             class="dialog-footer">
          <el-button class="submit primary-btn"
                     type="primary"
                     @click="confirmAudit">确定</el-button>
          <el-button class="cancel"
                     type="primary"
                     @click="cancel">取消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { AuditAPI } from '@/api/waitDeal/EquExaAPI.js'
import { successTips, failTips } from '@/until/showTips'
import { unitUserAudit } from '@/api/clientManage'

export default {
  name: '',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    // 父组件传过来的所选行的信息
    rowList: {
      type: Array,
      default: []
    },
    // 哪个父组件点击的  1: 仪器审核（机构、平台接口一样）   2：单位审核   3：员工审核
    myParent: {
      type: Number
    }
  },
  watch: {
    // 监听内部弹框变量
    dialogFormVisible () {
      if (!this.dialogFormVisible) {
        this.$emit('closeAuditManyDialog', this.dialogFormVisible)
      }
    },
    // 监听外部传进来的弹框变量
    showDialog () {
      this.dialogFormVisible = this.showDialog
    }
  },
  data () {
    return {
      dialogFormVisible: false,
      form: {
        ids: '',      // 审核实例id
        type: '1',    // 审核类型，1: 同意   0: 不同意
        auditrem: '',  // 审核意见
        types: ''       // 审核类型 1专家审核，2单位审核
      }

    }
  },
  methods: {
    confirmAudit () {
      switch (this.myParent) {
        case 1:
          // 仪器审核
          let equipIds = ''
          if (this.rowList.length === 0) return
          for (let i = 0; i < this.rowList.length; i++) {
            equipIds = this.rowList[i].exampleid + ',' + equipIds
          }
          equipIds = equipIds.substring(0, equipIds.length - 1)
          this.form.ids = equipIds
          AuditAPI(this.form).then(res => {
            const data = res.data
            if (data.success) {
              console.log(data)
              successTips(this)
              this.form.type = '1'
              this.form.auditrem = ''
              this.$emit('closeAuditManyDialog', false)
            } else {
              failTips(this)
            }
          })
          break
        case 2:
          // 单位审核
          let companyIds = ''
          if (this.rowList.length === 0) return
          for (let i = 0; i < this.rowList.length; i++) {
            companyIds = this.rowList[i].id + ',' + companyIds
          }
          companyIds = companyIds.substring(0, companyIds.length - 1)
          this.form.ids = companyIds
          this.form.types = 2
          this.form.unitname = this.rowList.unitname
          unitUserAudit(this.form).then(res => {
            const data = res.data
            if (data.success) {
              this.form.type = '1'
              this.form.auditrem = ''
            }
            this.dialogVisible = false
          })
          break
        case 3:
          // 专家审核
          let expertIds = ''
          if (this.rowList.length === 0) return
          for (let i = 0; i < this.rowList.length; i++) {
            expertIds = this.rowList[i].id + ',' + expertIds
          }
          expertIds = expertIds.substring(0, expertIds.length - 1)
          this.form.ids = expertIds
          this.form.types = 1
          unitUserAudit(this.form).then(res => {
            const data = res.data
            if (data.success) {
              this.form.type = '1'
              this.form.auditrem = ''
            }
            this.dialogVisible = false
          })
          break
        case 4:
          // 员工认证
          let employeeIds = ''
          if (this.rowList.length === 0) return
          for (let i = 0; i < this.rowList.length; i++) {
            employeeIds = this.rowList[i].id + ',' + employeeIds
          }
          employeeIds = employeeIds.substring(0, employeeIds.length - 1)
          this.form.ids = employeeIds
          this.form.types = 3
          unitUserAudit(this.form).then(res => {
            const data = res.data
            if (data.success) {
              this.form.type = '1'
              this.form.auditrem = ''
            }
            this.dialogVisible = false
          })
          break
        default:
          break
      }
    },
    cancel () {
      this.$emit('closeAuditManyDialog', false)
    }
  }
}
</script>

<style lang="less" scoped>
.AuditManyDialog {
  .common-dialog {
    .AuditManyForm {
      margin-top: 20px;
    }
  }
}
</style>