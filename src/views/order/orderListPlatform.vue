<template>
  <div class="order-list bg-white zx-flex column">
    <!-- 内容 -->
    <div class="zx-flex column flex-1">
      <!-- tabs -->
      <div>
        <ul class="tabs line-bottom zx-flex align fs-16 c-grey-1">
          <li class="tabs-item zx-flex align justify"
              :class="{'tabs-item-active c-primary' : tabsActive === index}"
              v-for="(item, index) in tabsList"
              :key="index"
              @click.stop.prevent="tabsChange(index)">
            <div>{{item.name}}</div>
            <div class="label fs-20">{{item.tabNum}}</div>
          </li>
        </ul>
      </div>
      <!-- 搜索 -->
      <div class="seach-bar zx-flex align between mg-t-20">
        <div class="zx-flex align">
          <el-input v-model="searchProduct"
                    style="width: 300px;"
                    placeholder="请输入仪器名称或型号"></el-input>
          <el-button class="bg-primary fs-14"
                     style="margin-left: 10px; border: none;"
                     @click.stop.prevent="getOrderList">搜索<i class="zxicon zx-sousuo fs-14"
               style="margin-left: 6px;"></i></el-button>
        </div>
        <div class="reset zx-flex align justify c-white cursor"
             @click.stop.prevent="resetSelect">
          <span class="fs-14">重置</span>
          <i class="zxicon zx-zhongzhi fs-16"></i>
        </div>
      </div>
      <!-- 筛选条件 -->
      <div class="select-bar zx-flex between align mg-t-20">
        <div class="select-box flex-1 zx-flex align">
          <span>成交时间：</span>
          <el-date-picker v-model="timeRange"
                          type="daterange"
                          value-format="timestamp"
                          format="yyyy-MM-dd"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <div class="select-box flex-1">
          <search-select ref="orderTypeSelect"
                         :options="orderType"
                         :titleVal="'订单状态'"
                         @returnSelectVal="val => { orderTypeVal = val }"></search-select>
        </div>
        <div class="select-box flex-1">
          <search-select ref="serviceTypeSelect"
                         :options="serviceType"
                         :titleVal="'服务状态'"
                         @returnSelectVal="val => { serviceTypeVal = val }"></search-select>
        </div>
        <div class="select-box flex-1">
          <search-select ref="afterSaleSelect"
                         :options="afterSaleType"
                         :titleVal="'售后状态'"
                         @returnSelectVal="val => { afterSaleTypeVal = val }"></search-select>
        </div>
      </div>
      <!-- 表头 -->
      <div class="theader mg-t-16 bg-primary fs-16">
        <ul class="zx-flex">
          <li class="header-item zx-flex align flex-1 service-name">服务名称</li>
          <li class="header-item zx-flex align justify">价格</li>
          <li class="header-item zx-flex align justify"
              style="width: 120px;">内容、数量</li>
          <li class="header-item zx-flex align justify"
              style="width: 110px;">订单操作</li>
          <li class="header-item zx-flex align justify">实付</li>
          <li class="header-item zx-flex align justify"
              style="width: 110px;">创新券支付</li>
          <li class="header-item zx-flex align justify"
              style="width: 125px;">服务所用仪器</li>
          <li class="header-item zx-flex align justify"
              style="width: 125px;">电子报告</li>
          <li class="header-item zx-flex align justify"
              style="width: 110px;">电子协议</li>
          <li class="header-item zx-flex align justify"
              style="width: 110px;">服务状态</li>
          <li class="header-item zx-flex align justify"
              style="width: 110px;">售后情况</li>
          <li class="header-item zx-flex align justify"
              style="width: 110px;">订单状态</li>
          <li class="header-item zx-flex align justify"
              style="width: 110px;">交易操作</li>
        </ul>
      </div>
      <!-- 全选和 批量操作平台已删除 -->
      <div class="select-All zx-flex align">
        <el-checkbox v-model="selectAll"
                     @change="handleCheckAllChange">全选</el-checkbox>
      </div>
      <!-- 列表内容 -->
      <div class="body_box flex-1"
           v-loading="loadinglist">
        <el-scrollbar v-if="orderList.length > 0"
                      style="height: 100%;">
          <el-checkbox-group v-model="selectItem"
                             @change="handleCheckOneChange">
            <div class="order-item"
                 v-for="(item, index) in orderList"
                 :key="index">
              <!-- 列表 表头 -->
              <div class="order-title zx-flex align grey-1 fs-14">
                <el-checkbox :label="item.id">{{item.ordertime}}</el-checkbox>
                <span class="to-left1">订单号：{{item.orderno}}</span>
                <span class="to-left2">买家：{{item.username}}</span>
                <span class="to-left3">联系方式：{{item.mobile}}</span>
              </div>
              <div class="order-content zx-flex fs-14">
                <!-- 服务名称 -->
                <div class="content1 zx-flex column flex-1 service-name">
                  <div class="top zx-flex">
                    <div style="width: 120px; height: 120px;">
                      <img :src="preview + item.images"
                           width="120"
                           height="120">
                    </div>
                    <div class="flex-1"
                         style="margin-left: 15px;">
                      <p class="desc line-3">{{item.servicename}}</p>
                      <p class="type grey-3 fs-12 block">服务类型：{{item.typeDesc}}</p>
                    </div>
                  </div>
                  <div class="bottom zx-flex align wrap flex-1 between">
                    <div v-if="item.is_voucher === '1'"
                         class="isChoose zx-flex aling">
                      <i class="zxicon fs-10"
                         :class="{'zx-fenzu isSelect c-primary': item.is_voucher === '1'}"></i>
                      <span :class="{'c-primary' : item.is_voucher === '1'}">创新券</span>
                    </div>
                    <div v-if="item.invoicetype === '1'"
                         class="isChoose zx-flex aling">
                      <i class="zxicon fs-10"
                         :class="{'zx-fenzu isSelect c-primary': item.invoicetype === '1'}"></i>
                      <span :class="{'c-primary' : item.invoicetype === '1'}">电子普通发票</span>
                    </div>
                    <div v-if="item.invoicetype === '2'"
                         class="isChoose zx-flex aling">
                      <i class="zxicon fs-10"
                         :class="{'zx-fenzu isSelect c-primary': item.invoicetype === '2'}"></i>
                      <span :class="{'c-primary' : item.invoicetype === '2'}">纸质普通发票</span>
                    </div>
                    <div v-if="item.invoicetype === '3'"
                         class="isChoose zx-flex aling">
                      <i class="zxicon fs-10"
                         :class="{'zx-fenzu isSelect c-primary': item.invoicetype === '3'}"></i>
                      <span :class="{'c-primary' : item.invoicetype === '3'}">增值税专用发票</span>
                    </div>
                    <div v-if="item.reporttype === '1'"
                         class="isChoose zx-flex aling">
                      <i class="zxicon fs-10"
                         :class="{'zx-fenzu isSelect c-primary': item.reporttype === '1'}"></i>
                      <span :class="{'c-primary' : item.reporttype === '1'}">电子报告</span>
                    </div>
                    <div v-if="item.reporttype === '2'"
                         class="isChoose zx-flex aling">
                      <i class="zxicon fs-10"
                         :class="{'zx-fenzu isSelect c-primary': item.reporttype === '2'}"></i>
                      <span :class="{'c-primary' : item.reporttype === '2'}">纸质报告</span>
                    </div>
                  </div>
                </div>
                <!-- 价格 -->
                <div class="content2 grey-1 same-width">
                  <p class="text-c content-item">￥ {{item.order_amount}}</p>
                </div>
                <!-- 内容、数量 -->
                <div class="content3 same-width">
                  <div class="content-item zx-flex align justify"
                       v-for="(type, index) in item.testItemList"
                       :key="index">
                    <span class="name grey-2">{{type.itemname}}</span>
                    <span class="num grey-1">X{{type.itemnum}}</span>
                  </div>
                </div>
                <!-- 订单操作 -->
                <div class="content4 grey-1 same-width">

                  <div class="sender-flow zx-flex align justify c-primary mg-t-5">
                    <span>寄件物流</span>
                    <div class="flow hidden bg-white fs-14">
                      <span class="arror"></span>
                      <div class="title line-bottom">
                        <span class="grey-2">韵达快递:</span>
                        <span class="grey-1">{{flowinfo.flowNum}}</span>
                      </div>
                      <ul class="grey-1">
                        <li class="flow-item mg-t-14"
                            :class="{'active': index === 0}"
                            v-for="(item, index) in flowinfo.content"
                            :key="index">
                          <p class="line-3">{{item.text}}</p>
                          <p class="mg-t-10 bold">{{item.time}}</p>
                        </li>
                        <li class="flow-item c-primary cursor"
                            style="padding-top: 5px;">查看详情</li>
                      </ul>
                    </div>
                  </div>
                  <div class="zx-flex align justify c-primary cursor mg-t-5">收件物流</div>
                  <div class="same-box zx-flex align justify c-primary cursor mg-t-5"
                       @click.stop.prevent="">物流详情</div>
                </div>
                <!-- 实付 -->
                <div class="content5 grey-1 same-width">
                  <p class="text-c content-item">￥ {{item.pay_amount}}</p>
                </div>
                <!-- 创新卷 -->
                <div class="content6 grey-1 same-width">
                  <p class="text-c content-item">￥ {{item.voucheramount}}</p>
                </div>
                <!-- 服务所用仪器 -->
                <div class="content7 grey-1 same-width">
                  <!-- TODD: item.cname空不能便利 -->
                  <!-- <p class="text-c content-item"
                     v-for="(name, index) in (item.cname.split(','))"
                     :key="index">{{name}}</p> -->
                  <p class="text-c content-item">{{item.cname}}</p>
                </div>
                <!-- 电子报告 -->
                <div class="content8 grey-1 same-width">
                  <p class="text-c c-primary cursor content-item"
                     @click.stop.prevent="checkReportDialog(item)">查看</p>
                </div>
                <!-- 电子协议 -->
                <div class="content9 grey-1 same-width">
                  <p class="text-c content-item">{{item.issign ? '买家已签订' : '未签订'}}</p>
                  <p class="text-c c-primary cursor content-item"
                     v-show="item.issign"
                     @click.stop.prevent="checkDealDialog(item)">查看</p>
                </div>
                <!-- 服务状态 -->
                <div class="content10 same-width">
                  <p class="text-c content-item"
                     :style="{ color: service_state[parseInt(item.service_state)] }">{{item.service_stateDesc}}</p>
                  <p class="text-c content-item"
                     style="color: #1FBDE4;"
                     v-show="item.specimenstatus === '1'">样品已收</p>
                  <p class="text-c cursor content-item"
                     style="color: #CA3D3D;"
                     v-show="item.specimenstatus === '0'"
                     @click.stop.prevent="SampleErrDialog(item)">样品异常</p>
                </div>
                <!-- 售后情况 -->
                <div class="content11 grey-1 same-width">
                  <p class="text-c content-item cursor"
                     @click.stop.prevent="AfterSaleOverDialog(item)">{{item.afterstateDesc || '无'}}</p>
                </div>
                <!-- 订单状态 -->
                <div class="content12 grey-1 same-width">
                  <p class="text-c content-item">{{item.orderstatusDesc}}</p>
                </div>
                <!-- 交易操作 -->
                <div class="content13 grey-1">
                  <p class="text-c cursor content-item c-primary"
                     @click.stop.prevent="goDetail(item)">查看详情</p>
                </div>
              </div>
            </div>
          </el-checkbox-group>
        </el-scrollbar>
        <p v-else
           class="text-c content-item grey fs-14">{{loadinglist ? '加载中...' : '暂无无数据'}}</p>
      </div>
    </div>
    <!-- 底部 分页 -->
    <el-footer v-if="orderList.length > 0">
      <!-- 分页 -->
      <el-pagination v-show="totalRecord > 0"
                     background
                     layout="prev, pager, next"
                     :page-size="5"
                     :total="totalRecord"
                     class="mg-t-20 text-c"
                     :current-page="currentPage"
                     @current-change="currentChange">
      </el-pagination>
    </el-footer>
    <!-- 查看电子报告 -->
    <check-report :ShowCheckReportDialog=ShowCheckReportDialog
                  :reportlist=reportlist
                  @returnBool="(bool) => { ShowCheckReportDialog = bool }"></check-report>
    <!-- 查看电子协议 -->
    <check-deal :ShowCheckDeal=ShowCheckDeal
                :checkDealData=checkDealData
                @returnBool="(bool) => { ShowCheckDeal = bool }"></check-deal>
    <!-- 样本异常 -->
    <sample-err :ShowSampleErr=ShowSampleErr
                :sampleErrData=sampleErrData
                @returnBool="(bool) => { ShowSampleErr = bool }"></sample-err>
    <!-- 售后终止 -->
    <after-sale-over :ShowAfterSaleOver=ShowAfterSaleOver
                     :afterSaleOverData=afterSaleOverData
                     @returnBool="(bool) => { ShowAfterSaleOver = bool }"></after-sale-over>

  </div>
