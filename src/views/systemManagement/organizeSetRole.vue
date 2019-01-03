<template>
  <div class="service new_service service-role">
    <div class="tree_structure">
      <el-tree :data="data_tree"
               :props="defaultProps"
               accordion
               @node-click="handleNodeClick"></el-tree>
    </div>
    <div class="service-table service-table-role">
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
          <el-table-column prop="rolename"
                           label="角色编号"
                           align="center">
          </el-table-column>
        </el-table>
      </div>
      <div class="operation-button">
        <el-button type="primary"
                   @click="submitForm">确定</el-button>
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
import { getAllDept, getRoleList, addUserInfo } from '@/api/systemManagementApi'
export default {
  name: '',
  data () {
    return {
      loading: false, // 加载
      multipleSelection: [],
      roleid: '',
      tableData: [], // 表格列表数据
      amoduleList: [], // 模块数组
      data_tree: [],
      idArry: '', // 存储角色
      defaultProps: {
        children: 'children',
        label: 'abbrname'
      },
      science_form: {

      }// 新增时存本地的
    }
  },
  methods: {
    // 根据选择的id
    handleNodeClick (data) {
      console.log(data)
      getRoleList(data.id).then(res => {
        console.log(res.data.roleList)
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
    // 复选框
    handleSelectionChange (val) {
      let ids = []
      this.multipleSelection = val
      for (var i = 0; i < this.multipleSelection.length; i++) {
        ids.push(this.multipleSelection[i].roleid)
      }
      this.idArry = ids.join(',')
      console.log(this.idArry)
    },
    // 新增获取本地缓存带过来的
    newstart () {
      this.science_form = JSON.parse(sessionStorage.getItem('science_form'))
      let organizationrow1 = JSON.parse(sessionStorage.getItem('organizationrow1'))
      this.science_form.dept = organizationrow1.dept
      this.science_form.unit_id = organizationrow1.unit_id
    },
    deactivated () {
      this.$destroy()
    },
    submitForm () {
      this.science_form.roleid = this.idArry
      if (this.idArry === '') {
        this.$message('请选择角色')
        return false
      }
      addUserInfo(this.science_form).then(res => {
        console.log(res.data)
        if (res.data.success) {
          this.multipleSelection = []
          this.idArry = ''
          this.tableData = []
          this.deactivated()
          this.$message({
            message: '新增成功',
            type: 'success'
          })
          sessionStorage.removeItem('science_form')
          this.$router.go(-1)
        }
      })
    }
  },

  created () {
    this.getAllDeptGM()
    this.newstart()
  }

}
</script>