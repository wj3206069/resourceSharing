<template>
  <div class="ServiceTime BasicInfo zx-flex justify">
    <el-form :label-position="'right'"
             label-width="120px"
             class="demo-ruleForm">

      <el-form-item label="服务时间范围">
        <div class="custom fs-16">
          <div class="custom-title zx-flex align line-bottom grey-2">
            <div class="flex-1 must">开始时间</div>
            <div class="flex-1 must"
                 style="margin-left: 10px;">截止时间</div>
          </div>
          <div class="custom-handle zx-flex align">
            <div class="flex-1 zx-flex align grey">
              <el-date-picker v-model="beginDate"
                              type="date"
                              placeholder="选择日期">
              </el-date-picker>
            </div>
            <div class="flex-1 zx-flex align grey"
                 style="margin-left: 10px;">
              <el-date-picker v-model="endDate"
                              type="date"
                              :disabled="!beginDate"
                              placeholder="选择日期">
              </el-date-picker>
            </div>
          </div>
        </div>
      </el-form-item>

      <el-form-item label="时段">
        <div class="custom fs-16">
          <div class="custom-title zx-flex align line-bottom grey-2">
            <div class="choose-one must">选择</div>
            <div class="flex-1 must"
                 style="margin-left: 10px;">自定义</div>
          </div>
          <div class="custom-time custom-handle zx-flex align">
            <div class="choose-one choose zx-flex align grey">
              <div class="flex-1 text-c cursor"
                   :class="{'active': customTime}"
                   @click.stop.prevent="customTime = true">全天</div>
              <div class="flex-1 text-c cursor"
                   :class="{'active': !customTime}"
                   @click.stop.prevent="customTime = false">自定义</div>
            </div>
            <div class="flex-1 zx-flex align grey"
                 style="margin-left: 10px;">
              <div class="flex-1 text-c cursor">
                <el-time-select v-model="beginTime"
                                :disabled="customTime"
                                :picker-options="{
                                    start: '09:00',
                                    step: '01:00',
                                    end: '18:00'
                                  }"
                                placeholder="选择时间">
                </el-time-select>

              </div>
              <div class="flex-1 text-c cursor">
                <el-time-select v-model="endTime"
                                :disabled="!beginTime"
                                :picker-options="{
                                    start: '09:00',
                                    step: '01:00',
                                    end: '18:00'
                                  }"
                                placeholder="选择时间">
                </el-time-select>

              </div>

            </div>
          </div>
        </div>
      </el-form-item>

      <el-form-item label="服务周期">
        <div class="custom fs-16">
          <div class="custom-title zx-flex align line-bottom grey-2">
            <div class="flex-1 must">预计服务周期</div>
            <div class="flex-1 must"
                 style="margin-left: 10px;">自定义</div>
          </div>
          <div class="custom-handle zx-flex align">
            <div class="flex-1 zx-flex align grey">
              <el-select v-model="rangeTime"
                         placeholder="请选择">
                <el-option v-for="item in rangeTimeOptions"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="flex-1 zx-flex align grey"
                 style="margin-left: 10px;">
              <el-input v-model="customRangeTime"
                        placeholder="请输入时间范围(例如: 2-5天)"></el-input>
            </div>
          </div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'ServiceTime',
  data () {
    return {
      beginDate: '',  // 服务开始日期
      endDate: '',
      customTime: true,
      beginTime: '', // 服务 时间段
      endTime: '',
      rangeTime: '', // 预计时间
      customRangeTime: '', // 自定义时间范围
      rangeTimeOptions: [{
        value: '选项1',
        label: '1-2天'
      }, {
        value: '选项2',
        label: '2-3天'
      }]
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
// @import '../../../assets/style/color.less';
// .BasicInfo {
//   width: 100%;
//   .upload-img {
//     .warning-text {
//       height: 44px;
//       line-height: 44px;
//     }
//     .upload {
//       width: 570px;
//       min-height: 230px;
//       border: 1px solid @borderColor1;
//       padding-bottom: 24px;
//       .upload-btn {
//         width: 155px;
//         height: 155px;
//         border: 1px dashed @borderColor1;
//         border-radius: 10px;
//         margin-left: 24px;
//         margin-top: 24px;
//         .avatar-uploader {
//           height: inherit;
//           width: inherit;
//         }
//       }
//     }
//   }
//   .custom {
//     .custom-title {
//       height: 44px;
//       width: 570px;
//     }
//     .choose-one {
//       width: 160px;
//     }
//     .custom-handle {
//       padding: 15px 0;
//       .choose {
//         height: 40px;
//         border: 1px solid @primary;
//         > div {
//           height: 100%;
//           line-height: 40px;
//         }
//         .active {
//           background-color: @primary;
//           color: @white;
//         }
//       }
//     }
//   }
//   .service-type {
//     height: 40px;
//     > div {
//       width: 110px;
//       height: 38px;
//       border: 1px solid @borderColor1;
//     }
//     .active {
//       border-color: @primary;
//       background-color: rgba(97, 163, 254, 0.1);
//       color: @grey;
//     }
//   }
// }
</style>