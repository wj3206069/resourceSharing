<template>
  <div class="basiUnitinformation" style="height:calc(100vh - 130px);">
    <ul>
      <li>
        <div class="essential_information_header">
          <span class="unit">
            <p>单位认证信息</p>
          </span>
        </div>
        <div>
          <el-form label-width="148px">
            <el-form-item label="单位名称:"
                          prop='unitName'>
              <el-input disabled :value="unitInfo.unitname"></el-input>
            </el-form-item>
            <el-form-item label="单位类型:"
                          prop='unitType'>
              <el-input disabled :value="typeName">
              </el-input>
            </el-form-item>
            <el-form-item label="统一社会信息代码:"
                          prop='secioceCode'>
              <el-input disabled :value="unitInfo.schoolcode"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </li>
      <li>
        <div class="essential_information_header">
          <span class="unit">
            <p>单位基本信息</p>
          </span>
        </div>
        <div>
          <el-form label-width="148px">
            <el-form-item label="对公账户名称:">
              <el-input disabled :value="unitInfo.publicaccountsname"></el-input>
            </el-form-item>
            <el-form-item readonly label="对公账户:">
              <el-input disabled :value="unitInfo.publicaccounts"></el-input>
            </el-form-item>
            <el-form-item label="开户行:">
              <el-input disabled v-model="bankStore">
              </el-input>
            </el-form-item>
            <el-form-item label="单位联系人:">
              <el-input :value="unitInfo.username2"
                        @change="changeUnitcontacts"></el-input>
            </el-form-item>
            <el-form-item label="单位联系电话:">
              <el-input :value="unitInfo.unitcontactnumber"
                        @change="changeUnitTel"></el-input>
            </el-form-item>
            <el-form-item label="单位地址:">
              <el-input type="textarea"
                        :value="unitInfo.detailed"
                        @change="changeUnitAddress"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </li>
      <li>
        <div class="essential_information_header">
          <span class="unit">
            <p>服务类目</p>
          </span>
          <!--<span>-->
            <!--<el-button type="primary"-->
                       <!--@click.stop.prevent="saveInfo('serviceCategory')">保存</el-button>-->
          <!--</span>-->
        </div>
        <div>
          <el-form label-width="148px">
            <el-form-item label="是否可接受创新卷:">
              <el-input disabled
                        :value="unitInfo.isvouchers===1?'是':'否'"></el-input>
            </el-form-item>
            <el-form-item label="创新卷服务类目:">
            </el-form-item>
            <div class="category">
              <p>基础应用研究和试验发展服务</p>
              <p>基础应用研究和试验发展服务</p>
            </div>
            <div v-for="(item, index) in otherServiceArr"
                 :key="index">
              <el-form-item label="其他服务类目:">
                <el-select v-model="otherService"
                           disabled>
                  <el-option v-for="(item, index) in otherServiceListArr"
                             :key="index"
                             :value="item"></el-option>
                </el-select>
                <div class="diku"
                     disabled>
                  <el-upload class="el-upload-other"
                             disabled
                             action="upLoadUrl"
                             :show-file-list="false">
                    <img v-if="imageUrlOther"
                         :src="imageUrlOther"
                         class="avatar">
                    <!--<i v-else-->
                       <!--class="up_reset">重新上传</i>-->
                  </el-upload>
                </div>
                <div>
                  <el-button type="primary"
                             v-show="index !== 0"
                             style="background: #F22F2B;"
                             @click.stop.prevent="otherServiceArr.splice(index,1)"
                             class="save_other">删除</el-button>
                </div>

              </el-form-item>
            </div>
          </el-form>

        </div>
      </li>
      <li>
        <div class="essential_information_header">
          <span class="unit">
            <p>管理员信息</p>
          </span>
        </div>
        <div>
          <el-form label-width="148px">
            <el-form-item label="姓名:">
              <el-input :value='unitInfo.username2'
                        @change="changeManageName"
                        ref="input1"></el-input>
            </el-form-item>
            <el-form-item label="身份证号:">
              <el-input :value='unitInfo.idcard2'
                        @change="changeManageID"
                        ref="managerIdcard"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </li>
      <li>
        <div class="essential_information_header">
          <span class="unit">
            <p>单位统计信息</p>
          </span>
        </div>
        <div>
          <el-form label-width="148px">
            <el-form-item label="设备数量:">
              <el-input disabled
                        :value="unitInfo.sbsl"></el-input>
            </el-form-item>
            <el-form-item label="设备相关服务数量:">
              <el-input disabled
                        :value="unitInfo.jcfwl"></el-input>
            </el-form-item>
            <el-form-item label="商业服务数量:">
              <el-input disabled
                        :value="unitInfo.fjcfwl"></el-input>
            </el-form-item>
            <el-form-item label="创新卷接受账户余额:">
              <el-input disabled
                        :value="unitInfo.accountbalance"></el-input>
            </el-form-item>
            <el-form-item label="创新卷消费余额:">
              <el-input disabled
                        :value="unitInfo.accountbalance2"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </li>
      <span class="Btn">
            <el-button type="primary"
                       class='button_two' @click.stop.prevent="saveInfo">保存</el-button>
          </span>
    </ul>
  </div>
