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
          <span class="span_expert">服务机构认证</span>

          <el-form style="margin-top:60px"
                   :model="registerForm"
                   :rules="rules"
                   ref="registerForm"
                   label-width="160px">
            <el-form-item label="单位名称："
                          prop="unitName">
              <el-input v-model="registerForm.unitName"
                        placeholder="请输入单位名称">
              </el-input>
            </el-form-item>

            <el-form-item label="单位法人："
                          prop="unitJp"
                          verify>
              <el-input v-model="registerForm.unitJp"
                        placeholder="请输入单位法人">
              </el-input>
            </el-form-item>
            <el-form-item label="单位类型："
                          prop="unit_id">
              <el-select v-model="registerForm.unit_id"
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
                        type="societyCode"
                        placeholder="请输入统一社会信用代码：">
              </el-input>
            </el-form-item>

            <el-form-item label="对公账户名称："
                          verify>
              <el-input v-model="registerForm.toPubName"
                        placeholder="请输入对公账户名称">
              </el-input>
            </el-form-item>

            <el-form-item label="对公账号："
                          verify>
              <el-input v-model="registerForm.toPubNum"
                        placeholder="请输入对公银行账号">
              </el-input>
            </el-form-item>

            <el-form-item label="开户行：">
              <el-select v-model="registerForm.BankName"
                         style="width:100%;"
                         placeholder="请选择"
                         :autofocus="false">
                <el-option v-for="item in BankList"
                           :key='item.unit_id'
                           :label="item.unit_id"
                           :value="item.unit_id"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="单位联系人："
                          verify
                          empty>
              <el-input v-model="registerForm.unitTelPeo"
                        placeholder="请输入单位联系人">
              </el-input>
            </el-form-item>

            <el-form-item label="单位联系电话："
                          verify
                          phone>
              <el-input v-model="registerForm.unitTel"
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

            <el-form-item label="是否可使用创新券：">
              <el-select v-model="registerForm.userCreat"
                         @change(val)="registerForm.userCreat = val"
                         style="width:100%;"
                         placeholder="请选择"
                         :autofocus="false">
                <el-option v-for="item in isUseCreat"
                           :key='item.isUse'
                           :label="item.isUse"
                           :value="item.isUse"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="创新券服务类目：">
              <div class="zx-flex"
                   style="width:100%">
                <div class="zx-flex column"
                     style="width:100%">
                  <el-input v-model="registerForm.cxqSerive"
                            disabled
                            placeholder="请输入创新券服务类目">
                  </el-input>
                  <el-input v-model="registerForm.cxqSerive"
                            disabled
                            style="margin-top:20px"
                            placeholder="请输入创新券服务类目">
                  </el-input>
                </div>

              </div>
            </el-form-item>
            <div v-for="(item, index) in otherServiceName"
                 :key="index">
              <el-form-item label="其他服务类目：">
                <div class="zx-flex column"
                     style="width:100%;position:relative">
                  <el-select v-model="registerForm.unit_id"
                             @change="select_other"
                             style="width:100%;"
                             placeholder="请选择"
                             :autofocus="false">
                    <el-option v-for="item in otherSerive"
                               :key='item.category'
                               :label="item.category"
                               :value="item.category"></el-option>
                  </el-select>
                  <div class="diku">
                    <el-upload style="width:178px"
                               :show-file-list="true"
                               :action="upload"
                               list-type="picture-card"
                               :on-preview="handlePictureCardPreview">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                  </div>
                  <div v-show="index === 0"
                       class="btn_add"
                       @click.stop.prevent="otherServiceName.push('')">
                    <span>新增</span>
                  </div>
                  <div v-show="index !== 0"
                       class="btn_add"
                       style="background: #F22F2B; border-color:burlywood"
                       @click.stop.prevent="otherServiceName.splice(index, 1); ">
                    <span>删除{{index}}</span>
                  </div>
                </div>
              </el-form-item>
            </div>

            <el-form-item label="单位资质上传："
                          prop="zjzz">
              <el-upload style="width:178px"
                         :show-file-list="true"
                         :action="upload"
                         :on-success="onSuccess"
                         list-type="picture-card"
                         :on-preview="handlePictureCardPreview">
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
                          verify
                          :length='18'
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
                        type="telNumber"
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
import { serviceUnitScertification, getSerive } from '@/api/user'
import { getDataDictionary, preview } from '@/api/index'
import addressjson from '@/until/address.js'
import { uploadFile } from '@/api/article'
export default {
  name: 'person',
  data () {
    return {
      otherServiceName: [''], // 其他服务类目
      otherSerive: [],
      init_arr: addressjson,
      init_cityArr: [],
      init_region: [],
      upload: uploadFile,
      typeValue: '',
      formData: {
        province: 0,    // 省
        city: 0,        // 市
        county: 0,      // 区/县
        detailed: ''    // 详细地址
      },
      qualificationinformation: [], // 单位资质
      qualification: [], // 其他资质
      companyList: [],
      isUseCreat: [
        {
          value: '选项1',
          isUse: '是'
        }, {
          value: '选项2',
          isUse: '否'
        }],
      otherService: [
        {
          value1: '选项1',
          unit_id: '是'
        }, {
          value1: '选项2',
          unit_id: '否'
        }],
      BankList: [
        {
          value: '选项1',
          unit_id: '农村信用合作联社'
        },
        {
          value: '选项1',
          unit_id: '中国农业银行'
        },
        {
          value: '选项1',
          unit_id: '中国工商银行'
        },
        {
          value: '选项1',
          unit_id: '中国建设银行'
        },
        {
          value: '选项1',
          unit_id: '城商行'
        },
        {
          value: '选项1',
          unit_id: '中国银行'
        },
        {
          value: '选项1',
          unit_id: '邮政储蓄银行'
        },
        {
          value: '选项1',
          unit_id: '交通银行'
        },
        {
          value: '选项1',
          unit_id: '农村商业银行'
        },

        {
          value: '选项1',
          unit_id: '农村发展银行'
        },
        {
          value: '选项1',
          unit_id: '城信社'
        },
        {
          value: '选项1',
          unit_id: '农村合作银行'
        },
        {
          value: '选项1',
          unit_id: '招商银行'
        },
        {
          value: '选项1',
          unit_id: '中信银行'
        },
        {
          value: '选项1',
          unit_id: '兴业银行'
        },
        {
          value: '选项1',
          unit_id: '村镇银行'
        },
        {
          value: '选项1',
          unit_id: '中国光大银行'
        },
        {
          value: '选项1',
          unit_id: '浦发银行'
        }
      ],
      // 表格数据
      registerForm: {
        cxqSerive: '基础应用研究和试验发展服务',
        unitName: '',
        unitJp: '',
        unit_id: '',
        userCreat: '是',
        BankName: '',
        societyCode: '',
        toPubName: '',
        toPubNum: '',
        unitTelPeo: '',
        unitTel: '',
        detail_address: '',
        userName: '',
        IDCard: '',
        confirmPassWord: '',
        dialogImageUrl: '',
        dialogVisible_zzload: false
      },
      rules: {
        unitName: [{ required: true, message: '请输入单位名称', trigger: 'blur' }],
        unitJp: [{ required: true, message: '请输入单位法人', trigger: 'blur' }],
        unit_id: [{ required: true, message: '请输入单位类型', trigger: 'blur' }],
        societyCode: [{ required: true, message: '请输入统一社会信用代码', trigger: 'blur' }],
        zjzz: [{ required: true, trigger: 'blur' }],
        userName: [{ required: true, message: '请输入超级管理员用户名', trigger: 'blur' }],
        passWord: [{ required: true, message: '请输入超级管理员的密码', trigger: 'blur' }],
        IDCard: [{ required: true, message: '请输入超级管理员身份证号码', trigger: 'blur' }],
        telNumber: [{ required: true, message: '请输入您的手机号', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.getDictionary()
    this.getSeriveList()
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
    select_type (val) {
      this.registerForm.unit_id = val
      this.getDictionary()
    },
    select_other (val) {
      console.log('val', val)
      this.otherSerive.forEach((ele, idx) => {
        console.log('ele', ele)
        if (ele.category === val) {
          this.qualification = ele.qualification
          console.log(ele.category)
        }
      })
      this.qualification = this.qualification.split(',')
      console.log('ele', this.qualification, preview)
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
    // handleRemove (file, fileList) {
    //   console.log(file, fileList)
    // },
    handlePictureCardPreview (file) {
      console.log('url', file)
      this.dialogImageUrl = file.url
      this.dialogVisible_zzload = true
    },
    // 获取服务类目列表
    getSeriveList () {
      getSerive().then(res => {
        console.log('res', res.data.datalist)
        this.otherSerive = res.data.datalist
      })
    },
    // 提交注册数据
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
        unittype: this.typeValue, // 单位类型
        unitrole: '', // 单位角色
        schoolcode: this.registerForm.societyCode, // 统一社会信用代码
        publicaccounts: this.registerForm.toPubNum, // 对公账号
        bankname: '', //   开户行
        publicaccountsname: this.registerForm.toPubName, //  对公账户名称
        unitcontacts: this.registerForm.unitTelPeo, //   单位联系人
        unitcontactnumber: this.registerForm.unitTel, //  单位联系电话
        province: this.formData.province, // 省
        city: this.formData.city, //   市
        county: this.formData.county, //  区县
        detailed: this.formData.detailed, // 详细地址
        isvouchersl: '', //  是否可接收创新券
        isusevouchers: this.registerForm.userCreat === '是' ? 1 : 0, //  是否能使用创新券
        servicecategory: '', // 服务类目
        iskeyserviceorg: '', // 是否重点服务机构
        source: '', // 来源
        recorddate: '', // 注册日期
        legalpersonname: this.registerForm.unitJp, // 法人姓名
        uploadingqualification: this.qualificationinformation, // 上传资质
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
    // 获取数据字典
    getDictionary () {
      getDataDictionary('UnitType').then(res => {
        this.companyList = res.data.list
        console.log(this.registerForm.unit_id)
        this.companyList.forEach((ele, idx) => {
          if (ele.fieldname === this.registerForm.unit_id) {
            console.log('ele.fieldcode', ele.fieldcode)
            this.typeValue = ele.fieldcode
          }
        })
      }).catch()
      console.log('this.', this.companyList)
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
    }
  }
}
</script>

<style lang="" scoped>
.yzm {
  position: absolute;
  top: 8%;
  right: 5px;
}
.address-select {
  width: 120px;
}
.btn_add {
  position: absolute;
  width: 60px;
  height: 36px;
  background: rgba(56, 126, 232, 1);
  border-radius: 5px;
  right: -73px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.btn_add span {
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 41px;
}

.diku {
  border-right: 1px solid rgba(148, 149, 153, 1);
  border-bottom: 1px solid rgba(148, 149, 153, 1);
  border-left: 1px solid rgba(148, 149, 153, 1);
}
.span_super {
  font-size: 18px;
  font-family: MicrosoftYaHei-Bold;
  font-weight: bold;
  color: rgba(71, 71, 71, 1);
  line-height: 41px;
  margin-left: 140px;
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
  width: 165px;
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