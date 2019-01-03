<template>
  <div class="createTemp common-dialog">
    <el-dialog :title="'单位人员详情'"
               :visible.sync="dialogFormVisible">
      <el-form :model="userForm"
               class="mg-t-30">
        <el-form-item label="姓名"
                      prop="userName">
          <el-input v-model="userForm.userName"
                    readonly
                    placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="头像："
                      prop="idNumber">
          <template slot-scope="scope">
            <img :src="imageUrl"
                 class="avatar">
          </template>
        </el-form-item>
        <el-form-item label="身份证号："
                      prop="idNumber">
          <el-input v-model="userForm.tel"
                    readonly
                    placeholder="身份证号"></el-input>
        </el-form-item>
        <el-form-item label="手机号："
                      prop="tel">
          <el-input v-model="userForm.tel"
                    readonly
                    placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="所属部门："
                      readonly
                      prop="dateOfbrith">
          <el-input v-model="userForm.dateOfbrith"
                    placeholder="多选"></el-input>
        </el-form-item>
        <el-form-item label="角色："
                      readonly
                      prop="tel">
          <el-input v-model="userForm.tel"
                    placeholder="多选"></el-input>
        </el-form-item>
        <el-form-item label="个人职务：">
          <el-input v-model="userForm.loginNumber"
                    readonly
                    placeholder="个人职务"></el-input>
        </el-form-item>
        <el-form-item label="权限组：">
          <el-input v-model="userForm.loginPwd"
                    readonly
                    placeholder="权限组"></el-input>
        </el-form-item>
        <el-form-item label="登录账号：">
          <el-input v-model="userForm.loginPwd"
                    readonly
                    placeholder="请输入登录账号"></el-input>
        </el-form-item>
        <el-form-item label="登录密码：">
          <el-input v-model="userForm.loginPwd"
                    readonly
                    placeholder="请输入登录密码"></el-input>
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
      openingbankOptions: [{
        value: '1',
        label: '是'
      }, {
        value: '0',
        label: '否'
      }],
      // 表单2
      userForm: {
        userName: '',
        idNumber: '',
        tel: '',
        loginNumber: '',
        loginPwd: ''
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
  position: relative;
  .verify {
    position: absolute;
    top: 3px;
    right: 3px;
    width: 50px;
    height: 30px;
    border-radius: 10px;
    background-color: @primary;
  }
  .select-mafan {
    position: absolute;
    top: 3px;
    right: 3px;
    min-width: 100px;
    height: 30px;
    border-radius: 10px;
    padding: 0 10px;
    background: #f0f0f0;
  }
  .el-button {
    border: none;
    border-radius: 10px;
    color: #fff;
  }
  .select-other {
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    height: 635px;
  }
  .select-classtify {
    padding: 0 20px;
  }
}
</style>
