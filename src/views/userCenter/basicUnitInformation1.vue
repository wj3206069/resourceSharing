<template>
  <div class="basiUnitinformation" style="height:calc(100vh - 130px);">
    <!--<div class="tebs">-->
      <!--<ul class="teb">-->
        <!--<li v-for="(item,index) in tebs" :key="index" @click="handleTeb(index)" :class="{active:teb===index}">-->
        <!--<span>-->
          <!--{{item}}-->
        <!--</span>-->
        <!--</li>-->
      <!--</ul>-->
    <!--</div>-->
    <ul class="content">
      <li>
        <div>
          <el-form label-width="148px">
            <el-form-item label="单位名称:"
                          prop='unitName'>
              <el-input :value="unitInfo.unitname"
                        @change="changeUnitName"></el-input>
            </el-form-item>
            <el-form-item label="单位类型:">
              <el-select v-model="unitType"
                         @change="changeUnitType">
                <el-option v-for="(item, index) in unitTypeArr"
                           :value="item"
                           :key="index">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="统一社会信息代码:"
                          prop='secioceCode'>
              <el-input :value="unitInfo.schoolcode"
                        @change="changeSecoiceCode"></el-input>
            </el-form-item>
            <el-form-item :label="item.qname"
                          v-for="(item, index) in resultList2"
                          :key="index">
              <div class="business_license"
                   @click="getIndex(index)">
                <el-upload class="avatar-uploader"
                           :action="upLoadUrl"
                           disabled
                           :show-file-list="false"
                           :on-success="handleAvatarSuccess_base">
                  <img :src="hasUpload?imageUrl+item.picture:imageUrl+item.picture"
                       class="avatar">
                  <i class="avatar-uploader-icon">重新上传</i>
                </el-upload>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="essential_information_header">
          <span>
    <el-button type="primary"
               @click.stop.prevent="saveInfo('unitIdentifyInfo')">保存</el-button>
    <el-button type="primary"
               class="button_two"
               v-show="!hasSubmit"
               @click.stop.prevent="submitBaseInfo">提交审核</el-button>
    <el-button type="primary"
               v-show="hasSubmit"
               style="background:rgba(221,221,221,1); border:none"
               class="button_two">审核中</el-button>
    </span>
        </div>
      </li>
      <li >
        <div>
          <el-form label-width="148px">
            <el-form-item label="对公账户名称:">
              <el-input :value="unitInfo.publicaccountsname"
                        @change="changePcountsname"></el-input>
            </el-form-item>
            <el-form-item label="对公账户:">
              <el-input :value="unitInfo.publicaccounts"
                        @change="changePcountscount"></el-input>
            </el-form-item>
            <el-form-item label="开户行:">
              <el-select v-model="bankStore"
                         @change="changeBankStore">
                <el-option v-for="item in BankArr"
                           :key='item.value'
                           :value="item.fieldname"
                           :label='item.label'></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="单位联系人:">
              <el-input :value="unitInfo.unitcontacts"
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
        <div class="essential_information_header">
          <span>
    <el-button type="primary"
               @click.stop.prevent="saveInfo('unitBaseInfo')">保存</el-button>
    </span>
        </div>
      </li>
      <li>
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
                             :show-file-list="false"
                             :on-success="handleAvatarSuccess_other">
                    <img v-if="imageUrlOther"
                         :src="imageUrlOther"
                         class="avatar">
                    <i v-else
                       class="up_reset">重新上传</i>
                  </el-upload>
                </div>
                <div>
                  <el-button type="primary"
                             v-show="index === 0"
                             @click.stop.prevent="otherServiceArr.push('')"
                             class="save_other">新增
                  </el-button>
                  <el-button type="primary"
                             v-show="index !== 0"
                             style="background: #F22F2B;"
                             @click.stop.prevent="otherServiceArr.splice(index,1)"
                             class="save_other">删除
                  </el-button>
                </div>

              </el-form-item>
            </div>
          </el-form>

        </div>
        <div class="essential_information_header">
          <span>
    <el-button type="primary"
               @click.stop.prevent="saveInfo('serviceCategory')">保存</el-button>
    </span>
        </div>
      </li>
      <li>
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
        <div class="essential_information_header">
          <span>
    <el-button type="primary"
               @click.stop.prevent="saveInfo('ManagerInfo')">保存</el-button>
    </span>
        </div>
      </li>
      <li>
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
        <div class="essential_information_header">
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {userCenter, getSerive,editUserCenter} from '@/api/user'
  import {getDataDictionary, preview, uploadPath} from '@/api/index'

  export default {
    name: 'basicUnitInformation',
    data() {
      return {
        teb: 0,
        tebs: ['单位认证信息', '单位基本信息', '服务类目', '管理员信息', '单位统计信息'],
        haveLogin:false,
        otherServiceArr: [''],                                    // 其他服务的数组
        unitTypeArr: ['高等院校','科研院所','企业','其他'],                                          // 单位类型数组
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
        pinjie: ''
      }
    },
    mounted() {
      this.getUserInfo()                // 获取用户基本信息
      // this.getDictionaryBankData()      // 获取开户行字典
      // this.getDictionaryData()          // 获取单位类型字典
      // this.getDictionaryService()       // 获取其他服务类目字典
    },
    methods: {
      handleTeb(index) {
        this.teb = index
      },
      getUserInfo(){
        userCenter().then(res => {
          this.haveLogin = false
          if (res.data.success) {
            this.$message({
              message: '请求成功',
              type: 'success',

            })
            if (res.data.resultList.length === 0) {
              this.haveLogin = true
              this.$message({
                message: '请先登录',
                type: 'error'
              })
            }
            this.unitInfo = res.data.resultList
            this.resultList2 = res.data.resultList.resultList2
            this.unitType = this.unitTypeArr[res.data.resultList.unittype-1]
            console.log(res.data.resultList);
          }
        })
      },
      saveInfo(data) {
        switch (data) {
          // 保存单位认证信息
          case 'unitIdentifyInfo':
            const unitindetifyQuery = {
              type: 1,
              types: 1,
              id: this.unitInfo.id,
              unitname: this.unitInfo.unitname,
              unittype: this.unitType,
              schoolcode: this.unitInfo.schoolcode
            }
            this.editUserInfo(unitindetifyQuery)
            break
          // 保存单位基本信息
          case 'unitBaseInfo':
            const unitBaseQuery = {
              type: 2,
              types: 1,
              id: this.unitInfo.id,
              publicaccountsname: this.unitInfo.publicaccountsname,
              publicaccounts: this.unitInfo.publicaccounts,
              bankStore: this.bankStore,
              unitcontacts: this.unitcontacts,
              unitcontactnumber: this.unitInfo.unitcontactnumber,
              detailed: this.unitInfo.detailed
            }
            this.editUserInfo(unitBaseQuery)
            break
          // 保存服务类目
          case 'serviceCategory':
            const serviceQuery = {
              type: 3,
              types: 1,
              id: this.unitInfo.id
            }
            this.editUserInfo(serviceQuery)
            break
          // 保存管理员信息
          case 'ManagerInfo':
            const managerQuery = {
              id: this.unitInfo.userid,
              type: 4,
              types: 1,
              username2: this.unitInfo.username2,
              idcard2: this.unitInfo.idcard2
            }
            this.editUserInfo(managerQuery)
            break
          default:
            break
        }
      },
      // 修改单位名称
      changeUnitName(e) {
        this.unitInfo.unitname = e
      },
      // 改变单位类型
      changeUnitType(e) {
        console.log(e);
        this.unitType = e
      },
      // 修改统一社会信息代码
      changeSecoiceCode(e) {
        this.unitInfo.schoolcode = e
      },
      // 修改管理员姓名
      changeManageName(e) {
        this.unitInfo.username2 = e
      },
      // 修改管理员身份证号
      changeManageID(e) {
        this.unitInfo.idcard2 = e
      },
      // 修改对公账户名称
      changePcountsname(e) {
        this.unitInfo.publicaccountsname = e
      },
      // 修改对公账户
      changePcountscount(e) {
        this.unitInfo.publicaccounts = e
      },
      // 修改开户行
      changeBankStore(e) {
        this.unitInfo.bankStore = e
      },
      // 修改单位联系人
      changeUnitcontacts(e) {
        this.unitInfo.unitcontacts = e
      },
      // 修改单位联系电话
      changeUnitTel(e) {
        this.unitInfo.unitcontactnumber = e
      },
      // 修改单位地址
      changeUnitAddress(e) {
        this.unitInfo.detailed = e
      },

      // 其他服务类目图片上传成功回调
      handleAvatarSuccess_other(res, file) {
        this.imageUrl = `http://${location.host}${preview}/${res.fileid}`
      },
      /*// 单位认证信息资质图片上传成功回调
      handleAvatarSuccess_base(response, file, fileList) {
        // // this.hasUpload = false
        // console.log('response', response)
        // console.log('file', file)
        // console.log('fileList', fileList)
        // // this.imageUrl = `http://${location.host}${preview}/${res.fileid}`
        // // console.log('this.resultList2', this.resultList2[this.index_zz].picture)
        // // this.pinjie = this.resultList2[this.index_zz].picture
        // // console.log('this.pinjie', this.pinjie)
      },
      getIndex(idx) {
        if (this.index_zz) {
          this.index_zz = ''
        }
        this.index_zz = idx
        console.log('this.index_zz', this.index_zz)
      },

      // 其他服务类目图片上传成功回调
      handleAvatarSuccess_other(res, file) {
        this.imageUrl = `http://${location.host}${preview}/${res.fileid}`
      },
      // 提交审核
      submitBaseInfo() {
        this.hasSubmit = true
        const auditQuery = {
          type: '',
          types: 2,
          id: this.unitInfo.id,
          unitname: this.unitInfo.unitname,
          unittype: this.unitType,
          schoolcode: this.unitInfo.schoolcode,
          publicaccountsname: this.unitInfo.publicaccountsname,
          publicaccounts: this.unitInfo.publicaccounts,
          bankStore: this.bankStore,
          unitcontacts: this.unitcontacts,
          unitcontactnumber: this.unitInfo.unitcontactnumber,
          detailed: this.unitInfo.detailed,
          username2: this.unitInfo.username2,
          idcard2: this.unitInfo.idcard2
        }
        this.editUserInfo(auditQuery)
      },
      // 保存信息
      saveInfo(data) {
        switch (data) {
          // 保存单位认证信息
          case 'unitIdentifyInfo':
            const unitindetifyQuery = {
              type: 1,
              types: 1,
              id: this.unitInfo.id,
              unitname: this.unitInfo.unitname,
              unittype: this.unitType,
              schoolcode: this.unitInfo.schoolcode
            }
            this.editUserInfo(unitindetifyQuery)
            break
          // 保存单位基本信息
          case 'unitBaseInfo':
            const unitBaseQuery = {
              type: 2,
              types: 1,
              id: this.unitInfo.id,
              publicaccountsname: this.unitInfo.publicaccountsname,
              publicaccounts: this.unitInfo.publicaccounts,
              bankStore: this.bankStore,
              unitcontacts: this.unitcontacts,
              unitcontactnumber: this.unitInfo.unitcontactnumber,
              detailed: this.unitInfo.detailed
            }
            this.editUserInfo(unitBaseQuery)
            break
          // 保存服务类目
          case 'serviceCategory':
            const serviceQuery = {
              type: 3,
              types: 1,
              id: this.unitInfo.id
            }
            this.editUserInfo(serviceQuery)
            break
          // 保存管理员信息
          case 'ManagerInfo':
            const managerQuery = {
              id: this.unitInfo.userid,
              type: 4,
              types: 1,
              username2: this.unitInfo.username2,
              idcard2: this.unitInfo.idcard2
            }
            this.editUserInfo(managerQuery)
            break
          default:
            break
        }
      },
      // 修改单位名称
      changeUnitName(e) {
        this.unitInfo.unitname = e
      },
      // 改变单位类型
      changeUnitType(e) {
        this.unitType = e
      },
      // 修改统一社会信息代码
      changeSecoiceCode(e) {
        this.unitInfo.schoolcode = e
      },
      // 修改管理员姓名
      changeManageName(e) {
        this.unitInfo.username2 = e
      },
      // 修改管理员身份证号
      changeManageID(e) {
        this.unitInfo.idcard2 = e
      },
      // 修改对公账户名称
      changePcountsname(e) {
        this.unitInfo.publicaccountsname = e
      },
      // 修改对公账户
      changePcountscount(e) {
        this.unitInfo.publicaccounts = e
      },
      // 修改开户行
      changeBankStore(e) {
        this.unitInfo.bankStore = e
      },
      // 修改单位联系人
      changeUnitcontacts(e) {
        this.unitInfo.unitcontacts = e
      },
      // 修改单位联系电话
      changeUnitTel(e) {
        this.unitInfo.unitcontactnumber = e
      },
      // 修改单位地址
      changeUnitAddress(e) {
        this.unitInfo.detailed = e
      },

      // 获取用户基本信息
      getUserInfo() {
        userCenter().then(res => {
          console.log('--' + res);
          if (res.data.success) {
            this.$message({
              message: '请求成功',
              type: 'success'
            })
            if (res.data.resultList.resultList2.length === 0) {q
              this.$message({
                message: '请先登录',
                type: 'error'
              })
            }
            this.unitInfo = res.data.resultList
            this.resultList2 = res.data.resultList.resultList2
            console.log('tjisgewa', this.resultList2)
          }
        })
      },
      // 修改所有用户信息
      editUserInfo(query) {
        editUserCenter(query).then(res => {
          console.log('res', res)
        })
      },
      // 获取字典-----单位类型
      getDictionaryData() {
        console.log("a");
        getDataDictionary('UnitType').then(res => {
          this.unitTypeArr = res.data.list
        })
      },
      // 获取字典-----开户行
      getDictionaryBankData() {
        getDataDictionary('bank').then(res => {
          this.BankArr = res.data.list
        })
      },
      // 获取字典-----服务类目
      getDictionaryService() {
        getSerive().then(res => {
          res.data.datalist.forEach((ele, idx) => {
            this.otherServiceListArr.push(ele.category)
          })
        })
      }
*/
    }
  }
