<template>
  <div class="createTemp common-dialog">
    <el-dialog title="新增-服务类目"
               :visible.sync="dialogFormVisible">
      <el-form :model="userForm"
               class="mg-t-30">
        <el-form-item label="服务类目名称："
                      prop="realName">
          <el-input v-model="userForm.realName"
                    placeholder="请输入分类名称"></el-input>
        </el-form-item>
        <el-form-item label="所需资质：">
          <template slot-scope="scope">
            <div style="position: relative;">
              <el-input v-model="zizhi"
                        placeholder="输入资质点击新增按钮添加">
              </el-input>
              <i @click.stop.prevent="allzizhi.push(zizhi);zizhi=''"
                 class="add-btn zxicon zx-xinzeng3 fs-24 grey-3 cursor"></i>
            </div>
            <ul class="zx-flex wrap"
                v-show="allzizhi.length > 0">
              <li v-for="(item, index) in allzizhi"
                  :key="index"
                  class="select-item zx-flex align grey-3">{{item}}<i @click.stop.prevent="allzizhi.splice(index,1)"
                   class="del-btn zxicon zx-cha1 fs-16 cursor"></i></li>
            </ul>
          </template>
        </el-form-item>
        <el-form-item label="备注说明："
                      prop="realName">
          <template slot-scope="scope">
            <el-input type="textarea"
                      :autosize="{ minRows: 2}"
                      placeholder="请输入服务类目说明">
            </el-input>
          </template>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button v-for="(item, index) in dialogFooter"
                   :key="index"
                   :style="item.color"
                   v-show="item.isShow"
                   @click.stop.prevent="onDialogFooter(index)">{{item.name}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'createTemp',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dialogFormVisible: false,
      dialogFooter: [{
        name: '上一步',
        color: 'background: #61A3FE;',
        isShow: false
      }, {
        name: '保存',
        color: 'background: #61A3FE;',
        isShow: true
      }, {
        name: '取消',
        color: 'background: #ccc;',
        isShow: true
      }],
      zizhi: '',
      allzizhi: [],
      // 表单1
      userForm: {
        id: '',             // 提交的时候需要
        realName: '',       // 真实姓名
        unitType: '',       // 单位类型
        schoolcode: '',     // 社会信用代码
        unitrole: '',       // 单位角色
        publicName: '',     // 对公账户名称
        publicAccount: '',  // 对公账户名称
        bankOfDeposit: '',  // 开户行
        unitLinkman: '',    // 单位联系人
        unitLinkmanTel: '', // 单位联系电话
        unitAddress: [],    // 单位地址
        isvouchers: '',     // 是否可接收创新券
        serviceType: ''     // 服务类目
      }
    }
  },
  created () {

  },
  watch: {
    showDialog () {
      this.dialogFormVisible = this.showDialog
    },
    dialogFormVisible () {
      this.$emit('returnBool', this.dialogFormVisible)
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
@import "../../../assets/style/color.less";
.createTemp {
  .add-btn {
    position: absolute;
    right: -35px;
    top: 50%;
    transform: translateY(-50%);
  }
  .select-item {
    min-width: 20px;
    height: 24px;
    padding: 0 6px;
    background: #edf3f8;
    margin-left: 5px;
    margin-top: 5px;
    .del-btn {
      margin: 0 0 0 5px;
    }
  }
  .el-button {
    border: none;
    border-radius: 10px;
    color: #fff;
  }
}
</style>
