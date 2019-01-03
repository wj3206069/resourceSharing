<template>
  <div class="service new_service service-role">
    <div class="tree_structure">
      <el-tree :data="data_tree"
               :props="defaultProps"
               accordion
               @node-click="handleNodeClick"></el-tree>
    </div>
    <div class="service-table service-table-role">
      <div>
        <span>角色名：</span>
        <el-input v-model="rolename"
                  disabled></el-input>
      </div>
      <div v-loading="loading"
           element-loading-text="拼命加载中"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(0,0,0,0.8)"
           class="table_s">
        <el-table :data="tableData"
                  border
                  style="width: 100%"
                  tooltip-effect="dark"
                  ref="multipleTable"
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection"
                           align="center"
                           width="40">
          </el-table-column>
          <el-table-column label="序号"
                           align="center"
                           type="index"
                           width="70"></el-table-column>
          <el-table-column prop="rolename"
                           label="角色名称"
                           align="center">
          </el-table-column>
          <!-- <el-table-column prop=""
                           label="角色编号"
                           align="center">
          </el-table-column> -->
        </el-table>
      </div>
      <div class="operation-button">
        <el-button type="primary"
                   @click="submitForm('form')">确定</el-button>
        <el-button type="primary"
                   class="cancel"
                   @click="$router.back(-1)">取消</el-button>

      </div>
    </div>
  </div>
</template>
<script>
import '@/views/ShareService/serviceManager/service.css'
import './tree.css'
import { getAllDept, getRoleList, setUserRole, getUserRole } from '@/api/systemManagementApi'
export default {
  name: 'roleNew',
  data () {
    return {
      loading: false, // 加载
      multipleSelection: [],
      organizationf: true,
      roleid: '',
      rolename: '',
      form: {
        subname: '',
        roleid: '',
        busicode: ''

      },
      setRole: {}, // 从设置存本地获取
      tableData: [], // 表格列表数据
      amoduleList: [], // 模块数组
      data_tree: [],
      idArry: '',
      defaultProps: {
        children: 'children',
        label: 'abbrname'
      }
    }
  },
  methods: {
    // 获取当前角色名
    getUserRoleGM () {
      this.setRole = JSON.parse(sessionStorage.getItem('organizationrow1'))
      getUserRole(this.setRole.userid).then(res => {
        console.log(res.data.rolename)
        if (res.data.success) {
          // roleid
          this.rolename = res.data.rolename
          this.idArry = res.data.roleid
        }
      })
    },
    // 根据选择的id
    handleNodeClick (data) {
      console.log(data)
      getRoleList(data.id).then(res => {
        console.log(res.data)
        this.tableData = res.data.roleList
      })
    },
    //  获取树结构
    getAllDeptGM () {
      getAllDept().then(res => {
        this.data_tree = res.data.list
        console.log(res.data.list)
      })
    },
    deactivated () {
      this.$destroy()
    },
    // 复选框
    handleSelectionChange (val) {
      let ids = []
      this.multipleSelection = val
      this.organizationf = false
      for (var i = 0; i < this.multipleSelection.length; i++) {
        ids.push(this.multipleSelection[i].roleid)
      }
      this.idArry = ids.join(',')
      console.log(this.idArry)
    },
    // 确定按钮
    submitForm () {
      this.setRole.roleid = this.idArry
      if (this.organizationf) {
        this.$message({
          message: '角色未更改',
          type: 'success'
        })
        this.$router.go(-1)
      } else {
        setUserRole(this.setRole).then(res => {
          if (res.data.success) {
            this.idArry = ''
            this.setRole = {}
            this.tableData = []
            this.rolename = ''
            this.organizationf = true
            this.deactivated()
            this.$message.success('设置成功')
            this.$router.go(-1)
          } else {
            this.$message.error('设置成功')
          }
          this.$router.go(-1)
        })
      }
    }
  },

  created () {
    this.getAllDeptGM()
    this.getUserRoleGM()
  }

}
</script>