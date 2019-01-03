<template>
  <div class="createunitTemp common-dialog">
    <el-dialog el-dialog
               :title="'新增-单位信息'"
               :visible.sync="dialogVisible">
      <el-form v-show="step === 1"
               :model="createUnitForm"
               ref="createUnitForm"
               class="mg-t-30">
        <el-form-item label="单位名称："
                      verify
                      empty-message="请输入单位名称"
                      prop="unitname">
          <el-input v-model="createUnitForm.unitname"
                    placeholder="请输入单位名称"></el-input>
        </el-form-item>
        <el-form-item label="单位类型："
                      verify
                      empty-message="请选择单位类型"
                      prop="unitType">
          <template slot-scope="scope">
            <el-select v-model="createUnitForm.unitType"
                       placeholder="请选择单位类型">
              <el-option v-for="(item, index) in unitTypeOptions"
                         :key="index"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="统一社会信用代码："
                      verify
                      empty-message="请输入统一社会信用代码"
                      prop="schoolcode">
          <el-input v-model="createUnitForm.schoolcode"
                    placeholder="请输入统一社会信用代码"></el-input>
        </el-form-item>
        <el-form-item label="单位角色："
                      verify
                      empty-message="请选择单位角色"
                      prop="unitrole">
          <template slot-scope="scope">
            <el-select v-model="createUnitForm.unitrole"
                       placeholder="请选择单位角色">
              <el-option v-for="(item, index) in unitroleOptions"
                         :key="index"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="对公账户名称：">
          <el-input v-model="createUnitForm.publicaccountsname"
                    placeholder="请输入对公账户名称"></el-input>
        </el-form-item>
        <el-form-item label="对公账户：">
          <el-input v-model="createUnitForm.publicaccounts"
                    placeholder="请输入对公账户"></el-input>
        </el-form-item>
        <el-form-item label="开户行：">
          <el-input v-model="createUnitForm.bankname"
                    placeholder="请输入开户行"></el-input>
        </el-form-item>
        <el-form-item label="单位联系人：">
          <el-input v-model="createUnitForm.unitcontacts"
                    placeholder="请输入单位联系人"></el-input>
        </el-form-item>
        <el-form-item label="单位联系电话：">
          <el-input v-model="createUnitForm.unitcontactnumber"
                    placeholder="请输入单位联系电话"></el-input>
        </el-form-item>
        <el-form-item label="单位地址：">
          <template slot-scope="scope">
            <div class="unitAddress zx-flex align between">
              <el-select v-model="cityFormData.province"
                         placeholder="省份">
                <el-option v-for="(item,index) in init_arr"
                           :label="item.name"
                           :value="index"
                           :key="index"></el-option>
              </el-select>
              <el-select v-model="cityFormData.city"
                         placeholder="城市"
                         style="margin: 0 7.5px;">
                <el-option v-for="(item,index) in init_cityArr"
                           :label="item.name"
                           :value="index"
                           :key="index">
                </el-option>
              </el-select>
              <el-select v-model="cityFormData.county"
                         placeholder="区县">
                <el-option v-for="(item,index) in init_region"
                           :label="item.name"
                           :value="index"
                           :key="index">
                </el-option>
              </el-select>
            </div>
            <el-input class="mg-t-10"
                      v-model="cityFormData.detailed"
                      placeholder="请输入详细地址信息"></el-input>
          </template>
        </el-form-item>
        <el-form-item label="是否可接收创新券：">
          <template slot-scope="scope">
            <el-input v-model="createUnitForm.isvouchers"
                      disabled
                      placeholder="否"></el-input>
            <div class="verify fs-14 c-white zx-flex align justify cursor">验证</div>
          </template>
        </el-form-item>
        <el-form-item label="服务类目：">
          <el-input v-model="createUnitForm.servicecategory"
                    placeholder="请输入服务类目"></el-input>
        </el-form-item>
      </el-form>
      <el-form v-show="step === 2"
               :model="createSuperAdmimForm"
               ref="createSuperAdmimForm"
               class="mg-t-30">
        <el-form-item label="名称："
                      prop="username"
                      verify
                      empty-message="请输入姓名">
          <el-input v-model="createSuperAdmimForm.username"
                    placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="身份证号："
                      prop="idcard"
                      verify
                      empty-message="请输入身份证号">
          <template slot-scope="scope">
            <el-input v-model="createSuperAdmimForm.idcard"
                      placeholder="请输入身份证号"></el-input>
            <div class="verify fs-14 c-white zx-flex align justify cursor">验证</div>
          </template>
        </el-form-item>
        <el-form-item label="手机号："
                      prop="phone"
                      verify
                      phone
                      empty-message="请输入手机号">
          <el-input v-model="createSuperAdmimForm.phone"
                    placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="登录账号："
                      prop="account"
                      verify
                      empty-message="请输入登录账号">
          <el-input v-model="createSuperAdmimForm.account"
                    placeholder="请输入登录账号"></el-input>
        </el-form-item>
        <el-form-item label="登录密码："
                      prop="password"
                      verify
                      empty-message="请输入登录密码">
          <el-input v-model="createSuperAdmimForm.password"
                    type="password"
                    placeholder="请输入登录密码"></el-input>
        </el-form-item>
      </el-form>
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
import { createUnit, createSuperAdmim, serviceCategory } from '@/api/clientManage'
export default {
  name: 'createunitTemp',
  props: {
    showDialog: {
      type: Boolean,
      default: false
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
  data () {
    return {
      step: 1,
      dialogVisible: false,
      // 表单1
      createUnitForm: {
        // id: '',             // 提交的时候需要
        unitname: '',       // 单位姓名
        unitType: '',       // 单位类型
        schoolcode: '',     // 社会信用代码
        unitrole: '',       // 单位角色
        publicaccountsname: '',     // 对公账户名称
        publicaccounts: '',  // 对公账户名称
        bankname: '',  // 开户行
        unitcontacts: '',    // 单位联系人
        unitcontactnumber: '', // 单位联系电话
        unitAddress: [],    // 单位地址
        isvouchers: 0,     // 是否可接收创新券
        servicecategory: ''     // 服务类目
      },
      init_arr: addressjson,
      init_cityArr: [],
      init_region: [],
      cityFormData: {
        province: 0,      // 省
        city: 0,          // 市
        county: 0,        // 区/县
        detailed: ''      // 详细地址
      },
      // 表单2
      createSuperAdmimForm: {
        username: '',
        idcard: '',
        phone: '',
        account: '',
        password: '',
        unit_id: ''
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
      }]
    }
  },
  created () {
    this.initCity()
    this.initCounty()
    this.getServiceCategory()
  },
  watch: {
    'cityFormData.province' () {
      this.initCity()
      this.initCounty()
    },
    'cityFormData.city' () {
      this.initCounty()
    },
    showDialog () {
      this.dialogVisible = this.showDialog
    },
    dialogVisible () {
      this.$emit('returnBool', this.dialogVisible)
    }
  },
  methods: {
    // 获取服务类目
    getServiceCategory () {
      serviceCategory().then(res => {
        let tempArr = res.data.datalist.map(item => item.category)
        this.createUnitForm.servicecategory = tempArr.join(',')
      })
    },
    // 初始化 市
    initCity () {
      let index = this.cityFormData.province
      this.init_cityArr = this.init_arr[index].sub
      this.cityFormData.city = 0
      this.cityFormData.county = 0
      this.init_region = this.init_cityArr[0].sub
    },
    // 初始化 县/区
    initCounty () {
      this.cityFormData.county = 0
      let index = this.cityFormData.city
      this.init_region = this.init_cityArr[index].sub
    },
    onDialogFooter (index) {
      switch (index) {
        case 0:
          // 上一步
          this.$set(this.dialogFooter[0], 'isShow', false)
          this.step = 1
          break
        case 1:
          if (this.dialogFooter[0].isShow) {
            this.submitForm('createSuperAdmimForm').then(bool => {
              if (!bool) return
              let loading = this.$loading()
              let query = this.createSuperAdmimForm
              createSuperAdmim(query).then(res => {
                console.log(res)
                loading.close()
                if (res.data.success) {
                  this.$message.success('保存成功')
                  this.dialogVisible = false
                }
              }).catch((err) => {
                loading.close()
                this.$message.error(err.data.message)
              })
            })
          } else {
            this.submitForm('createUnitForm').then(bool => {
              if (!bool) return
              let loading = this.$loading()
              let query = this.createUnitForm
              createUnit(query).then((res) => {
                console.log(res)
                loading.close()
                if (res.data.success) {
                  this.$set(this.dialogFooter[0], 'isShow', false)
                  this.$set(this.createSuperAdmimForm, 'unit_id', res.data.unit_id)
                  this.step = 2
                  this.$message.success('保存成功')
                }
              }).catch((err) => {
                loading.close()
                this.$message.error(err.data.message)
              })
            })
          }
          break
        default:
          // 取消
          this.dialogVisible = false
          break
      }
    },
    submitForm (formName) {
      return new Promise((resolve, reject) => {
        this.$refs[formName].validate(valid => {
          resolve(valid)
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../../assets/style/color.less";
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
</style>
