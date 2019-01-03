<template>
  <div class="service">
    <el-form ref="formList">
      <div class="select-group zx-flex between">
        <div class="select-item">
          <el-button type="primary"
                     icon="zxicon zx-xinzeng2"
                     class="margin_5"
                     @click="newProUp(false,'新增-创新载体',{})">新增</el-button>
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
                           type="index"
                           width='60px'></el-table-column>
          <el-table-column prop="name"
                           label="创新载体名称"
                           align="center">
          </el-table-column>
          <el-table-column prop="rank"
                           label="级别"
                           align="center">
          </el-table-column>
          <el-table-column prop="institutionscategory"
                           label="类别"
                           align="center">
          </el-table-column>
          <el-table-column prop="relyingunit"
                           label="依托单位"
                           align="center">
          </el-table-column>
          <el-table-column prop="principal"
                           label="负责人"
                           align="center">
          </el-table-column>
          <el-table-column prop="year"
                           label="组建年份"
                           align="center">
          </el-table-column>
          <el-table-column label="操作"
                           align="center">
            <template slot-scope="scope">
              <el-button type="text"
                         size="small"
                         @click="newProUp(false,'编辑-创新载体',scope.row)">编辑</el-button>
              <el-button type="text"
                         size="small"
                         @click="newProUp(true,'详情-创新载体',scope.row)">详情</el-button>
              <el-button type="text"
                         size="small"
                         @click='deletS(scope.row.id)'>删除</el-button>

            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <newinnovation-carrier :showDialog='showDialog'
                           :row='row'
                           :isstate='isstate'
                           :title='dialogTitle'
                           :InnovationCarrierList='InnovationCarrierList'
                           :InnovationCategoryList='InnovationCategoryList'
                           @serviceDialog="serviceDialog"></newinnovation-carrier>

  </div>
</template>
<script>
import newinnovationCarrier from './newinnovationCarrier'
import '@/views/ShareService/serviceManager/service.css'
import { CategoryLevel, CarrierLevel, getInnovativeList, deleteInnovativeById } from '@/api/systemManagementApi'
export default {
  components: {
    newinnovationCarrier
  },
  data () {
    return {
      loading: false, // 加载
      tableData: [], // 表格列表数据
      dialogVisible: false,
      dialogTitle: '', // 标题
      isstate: false, // 区别新增编辑详情
      showDialog: false,
      row: {}, // 传子数据
      InnovationCarrierList: [], // 创新载体级别
      InnovationCategoryList: [], // 创新类别
      innovationForm: {
        pageIndex: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    //  数据字典
    dataDictionary () {
      CarrierLevel().then(res => {
        console.log(res.data)
        this.InnovationCarrierList = res.data.list
      })
      CategoryLevel().then(res => {
        console.log(res.data)
        this.InnovationCategoryList = res.data.list
      })
    },

    // 获取列表数据
    getInnovativeListGM () {
      this.loading = true
      getInnovativeList(this.innovationForm).then(res => {
        console.log(res.data)
        if (res.data.success) {
          this.tableData = res.data.resultList
        }
        this.loading = false
      })
    },
    // 新增 详情
    newProUp (val, tiele, row) {
      this.showDialog = true
      this.isstate = val
      this.dialogTitle = tiele
      this.row = row
      console.log(val, tiele, row)
    },
    serviceDialog (val) {
      console.log(val)
      this.showDialog = false
      this.getInnovativeListGM()
    },
    deletS (id) {
      deleteInnovativeById({ id: id }).then(res => {
        if (res.data.success) {
          this.$message.success('删除成功')
        } else {
          this.$message.error('删除失败,')
        }
        this.getInnovativeListGM()
      })
    }

  },
  created () {
    this.dataDictionary()
    this.getInnovativeListGM()
  },
  watch: {
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



