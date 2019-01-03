<template>
  <div class="pingjia">
    <div class="common-dialog">
      <el-dialog title="评价"
                 :visible.sync="dialogFormVisible">
        <div class="info">
          <div class="info-item zx-flex align">
            <span class="small-title">买家名称：</span>
            <p class="flex-1">{{pingjiaInfo.buyerName}}</p>
          </div>
          <div class="info-item zx-flex align">
            <span class="small-title">买家态度：</span>
            <div class="block">
              <el-rate v-model="saler"
                       show-score
                       text-color="#ff9900"
                       score-template="{value}">
              </el-rate>
            </div>
          </div>
          <div class="info-item zx-flex align">
            <span class="small-title">买家信用：</span>
            <div class="block">
              <el-rate v-model="credit"
                       show-score
                       text-color="#ff9900"
                       score-template="{value}">
              </el-rate>
            </div>
          </div>
          <div class="info-item zx-flex align">
            <span class="small-title">评价：</span>
            <!-- <p class="flex-1">服务方的服务非常到位，检测非常认真几号放假
              黄飞鸿胡椒粉加防腐剂和符合</p> -->

            <el-input class="flex-1"
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 4}"
                      placeholder="请输入内容"
                      v-model="content">
            </el-input>
          </div>
        </div>
        <div slot="footer"
             class="dialog-footer">
          <el-button class="primary-btn"
                     @click="goPingjia">确 定</el-button>
          <el-button class="cancel"
                     @click="dialogFormVisible = false">取 消</el-button>

        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// 获取数据api
import { pingjia } from '@/api/order'
export default {
  name: 'pingjia',
  props: {
    showPingjia: {
      type: Boolean,
      default: false
    },
    pingjiaInfo: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      dialogFormVisible: false,
      saler: '',
      credit: '',
      content: ''
    }
  },
  methods: {
    goPingjia (msg = '操作成功') {
      let query = {
        orderId: this.pingjiaInfo.orderId,
        buyerid: this.pingjiaInfo.buyerId,
        attitude: this.saler,
        credit: this.credit,
        content: this.content
      }
      pingjia(query).then(res => {
        if (res.data.success) {
          this.$message.success(msg)
          this.dialogFormVisible = false
        } else {
          this.$message.warning(res.data.message)
        }
      })
    }
  },
  watch: {
    showPingjia () {
      console.log(this.showPingjia)
      this.dialogFormVisible = this.showPingjia
    },
    dialogFormVisible () {
      this.$emit('returnBool', this.dialogFormVisible)
    }
  }
}
</script>

<style lang="less" >
.pingjia {
  .el-dialog__body {
    .el-radio__input.is-checked .el-radio__inner {
      border-color: #939393;
      background: #939393;
    }
    .el-radio__input.is-checked + .el-radio__label {
      color: #939393;
    }
    .info {
      margin: 0 20px;
      padding: 25px;
      .info-item {
        .small-title {
          display: inline-block;
          width: 40%;
          text-align: right;
          padding: 15px;
        }
      }
    }
    .el-form {
      padding-top: 30px;
      .el-form-item__content {
        display: block;
        .radio-item {
          padding: 10px 0;
        }
      }
    }
  }
}
</style>