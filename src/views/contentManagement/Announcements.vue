<template>
  <div class="service">
    <el-form ref="formList"
             :model="formList">
      <div class="service-header zx-flex between">
        <div class="search">
          <el-input v-model="formList.title"
                    placeholder="请输入内容"></el-input>
          <el-button type="primary"
                     icon="el-icon-search"
                     @click="searchTitle">搜索</el-button>
        </div>
        <div class="operation-button">
          <el-button type="primary"
                     icon="zxicon zx-xinzeng2"
                     @click="Checkinformation(false,'新增-通知公告',{})">新增</el-button>
          <el-button type="primary"
                     icon="zxicon zx-shanchu"
                     @click="deleteBatches">批量删除</el-button>
          <el-button type="primary"
                     icon="zxicon zx-xiajia"
                     class="background_c"
                     @click="Batchbelow">批量下架</el-button>
          <el-button type="primary"
                     icon="zxicon zx-shangjia"
                     @click="Batchshelves">批量上架</el-button>
          <el-button type="primary"
                     class="margin_5"
                     icon="zxicon zx-zhongzhi"
                     @click="replacementS">重置</el-button>
        </div>
      </div>
      <div class="select-group zx-flex between">
        <div class="select-item">
          <label for="">上架状态：</label>
          <el-select v-model="formList.ispub"
                     clearable
                     placeholder="请选择"
                     @change="sarchContent">
            <el-option value="0"
                       label="否">否</el-option>
            <el-option value="1"
                       label="是">是</el-option>
          </el-select>
        </div>
        <div class="select-item time_start_end">
          <label for="">时间范围：</label>
          <el-date-picker v-model="formList.pubdateLeft"
                          type="date"
                          placeholder="开始日期"
                          :picker-options="pickerOptions0">
          </el-date-picker>
          <span class="texe_s">至</span>
          <el-date-picker v-model="formList.pubdateRight"
                          type="date"
                          placeholder="结束日期"
                          :picker-options="pickerOptions1"
                          @change="sarchContent">
          </el-date-picker>
          <el-button type="primary"
                     class="margin_5"
                     @click="confirmation">确认</el-button>
        </div>
      </div>
    </el-form>
    <div class="service-table">
      <div v-loading="loading"
           element-loading-text="拼命加载中"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(0,0,0,0.8)">
        <el-table :data="tableData"
                  border
                  style="width: 100%"
                  @selection-change="handleSelectionChange"
                  tooltip-effect="dark"
                  ref="multipleTable">
          <el-table-column type="selection"
                           align="center"
                           width="50">
          </el-table-column>
          <el-table-column label="序号"
                           width="80"
                           align="center"
                           prop="rn"></el-table-column>
          <el-table-column prop="title"
                           label="标题"
                           align="center">
          </el-table-column>
          <el-table-column prop="username"
                           label="发布人"
                           width="120"
                           align="center">
          </el-table-column>
          <el-table-column prop="viewnums"
                           label="浏览量"
                           width="120"
                           align="center">
          </el-table-column>
          <el-table-column prop="pubdate"
                           label="发布日期"
                           width="120"
                           align="center"
                           format="yyyy 年 MM 月 dd 日"
                           value-format="yyyy-MM-dd">
          </el-table-column>
          <el-table-column label="操作"
                           align="center">
            <template slot-scope="scope">
              <el-button type="text"
                         size="small"
                         @click="Checkinformation(true,'详情-通知公告',scope.row)">查看</el-button>
              <el-button type="text"
                         size="small"
                         @click="Checkinformation(false,'编辑-通知公告',scope.row)">编辑</el-button>
              <el-button type="text"
                         size="small"
                         @click="deleteS(scope.row.id)">删除</el-button>
              <el-button type="text"
                         size="small"
                         @click="StickS(scope.row.istop,scope.row.id)"
                         v-text="scope.row.istop==1?'取消置顶':'置顶'">置顶</el-button>
              <el-switch v-model="scope.row.ispub"
                         active-color="#61A3FE"
                         inactive-color="#474747"
                         active-value="1"
                         inactive-value="0"
                         @change="standUpDown(scope.row.ispub,scope.row.id)">
              </el-switch>
              <span size="small"
                    v-text="scope.row.ispub==1?'上架':'下架'"
                    style="position: relative;left: -40px;font-size: 12px;color: #fff;"
                    :class="scope.row.ispub==1?'up_and_down':''">
              </span>
            </template>
          </el-table-column>

        </el-table>
        <el-pagination background
                       layout="prev, pager, next"
                       :total="total"
                       @current-change="handleCurrentChange"></el-pagination>
      </div>
    </div>
    <content-popup :showDialog='showDialog'
                   :row='row'
                   :isstate='isstate'
                   :title='dialogTitle'
                   @serviceDialog="serviceDialog"></content-popup>
  </div>
