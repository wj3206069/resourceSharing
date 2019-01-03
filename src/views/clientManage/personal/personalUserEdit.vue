<template>
  <div class="createTemp common-dialog">
    <el-dialog :title="'编辑'"
               :visible.sync="dialogFormVisible">
      <el-form :model="detailData"
               ref="detailData"
               class="mg-t-30">
        <el-form-item label="用户名称："
                      verify
                      empty-message="请输入姓名"
                      prop="username">
          <el-input v-model="detailData.username"
                    readonly
                    placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="身份证号："
                      verify
                      empty-message="请输入身份证号"
                      prop="idcard">
          <template slot-scope="scope">
            <el-input v-model="detailData.idcard"
                      readonly
                      placeholder="请输入身份证号"></el-input>
            <div class="verify fs-14 c-white zx-flex align justify cursor"
                 @click.stop.prevent="idcardVerify(detailData.idcard)">验证</div>
          </template>
        </el-form-item>
        <el-form-item label="性别："
                      prop="sex">
          <el-input v-model="detailData.sex"
                    readonly
                    placeholder="根据身份证验证"></el-input>
        </el-form-item>
        <el-form-item label="出生日期："
                      prop="birthday">
          <el-input v-model="detailData.birthday"
                    readonly
                    placeholder="根据身份证验证"></el-input>
        </el-form-item>
        <el-form-item label="头像：">
          <template slot-scope="scope">
            <el-upload class="avatar-uploader createSpecialist"
                       :action="uploadPath"
                       :show-file-list="false"
                       :on-progress="onProgress"
                       :on-success="onSuccess"
                       :on-error="onError"
                       :before-upload="beforeAvatarUpload">
              <img v-if="headportraitUrl"
                   :src="headportraitUrl"
                   width="90"
                   height="90">
              <i v-else
                 class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </template>
        </el-form-item>
        <el-form-item label="手机号："
                      verify
                      phone
                      empty-message="请输入手机号"
                      prop="phone">
          <el-input v-model="detailData.phone"
                    placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="个人邮箱：">
          <el-input v-model="detailData.personalmailbox"
                    placeholder="请输入用户邮箱号"></el-input>
        </el-form-item>
        <el-form-item label="QQ号：">
          <el-input v-model="detailData.qq"
                    placeholder="请输入用户QQ号"></el-input>
        </el-form-item>
        <el-form-item label="微信号：">
          <el-input v-model="detailData.wechatnumber"
                    placeholder="请输入用户微信号"></el-input>
        </el-form-item>
        <el-form-item label="银行账号：">
          <el-input v-model="detailData.bankaccount"
                    placeholder="请输入用户银行账号"></el-input>
        </el-form-item>
        <el-form-item label="开户行：">
          <template slot-scope="scope">
            <el-select v-model="detailData.openingbank"
                       placeholder="请选择开户行">
              <el-option v-for="(item, index) in openingbankOptions"
                         :key="index"
                         :label="item.fieldname"
                         :value="index">
              </el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="详细地址：">
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
        <el-form-item label="紧急联系人：">
          <el-input v-model="detailData.emergencycontact"
                    placeholder="请输入紧急联系人"></el-input>
        </el-form-item>
        <el-form-item label="紧急联系人电话：">
          <el-input v-model="detailData.emergencycontactnumber"
                    placeholder="请输入紧急联系人电话"></el-input>
        </el-form-item>
        <el-form-item label="公司名称：">
          <el-input v-model="detailData.corporatename"
                    placeholder="请输入公司名称"></el-input>
        </el-form-item>
        <el-form-item label="专家职称："
                      verify
                      empty-message="请选择职称级别"
                      prop="experttitle">
          <template slot-scope="scope">
            <div class="unitAddress zx-flex align between">
              <el-select v-model="detailData.experttitle"
                         class="zhuanjia"
                         placeholder="请选择">
                <el-option v-for="(item,index) in experttitle"
                           :label="item.fieldname"
                           :value="index"
                           :key="index"></el-option>
              </el-select>
              <el-input class="flex-1"
                        v-model="detailData.expertrank"
                        placeholder="请输入专家职称"></el-input>
            </div>
          </template>
        </el-form-item>
        <el-form-item label="学科："
                      verify
                      empty-message="请选择学科"
                      prop="subject">
          <el-input v-model="detailData.subject"
                    :readonly="true"
                    type="textarea"
                    :autosize="{ minRows: 1, maxRows: 3}"
                    placeholder="请选择学科"
                    @focus="initGenerateData1"></el-input>
          <!-- <template slot-scope="scope">
            <el-input v-model="detailData.subject"
                      :readonly="true"
                      placeholder="请选择学科"></el-input>
            <div class="select-mafan fs-14 grey zx-flex align justify cursor"
                 @click.stop.prevent="initGenerateData1">选择学科</div>
          </template> -->
        </el-form-item>
        <el-form-item label="技术领域：">
          <el-input v-model="detailData.technicalfield"
                    :readonly="true"
                    type="textarea"
                    :autosize="{ minRows: 1, maxRows: 3}"
                    placeholder="请选择技术领域"
                    @focus="initGenerateData2"></el-input>
          <!-- <template slot-scope="scope">
            <el-input v-model="detailData.technicalfield"
                      :readonly="true"
                      placeholder="请选择技术领域"></el-input>
            <div class="select-mafan fs-14 grey zx-flex align justify cursor">请选择技术领域</div>
          </template> -->
        </el-form-item>
        <el-form-item label="登录账号："
                      verify
                      empty-message="请输入登录账号"
                      prop="account">
          <el-input v-model="detailData.account"
                    placeholder="请输入登录账号"></el-input>
        </el-form-item>
        <el-form-item label="登录密码："
                      verify
                      empty-message="请输入登录密码"
                      prop="password">
          <el-input v-model="detailData.password"
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
    <!-- 学科弹窗 -->
    <el-dialog class="select-other"
               title="选择学科"
               :visible.sync="dialogXueVisible">
      <div class="select-classtify zx-flex align between mg-t-20">
        <el-select class="flex-1"
                   v-model="subjectFirstVal"
                   placeholder="选择一级学科">
          <el-option v-for="(item,index) in subjectFirst"
                     :label="item.label"
                     :value="index"
                     :key="index"></el-option>
        </el-select>
        <el-select class="flex-1"
                   v-model="subjectSecondVal"
                   placeholder="选择二级学科"
                   style="margin-left: 20px;">
          <el-option v-for="(item,index) in subjectSecond"
                     :label="item.label"
                     :value="index"
                     :key="index">
          </el-option>
        </el-select>
      </div>
      <div class="mg-t-16 select-classtify flex-1">
        <el-transfer v-model="subjectVal"
                     :titles="['选择学科', '已选择的学科']"
                     :data="subjectThird"></el-transfer>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button v-for="(item, index) in dialogFooter"
                   :key="index"
                   :style="item.color"
                   v-show="item.isShow"
                   @click.stop.prevent="subjectFooter(index)">{{item.name}}</el-button>
      </span>
    </el-dialog>
    <!-- 技术领域弹窗 -->
    <el-dialog class="select-other"
               title="选择技术领域"
               :visible.sync="dialogJishuVisible">
      <div class="select-classtify zx-flex align between mg-t-20">
        <el-select class="flex-1"
                   v-model="technicalfieldFirstVal"
                   placeholder="选择一级技术领域">
          <el-option v-for="(item,index) in technicalfieldFirst"
                     :label="item.label"
                     :value="index"
                     :key="index"></el-option>
        </el-select>
        <el-select class="flex-1"
                   v-model="technicalfieldSecondVal"
                   placeholder="选择二级技术领域"
                   style="margin-left: 20px;">
          <el-option v-for="(item,index) in technicalfieldSecond"
                     :label="item.label"
                     :value="index"
                     :key="index">
          </el-option>
        </el-select>
      </div>
      <div class="mg-t-16 select-classtify flex-1">
        <el-transfer v-model="technicalfieldVal"
                     :titles="['选择技术领域', '已选择的技术领域']"
                     :data="technicalfieldThird"></el-transfer>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button v-for="(item, index) in dialogFooter"
                   :key="index"
                   :style="item.color"
                   v-show="item.isShow"
                   @click.stop.prevent="technicalfieldFooter(index)">{{item.name}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 地址数据
import addressjson from '@/assets/utils/address.js'
// 通用api
import { uploadPath, getDataDictionarys, getDataDictionary } from '@/api'
// api
import { unitEdit } from '@/api/clientManage'
export default {
  name: 'createTemp',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    detailData: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      uploadPath: uploadPath, // 上传地址
      headportraitUrl: '',  // 头像链接
      dialogFormVisible: false,
      dialogXueVisible: false, // 选择学科 显示 true 隐藏 false
      dialogJishuVisible: false, // 技术领域 显示 true 隐藏 false
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
      openingbankOptions: [], // 开户行
      init_arr: addressjson, // 地址插件数据
      init_cityArr: [],
      init_region: [],
      cityFormData: {
        province: 0,      // 省
        city: 0,          // 市
        county: 0,        // 区/县
        detailed: ''      // 详细地址
      },
      // 表单
      // userForm: {
      //   whetherexpert: '1', // 新增专家 1是 0否
      //   username: '', // 用户名
      //   idcard: '', // 身份证
      //   sex: '',  // 性别
      //   birthday: '', // 出生日期
      //   headportrait: '',  // 头像id
      //   phone: '', // 手机号
      //   personalmailbox: '', // 邮箱
      //   qq: '', // qq
      //   wechatnumber: '', // 微信
      //   bankaccount: '', // 银行账号
      //   openingbank: '', // 开户行
      //   emergencycontact: '', // 紧急联系人
      //   emergencycontactnumber: '', // 紧急联系人电话
      //   corporatename: '', // 公司名称
      //   experttitle: '', // 专家职称（国家规定）
      //   expertrank: '',  // 专家职级（个人叫法）
      //   subject: '', // 学科
      //   technicalfield: '', // 技术领域
      //   account: '', // 账号
      //   password: '' // 密码
      // },
      experttitle: [], // 专家职称（国家规定）
      subjectAll: [],  // 学科 所有数据
      subjectFirst: [], // 学科 第一层 数据
      subjectFirstVal: '', // 学科 第一层 val
      subjectSecond: [], // 学科 第二层 数据
      subjectSecondVal: '', // 学科 第二层 val
      subjectThird: [], // 学科 第三层 数据
      subjectThirdVal: '', // 学科 第三层 val
      subjectValList: [], // 学科 终值
      subjectVal: [], // 穿梭插件 val
      technicalfieldAll: [], // 技术领域 所有数据
      technicalfieldFirst: [], // 技术领域 第一层 数据
      technicalfieldFirstVal: '', // 技术领域 第一层 val
      technicalfieldSecond: [], // 技术领域 第二层 数据
      technicalfieldSecondVal: '', // 技术领域 第二层 val
      technicalfieldThird: [], // 技术领域 第三层 数据
      technicalfieldThirdVal: '', // 技术领域 第三层 val
      technicalfieldVal: [] // 穿梭插件 val
    }
  },
  created () {
    this.initCity()
    this.initCounty()
    this._getDataDictionarys()
  },
  watch: {
    showDialog () {
      this.dialogFormVisible = this.showDialog
    },
    dialogFormVisible () {
      this.$emit('returnBool', this.dialogFormVisible)
    },
    'cityFormData.province' () {
      this.initCity()
      this.initCounty()
    },
    'cityFormData.city' () {
      this.initCounty()
    },
    // 根据 学科 第一层 选中值 获取第二层
    subjectFirstVal (val) {
      this.subjectSecond = this.subjectFirst[val].children.map((item, index) => {
        return {
          label: item.fieldname,
          value: index,
          children: item.children
        }
      })
      console.log('第二层', this.subjectSecond)
    },
    // 根据 学科 第二层 选中值 获取第三层
    subjectSecondVal (val) {
      this.subjectThird = this.subjectSecond[val].children.map((item, index) => {
        return {
          label: item.fieldname,
          key: index,
          children: item.children
        }
      })
      console.log('第三层', this.subjectThird)
    },
    // 学科 获取最终选择值
    subjectVal (val) {
      if (val.length > 7) {
        this.$alert('最多可以选择6个学科', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
        return this.subjectVal.splice(0, 5)
      }
      this.subjectValList = val.map(i => this.subjectThird[i]['label'])
      console.log('学科最终值', this.subjectValList)
    },
    // 根据 技术领域 第一层 选中值 获取第二层
    technicalfieldFirstVal (val) {
      this.technicalfieldSecond = this.technicalfieldFirst[val].children.map((item, index) => {
        return {
          label: item.fieldname,
          value: index,
          children: item.children
        }
      })
      console.log('技术领域第二层', this.technicalfieldSecond)
    },
    // 根据 技术领域 第二层 选中值 获取第三层
    technicalfieldSecondVal (val) {
      this.technicalfieldThird = this.technicalfieldSecond[val].children.map((item, index) => {
        return {
          label: item.fieldname,
          key: index,
          children: item.children
        }
      })
      console.log('技术领域第三层', this.technicalfieldThird)
    },
    // 技术领域 获取最终选择值
    technicalfieldVal (val) {
      if (val.length > 7) {
        this.$alert('最多可以选择6个学科', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
        return this.technicalfieldVal.splice(0, 5)
      }
      this.technicalfieldValList = val.map(i => this.technicalfieldThird[i]['label'])
      console.log('技术领域最终值', this.technicalfieldValList)
    }
  },
  methods: {
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
    // 数据字典
    _getDataDictionarys () {
      // 学科
      getDataDictionarys('yq_Subject').then(res => {
        if (res.data.success) {
          this.subjectAll = res.data.list
        }
      })
      // 高新技术领域
      getDataDictionarys('yq_TechnicalField').then(res => {
        if (res.data.success) {
          this.technicalfieldAll = res.data.list
        }
      })
      // 专家职称 ExpertTitle
      getDataDictionary('ExpertTitle').then(res => {
        if (res.data.success) {
          this.experttitle = res.data.list
        }
      })
      // 开户行 openingbankOptions
      getDataDictionary('bank').then(res => {
        if (res.data.success) {
          this.openingbankOptions = res.data.list
        }
      })
    },
    // 上传
    onProgress (event, file, fileList) {
      this.loading = this.$loading()
      // console.log(event, file, fileList)
    },
    onSuccess (response, file, fileList) {
      // console.log(response, file, fileList)
      console.log(file)
      this.loading.close()
      if (response.success) {
        this.headportrait = response.fileid
        console.log(response)
        this.headportraitUrl = file.url
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
    // 选择 学科
    initGenerateData1 () {
      this.dialogXueVisible = true // 显示
      this.subjectFirst = this.subjectAll.map((item, index) => {
        return {
          label: item.fieldname,
          value: index,
          children: item.children
        }
      })
      console.log('第一层', this.subjectFirst)
    },
    // 选择 技术领域
    initGenerateData2 () {
      this.dialogJishuVisible = true // 显示
      this.technicalfieldFirst = this.technicalfieldAll.map((item, index) => {
        return {
          label: item.fieldname,
          value: index,
          children: item.children
        }
      })
    },
    // 学科 保存按钮
    subjectFooter (index) {
      switch (index) {
        case 1:
          // if (!this.subjectValList.length) {
          //   this.$message.warning('请选择学科')
          //   break
          // }
          this.detailData.subject = this.subjectValList.join(',')
          this.dialogXueVisible = false
          break
        default:
          this.dialogXueVisible = false
          break
      }
    },
    // 技术领域 保存按钮
    technicalfieldFooter (index) {
      switch (index) {
        case 1:
          this.detailData.technicalfield = this.technicalfieldValList.join(',')
          this.dialogJishuVisible = false
          break
        default:
          this.dialogJishuVisible = false
          break
      }
    },
    // 验证
    idcardVerify (idCard) {
      this.detailData.birthday = this.getBirthdayFromIdCard(idCard)
      this.detailData.sex = this.getGenderFromIdCard(idCard)
    },
    // 获取出生日期
    getBirthdayFromIdCard (idCard) {
      let birthday = ''
      if (idCard !== null && idCard !== '') {
        if (idCard.length === 15) {
          birthday = '19' + idCard.substr(6, 6)
        } else if (idCard.length === 18) {
          birthday = idCard.substr(6, 8)
        }
        birthday = birthday.replace(/(.{4})(.{2})/, '$1$2')
      }
      return birthday
    },
    // 获取性别
    getGenderFromIdCard (idCard) {
      if (!idCard) return
      let gender = ''
      if (idCard.length === 15) {
        gender = idCard.substr(14, 1)
      } else if (idCard.length === 18) {
        gender = idCard.substr(16, 1)
      }
      return gender % 2 ? '男' : '女' // 1代表男性，0代表女性
    },
    onDialogFooter (index) {
      switch (index) {
        case 1:
          this.submitForm('detailData').then(bool => {
            if (!bool) return false
            let loading = this.$loading()
            let query = this.detailData
            console.log(query)
            unitEdit(query).then(res => {
              console.log(res)
              loading.close()
              if (res.data.success) {
                this.$message.success('修改成功')
                this.dialogFormVisible = false
              } else {
                this.$message.error(res.data.message)
              }
            }).catch(() => {
              loading.close()
            })
          })
          break
        default:
          // 取消
          this.dialogFormVisible = false
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
.createTemp {
  position: relative;
  .verify {
    position: absolute;
    top: 5px;
    right: 3px;
    width: 50px;
    height: 30px;
    border-radius: 10px;
    background-color: @primary;
  }
  .select-mafan {
    position: absolute;
    top: 5px;
    right: 3px;
    min-width: 100px;
    height: 30px;
    border-radius: 10px;
    padding: 0 10px;
    background: #f0f0f0;
  }
  .el-button {
    border: none;
    border-radius: 10px;
    color: #fff;
  }
  .select-other {
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    height: 635px;
  }
  .select-classtify {
    padding: 0 20px;
  }
  .zhuanjia {
    width: 140px !important;
    margin-right: 20px;
  }
}
</style>
