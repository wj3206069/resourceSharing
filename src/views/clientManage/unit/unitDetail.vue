<template>
  <div class="unitDetail">
    <zx-dialog :showDialog=showDialog
               :title="'单位用户信息详情'"
               @returnBool="bool => { $emit('returnBool', bool) }"
               @nextStepSuccess="val => { $emit('nextStepSuccess', val) }">
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
            <div class="item-name zx-flex align">{{servicecategory}}</div>
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
          <li class="detail-item zx-flex align justify mg-t-20 grey fs-14">
            <span class="block item-title text-r">营业执照：</span>
            <div class="item-name zx-flex align justify">
              <img :src="preview1"
                   width="260"
                   height="180">
            </div>
          </li>
          <li class="detail-item zx-flex align justify mg-t-20 grey fs-14">
            <span class="block item-title text-r">企业开户许可证：</span>
            <div class="item-name zx-flex align justify">
              <img :src="preview2"
                   width="260"
                   height="180">
            </div>
          </li>
          <li class="detail-item zx-flex align justify mg-t-20 grey fs-14">
            <span class="block item-title text-r"></span>
            <div class="item-name zx-flex align"
                 style="border: none;">
              <el-checkbox v-model="isDisabled"
                           disabled
                           class="fs-14">禁用该单位</el-checkbox>
              <!-- detailData.status === '1' -->
            </div>
          </li>
        </ul>
      </div>
    </zx-dialog>
  </div>
</template>

<script>
import zxDialog from '@/components/dialog'
import { preview } from '@/api'
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
  components: {
    zxDialog
  },
  data () {
    return {
      isDisabled: '',
      preview1: '',
      preview2: '',
      servicecategory: ''
    }
  },
  watch: {
    detailData () {
      this.preview1 = preview + '/' + this.detailData.resultList2[0]['picture']
      this.preview2 = preview + '/' + this.detailData.resultList2[1]['picture']
      this.isDisabled = this.detailData.status !== '1'
      this.servicecategory = this.detailData.resultList1[0].category + ',' + this.detailData.resultList1[1].category
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
    min-height: 36px;
    line-height: 24px;
    margin-left: 16px;
    padding: 0 10px;
    border: 1px solid @borderColor1;
  }
}
</style>