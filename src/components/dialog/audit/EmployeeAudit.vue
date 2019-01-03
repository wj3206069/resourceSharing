<template>
  <div class="EmployeeAuidt">
    <div class="common-dialog">
      <el-dialog el-dialog
                 title="员工详情"
                 :visible.sync="dialogVisible">
        <div class="mg-t-30"
             style="padding-bottom: 30px;height: 56vh;overflow-y: auto;">
          <ul>
            <li class="zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">用户名称：</span>
              <div class="item-name zx-flex align">{{detailData.username}}</div>
            </li>
            <li class="zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">身份证号：</span>
              <div class="item-name zx-flex align">{{detailData.idcard}}</div>
            </li>
            <li class="zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">性别：</span>
              <div class="item-name zx-flex align"
                   v-text="detailData.sex=='1'?'男':'女'"></div>
            </li>
            <li class="zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">出生日期：</span>
              <div class="item-name zx-flex align">{{detailData.birthday}}</div>
            </li>
            <li class="zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">手机号：</span>
              <div class="item-name zx-flex align">{{detailData.phone}}</div>
            </li>
            <li class="zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">头像：</span>
              <div class="item-name zx-flex align"
                   style="border: none;">
                <img src=""
                     width="90"
                     height="90">
              </div>
            </li>
            <li class="zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">个人邮箱：</span>
              <div class="item-name zx-flex align">{{detailData.personalmailbox}}</div>
            </li>
            <li class="zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">QQ号：</span>
              <div class="item-name zx-flex align">{{detailData.qq}}</div>
            </li>
            <li class="zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">微信号：</span>
              <div class="item-name zx-flex align">{{detailData.wechatnumber}}</div>
            </li>
            <li class="zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">详细地址：</span>
              <div class="item-name zx-flex align">{{address}}{{detailData.detailed}}</div>
            </li>
            <li class="zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">紧急联系人：</span>
              <div class="item-name zx-flex align">{{detailData.emergencycontact}}</div>
            </li>
            <li class="zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">紧急联系人电话：</span>
              <div class="item-name zx-flex align">{{detailData.emergencycontactnumber}}</div>
            </li>
            <li class="zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">单位名称：</span>
              <div class="item-name zx-flex align">{{detailData.unitname}}</div>
            </li>
            <li class="zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">登录账号：</span>
              <div class="item-name zx-flex align">{{detailData.account}}</div>
            </li>
            <li class="zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">登录密码：</span>
              <div class="item-name zx-flex align">{{detailData.password}}</div>
            </li>
          </ul>
        </div>
        <!-- 审批意见 strat-->
        <div class="emp-audit">
          <el-form :model="form">
            <el-form-item label="审核：">
              <el-radio v-model="form.type"
                        label="1">通过</el-radio>
              <el-radio v-model="form.type"
                        label="0">不通过</el-radio>
            </el-form-item>
            <el-form-item label="审批意见：">
              <el-input type="textarea"
                        v-model="form.auditrem" />
            </el-form-item>
          </el-form>
        </div>
        <!-- 审批意见 end-->
        <span slot="footer"
              class="dialog-footer">
          <el-button v-for="(item, index) in dialogFooter"
                     :key="index"
                     :style="item.color"
                     @click.stop.prevent="onDialogFooter(index)">{{item.name}}</el-button>
        </span>
      </el-dialog>
    </div>

  </div>
</template>

<script>
import { unitUserAudit } from '@/api/clientManage'
import { exportDetail } from '@/api/waitDeal/EquExaAPI.js'
import addressJson from '@/assets/utils/address.js'

export default {
  name: 'unitDetail',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    row: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      dialogVisible: false,
      detailData: {},
      dialogFooter: [{
        name: '确定',
        color: 'background: #61A3FE;'
      }, {
        name: '取消',
        color: 'background: #ccc;'
      }],
      form: {
        busied: '',       // 审核实例id
        auditrem: '',     // 审核意见
        type: '1',        // 审核类型，1同意 2不同意  默认为1
        types: '1',       // 1：专家审核    2：单位审核
        types1: '1',      // 新增字段
        id: '',           // 新增字段  员工id
        unit_id: '',      // 新增字段  单位id
        username: ''      // 新增字段  用户名称
      },
      addressList: addressJson,
      address: ''       // 地址id转换成中文的地址

    }
  },
  watch: {
    showDialog () {
      this.dialogVisible = this.showDialog
      console.log(this.dialogVisible + '   ' + this.showDialog)
    },
    dialogVisible () {
      if (!this.dialogVisible) {
        this.$emit('returnBool', this.dialogVisible)
      }
    },
    row () {
      exportDetail({
        id: this.row.id
      }).then(res => {
        const data = res.data
        if (data.success) {
          this.detailData = data.resultList
          // 将省市区id转换成省市区中文
          let proIndex = this.detailData.province
          let cityIndex = this.detailData.city
          let countyIndex = this.detailData.county
          if (proIndex && cityIndex && countyIndex) {
            this.address = this.addressList[proIndex].name + this.addressList[proIndex].sub[cityIndex].name + this.addressList[proIndex].sub[cityIndex].sub[countyIndex].name
          }
        }
      })
    }
  },
  methods: {
    onDialogFooter (index) {
      this.form.busied = this.detailData.id
      this.form.id = this.detailData.id
      this.form.unit_id = this.detailData.unit_id
      this.form.username = this.detailData.username
      switch (index) {
        // 确定
        case 0:
          unitUserAudit(this.form).then(res => {
            const data = res.data
            if (data.success) {
              this.form.auditrem = ''
            }
            this.dialogVisible = false
          })
          break
        // 取消
        default:
          this.dialogVisible = false
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../../assets/style/color.less";
.EmployeeAuidt {
  .item-title {
    width: 150px;
  }
  .item-name {
    width: 300px;
    padding: 0 10px;
    min-height: 36px;
    margin-left: 16px;
    line-height: 24px;
    border: 1px solid @borderColor1;
  }
  .remark {
    width: 300px;
    margin-left: 16px;
    border-color: @borderColor1;
  }
  .el-button {
    border: none;
    border-radius: 10px;
    color: #fff;
  }
  .emp-audit {
    border-top: 1px solid #dddddd;
  }
}
</style>