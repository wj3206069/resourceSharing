<template>
  <div class="unitDetail unitEdit common-dialog">
    <el-dialog el-dialog
               :title="'编辑-单位用户信息'"
               :visible.sync="dialogVisible">
      <div class="mg-t-30"
           style="padding-bottom: 30px;">
        <el-form :model="detailData"
                 ref="detailData"
                 class="mg-t-30">
          <el-form-item label="单位名称：">
            <el-input v-model="detailData.unitname"
                      readonly
                      placeholder="请输入单位名称"></el-input>
          </el-form-item>
          <el-form-item label="单位类型：">
            <template slot-scope="scope">
              <el-select v-model="detailData.unittype"
                         disabled
                         placeholder="请选择">
                <el-option v-for="(item, index) in unitTypeOptions"
                           :key="index"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-form-item>
          <el-form-item label="统一社会信用代码：">
            <el-input v-model="detailData.schoolcode"
                      readonly></el-input>
          </el-form-item>
          <el-form-item label="单位角色：">
            <template slot-scope="scope">
              <el-select v-model="detailData.unitrole"
                         disabled
                         placeholder="请选择">
                <el-option v-for="(item, index) in unitroleOptions"
                           :key="index"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-form-item>
          <el-form-item label="对公账户名称：">
            <el-input v-model="detailData.publicaccountsname"
                      placeholder="请输入对公账户名称"></el-input>
          </el-form-item>
          <el-form-item label="对公账户：">
            <el-input v-model="detailData.publicaccounts"
                      placeholder="请输入对公账户"></el-input>
          </el-form-item>
          <el-form-item label="开户行：">
            <el-input v-model="detailData.bankname"
                      placeholder="请输入开户行"></el-input>
          </el-form-item>
          <el-form-item label="单位联系人：">
            <el-input v-model="detailData.unitcontacts"
                      placeholder="请输入单位联系人"></el-input>
          </el-form-item>
          <el-form-item label="单位联系电话：">
            <el-input v-model="detailData.unitcontactnumber"
                      placeholder="请输入单位联系电话"></el-input>
          </el-form-item>
          <el-form-item label="单位地址：">
            <template slot-scope="scope">
              <div class="unitAddress zx-flex align between">
                <el-select v-model="detailData.province"
                           placeholder="省份">
                  <el-option v-for="(item,index) in init_arr"
                             :label="item.name"
                             :value="index + ''"
                             :key="index"></el-option>
                </el-select>
                <el-select v-model="detailData.city"
                           placeholder="城市"
                           style="margin: 0 7.5px;">
                  <el-option v-for="(item,index) in init_cityArr"
                             :label="item.name"
                             :value="index + ''"
                             :key="index">
                  </el-option>
                </el-select>
                <el-select v-model="detailData.county"
                           placeholder="区县">
                  <el-option v-for="(item,index) in init_region"
                             :label="item.name"
                             :value="index + ''"
                             :key="index">
                  </el-option>
                </el-select>
              </div>
              <el-input class="mg-t-10"
                        v-model="detailData.detailed"
                        placeholder="请输入详细地址信息"></el-input>
            </template>
          </el-form-item>
          <el-form-item label="是否可接收创新券：">
            <template slot-scope="scope">
              <el-input disabled
                        :value="detailData.isvouchers === '1' ? '是' : '否'"
                        placeholder="否"></el-input>
              <div class="verify fs-14 c-white zx-flex align justify cursor">验证</div>
            </template>
          </el-form-item>
          <el-form-item label="服务类目：">
            <el-input v-model="servicecategory"
                      placeholder="请输入服务类目"></el-input>
          </el-form-item>
          <el-form-item label="设备数量：">
            <el-input v-model="detailData.sbsl"
                      readonly
                      placeholder="请输入设备数量"></el-input>
          </el-form-item>
          <el-form-item label="设备相关服务数量：">
            <el-input v-model="detailData.jcfwl"
                      readonly
                      placeholder="请输入设备相关服务数量"></el-input>
          </el-form-item>
          <el-form-item label="商业服务数量：">
            <el-input v-model="detailData.fjcfwl"
                      readonly
                      placeholder="请输入商业服务数量"></el-input>
          </el-form-item>
          <el-form-item label="创新券接收账户余额：">
            <el-input v-model="detailData.accountbalance"
                      readonly
                      placeholder="请输入创新券接收账户余额"></el-input>
          </el-form-item>
          <el-form-item label="创新券消耗账户余额：">
            <el-input v-model="detailData.accountbalance2"
                      readonly
                      placeholder="请输入创新券消耗账户余额"></el-input>
          </el-form-item>
          <el-form-item label="营业执照：">
            <el-upload class="avatar-uploader"
                       :drag="true"
                       :action="uploadPath"
                       :show-file-list="false"
                       :on-progress="onProgress"
                       :on-success="onSuccess1"
                       :on-error="onError"
                       :before-upload="beforeAvatarUpload">
              <img :src="licenseUrl"
                   alt="暂无"
                   width="260"
                   height="180"
                   class="avatar">
              <!-- <i v-else
                 class="el-icon-plus avatar-uploader-icon"></i> -->
            </el-upload>
          </el-form-item>
          <el-form-item label="企业开户许可证：">
            <el-upload class="avatar-uploader"
                       :drag="true"
                       :action="uploadPath"
                       :show-file-list="false"
                       :on-progress="onProgress"
                       :on-success="onSuccess2"
                       :on-error="onError"
                       :before-upload="beforeAvatarUpload">
              <img :src="enterpriseUrl"
                   alt="暂无"
                   width="260"
                   height="180"
                   class="avatar">
              <!-- <i v-else
                 class="el-icon-plus avatar-uploader-icon"></i> -->
            </el-upload>
          </el-form-item>
          <el-form-item label="">
            <el-checkbox v-model="isDisabled"
                         class="fs-14">禁用该单位</el-checkbox>
          </el-form-item>

        </el-form>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button v-for="(item, index) in dialogFooter"
                   :key="index"
                   :style="item.color"
                   v-show="item.isShow"
                   @click.stop.prevent="onDialogFooter(index)">{{item.name}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 地址信息
import addressjson from '@/assets/utils/address.js'
// api
import { uploadPath, preview } from '@/api'
import { unitUserEdit } from '@/api/clientManage'
import zxDialog from '@/components/dialog'
export default {
  name: 'unitEdit',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    detailData: {
      type: Object,
      default: {}
    },
    unitTypeOptions: {
      type: Array,
      default: []
    }, // 单位类型 数据字典
    unitroleOptions: {
      type: Array,
      default: []
    } // 单位角色 数据字典
  },
  components: {
    zxDialog
  },
  data () {
    return {
      dialogVisible: false,
      licenseUrl: '', // 营业执照
      enterpriseUrl: '', // 企业开户许可证
      isDisabled: '',
      servicecategory: '',
      license: {
        qname: '营业执照：',
        picture: ''
      },
      enterprise: {
        qname: '企业开户许可证：',
        picture: ''
      },
      dialogFooter: [{
        name: '上一步',
        color: 'background: #61A3FE;',
        isShow: false
      }, {
        name: '保存',
        color: 'background: #61A3FE;',
        isShow: true
      }, {
        name: '取消',
        color: 'background: #ccc;',
        isShow: true
      }],
      init_arr: [],
      init_cityArr: [],
      init_region: [],
      cityFormData: {
        province: 0,      // 省
        city: 0,          // 市
        county: 0,        // 区/县
        detailed: ''      // 详细地址
      },
      uploadPath: uploadPath // 上传地址

    }
  },
  watch: {
    'detailData.province' (newVal, oldVal) {
      if (newVal !== oldVal && oldVal) {
        this.detailData.city = '0'
        this.detailData.county = '0'
        this.detailData.detailed = ''
        this.initCity()
        this.initCounty()
      }
    },
    'detailData.city' (newVal, oldVal) {
      if (newVal !== oldVal && oldVal) {
        this.detailData.county = '0'
        this.detailData.detailed = ''
        this.initCounty()
      }
    },
    showDialog () {
      this.dialogVisible = this.showDialog
    },
    dialogVisible () {
      this.$emit('returnBool', this.dialogVisible)
    },
    detailData () {
      this.licenseUrl = preview + '/' + this.detailData.resultList2[0]['picture']
      this.enterpriseUrl = preview + '/' + this.detailData.resultList2[1]['picture']
      this.servicecategory = this.detailData.resultList1[0].category + ',' + this.detailData.resultList1[1].category
      this.isDisabled = this.detailData.status !== '1'
      this.init_arr = addressjson
      this.license.picture = this.detailData.resultList2[0]['picture']
      this.enterprise.picture = this.detailData.resultList2[1]['picture']
      this.initCity()
      this.initCounty()
    }
  },
  created () {
    console.log(this.detailData)
  },
  methods: {
    // 初始化 市
    initCity () {
      let index = this.detailData.province
      this.init_cityArr = this.init_arr[index].sub
      // this.detailData.city = 0
      // this.detailData.county = 0
      this.init_region = this.init_cityArr[0].sub
    },
    // 初始化 县/区
    initCounty () {
      // this.detailData.county = 0
      let index = this.detailData.city
      this.init_region = this.init_cityArr[index].sub
    },
    onProgress (event, file, fileList) {
      this.loading = this.$loading()
      // console.log(event, file, fileList)
    },
    onSuccess1 (response, file, fileList) {
      console.log(response, file, fileList)
      this.loading.close()
      if (response.success) {
        this.$message.success('上传成功')
        this.licenseUrl = file.url
        this.license.picture = response.fileid
      } else {
        this.$message.success('上传失败')
      }
    },
    onSuccess2 (response, file, fileList) {
      // console.log(response, file, fileList)
      console.log(file)
      this.loading.close()
      if (response.success) {
        this.url2.picture = response.fileid
        this.enterpriseUrl = file.url
        this.enterprise.picture = response.fileid
        this.$message.success('上传成功')
      } else {
        this.$message.success('上传失败')
      }
    },
    onError (err, file, fileList) {
      this.loading.close()
      this.$message.error('上传失败')
      console.log(err, file, fileList)
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
    },
    onDialogFooter (index) {
      switch (index) {
        case 1:
          console.log(this.license)
          console.log(this.enterprise)
          let qualificationinformation = JSON.stringify([this.license, this.enterprise]) // 图片
          let categoryids = '' // 服务类目
          let query = Object.assign({}, this.detailData, qualificationinformation, categoryids)
          console.log(query)

          query.resultList1 = JSON.stringify(query.resultList1)
          query.resultList2 = JSON.stringify(query.resultList2)
          console.log(query)
          unitUserEdit(query).then(res => {
            if (res.data.success) {
              this.$message.success('保存成功')
              this.dialogVisible = false
            } else {
              this.$message.error('保存失败')
            }
          })
          break
        default:
          this.dialogVisible = false
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../../assets/style/color.less";
.unitDetail {
  .verify {
    position: absolute;
    top: 5px;
    right: 3px;
    width: 50px;
    height: 30px;
    border-radius: 10px;
    background-color: @primary;
  }
  .el-button {
    border: none;
    border-radius: 10px;
    color: #fff;
  }
}
</style>