</template>

<script>
import { userCenter, getSerive,editUserCenter} from '@/api/user'
import { getDataDictionary, preview, uploadPath } from '@/api/index'
export default {
  name: 'basicUnitInformation',
  data () {
    return {
      otherServiceArr: [''],                                    // 其他服务的数组
      unitTypeArr: [],                                          // 单位类型数组
      otherServiceListArr: [],                                  // 其他服务数组下拉值
      hasSubmit: false,                                         // 是否提交审核
      resultList2: [],                                          // 单位基本信息的资质图片
      BankArr: [],                                              // 开户行字典数组
      imageUrl: `http://${location.host}${preview}/`,           // 单位基本信息图片显示URL
      hasUpload: true,                                         // 是否上传基本信息图片
      upLoadUrl: `http://${location.host}${uploadPath}/`,       // 上传单位基本信息图片action
      imageUrlOther: '',                                        // 其他服务类目的图片
      unitInfo: {},                                             // 用户中心所有信息
      bankStore: '',                                            // 开户行下拉框初始值
      unitType: '',                                             // 单位类型下拉框初始值
      otherService: '',                                         // 其他服务类目下拉框初始值
      index_zz: '',
      pinjie: '',
      userid: '',
      auditstatusType: '',
      typeName: ''
    }
  },
  created () {
  },
  mounted () {
    this.getUserInfo()                // 获取用户基本信息
    this.getDictionaryService()
  },
  methods: {

    getIndex (idx) {
      if (this.index_zz) {
        this.index_zz = ''
      }
      this.index_zz = idx
    },

    // 保存信息
    saveInfo () {
      const unitBaseQuery = {
        userid: this.unitInfo.userid, // 用户ID
        username2: this.unitInfo.username2, // 管理员姓名
        idcard2: this.unitInfo.idcard2, // 身份证好
        account2: this.unitInfo.account2,  // 用户名
        unitcontacts: this.unitcontacts, // 单位联系人
        unitcontactnumber: this.unitInfo.unitcontactnumber, // 单位联系人电话
        detailed: this.unitInfo.detailed,  // 单位地址
        unitname: this.unitInfo.unitname, // 单位名称
        unittype: this.unitInfo.unittype,
        schoolcode: this.unitInfo.schoolcode,  // 统一社会信用代码
        id: this.unitInfo.id
      }
      this.editUser(unitBaseQuery)
    },
    // 修改所有用户信息
    editUser(query) {
       editUserCenter(query).then(res => {
        if(res.data.success){
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        }
      })
     },
    // 修改管理员姓名
    changeManageName (e) {
      this.unitInfo.username2 = e
    },
    // 修改管理员身份证号
    changeManageID (e) {
      this.unitInfo.idcard2 = e
    },
    // 修改单位联系人
    changeUnitcontacts (e) {
      this.unitInfo.unitcontacts = e
    },
    // 修改单位地址
    changeUnitAddress(e) {
      this.unitInfo.detailed = e
    },
    // 修改单位联系电话
    changeUnitTel (e) {
      if(!/\d$/.test(e)){
      this.$message({
        message: '请输入正确的联系电话',
        type: 'error'
      })
    }
      this.unitInfo.unitcontactnumber = e
      if (!/\d$/.test(e)) {
        this.$message({
          message: '请输入正确的联系电话',
          type: 'error'
        })
      }
    },

    // 获取用户基本信息
    getUserInfo() {
      userCenter().then(res => {
        if (res.data.success) {
          this.$message({
            message: '请求成功',
            type: 'success'
          })
          this.unitInfo = res.data.resultList
          this.resultList2 = res.data.resultList.resultList2
          getDataDictionary('UnitType').then(res => {
            const unitTypeArr = res.data.list
            this.typeName = unitTypeArr[this.unitInfo.unittype - 1].fieldname
          })
          getDataDictionary('bank').then(res => {
            let BankArr = res.data.list
            const index = BankArr.findIndex(fruit => fruit.fieldcode === this.unitInfo.bankname)
            if (index >= 0) {
              console.log(index)
              this.bankStore = BankArr[index].fieldname
            }
          })
        }else{
          console.log(res.data.success);
          this.$message({
            message: '请先登录',
            type: 'error'
          })
        }
      })
    },

    // 获取字典-----开户行
    // getDictionaryBankData () {
    //   getDataDictionary('bank').then(res => {
    //     let BankArr = res.data.list
    //     const index =BankArr.findIndex(fruit => fruit.fieldcode === "SPDB");
    //     console.log(BankArr,index);
    //   })
    // },
    // 获取字典-----服务类目
    getDictionaryService () {
      getSerive().then(res => {
        console.log(res.data.datalist)
        res.data.datalist.forEach((ele, idx) => {
          this.otherServiceListArr.push(ele.category)
        })
      })
    }

  }}