</template>

<script>
// 引入所需要的组件
import searchSelect from '@/views/layout/components/searchSelect/searchSelect'
// 查看电子报告
import checkReport from '@/components/dialog/orderList/checkReport'
// 样本异常
import sampleErr from '@/components/dialog/orderList/sampleErr'
// 售后终止
import afterSaleOver from '@/components/dialog/orderList/afterSaleOver'
// 查看电子协议
import checkDeal from '@/components/dialog/orderList/checkDeal'

// 获取数据字典 预览地址
import { getDataDictionary, preview } from '@/api/index'
// 获取数据api
import { sampleErrList, afterSaleOverInfo } from '@/api/order' // TODO: 是否还需要?
// logisticsInfoList
import { orderList, tabsNum, checkReportList, checkCompactList } from '@/api/orderListPlatform'
import { mapMutations } from 'vuex'
export default {
  name: 'orderList',
  components: {
    searchSelect,
    sampleErr,
    afterSaleOver,
    checkDeal,
    checkReport
  },
  data () {
    return {
      preview: `http://${location.host}${preview}/`, // 预览地址
      loadinglist: true, // 订单列表加载状态
      tabsActive: 0, // 订单状态选择
      orderList: [], // 订单列表数据
      service_state: ['#fece29', '#FF7C08', '#3DA76C'], // 服务状态颜色
      tabsList: [], // 头部订单状态数据
      tabType: '', // 头部订单状态对应数值
      totalRecord: '', // 总数
      currentPage: 1, // 当前页
      searchProduct: '', // 搜索值
      timeRange: [], // 时间范围
      orderType: [], // 订单状态
      orderTypeVal: '', // 订单状态选中值
      serviceType: [], // 服务状态
      serviceTypeVal: '', // 服务状态选中值
      afterSaleType: [], // 售后状态
      afterSaleTypeVal: '', // 售后状态选中值
      selectAll: false, // 全选按钮
      selectItem: [], // 列表每一项选中按钮
      checkAll: [], // 全选
      flowinfo: {
        flowNum: '3832907613202',
        content: [
          {
            text: '您已在深圳福永桥头荔丰路东二巷6号店完成取件,感谢使用菜乌驿站，期待再次为您服务。',
            time: '2018-11-07 21:17:22'
          },
          {
            text: '您已在深圳福永桥头荔丰路东二巷6号店完成取件,感谢使用菜乌驿站，期待再次为您服务。',
            time: '2018-11-07 21:17:22'
          }
        ]
      }, // 快递信息
      DHL: [], // 快递公司字典
      ShowCheckReportDialog: false, // 查看报告dialog状态
      reportlist: [], // 查看报告数据
      ShowSampleErr: false,   // 样本异常dialog状态
      sampleErrData: [],
      ShowAfterSaleOver: false,  // 售后终止dialog状态
      afterSaleOverData: {},
      ShowCheckDeal: false, // 查看电子协议 dialog状态
      checkDealData: []
    }
  },
  mounted () {
    this.getOrderList()
    this.getTabsNum()
    this.getDictionary()
  },
  methods: {
    // 获取tabs角标数量
    getTabsNum () {
      tabsNum().then(res => {
        let temp = res.data.tabInfo
        this.tabsList = [
          { name: '所有订单', tabNum: '' },
          { name: '已付款', tabNum: temp.hasPay },
          { name: '待付款', tabNum: temp.unPay },
          { name: '待收货', tabNum: temp.unReceive },
          { name: '售后中', tabNum: temp.afterIng },
          { name: '待评价', tabNum: temp.unEvaluation }
        ]
      })
    },
    // 全选操作
    handleCheckAllChange (val) {
      this.selectItem = val ? this.checkAll : []
    },
    // 单选
    handleCheckOneChange (val) {
      let checkedCount = val.length
      this.selectAll = checkedCount === this.checkAll.length // 每项都选中的时候 改变全选按钮
    },
    // 查看上传报告 dialog
    checkReportDialog (item) {
      let loading = this.$loading() // 开启加载动画
      checkReportList(item.id).then(res => {
        loading.close()
        if (res.data.success) {
          this.ShowCheckReportDialog = true // 获取数据成功显示
          this.reportlist = res.data.list
        } else {
          this.$message.error(res.data.message)
        }
      }).catch(() => {
        loading.close()
      })
    },
    // 显示或隐藏 样本异常 dialog
    SampleErrDialog (item) {
      let loading = this.$loading() // 开启加载动画
      sampleErrList(item.id).then(res => {
        loading.close()
        if (res.data.success) {
          this.ShowSampleErr = true // 获取数据成功显示
          this.sampleErrData = res.data.list
        } else {
          this.$message.error(res.data.message)
        }
      }).catch(() => {
        loading.close()
      })
    },
    // 显示或隐藏 售后终止 dialog
    AfterSaleOverDialog (item) {
      // if (item.service_state !== '4') return
      let loading = this.$loading() // 开启加载动画
      afterSaleOverInfo(item.id).then(res => {
        loading.close()
        if (res.data.success) {
          this.ShowAfterSaleOver = true // 获取数据成功显示
          this.afterSaleOverData = res.data.afterStopInfo
        } else {
          this.$message.error(res.data.message)
        }
      }).catch(() => {
        loading.close()
      })
    },
    // 显示或隐藏 查看电子协议 dialog
    checkDealDialog (item) {
      let loading = this.$loading() // 开启加载动画
      checkCompactList(item.id).then(res => {
        loading.close()
        if (res.data.success) {
          this.ShowCheckDeal = true // 获取数据成功显示
          this.checkDealData = res.data.list
        } else {
          this.$message.error(res.data.message)
        }
      }).catch(() => {
        loading.close()
      })
    },
    // 重置搜索框 筛选框 内容
    resetSelect () {
      this.searchProduct = ''
      this.timeRange = []
      this.$refs.orderTypeSelect.reset()
      this.$refs.serviceTypeSelect.reset()
      this.$refs.afterSaleSelect.reset()
      this.getOrderList()
    },
    // 获取数据字典
    getDictionary () {
      // 获取 orderType --- ORDERSTATUS
      getDataDictionary('ORDERSTATUS').then(res => {
        res.data.list.map((item) => {
          this.orderType.push({
            value: item.fieldcode,
            label: item.fieldname
          })
        })
      })
      // 获取 serviceType --- SERVICESTATUS
      getDataDictionary('SERVICESTATUS').then(res => {
        res.data.list.map((item) => {
          this.serviceType.push({
            value: item.fieldcode,
            label: item.fieldname
          })
        })
      })
      // 获取 afterSaleType --- AFTERSTATUS
      getDataDictionary('AFTERSTATUS').then(res => {
        res.data.list.map((item) => {
          this.afterSaleType.push({
            value: item.fieldcode,
            label: item.fieldname
          })
        })
      })
      // 获取 DHL --- EXPRESSCOMPANY
      getDataDictionary('EXPRESSCOMPANY').then(res => {
        res.data.list.map((item) => {
          this.DHL.push({
            value: item.fieldcode,
            label: item.fieldname
          })
        })
      })
    },
    // 获取订单列表
    getOrderList () {
      let query = {
        pageIndex: this.currentPage,
        pageSize: 5,
        tabType: this.tabType ? this.tabType : '',
        orderState: this.orderTypeVal ? this.orderTypeVal : '',
        serviceState: this.serviceTypeVal ? this.serviceTypeVal : '',
        afterState: this.afterSaleTypeVal ? this.afterSaleTypeVal : '',
        createTimeLeft: this.timeRange.length > 0 ? this.$moment(this.timeRange[0]).format('YYYY-MM-DD') : '',
        createTimeRight: this.timeRange.length > 0 ? this.$moment(this.timeRange[1]).format('YYYY-MM-DD') : '',
        orderOrServiceName: this.searchProduct ? this.searchProduct : ''
      }
      this.loadinglist = true // 开启加载动画
      orderList(query).then(res => {
        console.log('平台订单列表', res)
        this.loadinglist = false // 关闭加载动画
        if (res.status === 200 && res.data.success) {
          this.loadinglist = false // 关闭加载动画
          this.orderList = res.data.list
          this.totalRecord = res.data.pageInfo.totalRecord // 总页数
          this.checkAll = [] // 初始化为空
          this.orderList.forEach(item => {
            this.checkAll.push(item.id) // 获取订单id
          })
        }
      }).catch(() => {
        this.loadinglist = false // 关闭加载动画
      })
    },
    // 翻页
    currentChange (val) {
      this.loadinglist = true // loading动画
      this.currentPage = val // 改变当前页码
      this.selectAll = false // 还原全选按钮
      this.selectItem = [] // 还原上一页面选中项目
      this.getOrderList()
    },
    // tabs 切换改变页面显示内容
    tabsChange (index) {
      this.loadinglist = true // loading动画
      this.tabsActive = index // tabs激活状态改变
      this.currentPage = 1 // 当前页码还原到1
      this.tabType = index // 请求类型改变
      this.getOrderList()
    },
    // 查看详情
    goDetail (item) {
      this.setOrderDeatil(item)
      this.$router.push({ name: 'orderDetailPlatform', params: { id: item.id } })
    },
    ...mapMutations({
      setOrderDeatil: 'setOrderDeatil'
    })
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/style/color.less";
.order-list {
  width: 100%;
  height: 100%;
  padding: 20px;
  .tabs {
    height: 45px;
    padding-left: 60px;
    .tabs-item {
      min-width: 140px;
      height: inherit;
      padding: 0 30px;
      border-left: 1px solid transparent;
      border-right: 1px solid transparent;
      border-top: 4px solid transparent;
      &.tabs-item-active {
        position: relative;
        border-left-color: @borderColor1;
        border-right-color: @borderColor1;
        border-top-color: @blueActive;
        &::after {
          position: absolute;
          content: "";
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background-color: #fff;
          z-index: 99;
        }
      }
      .label {
        margin-left: 5px;
        margin-top: -10px;
        color: @primary;
      }
    }
  }
  .reset {
    width: 80px;
    height: 38px;
    background-color: #ff4d2a;
  }
  .seach-bar,
  .select-bar {
    // TODO:
    min-height: 40px;
    .select-box + .select-box {
      margin-left: 10px;
    }
  }

  .theader {
    height: 60px;
    color: #fff;
    border: 1px solid @borderColor2;
    ul {
      height: inherit;
      .header-item {
        height: inherit;
        // TODO:
        // min-width: 85px;
        min-width: 70px;
        padding: 0 12px;
        border-right: 1px solid @borderColor2;
        &:last-child {
          border: none;
        }
      }
    }
  }
  .select-All {
    max-height: 52px;
    min-height: 40px;
    padding-left: 15px;
    .select-item {
      width: 85px;
      height: 25px;
      margin-left: 10px;
      .el-button {
        width: 84px;
        height: 23px;
        line-height: 23px;
        padding: 0;
        margin-right: 8px;
      }
    }
  }

  .body_box {
    // TODO:
    min-height: 200px;
    .order-item {
      & + .order-item {
        margin-top: 20px;
      }
      .order-title {
        background-color: @borderColor2;
        width: 100%;
        // TODO:
        // min-width: 1280px;
        height: 60px;
        border: 1px solid @blue;
        padding-left: 15px;
        .to-left1 {
          margin-left: 40px;
        }
        .to-left2 {
          margin-left: 70px;
        }
        .to-left3 {
          margin-left: 85px;
        }
      }
      .order-content {
        min-height: 224px;
        border: 1px solid @blue;
        border-top: none;
        > div {
          border-right: 1px solid @blue;
          &:last-child {
            border-right: none;
          }
        }

        .content1 {
          .top {
            height: 150px;
            padding: 10px 10px 20px 10px;
            border-bottom: 1px solid @blue;
            .desc {
              height: 55px;
              line-height: 18px;
              margin-top: 15px;
            }
            .type {
              height: 20px;
              margin-top: 15px;
            }
          }
          .bottom {
            padding: 10px 50px;
            .zxicon {
              display: inline-block;
              width: 14px;
              height: 14px;
              border: 1px solid @borderColor1;
              margin-right: 5px;
            }
            .isSelect {
              border-color: @primary;
            }
          }
        }
        .content2,
        .content5,
        .content6,
        .content9,
        .content10,
        .content11,
        .content12,
        .content13 {
          padding-top: 20px;
        }
        .content3 {
          padding-top: 20px;
          width: 120px;
          .num {
            margin-left: 5px;
          }
        }
        .content4 {
          width: 110px;
          padding-top: 5px;
          // 物流
          .sender-flow {
            position: relative;
            &:hover {
              .flow {
                display: block;
              }
            }
            .flow {
              position: absolute;
              top: 20px;
              width: 280px;
              min-height: 280px;
              padding: 15px;
              border: 1px solid @primary;
              border-radius: 5px;
              .arror {
                position: absolute;
                top: -6px;
                left: 50%;
                transform: translateX(-3px);
                display: block;
                width: 0;
                height: 0;
                border-width: 0 8px 6px;
                border-style: solid;
                border-color: transparent transparent @primary; /*透明 透明  黄*/
              }
              .title {
                padding-bottom: 10px;
              }
              .flow-item {
                position: relative;
                padding-left: 10px;
                &::before {
                  content: "";
                  position: absolute;
                  left: 0;
                  top: 10px;
                  width: 5px;
                  height: 5px;
                  border-radius: 50%;
                  background-color: @grey;
                }
                > p {
                  line-height: 20px;
                }
                &.active {
                  color: @primary;
                  &::before {
                    background-color: @primary;
                  }
                }
              }
            }
          }
        }
        .content7 {
          width: 125px;
          padding-top: 20px;
        }
        .content8 {
          width: 125px;
          padding-top: 20px;
        }
        .content6,
        .content9,
        .content10,
        .content11,
        .content12,
        .content13 {
          width: 110px;
        }
        .content13 {
          .jiedan {
            width: 80px;
            height: 30px;
            margin: 0 auto;
            border-radius: 5px;
            color: #fff;
          }
        }
      }
    }
  }
  // 列表对齐及最小宽度处理
  .service-name {
    // TODO:
    // min-width: 280px !important;
    min-width: 240px !important;
  }
  .same-width {
    // TODO:
    // min-width: 85px !important;
    min-width: 70px !important;
  }
  .content-item {
    height: 30px;
    line-height: 30px;
  }
  .same-box {
    // TODO:
    // width: 80px;
    min-width: 60px;
    height: 30px;
    margin: 0 5px;
    border: 1px solid @primary;
    background-color: @borderColor2;
    &:active {
      background-color: @blue;
    }
  }
  .mg-t-5 {
    margin-top: 5px !important;
  }
}
</style>