</script>
<style lang="less" scoped>
  .basiUnitinformation {
    background-color: #f7f7f7;
    width: 100%;
    position: relative;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .tebs {

    width: 100%;
    background: white;
  }

  .teb {
    background: white;
    display: flex;
    flex: 1;
  }

  .teb li > span {
    margin-left: 30px;
    line-height: 50px;
  }

  .teb > li {
    cursor: pointer;
  }

  .active {
    color: rgb(97, 163, 254);;
  }

  .content{
    width: 800px;
  }

  .content >li >div{
    padding-top: 20px;
  }

  .basiUnitinformation >ul {
    width: 800px;
    position: relative;
    left: 50%;
    transform: translate(-50%);
    padding-bottom: 32px;
    margin-top: 10px;
  }

  .basiUnitinformation >ul >li {
    background-color: #fff;
    margin-top: 10px;
  }

  .basiUnitinformation >ul >li .essential_information_header {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 0 20px;
    height: 50px;
    border-bottom: 1px solid #ddd;

  }


  .basiUnitinformation ul li .essential_information_header .unit {
    margin: 14px 0;
    border-left: 6px solid #61a3fe;
  }

  .basiUnitinformation ul li .essential_information_header .unit p {
    font-style: normal;
    line-height: 22px;
    margin-left: 13px;
    font-size: 16px;
    font-weight: bold;
    font-family: MicrosoftYaHei-Bold;
  }

  .basiUnitinformation >ul >li .essential_information_header>span {
    line-height: 50px;
  }

  .basiUnitinformation >ul >li .essential_information_header .el-button {
    height: 36px;
    background: rgba(97, 163, 254, 1);
    border-radius: 10px;
    margin-left: -5px;
    font-size: 14px;
    border-color: rgba(97, 163, 254, 1);
  }

  .basiUnitinformation >ul >li .essential_information_header .el-button span {
    display: block;
    margin-top: -1px;
  }

  .basiUnitinformation >ul >li .essential_information_header .button_two {
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

  .basiUnitinformation >ul >li .el-form .el-form-item {
    padding: 0 26px;
    margin-bottom: 0;
    margin-top: 20px;
  }

  .basiUnitinformation >ul >li .el-form .el-form-item .el-form-item__label {
    width: 148px;
  }

  /*.basiUnitinformation >ul >li .el-form .el-form-item:last-child {*/
    /*padding-bottom: 30px;*/
  /*}*/

  .basiUnitinformation >ul >li .el-form .category {
    margin-top: -50px;
  }

  .basiUnitinformation >ul >li .el-form .category p {
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

  .qiye >span {
    margin-left: -7px;
  }

  .basiUnitinformation >ul >li .el-form {
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
<!--<li v-show="teb==0">-->
<!--<div>-->
<!--<el-form label-width="148px">-->
<!--<el-form-item label="单位名称:"-->
<!--prop='unitName'>-->
<!--<el-input :value="unitInfo.unitname"-->
<!--@change="changeUnitName"></el-input>-->
<!--</el-form-item>-->
<!--<el-form-item label="单位类型:"-->
<!--prop='unitType'>-->
<!--<el-select v-model="unitType"-->
<!--@change="changeUnitType">-->
<!--<el-option v-for="(item, index) in unitTypeArr"-->
<!--:value="item.fieldname"-->
<!--:key="index">-->

<!--</el-option>-->
<!--</el-select>-->
<!--</el-form-item>-->
<!--<el-form-item label="统一社会信息代码:"-->
<!--prop='secioceCode'>-->
<!--<el-input :value="unitInfo.schoolcode"-->
<!--@change="changeSecoiceCode"></el-input>-->
<!--</el-form-item>-->
<!--<el-form-item :label="item.qname"-->
<!--v-for="(item, index) in resultList2"-->
<!--:key="index">-->
<!--<div class="business_license"-->
<!--@click="getIndex(index)">-->
<!--<el-upload class="avatar-uploader"-->
<!--:action="upLoadUrl"-->
<!--disabled-->
<!--:show-file-list="false"-->
<!--:on-success="handleAvatarSuccess_base">-->
<!--<img :src="hasUpload?imageUrl+item.picture:imageUrl+item.picture"-->
<!--class="avatar">-->
<!--<i class="avatar-uploader-icon">重新上传</i>-->
<!--</el-upload>-->
<!--</div>-->
<!--</el-form-item>-->
<!--</el-form>-->
<!--</div>-->
<!--<div class="essential_information_header">-->
<!--<span>-->
<!--<el-button type="primary"-->
<!--@click.stop.prevent="saveInfo('unitIdentifyInfo')">保存</el-button>-->
<!--<el-button type="primary"-->
<!--class="button_two"-->
<!--v-show="!hasSubmit"-->
<!--@click.stop.prevent="submitBaseInfo">提交审核</el-button>-->
<!--<el-button type="primary"-->
<!--v-show="hasSubmit"-->
<!--style="background:rgba(221,221,221,1); border:none"-->
<!--class="button_two">审核中</el-button>-->
<!--</span>-->
<!--</div>-->
<!--</li>-->
<!--<li v-show="teb==1">-->
<!--<div>-->
<!--<el-form label-width="148px">-->
<!--<el-form-item label="对公账户名称:">-->
<!--<el-input :value="unitInfo.publicaccountsname"-->
<!--@change="changePcountsname"></el-input>-->
<!--</el-form-item>-->
<!--<el-form-item label="对公账户:">-->
<!--<el-input :value="unitInfo.publicaccounts"-->
<!--@change="changePcountscount"></el-input>-->
<!--</el-form-item>-->
<!--<el-form-item label="开户行:">-->
<!--<el-select v-model="bankStore"-->
<!--@change="changeBankStore">-->
<!--<el-option v-for="item in BankArr"-->
<!--:key='item.value'-->
<!--:value="item.fieldname"-->
<!--:label='item.label'></el-option>-->
<!--</el-select>-->
<!--</el-form-item>-->
<!--<el-form-item label="单位联系人:">-->
<!--<el-input :value="unitInfo.unitcontacts"-->
<!--@change="changeUnitcontacts"></el-input>-->
<!--</el-form-item>-->
<!--<el-form-item label="单位联系电话:">-->
<!--<el-input :value="unitInfo.unitcontactnumber"-->
<!--@change="changeUnitTel"></el-input>-->
<!--</el-form-item>-->
<!--<el-form-item label="单位地址:">-->
<!--<el-input type="textarea"-->
<!--:value="unitInfo.detailed"-->
<!--@change="changeUnitAddress"></el-input>-->
<!--</el-form-item>-->
<!--</el-form>-->
<!--</div>-->
<!--<div class="essential_information_header">-->
<!--<span>-->
<!--<el-button type="primary"-->
<!--@click.stop.prevent="saveInfo('unitBaseInfo')">保存</el-button>-->
<!--</span>-->
<!--</div>-->
<!--</li>-->
<!--<li v-show="teb==2">-->
<!--<div>-->
<!--<el-form label-width="148px">-->
<!--<el-form-item label="是否可接受创新卷:">-->
<!--<el-input disabled-->
<!--:value="unitInfo.isvouchers===1?'是':'否'"></el-input>-->
<!--</el-form-item>-->
<!--<el-form-item label="创新卷服务类目:">-->
<!--</el-form-item>-->
<!--<div class="category">-->
<!--<p>基础应用研究和试验发展服务</p>-->
<!--<p>基础应用研究和试验发展服务</p>-->
<!--</div>-->
<!--<div v-for="(item, index) in otherServiceArr"-->
<!--:key="index">-->
<!--<el-form-item label="其他服务类目:">-->
<!--<el-select v-model="otherService"-->
<!--disabled>-->
<!--<el-option v-for="(item, index) in otherServiceListArr"-->
<!--:key="index"-->
<!--:value="item"></el-option>-->
<!--</el-select>-->
<!--<div class="diku"-->
<!--disabled>-->
<!--<el-upload class="el-upload-other"-->
<!--disabled-->
<!--action="upLoadUrl"-->
<!--:show-file-list="false"-->
<!--:on-success="handleAvatarSuccess_other">-->
<!--<img v-if="imageUrlOther"-->
<!--:src="imageUrlOther"-->
<!--class="avatar">-->
<!--<i v-else-->
<!--class="up_reset">重新上传</i>-->
<!--</el-upload>-->
<!--</div>-->
<!--<div>-->
<!--<el-button type="primary"-->
<!--v-show="index === 0"-->
<!--@click.stop.prevent="otherServiceArr.push('')"-->
<!--class="save_other">新增-->
<!--</el-button>-->
<!--<el-button type="primary"-->
<!--v-show="index !== 0"-->
<!--style="background: #F22F2B;"-->
<!--@click.stop.prevent="otherServiceArr.splice(index,1)"-->
<!--class="save_other">删除-->
<!--</el-button>-->
<!--</div>-->

<!--</el-form-item>-->
<!--</div>-->
<!--</el-form>-->

<!--</div>-->
<!--<div class="essential_information_header">-->
<!--<span>-->
<!--<el-button type="primary"-->
<!--@click.stop.prevent="saveInfo('serviceCategory')">保存</el-button>-->
<!--</span>-->
<!--</div>-->
<!--</li>-->
<!--<li v-show="teb==3">-->
<!--<div>-->
<!--<el-form label-width="148px">-->
<!--<el-form-item label="姓名:">-->
<!--<el-input :value='unitInfo.username2'-->
<!--@change="changeManageName"-->
<!--ref="input1"></el-input>-->
<!--</el-form-item>-->
<!--<el-form-item label="身份证号:">-->
<!--<el-input :value='unitInfo.idcard2'-->
<!--@change="changeManageID"-->
<!--ref="managerIdcard"></el-input>-->
<!--</el-form-item>-->
<!--</el-form>-->
<!--</div>-->
<!--<div class="essential_information_header">-->
<!--<span>-->
<!--<el-button type="primary"-->
<!--@click.stop.prevent="saveInfo('ManagerInfo')">保存</el-button>-->
<!--</span>-->
<!--</div>-->
<!--</li>-->
<!--<li v-show="teb==4">-->
<!--<div>-->
<!--<el-form label-width="148px">-->
<!--<el-form-item label="设备数量:">-->
<!--<el-input disabled-->
<!--:value="unitInfo.sbsl"></el-input>-->
<!--</el-form-item>-->
<!--<el-form-item label="设备相关服务数量:">-->
<!--<el-input disabled-->
<!--:value="unitInfo.jcfwl"></el-input>-->
<!--</el-form-item>-->
<!--<el-form-item label="商业服务数量:">-->
<!--<el-input disabled-->
<!--:value="unitInfo.fjcfwl"></el-input>-->
<!--</el-form-item>-->
<!--<el-form-item label="创新卷接受账户余额:">-->
<!--<el-input disabled-->
<!--:value="unitInfo.accountbalance"></el-input>-->
<!--</el-form-item>-->
<!--<el-form-item label="创新卷消费余额:">-->
<!--<el-input disabled-->
<!--:value="unitInfo.accountbalance2"></el-input>-->
<!--</el-form-item>-->
<!--</el-form>-->
<!--</div>-->
<!--<div class="essential_information_header">-->
<!--</div>-->
<!--</li>-->
