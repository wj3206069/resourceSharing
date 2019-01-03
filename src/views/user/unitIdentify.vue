<template>
  <div class="zy-main">
    <div class="wrap"
         style="height: 95%;    margin-top: 20px;">
      <el-scrollbar style="height: 100%;">
        <div class="back">
          <img width="30"
               height="30"
               src="../../assets/images/getBack.png"
               alt="">
        </div>
        <!--以下是要滚动的内容-->
        <div class="wrap_form zx-flex column"
             style="align-items:center">
          <span class="span_expert">单位认证</span>
          <el-form style="margin-top:60px"
                   :model="registerForm"
                   :rules="rules"
                   ref="registerForm"
                   label-width="160px">
            <el-form-item label="单位名称："
                          prop="unitName"
                          verify
                          :minLength='3'
                          empty>
              <el-input v-model="registerForm.unitName"
                        placeholder="请输入单位名称">
              </el-input>
            </el-form-item>
            <el-form-item label="单位法人："
                          prop="unitJp">
              <el-input v-model="registerForm.unitJp"
                        placeholder="请输入单位法人：">
              </el-input>
            </el-form-item>
            <el-form-item label="单位类型："
                          prop="unitType">
              <el-select v-model="form1.unitType"
                         @change="select_type"
                         style="width:100%;"
                         placeholder="请选择"
                         :autofocus="false">
                <el-option v-for="item in companyList"
                           :key='item.fieldname'
                           :label="item.fieldname"
                           :value="item.fieldname"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="统一社会信用代码："
                          prop="societyCode">
              <el-input v-model="registerForm.societyCode"
                        type="password"
                        placeholder="请输入统一社会信用代码：">
              </el-input>
            </el-form-item>
            <el-form-item label="对公账户名称"
                          verify>
              <el-input v-model="registerForm.toPubName"
                        placeholder="请输入对公账户名称">
              </el-input>
            </el-form-item>
            <el-form-item label="对公账号："
                          verify
                          phone>
              <el-input v-model="registerForm.toPubNum"
                        placeholder="请输入对公账号">
              </el-input>
            </el-form-item>

            <el-form-item label="开户行："
                          prop="unit_id">
              <el-select v-model="form1.unit_id"
                         style="width:100%;"
                         placeholder="请选择"
                         :autofocus="false">
                <el-option v-for="item in companyList"
                           :key='item.fieldname'
                           :label="item.fieldname"
                           :value="item.fieldname"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="单位联系人："
                          verify
                          :minLength='3'
                          empty>
              <el-input v-model="registerForm.UnitTelName"
                        placeholder="请输入单位联系人：">
              </el-input>
            </el-form-item>
            <el-form-item label="单位联系电话："
                          verify
                          phone>
              <el-input v-model="registerForm.unitTelNum"
                        placeholder="请输入单位联系电话">
              </el-input>
            </el-form-item>

            <el-form-item label="详细地址：">
              <div class="zx-flex ">
                <el-select class="address-select"
                           v-model="formData.province"
                           placeholder="省级区域">
                  <el-option v-for="(item,index) in init_arr"
                             :label="item.name"
                             :value="index"
                             :key="index"></el-option>
                </el-select>
                <el-select class="address-select"
                           style="margin-left:20px"
                           v-model="formData.city"
                           placeholder="市级区域">
                  <el-option v-for="(item,index) in init_cityArr"
                             :label="item.name"
                             :value="index"
                             :key="index">
                  </el-option>
                </el-select>
                <el-select class="address-select"
                           style="margin-left:20px"
                           v-model="formData.county"
                           placeholder="区级区域">
                  <el-option v-for="(item,index) in init_region"
                             :label="item.name"
                             :value="index"
                             :key="index">
                  </el-option>
                </el-select>
              </div>
            </el-form-item>

            <el-form-item label=" ">
              <el-input v-model="formData.detailed"
                        placeholder="请输入详细地址"></el-input>
            </el-form-item>

            <el-form-item label="单位资质上传："
                          prop="zjzz">
              <el-upload style="width:178px"
                         :on-success="onSuccess"
                         :show-file-list="true"
                         :action="upload"
                         list-type="picture-card"
                         :on-preview="handlePictureCardPreview"
                         :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
            <div class="line">

            </div>
            <div class="flex justify"
                 style="    padding: 20px 0;">
              <span class="span_super">超级管理员信息</span>
            </div>
            <el-form-item label="姓名："
                          prop="userName"
                          verify
                          :minLength='3'
                          empty>
              <el-input v-model="registerForm.userName"
                        placeholder="请输入超级管理员姓名">
              </el-input>
            </el-form-item>
            <el-form-item label="身份证号："
                          prop="IDCard">
              <el-input v-model="registerForm.IDCard"
                        type="IDCard"
                        placeholder="请输入超级管理员身份证号">
              </el-input>
            </el-form-item>
            <el-form-item label="手机号："
                          verify
                          phone
                          prop="telNumber">
              <el-input v-model="registerForm.telNumber"
                        placeholder="请输入超级管理员手机号">
              </el-input>
            </el-form-item>
            <el-form-item>
              <button class="register-btn"
                      @click.stop.prevent="submitIdentify">提交认证</button>
            </el-form-item>
          </el-form>

        </div>
      </el-scrollbar>
    </div>

  </div>
