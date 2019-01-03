<template>
  <div class="common-dialog organization_data">
    <el-dialog :title="dialogTitleSet"
               :visible.sync="dialogFormVisible">
      <el-form :model="science_form"
               ref='science_form'
               :rules="rules">
        <el-tree :data="data2"
                 show-checkbox
                 node-key="id"
                 :default-expanded-keys="[2, 3]"
                 :default-checked-keys="[5]"
                 :props="defaultProps">
        </el-tree>
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
import { } from '@/api/systemManagementApi'

export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    // 标题
    dialogTitleSet: {
      type: String
    },
    // 单条数据源
    rowSet: {
      type: Object
    }

  },
  data () {
    return {
      viewdisable: false, // 显示隐藏内容与禁用
      dialogFormVisible: false,
      rules: {
        nickname: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
      },
      // dialogTitleSet: '设置-角色权限平台',
      science_form: {
        nickname: '' // 姓名,
      },
      data2: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }

    }
  },
  watch: {
    dialogFormVisible () {
      if (!this.dialogFormVisible) {
        this.$emit('serviceDialogSet', this.dialogFormVisible)
        this.$refs['science_form'].resetFields()
      }
    },
    showDialog () {
      this.dialogFormVisible = this.showDialog
    },

    dialogTitleSet () {
      this.dialogTitleSet = this.dialogTitleSet
    },
    rowSet () {
    }
  },
  methods: {

    cancel () {
      console.log('取消')
      this.$emit('serviceDialogSet', false)
    },
    // 确定
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
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

