<template>
  <div class="service">
    <el-form ref="formList">
      <div class="select-group zx-flex between">
        <div class="select-item">
          <label for="">模块：</label>
          <el-select v-model="amodulefieldcode"
                     @change="amoduleS">
            <el-option :label="item.fieldname"
                       :value="item.fieldcode"
                       v-for="item in amoduleList"
                       :key="item.fieldcode"></el-option>
          </el-select>
        </div>
        <div class="select-item">
          <router-link :to="{name:'roleNew',query:{id:1}}">
            <el-button type="primary"
                       icon="zxicon zx-xinzeng2"
                       class="margin_5"
                       @click="newrole">新增</el-button>
          </router-link>
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
          <el-table-column type="selection"
                           align="center">
          </el-table-column>
          <el-table-column label="序号"
                           align="center"
                           prop="seq"></el-table-column>
          <el-table-column prop="subname"
                           label="环节"
                           align="center">
          </el-table-column>
          <el-table-column prop="rolename"
                           label="角色"
                           align="center">
          </el-table-column>
          <el-table-column label="操作"
                           align="center">
            <template slot-scope="scope">
              <router-link :to="{name:'roleNew',query:{id:2}}">
                <el-button type="text"
                           size="small"
                           @click="compile(scope.row)">编辑</el-button>
              </router-link>
              <el-button type="text"
                         size="small"
                         @click="deleteS(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

  </div>
</template>
<script>
import '@/views/ShareService/serviceManager/service.css'
import { amodule, queryWorkFlowDefineList, deleteWorkFlowDefine } from '@/api/systemManagementApi'
export default {

  data () {
    return {
      title: '审核流配置-机构',
      new_form: false,
      loading: true, // 加载
      tableData: [], // 表格列表数据
      multipleSelection: [],
      amodulefieldcode: '仪器审核',
      amoduleList: [], // 模块数组
      fieldcode: 1// 初始渲染
    }
  },
  methods: {
    // 获取模块下列框
    amoduleGM () {
      amodule().then(res => {
        if (res.data.success) {
          console.log(res.data.list)
          this.amoduleList = res.data.list
          this.fieldcode = res.data.list[0].fieldcode
        }
      })
    },
    // 初始模块
    queryWorkFlowDefineListGM () {
      this.loading = true
      queryWorkFlowDefineList(this.fieldcode).then(res => {
        console.log(res.data.list)
        if (res.data.success) {
          this.tableData = res.data.list
        }
        this.loading = false
      })
    },
    // 选择模块
    amoduleS () {
      this.fieldcode = this.amodulefieldcode
      this.queryWorkFlowDefineListGM()
    },
    // 新增
    newrole () {
      sessionStorage.setItem('fieldcode', this.fieldcode)
    },

    // 删除
    deleteS (row) {
      console.log(row)
      let qurey = {
        busicode: row.busicode,
        id: row.id
      }
      deleteWorkFlowDefine(qurey).then(res => {
        if (res.data.success) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.queryWorkFlowDefineListGM()
        }
      })
    },
    //  编辑
    compile (row) {
      let rowdata = JSON.stringify(row)
      sessionStorage.setItem('rowdata', rowdata)
    }

  },
  created () {
    this.amoduleGM()
    this.queryWorkFlowDefineListGM()
  },
  watch: {
    '$route': 'queryWorkFlowDefineListGM'
  }

}
</script>
<style scoped>
.common-dialog .is-background {
  margin-top: 20px;
}
.service .select-group {
  padding-top: 0;
}
</style>