</script>
<style lang="less" scoped>
  .Btn{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  .Btn .button_two{
    border-radius: 8px;
    width: 90px;
  }
  .basiUnitinformation {
    background-color: #f7f7f7;
    width: 100%;
    position: relative;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .basiUnitinformation ul {
    width: 800px;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    padding-bottom: 32px;
    margin-top: 10px;
  }

  .basiUnitinformation ul li {
    background-color: #fff;
    margin-top: 10px;
  }

  .basiUnitinformation ul li .essential_information_header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    height: 50px;
    border-bottom: 1px solid #ddd;
  }

  /*.unit {*/
    /*border-left: 6px solid #61a3fe;*/
  /*}*/

  .basiUnitinformation ul li .essential_information_header .unit {
    margin: 14px 0;
    border-left: 6px solid #ffffff;
  }

  .basiUnitinformation ul li .essential_information_header .unit p {
    font-style: normal;
    line-height: 22px;
    margin-left: 13px;
    font-size: 16px;
    font-weight: bold;
    font-family: MicrosoftYaHei-Bold;
  }

  .basiUnitinformation ul li .essential_information_header>span {
    line-height: 50px;
  }

  .basiUnitinformation ul li .essential_information_header .el-button {
    height: 36px;
    background: rgba(97, 163, 254, 1);
    border-radius: 10px;
    margin-left: -5px;
    font-size: 14px;
    border-color: rgba(97, 163, 254, 1);
  }

  .basiUnitinformation ul li .essential_information_header .el-button span {
    display: block;
    margin-top: -1px;
  }

  .basiUnitinformation ul li .essential_information_header .button_two {
    margin-left: 20px;
  }

  .basiUnitinformation .el-input,
  .basiUnitinformation .el-select {
    width: 600px;
  }

  .el-input__inner,
  .el-textarea__inner {
    border: 1px solid #ddd;
  }

  .el-textarea__inner {
    height: 80px !important;
  }

  .basiUnitinformation ul li .el-form .el-form-item {
    padding: 0 26px;
    margin-bottom: 0;
    margin-top: 20px;
  }

  .basiUnitinformation ul li .el-form .el-form-item .el-form-item__label {
    width: 148px;
  }

  .basiUnitinformation ul li .el-form .el-form-item:last-child {
    padding-bottom: 30px;
  }

  .basiUnitinformation ul li .el-form .category {
    margin-top: -50px;
  }

  .basiUnitinformation ul li .el-form .category p {
    background-color: #f5f7fa;
    margin-top: 10px;
    margin-left: 174px;
    width: 600px;
    height: 40px;
    border: 1px solid #e4e7ed;
    padding-left: 15px;
    line-height: 40px;
    cursor: not-allowed;
  }

  .avatar-uploader .el-upload {
    border: 1px solid #ddd;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 300px;
    height: 180px;
    /* margin-left: 86px; */
    margin-top: -27px;
    padding-top: 0;
  }

  .avatar-uploader .el-upload:hover {
    background: rgba(0, 0, 0, 1);
    opacity: 0.1;
  }

  .avatar-uploader .el-upload:hover .avatar-uploader-icon {
    color: #FFF;
    z-index: 10;
  }

  .avatar-uploader-icon {
    font-size: 14px;
    color: #8c939d;
    width: 300px;
    height: 180px;
    line-height: 180px;
    text-align: center;
  }

  .avatar {
    width: 300px;
    height: 180px;
    display: block;
  }

  .business_license {
    /* margin-left: 63px; */
    margin-top: 37px;
  }

  .qiye span {
    margin-left: -7px;
  }

  .basiUnitinformation ul li .el-form {
    padding-bottom: 30px;
  }

  .el-form-item__content {
    margin-left: 148px;
    display: flex;
    flex-direction: column;
  }

  .el-upload-other {
    background-color: #ddd;
    width: 90px;
    height: 90px;
    position: relative;
  }

  .up_reset {
    position: absolute;
    top: 41%;
    left: 17%;
  }

  .diku {
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    padding: 5px;
  }

  .save_other {
    height: 36px;
    background: rgba(97, 163, 254, 1);
    border-radius: 10px;
    border-color: snow !important;
    margin-top: 10px;
  }

</style>
