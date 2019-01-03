<template>
  <div class="unitDetail">
    <div class="common-dialog">
      <el-dialog el-dialog
                 :title="'个人用户详情'"
                 :visible.sync="dialogVisible">
        <div class="mg-t-30"
             style="padding-bottom: 30px;">
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
              <div class="item-name zx-flex align">{{detailData.sex}}</div>
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
                <img :src="headportrait"
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
              <span class="block item-title text-r">银行账号：</span>
              <div class="item-name zx-flex align">{{detailData.bankaccount}}</div>
            </li>
            <li class="zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">开户行：</span>
              <div class="item-name zx-flex align">{{detailData.openingbank}}</div>
            </li>
            <li class="zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">详细地址：</span>
              <div class="item-name zx-flex align">{{detailData.detailed}}</div>
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
              <span class="block item-title text-r">公司名称：</span>
              <div class="item-name zx-flex align">{{detailData.corporatename}}</div>
            </li>
            <li class="zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">管理职务：</span>
              <div class="item-name zx-flex align">{{detailData.managerialposition}}</div>
            </li>
            <li class="zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">个人职务：</span>
              <div class="item-name zx-flex align">{{detailData.personalposition}}</div>
            </li>
            <li class="zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">是否专家：</span>
              <div class="item-name zx-flex align">{{detailData.whetherexpert ? '是' : '否'}}</div>
            </li>
            <li class="zx-flex align justify mg-t-20 grey fs-14"
                v-if="detailData.whetherexpert">
              <span class="block item-title text-r">专家职称：</span>
              <div class="item-name zx-flex align">{{detailData.experttitle}}</div>
            </li>
            <li class="zx-flex align justify mg-t-20 grey fs-14"
                v-if="detailData.whetherexpert">
              <span class="block item-title text-r">学科：</span>
              <div class="item-name zx-flex align">{{detailData.subject}}</div>
            </li>
            <li class="zx-flex align justify mg-t-20 grey fs-14"
                v-if="detailData.whetherexpert">
              <span class="block item-title text-r">技术领域：</span>
              <div class="item-name zx-flex align">{{detailData.subject}}</div>
            </li>
            <li class="zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">登录账号：</span>
              <div class="item-name zx-flex align">{{detailData.account}}</div>
            </li>
            <li class="zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">登录密码：</span>
              <div class="item-name zx-flex align">{{detailData.password}}</div>
            </li>
            <li class="zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">职称证书：</span>
              <div class="item-name zx-flex align justify">
                <img :src="zhichengImgUrl"
                     width="260"
                     height="180">
              </div>
            </li>
            <li class="zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">其他资质：</span>
              <div class="item-name zx-flex align justify">
                <img :src="otherImgUrl"
                     width="260"
                     height="180">
              </div>
            </li>
            <!-- <li class="zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">微信授权登录：</span>
              <div class="item-name zx-flex align">已绑定</div>
            </li>
            <li class="zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">支付宝授权登录：</span>
              <div class="item-name zx-flex align">已绑定</div>
            </li>
            <li class="zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">QQ授权登录：</span>
              <div class="item-name zx-flex align grey-3">未绑定</div>
            </li>
            <li class="zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r">系统账户授权登录：</span>
              <div class="item-name zx-flex align">已绑定</div>
            </li> -->
            <li class="zx-flex align justify mg-t-20 grey fs-14">
              <span class="block item-title text-r"></span>
              <div class="item-name zx-flex align"
                   style="border: none;">
                <el-checkbox v-model="isDisabled"
                             disabled>禁用该用户</el-checkbox>
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
  data () {
    return {
      dialogVisible: false,
      isDisabled: false,
      dialogFooter: [{
        name: '返回',
        color: 'background: #ccc;'
      }],
      headportrait: '', // 头像
      zhichengImgUrl: '', // 职称
      otherImgUrl: '', // 其他
      auditopinion: '' // 审核备注
    }
  },
  watch: {
    showDialog () {
      this.dialogVisible = this.showDialog
      this.headportrait = preview + '/' + this.detailData.headportrait
      this.zhichengImgUrl = preview + '/' + this.detailData.resultList2[0]['picture']
      this.otherImgUrl = preview + '/' + this.detailData.resultList2[1]['picture']
      this.isDisabled = this.detailData.userstatus !== '1'
    },
    dialogVisible () {
      this.$emit('returnBool', this.dialogVisible)
    }
  },
  methods: {
    onDialogFooter (index) {
      this.dialogVisible = false
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