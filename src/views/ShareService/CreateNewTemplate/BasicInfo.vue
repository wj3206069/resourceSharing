<template>
  <div class="BasicInfo zx-flex justify">
    <el-form :model="BasicInfoForm"
             :rules="BasicInfoRules"
             :label-position="'right'"
             label-width="120px"
             class="demo-ruleForm">
      <el-form-item label="服务名称"
                    prop="name">
        <el-input v-model="BasicInfoForm.name"
                  placeholder="100字符以内"></el-input>
      </el-form-item>
      <el-form-item label="服务简要说明"
                    prop="serviceDesc">
        <el-input type="textarea"
                  v-model="BasicInfoForm.serviceDesc"
                  placeholder="500字符以内"></el-input>
      </el-form-item>
      <el-form-item label="服务图片上传">
        <div class="upload-img fs-16">
          <p class="warning-text grey-3">只能上传.jpg.png图片 大小不超过500kb且不超过九张</p>
          <ul class="upload zx-flex align wrap">
            <li class="upload-btn zx-flex align justify cursor">
              <el-upload class="avatar-uploader zx-flex align justify"
                         action="#"
                         :show-file-list="false"
                         :on-success="handleAvatarSuccess"
                         :before-upload="beforeAvatarUpload">
                <i class="el-icon-plus avatar-uploader-icon fs-30"></i>
                <!-- <i class="zxicon zx-xinzeng fs-30"></i> -->
              </el-upload>
            </li>
            <li v-if="imageUrl"
                class="upload-btn zx-flex align justify">
              <img src=""
                   alt="">
            </li>
          </ul>
        </div>
      </el-form-item>
      <el-form-item label="服务适用范围"
                    prop="serviceArea">
        <el-input type="textarea"
                  v-model="BasicInfoForm.serviceArea"
                  placeholder="500字符以内"></el-input>
      </el-form-item>
      <el-form-item label="买家签委托单">
        <div class="custom fs-16">
          <div class="custom-title zx-flex align line-bottom grey-2">
            <div class="choose-one must">是否需要</div>
            <div class="flex-1"
                 style="margin-left: 10px;">选择委托单</div>
          </div>
          <div class="custom-handle zx-flex align">
            <div class="choose-one choose zx-flex align grey">
              <div class="flex-1 text-c cursor"
                   :class="{'active': customActive}"
                   @click.stop.prevent="customActive = true">是</div>
              <div class="flex-1 text-c cursor"
                   :class="{'active': !customActive}"
                   @click.stop.prevent="customActive = false">否</div>
            </div>
            <div style="margin-left: 10px;">
              <el-select v-model="customVal"
                         :disabled='!customActive'
                         placeholder="请先选择是否需要">
                <el-option v-for="item in customOptions"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </div>
            <el-button class="preview zx-flex align justify c-primary cursor"
                       :disabled="!customActive">预览</el-button>
          </div>
        </div>
      </el-form-item>

      <el-form-item label="发票">
        <div class="custom fs-16">
          <div class="custom-title zx-flex align line-bottom grey-2">
            <div class="choose-one must">是否提供</div>
            <div class="choose-one"
                 style="margin-left: 10px;">类型</div>
            <div class="flex-1"
                 style="margin-left: 20px;">发票科目</div>
          </div>
          <div class="custom-handle zx-flex align">
            <div class="choose-one choose zx-flex align grey">
              <div class="flex-1 text-c cursor"
                   :class="{'active': invoiceActive}"
                   @click.stop.prevent="invoiceActive = true">是</div>
              <div class="flex-1 text-c cursor"
                   :class="{'active': !invoiceActive}"
                   @click.stop.prevent="invoiceActive = false">否</div>
            </div>
            <div class="choose-one choose zx-flex align grey"
                 style="margin-left: 10px;">
              <div class="flex-1 text-c cursor"
                   :class="{'active': invoiceTypeActive}"
                   @click.stop.prevent="invoiceTypeActive = true">电子</div>
              <div class="flex-1 text-c cursor"
                   :class="{'active': !invoiceTypeActive}"
                   @click.stop.prevent="invoiceTypeActive = false">纸质</div>
            </div>
            <div class="invoice"
                 style="margin-left: 20px;">
              <el-select v-model="invoiceVal"
                         :disabled='!invoiceActive'
                         placeholder="发票科目">
                <el-option v-for="item in invoiceOptions"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
      </el-form-item>

      <el-form-item label="报告">
        <div class="custom fs-16">
          <div class="custom-title zx-flex align line-bottom grey-2">
            <div class="choose-one must">是否提供</div>
            <div class="choose-one"
                 style="margin-left: 10px;">类型</div>
          </div>
          <div class="custom-handle zx-flex align">
            <div class="choose-one choose zx-flex align grey">
              <div class="flex-1 text-c cursor"
                   :class="{'active': reportActive}"
                   @click.stop.prevent="reportActive = true">是</div>
              <div class="flex-1 text-c cursor"
                   :class="{'active': !reportActive}"
                   @click.stop.prevent="reportActive = false">否</div>
            </div>
            <div class="choose-one choose zx-flex align grey"
                 style="margin-left: 10px;">
              <div class="flex-1 text-c cursor"
                   :class="{'active': reportTypeActive}"
                   @click.stop.prevent="reportTypeActive = true">电子</div>
              <div class="flex-1 text-c cursor"
                   :class="{'active': !reportTypeActive}"
                   @click.stop.prevent="reportTypeActive = false">纸质</div>
            </div>
          </div>
        </div>
      </el-form-item>

      <el-form-item label="服务开放类型">
        <div class="service-type fs-16 zx-flex align grey-3">
          <div class="cursor zx-flex align justify"
               :class="{'active' : openType}"
               @click.stop.prevent="openType = true">内部共享</div>
          <div class="cursor zx-flex align justify"
               :class="{'active' : !openType}"
               @click.stop.prevent="openType = false"
               style="margin-left: 10px;">外部共享</div>
        </div>
      </el-form-item>
      <el-form-item label="服务类型">
        <div class="service-type fs-16 zx-flex align grey-3">
          <div class="cursor zx-flex align justify"
               :class="{'active' : serviceType}"
               @click.stop.prevent="serviceType = true">检测服务</div>
          <div class="cursor zx-flex align justify"
               :class="{'active' : !serviceType}"
               @click.stop.prevent="serviceType = false"
               style="margin-left: 10px;">非检测服务</div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'BasicInfo',
  data () {
    return {
      BasicInfoForm: {
        name: '',
        serviceDesc: '', // 服务简要说明
        serviceArea: '' // 服务适用范围
      },
      BasicInfoRules: {
        name: [
          { required: true, message: '100字符以内', trigger: 'blur' }
          // { min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' }
        ],
        serviceDesc: [
          { required: true, message: '500字符以内', trigger: 'blur' }
        ],
        serviceArea: [
          { required: true, message: '500字符以内', trigger: 'blur' }
        ]
      },
      customActive: true, // 是否需要 买家签委托单
      invoiceActive: true, // 是否需要 发票
      invoiceTypeActive: true, // 是否需要 发票类型
      reportActive: true, // 是否需要 报告
      reportTypeActive: true, // 是否需要 报告类型
      imageUrl: '', // 上传图片
      customOptions: [{
        value: '选项1',
        label: '样品检测委托单'
      }, {
        value: '选项2',
        label: '食物检测委托单'
      }],
      customVal: '',  // 委托单
      invoiceOptions: [{
        value: '选项1',
        label: '对公'
      }, {
        value: '选项2',
        label: '私人'
      }],
      invoiceVal: '', // 发票科目
      openType: true, // 开放类型
      serviceType: true // 服务类型
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
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