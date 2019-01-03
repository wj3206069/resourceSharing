<template>
  <div class="home zx-flex">
    <div class="left-box flex-1">
      <!-- 三个标题 -->
      <div class="top zx-flex align">
        <div class="top-item zx-flex align bg-white radius5 flex-1">
          <div class="more-icon">
            <i class="zxicon zx-gengduo fs-12 grey-3"></i>
          </div>
          <div class="type-icon zx-flex align">
            <div class="icon-box round zx-flex align justify">
              <div class="icon-content round zx-flex align justify">
                <i class="zxicon zx-yiqi fs-28 c-white"></i>
              </div>
            </div>
          </div>
          <div class="type-content">
            <p class="num grey-2 fs-28">5000</p>
            <p class="txt grey-3 fs-12">Total number of instruments</p>
            <div class="check zx-flex align fs-12">
              <span>点击查看</span>
              <i class="zxicon zx-right-arrow fs-16"></i>
            </div>
          </div>
        </div>
        <div class="top-item zx-flex align bg-white radius5 flex-1">
          <div class="more-icon">
            <i class="zxicon zx-gengduo fs-12 grey-3"></i>
          </div>
          <div class="type-icon zx-flex align">
            <div class="icon-box round zx-flex align justify">
              <div class="icon-content round zx-flex align justify">
                <i class="zxicon zx-dingdanguanli fs-26 c-white"></i>
              </div>
            </div>
          </div>
          <div class="type-content">
            <p class="num grey-2 fs-28">5000</p>
            <p class="txt grey-3 fs-12">现平台可使用**总数</p>
            <div class="check zx-flex align fs-12">
              <span>点击查看</span>
              <i class="zxicon zx-right-arrow fs-16"></i>
            </div>
          </div>
        </div>
        <div class="top-item zx-flex align bg-white radius5 flex-1">
          <div class="more-icon">
            <i class="zxicon zx-gengduo fs-12 grey-3"></i>
          </div>
          <div class="type-icon zx-flex align">
            <div class="icon-box round zx-flex align justify">
              <div class="icon-content round zx-flex align justify">
                <i class="zxicon zx-peixun fs-30 c-white"></i>
              </div>
            </div>
          </div>
          <div class="type-content">
            <p class="num grey-2 fs-28">5000</p>
            <p class="txt grey-3 fs-12">现平台可使用**总数</p>
            <div class="check zx-flex align fs-12">
              <span>点击查看</span>
              <i class="zxicon zx-right-arrow fs-16"></i>
            </div>
          </div>
        </div>
      </div>
      <!-- 订单走势图 -->
      <div class="middle radius5 bg-white mg-t-20 zx-flex align">
        <div class="line-box flex-1 zx-flex column">
          <div class="title zx-flex align between">
            <div class="title-name zx-flex align">
              <i class="zxicon zx-dingdan fs-24"></i>
              <span class="fs-16">订单查看</span>
            </div>
            <div class="choose-item fs-14">
              <el-date-picker v-model="chooseYear"
                              type="year"
                              placeholder="选择年">
              </el-date-picker>
            </div>
          </div>
          <!-- 折线图 -->
          <div class="line flex-1 mg-t-20"
               ref="indexLine">
          </div>
        </div>
        <div class="order-total">
          <div class="text-r cursor">
            <i class="zxicon zx-gengduo fs-20 grey-3"></i>
          </div>
          <div class="total-title mg-t-10">
            <div class="zx-flex align c-white"
                 style="padding: 20px 0 0 27px;">
              <span class="fs-30 block">106,483,46</span>
              <span class="fs-18 block"
                    style="margin-left: 5px;">件</span>
            </div>
            <div class="zx-flex align c-white"
                 style="padding: 14px 0 0 27px;">
              <span class="fs-18 block">5000件</span>
              <span class="fs-14"
                    style="margin-left: 5px;">（本月</span>
              <i class="total-up zxicon zx-right-arrow fs-12"></i>
              <span class="fs-14">）</span>
            </div>
          </div>
          <ul>
            <li class="total-item line-bottom fs-12 grey zx-flex column justify">
              <div class="item-name">订单好评数</div>
              <div class="zx-flex align between"
                   style="margin-top: 5px;">
                <p class="block grey-3">本年度</p>
                <span>315,846,06</span>
              </div>
            </li>
            <li class="total-item line-bottom fs-12 grey zx-flex column justify">
              <div class="item-name">订单好评数</div>
              <div class="zx-flex align between"
                   style="margin-top: 5px;">
                <p class="block grey-3">本年度</p>
                <span>315,846,06</span>
              </div>
            </li>
            <li class="total-item line-bottom fs-12 grey zx-flex column justify">
              <div class="item-name">订单好评数</div>
              <div class="zx-flex align between"
                   style="margin-top: 5px;">
                <p class="block grey-3">本年度</p>
                <span>315,846,06</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 两个图标 -->
      <div class="bottom mg-t-20 zx-flex align">
        <!-- 环形图 -->
        <div class="bottom-left radius5 bg-white">
          <div class="title zx-flex align between">
            <div class="title-name zx-flex align">
              <i class="zxicon zx-bingzhuangtu fs-24"></i>
              <span class="fs-16">某某分类</span>
            </div>
            <div class="choose-item fs-14">
              <el-date-picker v-model="chooseMouthPie"
                              type="month"
                              placeholder="选择月">
              </el-date-picker>
            </div>
          </div>
          <div class="pie"
               ref="indexPie">
          </div>
          <div class="pie-name-box zx-flex align between">
            <div class="pie-name fs-12 grey-2">直接访问</div>
            <div class="pie-name fs-12 grey-2">邮件营销</div>
            <div class="pie-name fs-12 grey-2">联盟广告</div>
          </div>
        </div>
        <!-- 柱状图 -->
        <div class="bottom-right flex-1 radius5 bg-white">
          <div class="title zx-flex align between">
            <div class="title-name zx-flex align">
              <i class="zxicon zx-zhuzhuangtu fs-24"></i>
              <span class="fs-16">仪器数量</span>
            </div>
            <div class="choose-item fs-14">
              <el-date-picker v-model="chooseMouthLine"
                              type="month"
                              placeholder="选择月">
              </el-date-picker>
            </div>
          </div>
          <div class="bar"
               ref="indexBar">
          </div>
        </div>
      </div>
    </div>
    <!-- 日历和公告 -->
    <div class="right-box radius5">
      <div class="date-picker bg-white line-bottom">
        <datepicker :inline="true"
                    :monday-first="true"
                    :language="languages['zh']"
                    v-model="indexDate"></datepicker>
      </div>
      <div class="notice bg-white">
        <div class="notice-title zx-flex align between">
          <div class="zx-flex align">
            <i class="tongzhi zxicon zx-tongzhi fs-24"></i>
            <p class="fs-18 grey-2 block">通知公告</p>
          </div>
          <div class="zx-flex align">
            <p class="fs-14 grey-3 block">2018-Jan（11-27）</p>
            <i class="gengduo zxicon zx-gengduo fs-18"></i>
          </div>
        </div>
        <div style="height: 420px;">
          <el-scrollbar style="height: 100%;">
            <ul>
              <li class="notice-item zx-flex align"
                  v-for="(item, index) in noticeItem"
                  :key="index">
                <div class="notice-avatar">
                  <img :src="item.imgUrl"
                       alt="头像"
                       width="43"
                       height="43"
                       class="round">
                </div>
                <div class="notice-content fs-16 flex-1">
                  <div class="nickname">
                    <p class="block">{{item.nickname}}</p>
                    <div class="is-read round"
                         :class="{'mark-read': item.markRead === 1}"></div>
                  </div>
                  <div class="zx-flex align between mg-t-8">
                    <div class="text">{{item.txt}}</div>
                    <div class="grey-2 fs-14">{{item.time}}</div>
                  </div>
                </div>
              </li>
            </ul>
          </el-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 引入 datapicker
