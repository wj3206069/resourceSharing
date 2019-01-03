<template>
  <div class="StatusInfo BasicInfo zx-flex justify">
    <el-form :model="BasicInfoForm"
             :rules="BasicInfoRules"
             :label-position="'right'"
             label-width="120px"
             class="demo-ruleForm">

      <el-form-item label="资质说明"
                    prop="statusDesc">
        <el-input type="textarea"
                  v-model="BasicInfoForm.statusDesc"
                  placeholder="500字符以内"></el-input>
      </el-form-item>

      <el-form-item label="资质附件上传">
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

      <el-form-item label="资质有效期">
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
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'StatusInfo',
  data () {
    return {
      BasicInfoForm: {
        statusDesc: '' // 资质说明
      },
      BasicInfoRules: {
        statusDesc: [
          { required: true, message: '500字符以内', trigger: 'blur' }
        ]
      },
      imageUrl: '', // 上传图片
      beginDate: '',  // 资质有效期
      endDate: ''
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