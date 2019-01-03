<template>
  <div class="createTemp common-dialog">
    <el-dialog :title="'新增-单位人员详情'"
               :visible.sync="dialogFormVisible">
      <el-form :model="createUnitPersonalForm"
               ref="createUnitPersonalForm"
               class="mg-t-30">
        <el-form-item label="姓名"
                      verify
                      empty-message="请输入姓名"
                      prop="username">
          <el-input v-model="createUnitPersonalForm.username"
                    placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="头像："
                      verify
                      empty-message="请输入上传"
                      prop="headportrait">
          <template slot-scope="scope">
            <el-upload class="avatar-uploader createSpecialist"
                       :action="uploadPath"
                       :show-file-list="false"
                       :on-progress="onProgress"
                       :on-success="onSuccess"
                       :on-error="onError"
                       :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl"
                   :src="imageUrl"
                   class="avatar">
              <i v-else
                 class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </template>
        </el-form-item>
        <el-form-item label="身份证号："
                      verify
                      empty-message="请输入身份证号"
                      prop="idcard">
          <el-input v-model="createUnitPersonalForm.idcard"
                    placeholder="身份证号"></el-input>
        </el-form-item>
        <el-form-item label="手机号："
                      verify
                      empty-message="请输入手机号"
                      prop="phone">
          <el-input v-model="createUnitPersonalForm.phone"
                    placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="所属部门：">
          <el-input v-model="createUnitPersonalForm.dept"
                    placeholder="多选"></el-input>
        </el-form-item>
        <el-form-item label="角色：">
          <el-input v-model="createUnitPersonalForm.xx"
                    placeholder="多选"></el-input>
        </el-form-item>
        <el-form-item label="个人职务：">
          <el-input v-model="createUnitPersonalForm.personalposition"
                    placeholder="请输入个人职务"></el-input>
        </el-form-item>
        <el-form-item label="权限组："
                      verify
                      empty-message="请选择权限组"
                      prop="xx">
          <el-input v-model="createUnitPersonalForm.xx"
                    placeholder="请选择权限组"></el-input>
        </el-form-item>
        <el-form-item label="登录账号："
                      verify
                      empty-message="请输入登录账号"
                      prop="account">
          <el-input v-model="createUnitPersonalForm.account"
                    placeholder="请输入登录账号"></el-input>
        </el-form-item>
        <el-form-item label="登录密码："
                      verify
                      empty-message="请输入登录密码"
                      prop="password">
          <el-input v-model="createUnitPersonalForm.password"
                    type="password"
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
import { uploadPath } from '@/api'
import { addAccountInfo } from '@/api/clientManage'

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
      uploadPath: uploadPath, // 上传地址
      imageUrl: '', // 头像图片路径
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
      // 表单2
      createUnitPersonalForm: {
        username: '',
        headportrait: '',
        idcard: '',
        phone: '',
        dept: '',
        personalposition: '',
        account: '',
        password: ''
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
    onProgress (event, file, fileList) {
      this.loading = this.$loading()
      // console.log(event, file, fileList)
    },
    onSuccess (response, file, fileList) {
      // console.log(response, file, fileList)
      console.log(file)
      this.loading.close()
      if (response.success) {
        this.createUnitPersonalForm.headportrait = response.fileid
        this.imageUrl = file.url
        this.$message.success('上传成功')
      } else {
        this.$message.success('上传失败')
      }
    },
    onError (err, file, fileList) {
      this.loading.close()
      this.$message.error('上传失败')
      console.log(err, file, fileList)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    onDialogFooter (index) {
      switch (index) {
        case 1:
          this.submitForm('createUnitPersonalForm').then(bool => {
            if (!bool) return
            let query = {}
            addAccountInfo(query).then(res => {
              if (res.data.success) {
                this.$message.success('保存成功')
                this.dialogFormVisible = false
              } else {
                this.$message.error('保存失败')
              }
            })
          })
          break
        default:
          this.dialogFormVisible = false
          break
      }
    },
    submitForm (formName) {
      return new Promise((resolve, reject) => {
        this.$refs[formName].validate(valid => {
          resolve(valid)
        })
      })
    }
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
