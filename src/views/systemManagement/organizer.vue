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
            <span class="custom-tree-node"
                  slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span>
                <el-button type="text"
                           size="mini"
                           @click="() => setTree(false,'新增-部门人员',node,data)">
                  新增
                </el-button>
                <el-button type="text"
                           size="mini"
                           @click="() => setTree(false,'编辑-部门人员',node,data)">
                  编辑
                </el-button>
                <el-button type="text"
                           size="mini"
                           @click="() => removeTree(data)">
                  删除
                </el-button>
              </span>
            </span>
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
                         @click="addManager(false,'新增-用户信息',row1)">新增</el-button>
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
                               prop="rn"
                               width='80px'></el-table-column>
              <el-table-column prop="username"
                               label="用户名"
                               align="center">
              </el-table-column>
              <el-table-column prop="phone"
                               label="手机号"
                               align="center">
              </el-table-column>
              <el-table-column label="用户状态"
                               align="center">
                <template slot-scope="scope">
                  <span v-text="scope.row.userstatus==='1'?'启用':'禁用'"></span>
                </template>
              </el-table-column>
              <el-table-column prop="registrationdate"
                               label="注册日期"
                               align="center">
              </el-table-column>
              <el-table-column label="操作"
                               align="center">
                <template slot-scope="scope">
                  <el-button type="text"
                             size="small"
                             @click="addManager(false,'编辑-用户信息',scope.row)">编辑</el-button>
                  <el-button type="text"
                             size="small"
                             @click="deleteS(scope.row.id)">删除</el-button>
                  <el-button type="text"
                             size="small"
                             @click="enableThe(scope.row.id,scope.row.userstatus)"
                             v-text="scope.row.userstatus==='1'?'禁用':'启用'"></el-button>
                  <el-button type="text"
                             size="small"
                             @click="addManager(true,'详情-用户信息',scope.row)">详情</el-button>
                  <router-link :to="{name:'Setrole'}">
                    <el-button type="text"
                               size="small"
                               @click="setRole(scope.row.id)">设置角色</el-button>
                  </router-link>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination background
                           layout="prev, pager, next"
                           :total="total"
                           @current-change="handleCurrentChange"></el-pagination>
          </div>
        </div>

      </div>
    </div>
    <!-- 新增用户信息 -->
    <new-organize :showDialog='showDialog'
                  :row='row'
                  :isstate='isstate'
                  :title='dialogTitle'
                  @serviceDialog="serviceDialog"></new-organize>
    <!-- 新增 修改部门人员 -->
    <set-tree :showDialogTree='showDialogTree'
              :rowTree='rowTree'
              :isstateTree='isstateTree'
              :titleTree='dialogTitleTree'
              :dataTree='dataTree'
              :rowParent='rowParent'
              @serviceDialogTree="serviceDialogTree"></set-tree>
  </div>
