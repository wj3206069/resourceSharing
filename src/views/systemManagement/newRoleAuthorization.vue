<template>
  <div class="common-dialog organization_data">
    <el-dialog :title="title"
               :visible.sync="dialogFormVisible">
      <el-form :model="science_form"
               ref='science_form'
               :rules="rules">
        <el-form-item label="角色名称:"
                      prop='rolename'>
          <el-input placeholder="请输入"
                    v-model='science_form.rolename'
                    :disabled="viewdisable"></el-input>
        </el-form-item>
        <el-form-item label="所属部门:"
                      prop='deptname'>
          <el-input placeholder="请输入"
                    v-model='science_form.deptname'
                    disabled></el-input>
        </el-form-item>
        <el-form-item label="备注:"
                      class="textarea_h80"
                      prop="brief">
          <el-input v-model="science_form.remark"
                    type="textarea"
                    placeholder="请输入内容"
                    maxlength="200"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button class="submit primary-btn"
                   type="primary"
                   @click="submitForm('science_form')"
                   v-if='!viewdisable'>确定</el-button>
        <el-button class="cancel"
                   type="primary"
                   @click="cancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { addRole, editRole } from '@/api/systemManagementApi'

export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    // 标题
    title: {
      type: String
    },
    // 单条数据源
    row: {
      type: Object
    },
    // 状态
    isstate: {
      type: Boolean
    }
  },
  data () {
    return {
      viewdisable: false, // 显示隐藏内容与禁用
      dialogFormVisible: false,
      rules: {
        rolename: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
      },
      science_form: {
        rolename: '' // 姓名,
      }

    }
  },
  watch: {
    dialogFormVisible () {
      if (!this.dialogFormVisible) {
        this.$emit('serviceDialog', this.dialogFormVisible)
        this.$refs['science_form'].resetFields()
        this.science_form.remark = ''
        this.science_form.rolename = ''
      }
    },
    showDialog () {
      this.dialogFormVisible = this.showDialog
    },

    title () {
      console.log(this.title)
    },
    row () {
      this.science_form = this.row
      console.log(this.row)
    },
    isstate () {
      this.viewdisable = this.isstate
    }
  },
  methods: {

    cancel () {
      console.log('取消')
      this.$emit('serviceDialog', false)
    },
    // 确定
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.title === '新增-角色') {
            this.cancel()
            addRole(this.science_form).then(res => {
              if (res.data.success) {
                this.$message.success('新增成功')
              } else {
                this.$message.error('新增失败')
              }
            })
          } else if (this.title === '编辑-角色') {
            this.cancel()
            editRole(this.science_form).then(res => {
              if (res.data.success) {
                this.$message.success('编辑成功')
                this.cancel()
              } else {
                this.$message.error('编辑失败')
              }
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }

  }
}
</script>
<style>
.organization_data .img_s .el-upload {
  background-color: #eee;
  width: 100px;
  height: 30px;
  line-height: 16px;
}
</style>

