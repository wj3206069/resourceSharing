
<template>
  <div class="service new_service service-role">
    <div class="tree_structure">
      <el-tree :data="data_tree"
               :props="defaultProps"
               accordion
               @node-click="handleNodeClick"></el-tree>
    </div>
    <div class="service-table service-table-role">
      <el-form :model="form"
               ref="form">
        <div v-loading="loading"
             element-loading-text="拼命加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0,0,0,0.8)"
             class="table_s">
          <el-table :data="tableData"
                    border
                    style="width: 100%"
                    tooltip-effect="dark"
                    ref="multipleTable">
            <el-table-column align="center"
                             label="选择">
              <template slot-scope="scope">
                <el-radio v-model="roleid"
                          :label="scope.row.roleid"
                          @change="getTemplateRow(scope.row)">{{null}}</el-radio>
              </template>
            </el-table-column>
            <el-table-column label="序号"
                             align="center"
                             type="index"></el-table-column>
            <el-table-column prop="rolename"
                             label="角色"
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
      </el-form>
    </div>
  </div>
</template>
<script>
import '@/views/ShareService/serviceManager/service.css'
import './tree.css'
import { getAllDept, getRoleList, addPlatformAuditRole } from '@/api/systemManagementApi'
export default {
  name: 'roleNew',
  data () {
    return {
      title: '审核流配置-平台',
      loading: false, // 加载
      roleid: '',
      form: {
        roleid: '',
        busicode: ''

      },
      // id: this.$route.params.id,
      tableData: [], // 表格列表数据
      amoduleList: [], // 模块数组
      data_tree: [],
      defaultProps: {
        children: 'children',
        label: 'abbrname'
      }
    }
  },
  methods: {
    // 根据选择的id
    handleNodeClick (data) {
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
    // 获取角色id
    getTemplateRow (row) {
      console.log(row)
      this.form.roleid = row.roleid
    },

    //  跳转过来初始渲染
    startS () {
      let row = JSON.parse(sessionStorage.getItem('row'))
      this.form.roleid = row.roleid
      this.roleid = row.roleid
      this.tableData[0] = row
    },
    dse () {
      this.$destroy()
    },
    // 确定按钮
    submitForm () {
      let row = JSON.parse(sessionStorage.getItem('row'))
      this.form.busicode = row.busicode
      if (this.form.roleid === '') {
        this.$message('请选择角色')
        return false
      }
      addPlatformAuditRole(this.form).then(res => {
        sessionStorage.removeItem('row')
        if (res.data.success) {
          sessionStorage.removeItem('row')
          this.dse()
          this.$message.success('设置成功')
          this.$router.go(-1)
        } else {
          this.$message.console.error('设置失败')
        }
      })
    }

  },

  created () {
    this.getAllDeptGM()
    this.startS()
  }

}
</script>




