<template>
  <div class="service">
    <div class="service-table">
      <div v-loading="loading">
        <el-table :data="tableData"
                  border
                  style="width: 100%"
                  tooltip-effect="dark"
                  ref="multipleTable">
          <el-table-column type="index"
                           align="center"
                           label="序号"
                           width="80">
          </el-table-column>
          <el-table-column prop="codedesc"
                           label="模块"
                           align="center">
          </el-table-column>
          <el-table-column prop="unitname"
                           label="免审单位"
                           align="center">
            <template slot-scope="scope">
              <span type="text"
                    size="small"
                    @click="Freeunit(scope.row.unit_id)"
                    v-text="scope.row.unitname"
                    style="cursor: pointer"
                    class="display"></span>
            </template>

          </el-table-column>
          <el-table-column prop="rolename"
                           label="审核角色"
                           align="center">
          </el-table-column>
          <el-table-column label="操作"
                           align="center">
            <template slot-scope="scope">
              <el-button type="text"
                         size="small"
                         @click="Freetrialset(scope.row)">免审设置</el-button>
              <router-link :to="{name:'roleReview'}">
                <el-button type="text"
                           size="small"
                           @click="SettingRoles(scope.row)">设置审核角色</el-button>
              </router-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!-- 免审设置  加查看-->
    <div class="common-dialog">
      <el-dialog title="免审设置"
                 :visible.sync="new_form">
        <div class="flex_s mg_b5"
             v-if="hideenS">
          <div class="flex_s">
            <span class="flex_s_w">机构名称:</span>
            <el-input clearable
                      placeholder="请输机构名称"
                      class="unitName"
                      v-model="unitName"></el-input>
          </div>
          <div class="button_sc">
            <el-button class="submit primary-btn"
                       icon="el-icon-search"
                       type="primary"
                       @click="searchName">搜索</el-button>
            <el-button class="cancel"
                       icon="zxicon zx-zhongzhi"
                       type="primary"
                       @click="resets">重置</el-button>
          </div>
        </div>
        <div class="tab_color"
             v-loading="loadingrole">
          <el-table ref="multipleTable"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                    :data="tableDataList">
            <el-table-column type="selection"
                             align="center"
                             width="40"
                             v-if="hideenS">
            </el-table-column>
            <el-table-column label="序号"
                             width="80"
                             align="center"
                             prop="rn"></el-table-column>
            <el-table-column prop="unitname"
                             label="机构名称"
                             align="center">
            </el-table-column>
            <el-table-column prop="schoolcode"
                             label="机构统一社会码"
                             align="center">
            </el-table-column>
            <el-table-column prop="unittype"
                             label="机构类别"
                             align="center">
            </el-table-column>
          </el-table>
          <el-pagination background
                         layout="prev, pager, next"
                         :total="total"
                         @current-change="handleCurrentChange"></el-pagination>
        </div>
        <div slot="footer"
             class="dialog-footer">
          <el-button class="submit primary-btn"
                     type="primary"
                     @click="Freedetermine"
                     v-if="hideenS">确定</el-button>
          <el-button class="cancel"
                     type="primary"
                     @click="new_form=false">取消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import '@/views/ShareService/serviceManager/service.css'
import { getPlatformAuditList, getUnitList, addPlatformUnAuditOrg } from '@/api/systemManagementApi'
export default {
  data () {
    return {
      title: '审核流配置-平台',
      total: 1,
      new_form: false,
      loadingrole: true,
      hideenS: false,
      loading: true, // 加载
      tableData: [], // 表格列表数据
      tableDataList: [], // 免审列表
      unitName: '',
      freeObj: {
        pageIndex: 1,
        pageSize: 10,
        unit_ids: ''
      },
      free: {
        busicode: '', // 审核流程编码
        unit_id: '' // 单位id
      }
    }
  },
  methods: {
    // 获取列表
    getPlatformAuditListGM () {
      this.loading = true
      getPlatformAuditList().then(res => {
        if (res.data.success) {
          this.tableData = res.data.list
        }
        this.loading = false
      })
    },

    // 免审设置列表公共
    getUnitListGM () {
      getUnitList(this.freeObj).then(res => {
        console.log(res.data.list)
        this.tableDataList = res.data.list
        this.total = res.data.pageInfo.totalRecord
        if (res.data.success) {
          this.loadingrole = false
        }
      })
    },
    // 免审设置 获取列表内容
    Freetrialset (row) {
      this.hideenS = true
      this.loadingrole = true
      this.new_form = true
      this.freeObj.pageIndex = 1
      this.free.busicode = row.busicode
      this.freeObj.unit_ids = row.unit_id
      this.getUnitListGM()
    },
    // 搜索
    searchName () {
      this.loadingrole = true
      this.freeObj.unitName = this.unitName
      this.getUnitListGM()
    },
    // 重置
    resets () {
      this.loadingrole = true
      this.freeObj.unitName = ''
      this.freeObj.unit_ids = ''
      this.getUnitListGM()
    },
    // 免审单位的点击事件
    Freeunit (unitId) {
      this.new_form = true
      this.hideenS = false
      this.freeObj.pageIndex = 1
      this.freeObj.unit_ids = unitId
      this.getUnitListGM()
    },
    //  分页
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.freeObj.pageIndex = val
      this.getUnitListGM()
    },
    // 免审设置确定
    Freedetermine () {
      this.new_form = false
      this.getPlatformAuditListGM()
      this.new_form = false
      addPlatformUnAuditOrg(this.free).then(res => {
        console.log(res.data)
        if (res.data.success) {
          this.$message.success('设置成功')
        } else {
          this.$message.error()('设置成功')
        }
      })
    },
    // 复选框
    handleSelectionChange (val) {
      let ids = []
      this.multipleSelection = val
      for (var i = 0; i < this.multipleSelection.length; i++) {
        ids.push(this.multipleSelection[i].id)
      }
      this.free.unit_id = ids.join(',')
    },
    // 设置审核角色
    SettingRoles (row) {
      // console.log(row)
      sessionStorage.setItem('row', JSON.stringify(row))
    }

  },
  watch: {
    '$route': 'getPlatformAuditListGM'
  },
  created () {
    this.getPlatformAuditListGM()
  }
}
</script>
<style scoped>
.common-dialog .is-background {
  margin-top: 20px;
}
.service .service-table {
  padding-top: 0;
}
</style>
