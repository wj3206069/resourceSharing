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
        <el-form-item label="环节名称:"
                      prop="subname"
                      :rules="[{ required: true, message: '内容不能为空'}]">
          <el-input type="subname"
                    v-model="form.subname"
                    autocomplete="off"></el-input>
        </el-form-item>
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
                     @click="submitForm('form')">确定</el-button>
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
// editWorkFlowDefine 编辑
import { getAllDept, getRoleList, addWorkFlowDefine, editWorkFlowDefine } from '@/api/systemManagementApi'
export default {
  name: 'roleNew',
  data () {
    return {
      title: '审核流配置-机构',
      loading: false, // 加载
      roleid: '',
      form: {
        subname: '',
        roleid: '',
        busicode: '',
        id: ''
      },
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
    getTemplateRow (row) {
      this.form.roleid = row.roleid
    },

    // 新增获取本地缓存带过来的
    newstart () {
      if (this.$route.query.id === 1) {
        this.form = {
          subname: '',
          roleid: '',
          busicode: '',
          id: ''
        }
        this.form.busicode = sessionStorage.getItem('fieldcode')
      } else if (this.$route.query.id === 2) {
        let row = JSON.parse(sessionStorage.getItem('rowdata'))
        this.form.subname = row.subname
        this.form.roleid = row.roleid
        this.roleid = row.roleid
        this.form.id = row.id
        this.tableData[0] = row
        console.log(this.tableData)
      }
    },
    dse () {
      this.$destroy()
    },

    // 确定按钮
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.$route.query.id === 1) {
            if (this.form.roleid === '') {
              this.$message('请选择角色')
              return false
            }
            addWorkFlowDefine(this.form).then(res => {
              if (res.data.success) {
                this.dse()
                this.$message.success('新增成功')
                // this.$router.go(-1)
              } else {
                this.$message.error('设置失败')
              }
              this.$router.go(-1)
            })
          } else if (this.$route.query.id === 2) {
            editWorkFlowDefine(this.form).then(res => {
              if (res.data.success) {
                this.dse()
                this.$message.success('修改成功')
                // this.$router.go(-1)
              } else {
                this.$message.error('修改失败')
              }
              this.$router.go(-1)
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },

  created () {
    this.getAllDeptGM()
    this.newstart()
    // this.editorstart()
  },
  watch: {
    '$route': 'newstart'
  }

}
</script>




