<template>
  <div class="common-dialog organization_data">
    <el-dialog :title="dialogTitleSet"
               :visible.sync="dialogFormVisible">
      <el-tree :data="data2"
               show-checkbox
               node-key="id"
               :default-expanded-keys="selectedList"
               :default-checked-keys="selectedList"
               :props="defaultProps"
               @check-change="handleCheckChange">
      </el-tree>
      <div slot="footer"
           class="dialog-footer">
        <el-button class="submit primary-btn"
                   type="primary"
                   @click="submitForm">确定</el-button>
        <el-button class="cancel"
                   type="primary"
                   @click="cancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { releMenu } from '@/api/systemManagementApi'

export default {
  props: {
    showDialogSet: {
      type: Boolean,
      default: false
    },
    // 标题
    dialogTitleSet: {
      type: String
    },
    menuList: {
      type: Array
    },
    haveMenuList: {
      type: Array
    },
    roleidSet: {
      type: String
    }

  },
  data () {
    return {
      dialogFormVisible: false,
      data2: [], // 树的数据
      selectedList: [], // 初始对应的某条数据
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      menusForm: {
        roleid: '', // 角色id,
        menus: '' // 菜单id，多个按逗号隔开
      }
    }
  },
  watch: {
    dialogFormVisible () {
      if (!this.dialogFormVisible) {
        this.$emit('serviceDialogSet', this.dialogFormVisible)
      }
    },
    showDialogSet () {
      this.dialogFormVisible = this.showDialogSet
    },

    dialogTitleSet () {
      this.dialogTitleSet = this.dialogTitleSet
    },
    menuList () {
      this.data2 = this.menuList
    },

    haveMenuList () {
      this.selectedList = this.haveMenuList.map(item => item.id)
      console.log(this.selectedList)
    },
    roleidSet () {
      this.menusForm.roleid = this.roleidSet
    }

  },
  methods: {
    // 选中的节点
    handleCheckChange (data, checked, indeterminate) {
      console.log(data, checked, indeterminate)
      if (checked) {
        this.selectedList.push(data.id)
      } else {
        console.log(this.selectedList)
        for (let i = 0; i < this.selectedList.length; i++) {
          if (data.id === this.selectedList[i]) {
            this.selectedList.splice(i, 1)
          }
        }
      }
      this.menusForm.menus = this.selectedList.join(',')
    },
    cancel () {
      console.log('取消')
      this.$emit('serviceDialogSet', false)
    },
    // 确定
    submitForm () {
      this.cancel()
      releMenu(this.menusForm).then(res => {
        if (res.data.success) {
          this.$message.success('设置成功')
        } else {
          this.$message.error('设置失败')
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