</template>
<script>
import newOrganize from './newOrganize'
import setTree from './setTree'
import '@/views/ShareService/serviceManager/service.css'
import { getDeptTree, queryUserInfoList, openAndCloseUserinfo, deleteDept } from '@/api/systemManagementApi'
export default {
  components: {
    newOrganize,
    setTree
  },
  data () {
    return {
      data5: [],
      loading: false,
      total: 1,
      visible2: false,
      tableData: [], // 表格数据
      defaultProps: {
        children: 'children',
        label: 'abbrname'
      },
      organizer_form: {
        deptid: '', // 部门id,
        username: '', // 姓名,
        pageIndex: 1,
        pageSize: 10
      },
      row1: {
        unit_id: '', // 单位id,
        dept: '', // 部门id
        name: '', // 部门名字
        userid: '', // 人员ID
        rolename: '' // 角色名字
      },
      row: {}, // 单条数据源
      dialogTitle: '', // 标题
      isstate: false,
      dialogVisible: false,
      showDialog: false,
      rowTree: {}, // 单条数据源
      dataTree: {}, // 设置树的
      dialogTitleTree: '', // 标题
      isstateTree: false,
      showDialogTree: false,
      rowParent: '',
      sTitle: '',

      isStart: {
        type: '',
        id: '',
        isdelete: 0
      }
    }
  },

  methods: {
    // 初始查询组织人员树
    getDeptTreeGM () {
      getDeptTree().then(res => {
        console.log(res.data)
        console.log(res)
        this.data5 = res.data.list
        this.row1.unit_id = res.data.unit_id
        this.row1.dept = res.data.list[0].id
        this.row1.name = res.data.list[0].deptname
        this.organizer_form.deptid = res.data.list[0].id

        sessionStorage.setItem('organizationrow1', JSON.stringify(this.row1))
        this.queryUserInfoListGM()
      })
    },
    // 表格列表
    queryUserInfoListGM () {
      this.loading = true
      queryUserInfoList(this.organizer_form).then(res => {
        if (res.data.success) {
          this.tableData = res.data.list
          this.total = res.data.pageInfo.totalRecord
        }
        this.loading = false
      })
    },
    // 根据选择树的id
    handleNodeClick (data) {
      console.log(data)
      this.organizer_form.deptid = data.id
      this.row1.dept = data.id
      this.row1.name = data.deptname
      sessionStorage.setItem('organizationrow1', JSON.stringify(this.row1))
      console.log(this.row1)
      this.queryUserInfoListGM()
    },
    // 删除
    deleteS (id) {
      console.log(id)
      let isStart = {
        type: '',
        id: id,
        isdelete: 1
      }
      console.log(isStart)
      openAndCloseUserinfo(isStart).then(res => {
        if (res.data.success) {
          this.$message.success('删除成功')
        } else {
          this.$message.error('删除失败')
        }
        this.queryUserInfoListGM()
      })
    },
    //  分页
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.organizer_form.pageIndex = val
      this.queryUserInfoListGM()
    },
    // 启用禁用
    enableThe (id, userstatus) {
      console.log(userstatus)
      let status = ''
      if (userstatus === '0') {
        status = 1
        this.sTitle = '启用'
      } else {
        status = 0
        this.sTitle = '禁用'
      }
      let isStart = {
        type: status,
        id: id,
        isdelete: 0
      }
      openAndCloseUserinfo(isStart).then(res => {
        if (res.data.success) {
          this.$message.success(this.sTitle + '成功')
        } else {
          this.$message.error('设置失败')
        }
        this.queryUserInfoListGM()
      })
    },
    // 对树的新增,编辑
    setTree (val, tiele, row, data) {
      this.showDialogTree = true
      this.isstateTree = val
      this.dialogTitleTree = tiele
      this.rowTree = row
      this.dataTree = data
      this.rowParent = row.parent.data.id
    },
    // 删除树的部门deleteDept
    removeTree (data) {
      if (this.row1.unit_id === data.id) {
        this.$message({
          message: '单位不可以删除',
          type: 'warning'
        })
        return false
      }
      deleteDept({ id: data.id }).then(res => {
        if (res.data.success) {
          this.$message.success('删除成功')
        } else {
          this.$message.error('删除失败')
        }
        this.getDeptTreeGM()
        this.queryUserInfoListGM()
      })
    },

    serviceDialogTree (val) {
      this.showDialogTree = false
      this.getDeptTreeGM()
    },
    // 查看详情 新增 编辑
    addManager (val, tiele, row) {
      this.showDialog = true
      this.isstate = val
      this.dialogTitle = tiele
      this.row = row
      console.log('新增', row)
      sessionStorage.setItem('organizationrow1', JSON.stringify(this.row1))
    },
    // 设置角色
    setRole (id) {
      this.row1.userid = id
      sessionStorage.setItem('organizationrow1', JSON.stringify(this.row1))
    },
    serviceDialog (val) {
      this.showDialog = false
      this.queryUserInfoListGM()
    }
  },
  watch: {
    '$route': 'queryUserInfoListGM'
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

