<template>
  <div class="organizer_ts">
    <div class="trees_turn">
      <div class="custom-tree-container">
        <div class="block">
          <el-tree :data="data5"
                   node-key="id"
                   :props="defaultProps"
                   :expand-on-click-node="false"
                   @node-click="handleNodeClick">
          </el-tree>
        </div>
      </div>
    </div>
    <div class="service">
      <div class="substance_tab">
        <el-form ref="formList">
          <div class="zx-flex between">
            <div class="select-item">
            </div>
            <div class="select-item">
              <el-button type="primary"
                         icon="zxicon zx-xinzeng2"
                         class="margin_5"
                         @click="addManager(false,'新增-角色',newRole)">新增</el-button>
            </div>
          </div>
        </el-form>
        <div class="service-table">
          <div v-loading="loading">
            <el-table :data="tableData"
                      border
                      style="width: 100%"
                      tooltip-effect="dark"
                      ref="multipleTable">
              <el-table-column label="序号"
                               align="center"
                               type='index'
                               width='80px'></el-table-column>
              <el-table-column prop="rolename"
                               label="角色名称"
                               align="center">
              </el-table-column>
              <el-table-column prop="code"
                               label="角色编码"
                               align="center">
              </el-table-column>
              <el-table-column label="所属部门"
                               align="center"
                               width='100px'
                               prop='deptname'>
              </el-table-column>
              <el-table-column label="操作"
                               align="center"
                               width='240px'>
                <template slot-scope="scope">
                  <el-button type="text"
                             size="small"
                             @click="addManager(false,'编辑-角色',scope.row)">编辑</el-button>
                  <el-button type="text"
                             size="small"
                             @click="deleteS(scope.row.id)">删除</el-button>
                  <el-button type="text"
                             size="small"
                             @click="setAdditional('设置-角色权限',scope.row)">设置权限</el-button>
                  <el-button type="text"
                             size="small"
                             @click="Checkstaff(scope.row.id)">查看人员</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>

      </div>
    </div>
    <!-- 新增用户信息 -->
    <new-role-authorization :showDialog='showDialog'
                            :row='row'
                            :isstate='isstate'
                            :title='dialogTitle'
                            @serviceDialog="serviceDialog"></new-role-authorization>
    <!-- 设置权限应用菜单 -->
    <set-menu :showDialogSet='showDialogSet'
              :dialogTitleSet='dialogTitleSet'
              :menuList='menuList'
              :haveMenuList='haveMenuList'
              :roleidSet='roleidSet'
              @serviceDialogSet="serviceDialogSet"></set-menu>
    <!-- 免审设置  加查看-->
    <div class="common-dialog">
      <el-dialog title="查看人员"
                 :visible.sync="new_form">
        <div class="tab_color"
             v-loading="loadingrole">
          <el-table ref="multipleTable"
                    tooltip-effect="dark"
                    style="width: 100%"
                    :data="tableDataList">
            <el-table-column label="序号"
                             width="80"
                             align="center"
                             type='index'></el-table-column>
            <el-table-column prop="account"
                             label="账号"
                             align="center">
            </el-table-column>
            <el-table-column prop="username"
                             label="用户名"
                             align="center">
            </el-table-column>
            <el-table-column prop="deptname"
                             label="部门名称"
                             align="center">
            </el-table-column>
          </el-table>
        </div>
        <div slot="footer"
             class="dialog-footer">
          <el-button class="submit primary-btn"
                     type="primary"
                     @click="new_form=false">确定</el-button>
          <el-button class="cancel"
                     type="primary"
                     @click="new_form=false">取消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import newRoleAuthorization from './newRoleAuthorization'
import setMenu from './setMenu'
import '@/views/ShareService/serviceManager/service.css'
import { getDeptTree, getRoleListByDept, deleteRole, getMenuListTree, getUserListByRoleid } from '@/api/systemManagementApi'
export default {
  components: {
    newRoleAuthorization,
    setMenu
  },
  data () {
    return {
      data5: [], // 树结构列表
      loading: false,
      loadingrole: false,
      tableDataList: [], // 查看人员
      new_form: false, // 查看人员
      deptid: '', // 部门ID
      tableData: [], // 表格数据
      newRole: {
        deptname: '', // 所属部门
        deptid: '', // 部门id
        remark: '', // 备注，
        rolename: '' // 角色名称
      }, // 新增角色
      defaultProps: {
        children: 'children',
        label: 'abbrname'
      },
      row: {}, // 单条数据源
      dialogTitle: '', // 标题
      isstate: false,
      dialogVisible: false,
      roleidSet: '', // 角色id
      showDialog: false,
      isStart: {
        type: '',
        id: '',
        isdelete: 0
      },
      menuList: [], // 设置权限树
      haveMenuList: [], // 角色对应树
      // 设置角色权限
      showDialogSet: false,
      rowSet: {},
      dialogTitleSet: ''
    }
  },

  methods: {
    // 初始查询组织人员树
    getDeptTreeGM () {
      getDeptTree().then(res => {
        console.log(res.data)
        this.data5 = res.data.list
        this.deptid = res.data.list[0].id
        this.newRole.deptname = res.data.list[0].deptname
        this.newRole.deptid = res.data.list[0].id
        this.getRoleListByDeptGM()
      })
    },
    // 表格列表
    getRoleListByDeptGM () {
      this.loading = true
      getRoleListByDept(this.deptid).then(res => {
        console.log(res.data)
        if (res.data.success) {
          this.tableData = res.data.list
        }
        this.loading = false
      })
    },
    // 根据选择树的id
    handleNodeClick (data) {
      console.log(data)
      this.deptid = data.id
      this.newRole.deptname = data.deptname
      this.newRole.deptid = data.id
      this.getRoleListByDeptGM()
    },
    // 删除
    deleteS (id) {
      console.log(id)
      deleteRole({ id: id }).then(res => {
        if (res.data.success) {
          this.$message.success('删除成功')
        } else {
          this.$message.error('删除成功')
        }
        this.getRoleListByDeptGM()
      })
    },
    // 新增
    addManager (val, tiele, row) {
      this.showDialog = true
      this.isstate = val
      this.dialogTitle = tiele
      this.row = row
    },
    // 设置角色权限
    setAdditional (tiele, row) {
      // 加载设置权限的树
      console.log(row.id)
      getMenuListTree({ roleid: row.id }).then(res => {
        if (res.data.success) {
          this.showDialogSet = true
          this.dialogTitleSet = tiele
          this.menuList = res.data.menuList
          this.haveMenuList = res.data.haveMenuList
          this.roleidSet = row.id
          console.log(res.data)
        }
      })
      // console.log(tiele, row)
    },

    serviceDialog (val) {
      this.showDialog = false
      this.getRoleListByDeptGM()
    },
    // 设置应用权限
    serviceDialogSet () {
      this.showDialogSet = false
      this.getRoleListByDeptGM()
    },
    // 查看人员
    Checkstaff (id) {
      console.log(id)
      this.new_form = true
      this.loadingrole = true
      getUserListByRoleid(id).then(res => {
        if (res.data.success) {
          this.loadingrole = false
          console.log(res)
          console.log(res.data)
          this.tableDataList = res.data.list
        }
      })
    }
  },
  watch: {
  },
  created () {
    this.getDeptTreeGM()
  }

}
</script>
<style scoped>
.organizer_ts {
  width: 100%;
  display: flex;
}
.el-button + .el-button {
  margin-left: 0;
}
.trees_turn {
  flex-basis: 306px;
  border-right: 1px solid #ddd;
  padding: 21px 13px;
  height: -webkit-fill-available;
}
.service {
  flex: 1;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>