</template>

<script>
import addressjson from '@/until/address.js'
import { getDataDictionary } from '@/api/index'
import { uploadFile } from '@/api/article'
import { serviceUnitScertification, getSerive } from '@/api/user'
export default {
  name: 'person',
  data () {
    return {
      typeValue: '',
      form1: {
        unit_id: '',
        unitType: ''
      },
      formData: {
        province: 0,    // 省
        city: 0,        // 市
        county: 0,      // 区/县
        detailed: ''    // 详细地址
      },
      qualificationinformation: [], // 单位资质
      companyList: [],
      upload: uploadFile,
      init_arr: addressjson,
      registerForm: {
        UnitTelName: '', // 单位联系人
        userName: '', // 超级管理员西姓名
        IDCard: '', // 超级管理员身份证号
        telNumber: '', // 超级管理员电话号码
        unitName: '', // 单位名称
        unitJp: '', // 单位法人
        unitType: '', // 单位类型
        societyCode: '', // 统一社会代码
        toPubName: '', // 对公账户名称
        unitTelNum: '', // 单位联系电话
        toPubNum: '' // 对公账户账号
      },
      // 获取数据字典
      getDictionary () {
        getDataDictionary('UnitType').then(res => {
          this.companyList = res.data.list
          console.log('this.companyList', this.companyList)
          this.companyList.forEach((ele, idx) => {
            if (ele.fieldname === this.form1.unitType) {
              console.log('ele.fieldcode', ele.fieldcode)
              this.typeValue = ele.fieldcode
            }
          })
        }).catch()
      },
      rules: {
        userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        telNumber: [{ required: true, message: '请输入您的手机号', trigger: 'blur' }],
        unitJp: [{ required: true, message: '请输入单位法人', trigger: 'blur' }],
        societyCode: [{ required: true, message: '请输入统一社会代码', trigger: 'blur' }],
        zjzz: [{ required: true, trigger: 'blur' }],
        IDCard: [{ required: true, message: '请输入身份证号码', trigger: 'blur' }],
        unitType: [{ required: true, message: '请输入单位类型', trigger: 'blur' }],
        UnitTelName: [{ required: true, message: '请输入单位联系人', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.getDictionary()
  },
  beforeMount () {
    this.updateCity()
    this.updateRegion()
  },
  watch: {
    'formData.province' () {
      this.updateCity()
      this.updateRegion()
    },
    'formData.city' () {
      this.updateRegion()
    }
  },
  methods: {
    // 选择单位类型
    select_type (val) {
      this.form1.unitType = val
      this.getDictionary()
    },
    // 初始化城市
    updateCity () {
      let index = this.formData.province
      this.init_cityArr = this.init_arr[index].sub
      this.formData.city = 0
      this.formData.county = 0
      this.init_region = this.init_cityArr[0].sub
    },
    // 初始化地区
    updateRegion () {
      this.formData.county = 0
      let index = this.formData.city
      this.init_region = this.init_cityArr[index].sub
    },
    // 单位资质上传
    onSuccess (response, file, fileList) {
      console.log(response, file, fileList)
      if (response.success) {
        this.$message.success('上传成功')
        this.qualificationinformation.push(
          {
            picture: response.fileid,
            qname: '单位资质'
          }
        )
        console.log('qualificationinformation', this.qualificationinformation)
      } else {
        this.$message.success('上传失败')
      }
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible_zzload = true
    },
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
    },
    // 获取服务类目列表
    getSeriveList () {
      getSerive().then(res => {
        console.log('res', res.data.datalist)
        this.otherSerive = res.data.datalist
      })
    },
    submitIdentify () {
      // let err
      // if (!this.registerForm.userName || !this.registerForm.telNumber || !this.registerForm.IDCard || !this.registerForm.unitName || !this.registerForm.unit_id || !this.registerForm.societyCode || this.registerForm.uploadingqualification) {
      //   err = '请输入必填项'
      //   if (err) {
      //     this.$message({
      //       message: err,
      //       type: 'warning'
      //     })
      //   } return
      // }
      serviceUnitScertification({
        unitname: this.registerForm.unitName, // 单位名称
        unittype: 1, // 单位类型
        unitrole: '', // 单位角色
        schoolcode: this.registerForm.societyCode, // 统一社会信用代码
        publicaccounts: this.registerForm.toPubNum, // 对公账号
        bankname: '', //   开户行
        publicaccountsname: this.registerForm.toPubName, //  对公账户名称
        unitcontacts: this.registerForm.UnitTelName, //   单位联系人
        unitcontactnumber: this.registerForm.unitTelNum, //  单位联系电话
        province: this.formData.province, // 省
        city: this.formData.city,         // 市
        county: this.formData.county,     // 区县
        detailed: this.formData.detailed, // 详细地址
        isvouchersl: '', //  是否可接收创新券
        isusevouchers: '', //  是否能使用创新券
        servicecategory: '', // 服务类目
        iskeyserviceorg: '', // 是否重点服务机构
        source: '', // 来源
        recorddate: '', // 注册日期
        legalpersonname: this.registerForm.unitJp, // 法人姓名
        uploadingqualification: this.qualificationinformation, // 上传资质111111111111111111111111111111111111
        status: '', // 单位状态
        username: this.registerForm.userName, // 超级管理员用户名
        phone: this.registerForm.telNumber, // 超级管理员电话
        idcard: this.registerForm.IDCard// 超级管理员身份证号
      }).then(res => {
        console.log(res, this.formData)
        if (res.data.success) {
          this.$message({
            message: '认证成功',
            type: 'success'
          })
        } else {
          this.$message.error(res.data.message)
          console.log('认证错误', res.data.message)
        }
        // 登入成功后 记住正确的用户名
      })
    },
    // 提交注册数据
    registerBtn () {
      // this.$router.push({ name: 'identificationAll' })
      // let err
      // if (!this.registerForm.userName || !this.registerForm.passWord || !this.registerForm.confirmPassWord || !this.registerForm.telNumber || !this.registerForm.picCode || !this.registerForm.telcode) {
      //   err = '请输入必填项'
      // }
      // if (err) {
      //   this.$message({
      //     message: err,
      //     type: 'warning'
      //   })
      // }
    }
  }
}
</script>

<style lang="" scoped>
.address-select {
  width: 120px;
}
.yzm {
  position: absolute;
  top: 8%;
  right: 5px;
}
.span_super {
  font-size: 18px;
  font-family: MicrosoftYaHei-Bold;
  font-weight: bold;
  color: rgba(71, 71, 71, 1);
  line-height: 41px;
}
.line {
  width: 100%;
  height: 1px;
  background: rgba(204, 204, 204, 1);
  position: absolute;
  left: 0;
}
.btn_tecArea {
  position: absolute;
  right: 2px;
  background: rgba(56, 126, 232, 1);
  border-radius: 5px;
  top: 2px;
  height: 36px;
}
.back {
  width: 50px;
  height: 50px;
  background-color: #387ee8;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  position: absolute;
  top: 6%;
  left: 4%;
}
.wrap_form {
  display: flex;
  justify-content: center;
  position: relative;
  overflow-x: hidden;
}
.zy-main {
  width: 100%;
  height: 100%;
  background: url("../../assets/images/register-bg.png") no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
}
.wrap {
  width: 1170px;
  height: 1522px;
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
}
.span_expert {
  width: 96px;
  height: 24px;
  font-size: 24px;
  font-family: MicrosoftYaHei-Bold;
  font-weight: bold;
  color: rgba(71, 71, 71, 1);
  line-height: 77px;
  margin-left: 108px;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.register-btn {
  width: 400px;
  height: 40px;
  color: white;
  border-radius: 3px;
  border: none;
  background-color: #387ee8;
}
</style>