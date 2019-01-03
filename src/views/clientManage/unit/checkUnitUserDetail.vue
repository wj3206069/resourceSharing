<template>
  <div class="unitDetail">
    <div class="common-dialog">
      <el-dialog el-dialog
                 :title="'单位用户审核'"
                 :visible.sync="dialogVisible">
        <div class="mg-t-30"
             style="padding-bottom: 30px;">
          <ul>
            <li class="detail-item zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">单位名称：</span>
              <div class="item-name zx-flex align">{{detailData.unitname}}</div>
            </li>
            <li class="detail-item zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">单位类型：</span>
              <div class="item-name zx-flex align">{{detailData.unittype}}</div>
            </li>
            <li class="detail-item zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">统一社会信用代码：</span>
              <div class="item-name zx-flex align">{{detailData.schoolcode}}</div>
            </li>
            <li class="detail-item zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">单位角色：</span>
              <div class="item-name zx-flex align">{{detailData.unitrole}}</div>
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
              <div class="item-name zx-flex align">{{detailData.detailed}}</div>
            </li>
            <li class="detail-item zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">是否可接收创新券：</span>
              <div class="item-name zx-flex align">{{detailData.isvouchers ? '是' : '否'}}</div>
            </li>
            <li class="detail-item zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">服务类目：</span>
              <div class="item-name zx-flex align">{{detailData.servicecategory}}</div>
            </li>
            <li class="detail-item zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">设备数量：</span>
              <div class="item-name zx-flex align">{{detailData.servicecategory}}</div>
            </li>
            <li class="detail-item zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">设备相关服务数量：</span>
              <div class="item-name zx-flex align">{{detailData.servicecategory}}</div>
            </li>
            <li class="detail-item zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">商业服务数量：</span>
              <div class="item-name zx-flex align">{{detailData.servicecategory}}</div>
            </li>
            <li class="detail-item zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">创新券接收账户余额：</span>
              <div class="item-name zx-flex align">{{detailData.servicecategory}}</div>
            </li>
            <li class="detail-item zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">创新券消耗账户余额：</span>
              <div class="item-name zx-flex align">{{detailData.servicecategory}}</div>
            </li>
            <li class="detail-item zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">营业执照：</span>
              <div class="item-name zx-flex align justify">
                <img src=""
                     width="260"
                     height="180">
              </div>
            </li>
            <li class="detail-item zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">企业开户许可证：</span>
              <div class="item-name zx-flex align justify">
                <img src=""
                     width="260"
                     height="180">
              </div>
            </li>
            <li class="detail-item zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">审核备注：</span>
              <div class="zx-flex align justify">
                <el-input class="remark"
                          type="textarea"
                          v-model="auditopinion"
                          :autosize="{ minRows: 2}"
                          placeholder="请输入内容">
                </el-input>
              </div>
            </li>
          </ul>
        </div>
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
        name: '通过',
        color: 'background: #61A3FE;'
      }, {
        name: '拒绝',
        color: 'background: #ccc;'
      }],
      auditopinion: '' // 审核备注
    }
  },
  watch: {
    showDialog () {
      this.dialogVisible = this.showDialog
    },
    dialogVisible () {
      this.$emit('returnBool', this.dialogVisible)
    }
  },
  methods: {
    onDialogFooter (index) {
      let query = {
        busied: this.detailData.id,
        auditopinion: this.auditopinion,
        type: 1,
        types: 2
      }
      switch (index) {
        case 0:
          unitUserAudit(query).then(res => { })
          break
        default:
          query.type = 2
          unitUserAudit(query).then(res => { })
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
}
</style>