</template>
<script>
import contentPopup from './contentPopup'
import '@/views/ShareService/serviceManager/service.css'
import { queryNotificationList, pubNotification, topNotification, delNotification } from '@/api/contentManagementApi'
export default {
  components: {
    contentPopup
  },
  data () {
    return {
      total: 1,
      // title: '科技资讯',
      loading: true, // 加载
      idArry: '',
      formList: {
        ispub: '', // 1是0否
        pubdateLeft: '', // 发布时间左区间，yyyy-MM-dd
        pubdateRight: '', // 发布时间右区间，yyyy-MM-dd
        title: '', // 标题
        pageIndex: 1, // 当前页
        pageSize: 10// 每页数据

      },
      pickerOptions0: {
        disabledDate: time => {
          if (this.formList.pubdateRight !== '') {
            return time.getTime() > Date.now() || time.getTime() > this.formList.pubdateRight
          } else {
            return time.getTime() > Date.now()
          }
        }
      },
      pickerOptions1: {
        disabledDate: time => {
          return time.getTime() < this.formList.pubdateLeft || time.getTime() > Date.now()
        }
      },
      tableData: [], // 表格列表数据
      multipleSelection: [],
      dialogVisible: false,
      row: {}, // 单条数据源
      dialogTitle: '', // 标题
      isstate: false,
      showDialog: false,
      istopTitle: '',
      ispubTitle: ''
    }
  },
  methods: {
    // 获取列表
    queryScienceInfoListGM () {
      this.loading = true
      queryNotificationList(this.formList).then(res => {
        console.log(111)
        console.log(res)
        if (res.data.success) {
          this.total = res.data.pageInfo.totalRecord
          this.tableData = res.data.list
          this.loading = false
        }
      })
    },
    // 搜索
    searchTitle () {
      this.loading = true
      this.queryScienceInfoListGM()
    },
    // 确认
    confirmation () {
      this.loading = true
      this.queryScienceInfoListGM()
    },
    //  调用批量上下架通用方法
    pubNotificationGM (qurey) {
      this.loading = true
      pubNotification(qurey).then(res => {
        console.log(res.data)
        if (res.data.success) {
          this.$message.success(this.ispubTitle + '成功')
        } else {
          this.$message.success(this.ispubTitle + '失败')
        }
        this.queryScienceInfoListGM()
        this.loading = false
      })
    },

    // 批量上架
    Batchshelves () {
      if (this.idArry === '') {
        this.$message('请选择数据')
        return false
      }
      let qurey = {
        ids: this.idArry,
        ispub: '1'
      }
      this.ispubTitle = '批量上架'
      this.pubNotificationGM(qurey)
    },
    // 批量下架
    Batchbelow () {
      if (this.idArry === '') {
        this.$message('请选择数据')
        return false
      }
      let qurey = {
        ids: this.idArry,
        ispub: '0'
      }
      this.ispubTitle = '批量下架'
      this.pubNotificationGM(qurey)
    },
    // 下拉框筛选
    sarchContent () {
      this.formList.pageIndex = 1
      if (this.formList.pubdateRight !== '') {
        this.formList.pubdateLeft = this.$moment(this.formList.pubdateLeft).format('YYYY-MM-DD')
        this.formList.pubdateRight = this.$moment(this.formList.pubdateRight).format('YYYY-MM-DD')
      }
      this.queryScienceInfoListGM()
    },

    // 单一上下架
    standUpDown (ispub, id) {
      let status = ''
      if (ispub === '0') {
        status = 0
        this.ispubTitle = '下架'
      } else {
        status = 1
        this.ispubTitle = '上架'
      }
      let qurey = {
        ids: id,
        ispub: status
      }
      this.pubNotificationGM(qurey)
    },

    // 重置
    replacementS () {
      this.formList = {
        ispub: '',
        pubdateLeft: '',
        pubdateRight: '',
        title: '',
        pageIndex: 1,
        pageSize: 10
      }
      this.queryScienceInfoListGM()
    },

    // 置顶
    StickS (istop, id) {
      let status = ''
      if (istop === '0') {
        status = 1
        this.istopTitle = '置顶'
      } else {
        status = 0
        this.istopTitle = '取消置顶'
      }
      this.loading = true
      let qurey = {
        ids: id,
        istop: status
      }
      topNotification(qurey).then(res => {
        if (res.data.success) {
          this.$message.success(this.istopTitle + '成功')
        } else {
          this.$message.error('失败')
        }
        this.queryScienceInfoListGM()
        this.loading = false
      })
    },

    // 删除
    deleteS (id) {
      let idsOBJ = {
        ids: id
      }
      delNotification(idsOBJ).then(res => {
        if (res.data.success) {
          this.$message.success('删除成功')
        } else {
          this.$message.error('删除成功')
        }
        this.queryScienceInfoListGM()
      })
    },

    // 批量删除
    deleteBatches () {
      if (this.idArry === '') {
        this.$message('请选择数据')
        return false
      }
      let idsOBJ = {
        ids: this.idArry
      }
      delNotification(idsOBJ).then(res => {
        if (res.data.success) {
          this.$message.success('批量删除成功')
          this.idArry = ''
        } else {
          this.$message.error('批量删除失败')
        }
        this.queryScienceInfoListGM()
      })
    },
    // 复选框
    handleSelectionChange (val) {
      let ids = []
      this.multipleSelection = val
      for (var i = 0; i < this.multipleSelection.length; i++) {
        ids.push(this.multipleSelection[i].id)
      }
      this.idArry = ids.join(',')
      console.log(this.idArry)
    },
    //  分页
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.formList.pageIndex = val
      this.queryScienceInfoListGM()
    },
    // 新增/编辑/查看
    Checkinformation (val, tiele, row) {
      this.showDialog = true
      this.isstate = val
      this.dialogTitle = tiele
      this.row = row
      console.log(row)
    },
    serviceDialog (val) {
      console.log(val)
      this.showDialog = false
      this.queryScienceInfoListGM()
    }

  },
  created () {
    this.queryScienceInfoListGM()
  }
}
</script>
