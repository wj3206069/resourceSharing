<template>
  <div class="unitDetail">
    <div class="common-dialog">
      <el-dialog el-dialog
                 :title="'单位用户审核'"
                 :visible.sync="dialogVisible">
        <div class="mg-t-30"
             style="padding-bottom: 30px;height: 56vh;overflow-y: auto;">
          <ul>
            <li class="detail-item zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">单位名称：</span>
              <div class="item-name zx-flex align">{{detailData.unitname}}</div>
            </li>
            <li class="detail-item zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">单位类型：</span>
              <div class="item-name zx-flex align"
                   v-if="detailData.unittype==='1'">高等院校</div>
              <div class="item-name zx-flex align"
                   v-if="detailData.unittype==='2'">科研院所</div>
              <div class="item-name zx-flex align"
                   v-if="detailData.unittype==='3'">企业</div>
              <div class="item-name zx-flex align"
                   v-if="detailData.unittype==='4'">其他</div>
            </li>
            <li class="detail-item zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">统一社会信用代码：</span>
              <div class="item-name zx-flex align">{{detailData.schoolcode}}</div>
            </li>
            <!-- 暂时不要 -->
            <li class="detail-item zx-flex align justify mg-t-20 grey fs-14"
                v-if="false">
              <span class="block item-title text-r">单位角色：</span>
              <div class="item-name zx-flex align"
                   v-if="detailData.unitrole==='1'">服务机构</div>
              <div class="item-name zx-flex align"
                   v-if="detailData.unitrole==='2'">注册单位</div>
            </li>
            <li class="detail-item zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">对公账户名称：</span>
              <div class="item-name zx-flex align">{{detailData.publicaccountsname}}</div>
            </li>
            <li class="detail-item zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">对公账户：</span>
              <div class="item-name zx-flex align">{{detailData.publicaccounts}}</div>
            </li>
            <li class="detail-item zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">开户行：</span>
              <div class="item-name zx-flex align">{{detailData.bankname}}</div>
            </li>
            <li class="detail-item zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">单位联系人：</span>
              <div class="item-name zx-flex align">{{detailData.unitcontacts}}</div>
            </li>
            <li class="detail-item zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">单位联系电话：</span>
              <div class="item-name zx-flex align">{{detailData.unitcontactnumber}}</div>
            </li>
            <li class="detail-item zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">单位地址：</span>
              <div class="item-name zx-flex align">{{address}}{{detailData.detailed}}</div>
            </li>
            <li class="detail-item zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">是否可接收创新券：</span>
              <div class="item-name zx-flex align">{{detailData.isvouchers==1?'是':'否'}}</div>
            </li>
            <!-- 暂不开发 -->
            <li class="detail-item zx-flex align justify mg-t-20 grey fs-14"
                v-show="false">
              <span class="block item-title text-r">服务类目：</span>
              <div class="item-name zx-flex align">{{detailData.servicecategory}}</div>
            </li>
            <li class="detail-item zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">设备数量：</span>
              <div class="item-name zx-flex align">{{detailData.sbsl}}</div>
            </li>
            <li class="detail-item zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">设备相关服务数量：</span>
              <div class="item-name zx-flex align">{{detailData.jcfwl}}</div>
            </li>
            <li class="detail-item zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">商业服务数量：</span>
              <div class="item-name zx-flex align">{{detailData.fjcfwl}}</div>
            </li>
            <li class="detail-item zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">创新券接收账户余额：</span>
              <div class="item-name zx-flex align">{{detailData.accountbalance}}</div>
            </li>
            <li class="detail-item zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">创新券消耗账户余额：</span>
              <div class="item-name zx-flex align">{{detailData.accountbalance2}}</div>
            </li>
            <!-- 暂时不要 -->
            <li class="detail-item zx-flex align justify mg-t-20 grey fs-14"
                v-if="false">
              <span class="block item-title text-r">营业执照：</span>
              <div class="item-name zx-flex align justify">
                <img src=""
                     width="260"
                     height="180">
              </div>
            </li>
            <!-- 暂时不要 -->
            <li class="detail-item zx-flex align justify mg-t-20 grey fs-14"
                v-if="false">
              <span class="block item-title text-r">企业开户许可证：</span>
              <div class="item-name zx-flex align justify">
                <img src=""
                     width="260"
                     height="180">
              </div>
            </li>
          </ul>
        </div>

        <!-- 审批意见 strat-->
        <div class="unit-audit">
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
import addressJson from '@/assets/utils/address.js'

export default {
  name: 'unitDetail',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    detailData: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      dialogVisible: false,
      isDisabled: true,
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
        types: '2'        // 1：专家审核  2：单位审核
      },
      addressList: addressJson,
      address: ''       // 地址id转换成中文的地址
    }
  },
  watch: {
    showDialog () {
      this.dialogVisible = this.showDialog
    },
    dialogVisible () {
      if (!this.dialogVisible) {
        this.$emit('returnBool', this.dialogVisible)
      }
    },
    detailData () {
      // 将省市区id转换成省市区中文
      let proIndex = this.detailData.province
      let cityIndex = this.detailData.city
      let countyIndex = this.detailData.county
      if (proIndex && cityIndex && countyIndex) {
        this.address = this.addressList[proIndex].name + this.addressList[proIndex].sub[cityIndex].name + this.addressList[proIndex].sub[cityIndex].sub[countyIndex].name
      }
    }
  },
  methods: {
    onDialogFooter (index) {
      this.form.busied = this.detailData.id
      this.form.unitname = this.detailData.unitname
      switch (index) {
        case 0:
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
          this.dialogVisible = false
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../../assets/style/color.less";
.unitDetail {
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
  .unit-audit {
    border-top: 1px solid #dddddd;
  }
}
</style>