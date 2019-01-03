<template>
  <div class="common-dialog organization_data">
    <el-dialog :title="titleTree"
               :visible.sync="dialogFormVisible">
      <el-form :model="science_form"
               ref='science_form'
               :rules="rules">
        <el-form-item label="部门名称:"
                      prop='deptname'>
          <el-input placeholder="请输入"
                    v-model='science_form.deptname'></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button class="submit primary-btn"
                   type="primary"
                   @click="submitForm('science_form')">确定</el-button>
        <el-button class="cancel"
                   type="primary"
                   @click="cancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { addDept, editDept } from '@/api/systemManagementApi'

export default {
  props: {
    showDialogTree: {
      type: Boolean,
      default: false
    },
    // 标题
    titleTree: {
      type: String
    },
    // 单条数据源
    rowTree: {
      type: Object
    },
    // 状态
    isstateTree: {
      type: Boolean
    },
    // node数据
    dataTree: {
      type: Object
    },
    rowParent: {
      type: String
    }
  },
  data () {
    return {
      dialogFormVisible: false,
      rules: {
        deptname: [{ required: true, message: '请输入部门名字', trigger: 'blur' }]
      },
      science_form: {
        deptname: '', // 部门名称,
        parentid: '' // 上级部门id,
      }

    }
  },
  watch: {
    dialogFormVisible () {
      if (!this.dialogFormVisible) {
        this.$emit('serviceDialogTree', this.dialogFormVisible)
        this.science_form = {}
        this.$refs['science_form'].resetFields()
      }
    },
    showDialogTree () {
      this.dialogFormVisible = this.showDialogTree
    },
    titleTree () {
    },
    // 监听编辑、查看详情当前行的信息
    rowTree () {
      if (this.titleTree === '新增-部门人员') {
        this.science_form.parentid = this.dataTree.id
      } else if (this.titleTree === '编辑-部门人员') {
        this.science_form.deptname = this.dataTree.deptname
        this.science_form.id = this.dataTree.id
        this.science_form.parentid = this.rowParent
        console.log(this.rowParent)
        console.log(this.science_form)
      }
    },
    isstateTree () {
    },
    dataTree () {
      // this.science_form.parentid = this.dataTree.id
    }
  },
  methods: {
    cancel () {
      console.log('取消')
      this.$emit('serviceDialogTree', false)
    },
    // 确定
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.titleTree === '新增-部门人员') {
            this.cancel()
            addDept(this.science_form).then(res => {
              if (res.data.success) {
                this.$message.success('新增成功')
              } else {
                this.$message.error('新增失败')
              }
            })
          } else if (this.titleTree === '编辑-部门人员') {
            this.cancel()
            editDept(this.science_form).then(res => {
              if (res.data.success) {
                this.$message.success('编辑成功')
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