import Datepicker from 'vuejs-datepicker'
import * as lang from 'vuejs-datepicker/src/locale'
// 引入 ECharts 主模块
let echarts = require('echarts/lib/echarts')
// 引入环形图
require('echarts/lib/chart/pie')
// 引入柱状图
require('echarts/lib/chart/bar')
// 引入折线图
require('echarts/lib/chart/Line')
// 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
let noticeItem = [
  {
    imgUrl: 'https://avatars0.githubusercontent.com/u/141232?v=4',
    nickname: 'Computer',
    txt: '已清分，有一条数据存在问题',
    time: '20 min ago',
    markRead: 1
  },
  {
    imgUrl: 'https://avatars2.githubusercontent.com/u/1686933?v=4',
    nickname: '某某科长',
    txt: '某某数据有问题',
    time: '34 min ago',
    markRead: 0
  },
  {
    imgUrl: 'https://avatars0.githubusercontent.com/u/141232?v=4',
    nickname: 'Computer',
    txt: '已清分，有一条数据存在问题',
    time: '20 min ago',
    markRead: 0
  },
  {
    imgUrl: 'https://avatars2.githubusercontent.com/u/1686933?v=4',
    nickname: '某某科长',
    txt: '某某数据有问题',
    time: '34 min ago',
    markRead: 1
  }, {
    imgUrl: 'https://avatars0.githubusercontent.com/u/141232?v=4',
    nickname: 'Computer',
    txt: '已清分，有一条数据存在问题',
    time: '20 min ago',
    markRead: 0
  },
  {
    imgUrl: 'https://avatars2.githubusercontent.com/u/1686933?v=4',
    nickname: '某某科长',
    txt: '某某数据有问题',
    time: '34 min ago',
    markRead: 0
  }, {
    imgUrl: 'https://avatars0.githubusercontent.com/u/141232?v=4',
    nickname: 'Computer',
    txt: '已清分，有一条数据存在问题',
    time: '20 min ago',
    markRead: 0
  },
  {
    imgUrl: 'https://avatars2.githubusercontent.com/u/1686933?v=4',
    nickname: '某某科长',
    txt: '某某数据有问题',
    time: '34 min ago',
    markRead: 0
  }
]
export default {
  name: 'home',
  components: {
    Datepicker
  },
  data () {
    return {
      chooseYear: '',
      chooseMouthPie: '',
      chooseMouthLine: '',
      optionsMouth: [{
        value: '选项1',
        label: '1月'
      }, {
        value: '选项2',
        label: '2月'
      }, {
        value: '选项3',
        label: '3月'
      }, {
        value: '选项4',
        label: '4月'
      }, {
        value: '选项5',
        label: '5月'
      }],
      languages: lang,
      indexDate: '', // 日历数据
      noticeItem: []
    }
  },
  mounted () {
    // 在dom渲染完毕之后调用echarts绘制图表
    this.drawIndexPie()
    this.drawIndexBar()
    this.drawIndexLine()
    // 假数据
    this.noticeItem = noticeItem
  },
  methods: {
    // 绘制环形图
    drawIndexPie () {
      let indexPie = echarts.init(this.$refs.indexPie)
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        // legend: {
        //   orient: 'vertical',
        //   x: 'left',
        //   data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        // },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['60%', '85%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '24',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: '直接访问', itemStyle: { color: '#41ECDD' } },
              { value: 310, name: '邮件营销', itemStyle: { color: '#FD774B' } },
              { value: 234, name: '联盟广告', itemStyle: { color: '#4CA2FE' } }
            ]
          }
        ]
      }
      indexPie.setOption(option)
    },
    // 绘制柱状图
    drawIndexBar () {
      let indexBar = echarts.init(this.$refs.indexBar)
      let Ydata = [7510, 5220, 9200, 6324, 9290, 2320, 8220, 4500, 8502, 4200, 7334]
      let option = {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: 30,
          right: 20,
          top: 30,
          bottom: 0,
          height: 250,
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['仪器1', '仪器2', '仪器3', '仪器4', '仪器5', '仪器6', '仪器7', '仪器8', '仪器9', '仪器10', '仪器11'],
            axisLabel: {
              textStyle: {
                color: '#8994A8'
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            }
          }
        ],
        yAxis: {
          type: 'value',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#8994A8'
            }
          }
        },
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '14px',
            data: Ydata,
            itemStyle: {
              normal: {
                barBorderRadius: [7, 7, 0, 0],
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#4CBAFF' },
                    { offset: 1, color: '#3E7AFF' }
                  ]
                )
              }

            }
          }
        ]
      }
      indexBar.setOption(option)
    },
    // 绘制折线图
    drawIndexLine () {
      let indexLine = echarts.init(this.$refs.indexLine)
      let option = {
        backgroundColor: '#fff',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#57617B'
            }
          }
        },
        grid: {  // 尺寸距离
          left: 0,
          right: 11,
          bottom: 0,
          height: 280,
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          nameTextStyle: {
            color: '#AAAAAA'
          },
          axisLine: {
            show: false,
            onZero: false,
            lineStyle: {
              color: '#aaa'
            }
          },
          axisTick: {  // x轴 向内蓝色小点
            show: false,
            inside: true,
            alignWithLabel: true,
            lineStyle: {
              width: 5,
              color: '#4C91E3'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed', // 虚线
              color: '#E0E0E0'
            }
          },
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        }, {
          axisPointer: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          position: 'bottom',
          offset: 20
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#aaa'
            }
          },

          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 14
            }
          },
          splitLine: {
            lineStyle: {
              type: 'dashed', // 虚线
              color: '#E0E0E0'
            }
          }
        }],
        series: [{
          name: '好评',
          type: 'line',
          smooth: true, // 平滑曲线显示
          symbol: 'circle', // 圆形 可以使用 'image://http://xxx.xxx.xxx/a/b.png'
          symbolSize: 5,  // 宽高尺寸
          showSymbol: false, // symbol在hover时现在
          lineStyle: {
            normal: {
              color: 'rgba(65,203,166)', // 线条颜色
              width: 2 // 默认2
            }
          },
          areaStyle: { // 阴影颜色
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(65,203,166,.5)'
              }, {
                offset: 0.5,
                color: 'rgba(255,255,255,.2)'
              }], false),
              shadowColor: 'rgba(65,203,166,.2)',
              shadowBlur: 10
            }
          },
          itemStyle: { // 小圆点样式
            normal: {
              color: 'rgb(65,203,166)',
              borderColor: 'rgba(65,203,166,0.3)',
              borderWidth: 12
            }
          },
          data: [220, 182, 191, 134, 150, 120, 110, 125, 145, 122, 165, 122]
        }, {
          name: '中评',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(222,104,218,.5)'
              }, {
                offset: 0.5,
                color: 'rgba(255,255,255,.2)'
              }], false),
              shadowColor: 'rgba(222,104,218,.2)',
              shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(222,104,218)',
              borderColor: 'rgba(222,104,218,.3)',
              borderWidth: 12

            }
          },
          data: [120, 110, 125, 145, 122, 165, 122, 220, 182, 191, 134, 150]
        }, {
          name: '差评',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(215,109,102,.5)'
              }, {
                offset: 0.5,
                color: 'rgba(255,255,255,.2)'
              }], false),
              shadowColor: 'rgba(215,109,102,.2)',
              shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(215,109,102)',
              borderColor: 'rgba(215,109,102,.3)',
              borderWidth: 12
            }
          },
          data: [220, 182, 105, 185, 152, 191, 134, 150, 120, 110, 195, 152]
        }]
      }
      indexLine.setOption(option)
    }
  },
  watch: {
    indexDate (v) {
      // 使用momentjs 格式化时间
      // console.log(this.$moment(v).format('YYYY-MM-DD'))
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/style/color.less";
.home {
  width: 100%;
  height: auto;
  padding: 30px 30px 0 30px;
  background-color: #f3f3f3;
  overflow: auto;
  .left-box {
    .title {
      padding: 20px 20px 0 30px;
      .title-name {
        height: 40px;
        .zxicon {
          margin-right: 5px;
        }
      }
      .choose-item {
        max-width: 120px;
        height: 40px;
        .el-select {
          border: 1px solid @borderColor1;
        }
      }
    }
    .top {
      .top-item {
        position: relative;
        // min-width: 430px;
        height: 150px;
        margin-left: 20px;
        &:first-child {
          margin-left: 0;
        }
        &:nth-of-type(1) {
          .icon-content {
            background-color: #4c84ff;
          }
        }
        &:nth-of-type(2) {
          .icon-content {
            background-color: #ffaf29;
          }
        }
        &:nth-of-type(3) {
          .icon-content {
            background-color: #ff687b;
          }
        }
        .more-icon {
          position: absolute;
          top: 27px;
          right: 27px;
        }
        .type-icon {
          .icon-box {
            width: 106px;
            height: 106px;
            margin-left: 40px;
            background-color: @indexGrey;
            .icon-content {
              width: 66px;
              height: 66px;
            }
          }
        }
        .type-content {
          margin-left: 30px;
          .num {
            height: 30px;
            line-height: 30px;
          }
          .txt {
            min-height: 18px;
            line-height: 18px;
            margin-top: 5px;
          }
          .check {
            height: 15px;
            line-height: 15px;
            margin-top: 5px;
            color: @indexGreen;
            .zxicon {
              margin-left: 5px;
              transform: rotateZ(180deg);
            }
          }
        }
      }
    }
    .middle {
      width: 100%;
      height: 370px;
      padding: 20px 20px 20px 30px;
      .line-box {
        height: 100%;
        .title {
          padding: 0 10px 0 0;
          .zxicon {
            margin-right: 10px;
            color: #ffaf29;
          }
        }
        .line {
          width: 100%;
          height: 100%;
        }
      }
      .order-total {
        // width: 335px;
        width: 18rem;
        height: 100%;
        margin-left: 40px;
        .total-title {
          width: 100%;
          height: 130px;
          background: url("../../assets/images/total.png") no-repeat;
          background-size: cover;
          .total-up {
            transform: rotateZ(90deg);
          }
        }
        .total-item {
          position: relative;
          height: 44px;
          padding-left: 16px;
          margin-top: 20px;
          &:first-child {
            margin-top: 0;
          }
          &::before {
            position: absolute;
            content: "";
            width: 6px;
            height: 28px;
            left: 0;
            top: 7px;
          }
          &:nth-of-type(1):before {
            background-color: #41cba6;
          }
          &:nth-of-type(2):before {
            background-color: #de68da;
          }
          &:nth-of-type(3):before {
            background-color: #d76d66;
          }
        }
      }
    }
    .bottom {
      height: 370px;
      margin-bottom: 30px;
      .bottom-left {
        // width: 430px;
        width: 26rem;
        height: inherit;
        .title {
          .zxicon {
            color: @indexGreen;
          }
        }
        .pie {
          width: 270px;
          height: 270px;
          margin: 0 auto;
        }
        .pie-name-box {
          padding: 0 20px;
          .pie-name {
            position: relative;
            height: 14px;
            line-height: 14px;
            padding-left: 20px;
            &::before {
              content: "";
              position: absolute;
              width: 8px;
              height: 8px;
              left: 5px;
              top: 50%;
              margin-top: -4px;
              border-radius: 50%;
            }
            &:nth-of-type(1)::before {
              background-color: #41ecdd;
            }
            &:nth-of-type(2)::before {
              background-color: #fd774b;
            }
            &:nth-of-type(3)::before {
              background-color: #4ca2fe;
            }
          }
        }
      }
      .bottom-right {
        height: inherit;
        margin-left: 20px;
        .title {
          .zxicon {
            color: #4c84ff;
          }
        }
        .bar {
          width: 100%;
          height: 280px;
        }
      }
    }
  }
  .right-box {
    // min-width: 430px;
    width: 26rem;
    margin-left: 20px;
    .date-picker {
      height: 450px !important;
    }
    .notice {
      .notice-title {
        height: 60px;
        padding: 0 20px 0 30px;
        .tongzhi {
          margin-right: 5px;
          color: #ff687b;
        }
        .gengduo {
          margin-left: 5px;
          color: #d1d1d1;
        }
      }
      .notice-item {
        height: 70px;
        padding-left: 15px;
        padding-right: 20px;
        &:nth-of-type(odd) {
          background-color: #f9f9f9;
        }
        .notice-avatar {
          width: 43px;
          height: 43px;
        }
        .notice-content {
          margin-left: 15px;
          .nickname {
            position: relative;
            color: #000a12;
            .is-read {
              position: absolute;
              left: 80px;
              top: -5px;
              width: 5px;
              height: 5px;
              background-color: #ff687b;
            }
            .mark-read {
              background-color: #12ca7e;
            }
          }
          .text {
            color: #436688;
          }
        }
      }
    }
  }
  .radius5 {
    border-radius: 5px;
  }
}
</style>
