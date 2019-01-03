<template>
  <div class="add-equip">
    <el-dialog :title="add_dialog_title"
               :visible.sync="dialogFormVisible">
      <!-- 第一步 start -->
      <el-form :model="form1"
               :rules='rules1'
               ref="ruleForm1"
               v-show="title=='详情'">
        <el-form-item label="用户名"
                      prop="address">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="身份证号"
                      prop="address">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="性别"
                      prop="address">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="生日"
                      prop="address">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="手机号"
                      prop="address">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="头像："
                      prop="address">
          <!-- <el-input></el-input> -->
          <img src="../../../assets/images/avator.png"
               alt="">
        </el-form-item>
        <el-form-item label="个人邮箱"
                      prop="address">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="QQ号"
                      prop="address">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="微信号"
                      prop="address">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="银行账户"
                      prop="address">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="开户行"
                      prop="address">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="详细地址"
                      prop="address">
          <el-input type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="紧急联系人"
                      prop="address">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="紧急联系人电话"
                      prop="address">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="公司名称 "
                      prop="address">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="管理职务 "
                      prop="address">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="个人职务 "
                      prop="address">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="是否专家 "
                      prop="address">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="专家职称 "
                      prop="address">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="学科 "
                      prop="address">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="技术领域"
                      prop="address">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="公司名称 "
                      prop="address">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="登录账号 "
                      prop="address">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="登录密码 "
                      prop="address">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="职称证书 "
                      prop="address">
          <!-- <el-input></el-input> -->
          <img src="../../../assets/images/yyzz.png"
               alt="">
        </el-form-item>
        <el-form-item label="其他资质 "
                      prop="address">
          <img src="../../../assets/images/yyzz.png"
               alt="">
        </el-form-item>

        <div class="flex bot_login">
          <span>微信授权登录：已绑定</span>

          <span>支付宝授权登录：已绑定</span>
        </div>
        <div class="flex bot_login">

          <span>QQ授权登录：已绑定</span>
          <span>系统账户授权登录：已绑定</span>
        </div>
        <!-- <el-checkbox-group v-model="checkList"> -->
        <el-checkbox style="margin-left:29%"
                     label="禁用该用户"></el-checkbox>
        <div class="zx-flex end">

          <el-button type="primary"
                     round>保存</el-button>
          <el-button type="info"
                     round>取消</el-button>
        </div>
        <!-- </el-checkbox-group> -->
      </el-form>
      <!-- 详情 end -->

      <!-- 新增 start -->
      <el-form :model="form2"
               :rules="rules2"
               v-show="title=='新增'">

        <el-form-item label="用户名称："
                      prop="tureName">
          <el-input :disabled="isDesable"
                    auto-complete="off"
                    placeholder="请输入真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="身份证号："
                      prop="iDNum">
          <el-input :disabled="isDesable"
                    auto-complete="off"
                    placeholder="请输入用户真实身份证号">
            <!-- <el-button type="primary">
              验证
            </el-button> -->
          </el-input>
          <el-button type="primary"
                     style="position: absolute; right: 0;height: 36px;"
                     round>验证</el-button>
        </el-form-item>
        <el-form-item label="性别：">
          <el-input :disabled="isDesable"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="生日">
          <el-input :disabled="isDesable"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <el-upload class="avatar-uploader"
                     action="https://jsonplaceholder.typicode.com/posts/"
                     :show-file-list="false"
                     :on-success="handleAvatarSuccess"
                     :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl"
                 :src="imageUrl"
                 class="avatar">
            <i v-else
               class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="手机号"
                      prop="phone">
          <el-input :disabled="isDesable"
                    auto-complete="off"
                    placeholder="请输入用户手机号"></el-input>
        </el-form-item>
        <el-form-item label="个人邮箱"
                      prop="mail">
          <el-input :disabled="isDesable"
                    auto-complete="off"
                    placeholder="请输入用户邮箱号"></el-input>
        </el-form-item>
        <el-form-item label="QQ号"
                      prop="qq">
          <el-input :disabled="isDesable"
                    auto-complete="off"
                    placeholder="请输入用户QQ号"></el-input>
        </el-form-item>
        <el-form-item label="微信号"
                      prop="wxNum">
          <el-input :disabled="isDesable"
                    auto-complete="off"
                    placeholder="请输入用户微信号"></el-input>
        </el-form-item>
        <el-form-item label="银行账号">
          <el-input :disabled="isDesable"
                    auto-complete="off"
                    placeholder="请输入用户银行账号"></el-input>
        </el-form-item>
        <el-form-item label="开户行">
          <el-select v-model="value"
                     multiple
                     collapse-tags
                     placeholder="请选择开户行">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="详细地址">
          <div class="zx-flex "
               style="margin-bottom: 20px;">
            <el-select v-model="value"
                       multiple
                       collapse-tags
                       style="width:87px"
                       placeholder="省份">
              <el-option v-for="item in options"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="value"
                       multiple
                       collapse-tags
                       style="margin-left: 20px; width:87px"
                       placeholder="城市">
              <el-option v-for="item in options"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="value"
                       multiple
                       collapse-tags
                       style="margin-left: 20px; width:87px"
                       placeholder="区县">
              <el-option v-for="item in options"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </div>
          <el-input :disabled="isDesable"
                    auto-complete="off"
                    placeholder="请输入详细地址信息"></el-input>
        </el-form-item>
        <el-form-item label="紧急联系人">
          <el-input :disabled="isDesable"
                    auto-complete="off"
                    placeholder="请输入紧急联系人姓名"></el-input>
        </el-form-item>
        <el-form-item label="紧急联系人电话">
          <el-input :disabled="isDesable"
                    auto-complete="off"
                    placeholder="请输入紧急联系人电话"></el-input>
        </el-form-item>
        <el-form-item label="公司名称">
          <el-input :disabled="isDesable"
                    auto-complete="off"
                    placeholder="请输入用户公司名称"></el-input>
        </el-form-item>
        <el-form-item label="管理职务">
          <el-select v-model="value"
                     multiple
                     collapse-tags
                     placeholder="请选择管理职务">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="个人职务">
          <el-input :disabled="isDesable"
                    auto-complete="off"
                    placeholder="请输入用户个人职务"></el-input>
        </el-form-item>
        <el-form-item label="专家职称">
          <div class="zx-flex">
            <el-select v-model="value"
                       prop="zhichen"
                       multiple
                       collapse-tags
                       style="width:140px; margin-right:20px"
                       placeholder="请选择职称级别">
              <el-option v-for="item in options"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
            <el-input :disabled="isDesable"
                      prop="phone"
                      style="width:140px"
                      auto-complete="off"
                      placeholder="请输入专家职称"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="学科"
                      prop="peoject">
          <el-input :disabled="isDesable"
                    auto-complete="off">
          </el-input>
          <el-button type="info"
                     style=" position: absolute;right: 0;  height: 36px;"
                     round>选择学科</el-button>
        </el-form-item>
        <el-form-item label="技术领域">
          <el-input :disabled="isDesable"
                    auto-complete="off"></el-input>
          <el-button type="info"
                     class="sleTecArea"
                     round>选择技术领域</el-button>
        </el-form-item>
        <el-form-item label="登录账号"
                      prop="userNum">
          <el-input :disabled="isDesable"
                    auto-complete="off"
                    placeholder="请设置登录账号"></el-input>
        </el-form-item>
        <el-form-item label="登录密码"
                      prop="userPwd">
          <el-input :disabled="isDesable"
                    auto-complete="off"
                    placeholder="请设置登录密码"></el-input>
        </el-form-item>
        <div class="zx-flex end">

          <el-button type="primary"
                     round>保存</el-button>
          <el-button type="info"
                     round>取消</el-button>
        </div>
      </el-form>

    </el-dialog>
  </div>
</template>
<script>
// import Map from '@/components/map/index'
import { getSessios } from '@/until/storage'
import {
  companyInfo,
  addEquipment,
  editEquipment,
  getUserInfo,
  deleteFile,
  editDetail,
  companyInfoPlat,
  getUserInfoPlat,
  addEquipmentPlat,
  editEquipmentPalt,
  editDetailPalt
} from '@/api/EquipService/EquipManagerAPI.js'

export default {
  // components: { Map },
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    // 是否可编辑    true:不可编辑   false 可编辑
    isDesable: {
      type: Boolean
    },
    // dialog标题
    title: {
      type: String
    },
    // 父组件传过来的编辑、查看详情当前行的信息
    row: {
      type: Object
    }
  },
  watch: {
    // 监听内部弹框变量
    dialogFormVisible () {
      if (!this.dialogFormVisible) {
        this.$emit('closeAddDialog', this.dialogFormVisible)
        // 让step重置为1，保证下次进来的是第一步
        this.step = 1
      }
    },
    // 监听外部传进来的弹框变量
    showDialog () {
      this.dialogFormVisible = this.showDialog
      // 弹框显示时判断当前是哪一步，显示哪一步的内容
      this.show_hidden_form()
    },
    // 监听编辑状态变量
    isDesable () {
      if (this.isDesable) {
        this.btn_title = '下一步'
      } else {
        this.btn_title = '暂存进入下一步'
      }
    },
    // 监听dialog标题变量
    title () {
      // 刚进来时是哪一步就改变哪一步的title
      if (this.step === 1) {
        this.add_dialog_title = this.title + '-专家'
      }
      if (this.step === 2) {
        this.add_dialog_title = this.title + '-联系方式'
      }
      if (this.step === 3) {
        this.add_dialog_title = this.title + '-仪器信息'
      }
    },
    // 监听编辑、查看详情当前行的信息
    row () {
      console.log('this/data', this.title)
      // this.isAdd = this.title
      if (this.title === '新增') return
      if (getSessios('role') === 1) {
        editDetail({
          id: this.row.row.id
        }).then(res => {
          const data = res.data
          if (data.success) {
            this.initForm(data)
          }
        })
      } else {
        editDetailPalt({
          id: this.row.row.id
        }).then(res => {
          const data = res.data
          if (data.success) {
            this.initForm(data)
          }
        })
      }
    }
  },
  data () {
    return {
      // 判断是不是新增
      imageUrl: '',
      dialogFormVisible: false,
      // 图片列表
      fileList2: [],
      // 图片上传额外参数
      picObj: {
        MultipartFile: ''
      },
      // 文件列表
      fileList3: [],
      // 文件上传额外参数
      fileObj: {
        MultipartFile: ''
      },
      // 表单1
      form1: {
        username: '张三',
        unit_id: '',
        platform_id: '',
        address: ''
      },
      companyList: [],   // 所属单位
      addId: '',         // 添加第一步时候的id
      subclassList: [],   // 设备小类列表
      // 表单1规则
      rules1: {
        unit_id: [
          { required: true, message: '请选择所属单位', trigger: 'blur' }
        ],
        platform_id: [
          { required: false, message: '请选择所属创新载体', trigger: 'blur' }
        ],
        address: [
          { required: false, message: '请输入试验地址', trigger: 'blur' }
        ]
      },
      // 表单2
      form2: {
        id: '',             // 提交的时候需要
        principal_id: '',   // 负责人
        operate: '',        //
        tureName: '',          // 真实姓名
        iDNum: '',          // 身份证号
        peoject: '',
        zhichen: '',
        phone: '', // 电话号
        userNum: '', // 用户名
        userPwd: ''// 密码
      },
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: '',
      // 表单2规则
      rules2: {
        principal_id: [
          { required: true, message: '请选择负责人', trigger: 'blur' }
        ],
        operate: [
          { required: false, message: '请选择操作员', trigger: 'blur' }
        ],
        tureName: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' }
        ],
        iDNum: [
          { required: true, message: '请输入用户真实身份证号', trigger: 'blur' }
        ],
        peoject: [
          { required: true, message: '请输入学科', trigger: 'blur' }
        ],
        userNum: [
          { required: true, message: '请设置登录账号', trigger: 'blur' }
        ],
        userPwd: [
          { required: true, message: '请设置登录密码', trigger: 'blur' }
        ],
        zhichen: [
          { required: true, message: '请输入专家职称', trigger: 'blur' }

        ]
      },
      userInfo: [],      // 人员信息
      // 表单3
      form3: {
        id: '',                 // 提交的时候需要
        cname: '',              // 设备中文名称
        ename: '',              // 设备英文名称
        reviewno: '',           // 评议编号
        classify: '',           // 设备分类
        subclass: '',           // 设备小类
        sharingtype: '',        // 共享类型
        specification: '',      // 型号规格
        origin: '',             // 设备产地
        manufacturer: '',       // 制造厂商
        price: '',              // 设备单价
        acquisitiondate: '',    // 购置日期
        standard: '',           // 标准工作时长
        indicator: '',          // 技术指标
        function: '',          // 主要功能
        picture_ids: '',        // 图片
        attachment_ids: '',     // 附件
        operation_requirements: '' // 上级操作要求
      },
      // 表单3规则
      rules3: {
        cname: [
          { required: true, message: '请输入设备中文名称', trigger: 'blur' }
        ],
        ename: [
          { required: false, message: '请输入活动名称', trigger: 'blur' }
        ],
        reviewno: [
          { required: false, message: '请输入活动名称', trigger: 'blur' }
        ],
        classify: [
          { required: true, message: '请选择设备分类', trigger: 'blur' }
        ],
        subclass: [
          { required: true, message: '请选择设备小类', trigger: 'blur' }
        ],
        sharingtype: [
          { required: true, message: '请选择共享类型', trigger: 'blur' }
        ],
        specification: [
          { required: false, message: '请输入活动名称', trigger: 'blur' }
        ],
        origin: [
          { required: false, message: '请输入活动名称', trigger: 'blur' }
        ],
        manufacturer: [
          { required: false, message: '请输入活动名称', trigger: 'blur' }
        ],
        price: [
          { required: false, message: '请输入活动名称', trigger: 'blur' }
        ],
        acquisitiondate: [
          { required: false, message: '请输入活动名称', trigger: 'blur' }
        ],
        standard: [
          { required: false, message: '请输入活动名称', trigger: 'blur' }
        ],
        indicator: [
          { required: false, message: '请输入活动名称', trigger: 'blur' }
        ],
        function: [
          { required: true, message: '请描述主要功能', trigger: 'blur' }
        ],
        operation_requirements: [
          { required: false, message: '请输入活动名称', trigger: 'blur' }
        ]
      },
      show: {
        form1: {
          show: true,
          save: true,
          save_step: true,
          prevStep: false,
          submit: false
        },
        form2: {
          show: false,
          prevStep: true,
          save: true,
          save_step: true,
          submit: false
        },
        form3: {
          show: false,
          prevStep: true,
          submit: true,
          save_step: false,
          save: false
        }
      },
      form_button: {},
      value1: '',
      step: 1,  // 记录步骤
      dialogImageUrl: '',
      dialogVisible: false,
      add_dialog_title: '',
      btn_title: '暂存进入下一步'

    }
  },
  created () {
    //  用户角色假数据 1:机构 2:平台
    if (getSessios('role') === 1) {
      // 获取下拉框单位信息
      companyInfo().then(res => {
        const data = res.data
        if (data.success) {
          console.log(data)
          this.companyList = data.unitinformation
        }
      })
      // 获取人员信息
      getUserInfo().then(res => {
        let data = res.data
        if (data.success) {
          this.userInfo = data.unitinformationlist
        }
      })
    } else {
      // 获取下拉框单位信息
      companyInfoPlat().then(res => {
        const data = res.data
        if (data.success) {
          console.log(data)
          this.companyList = data.unitinformation
        }
      })
      // 获取人员信息
      getUserInfoPlat().then(res => {
        let data = res.data
        if (data.success) {
          this.userInfo = data.unitinformationlist
        }
      })
    }
  },
  mounted () {
    // 默认显示第一步
    this.form_button = this.show.form1
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
    },
    closeDialog () {
      this.$emit('closeAddDialog', false)
    },
    // 限制图片上传
    exceedFile (files, fileList) {
      this.$message.warning(`最多只能上传9张图片`)
    },
    // 图片上传额外参数赋值
    pictureLoading (file) {
      this.picObj.MultipartFile = file
    },
    // 图片删除
    picRemove (file, fileList) {
      deleteFile(file.response.fileid).then(res => {
        const data = res.data
        if (data.success) {
          let piclist = this.form3.picture_ids.split(',')
          for (let i = 0; i < piclist.length; i++) {
            if (file.response.fileid === piclist[i]) {
              piclist.splice(i, 1)
              this.form3.picture_ids = piclist.join(',')
              break
            }
          }
        }
      })
    },
    // 图片上传成功回调
    picSuccess (response, file, fileList) {
      this.form3.picture_ids = this.form3.picture_ids + ',' + response.fileid
    },
    // 文件上传额外参数赋值
    fileLoading (file) {
      this.fileObj.MultipartFile = file
    },
    // 文件上传成功回调
    fileSuccess (response, file, fileList) {
      this.form3.attachment_ids = this.form3.attachment_ids + ',' + response.fileid
    },
    // 文件删除,清除form3表单里面绑定的值
    fileRemove (file, fileList) {
      deleteFile(file.response.fileid).then(res => {
        const data = res.data
        if (data.success) {
          let fileIds = this.form3.attachment_ids.split(',')
          for (let i = 0; i < fileIds.length; i++) {
            if (file.response.fileid === fileIds[i]) {
              fileIds.splice(i, 1)
              this.form3.attachment_ids = fileIds.join(',')
              break
            }
          }
        }
      })
    },
    // 上一步
    prevStep () {
      console.log('上一步')
      this.step--
      this.show_hidden_form()
    },
    // 暂存
    save () {
      this.$refs['formName1'].resetFields()
      // console.log('暂存')
      // console.log(this.form2)
    },
    // 暂存进入下一步
    save_step () {
      console.log('暂存进入下一步')
      // 如果是查看详情，直接下一步，无需提交数据
      if (this.isDesable) {
        this.step++
        this.show_hidden_form()
        return
      }
      this.save_submit()
    },
    // 提交
    submitData () {
      console.log('提交')
      console.log(this.form3)
      this.save_submit()
    },
    // 取消
    cancel () {
      console.log('取消')
      this.$emit('closeAddDialog', false)
    },
    // 显示或隐藏form表单
    show_hidden_form () {
      switch (this.step) {
        case 1:
          this.form_button = this.show.form1
          this.show.form3.show = false
          this.show.form2.show = false
          this.show.form1.show = true
          this.add_dialog_title = this.title + '-单位信息'
          break
        case 2:
          this.form_button = this.show.form2
          this.show.form3.show = false
          this.show.form2.show = true
          this.show.form1.show = false
          this.add_dialog_title = this.title + '-联系方式'
          break
        case 3:
          this.form_button = this.show.form3
          this.show.form3.show = true
          this.show.form2.show = false
          this.show.form1.show = false
          this.add_dialog_title = this.title + '-仪器信息'
          break
        default:
          break
      }
    },
    // 暂存或者保存
    save_submit () {
      switch (this.step) {
        case 1:
          if (this.form1.unit_id === '') {
            return
          }
          if (getSessios('role') === 1) {
            addEquipment(this.form1).then(res => {
              const data = res.data
              if (data.success) {
                this.addId = data.id
                this.step++
                this.show_hidden_form()
              }
            })
          } else {
            addEquipmentPlat(this.form1).then(res => {
              const data = res.data
              if (data.success) {
                this.addId = data.id
                this.step++
                this.show_hidden_form()
              }
            })
          }
          break
        case 2:
          // 提交第二步的数据
          this.form2.id = this.addId

          // 重新用一个变量赋值为form2，因为要将多选数组切割成字符串，返回上一步会出问题
          let form2 = JSON.parse(JSON.stringify(this.form2))
          form2.operate = form2.operate.join(',')
          console.log(form2)
          if (getSessios('role') === 1) {
            editEquipment(form2).then(res => {
              const data = res.data
              if (data.success) {
                this.step++
                this.show_hidden_form()
              }
            })
          } else {
            editEquipmentPalt(form2).then(res => {
              const data = res.data
              if (data.success) {
                this.step++
                this.show_hidden_form()
              }
            })
          }

          break
        case 3:
          // 提交第三步的数据
          this.form3.id = this.addId
          if (getSessios('role') === 1) {
            editEquipment(this.form3).then(res => {
              const data = res.data
              if (data.success) {
                this.$emit('closeAddDialog', false)
              }
            })
          } else {
            editEquipmentPalt(this.form3).then(res => {
              const data = res.data
              if (data.success) {
                this.$emit('closeAddDialog', false)
              }
            })
          }
          break
        default:
          break
      }
    },
    // 编辑或者查看详情时给表单赋值
    initForm (val) {
      this.form1.unit_id = val.instrumentin.unit_id
      this.form1.platform_id = val.instrumentin.platform_id
      this.form1.address = val.instrumentin.address
      this.form2.id = val.instrumentin.id
      this.form2.principal_id = val.instrumentin.principal_id
      if (val.instrumentin.operate) {
        this.form2.operate = val.instrumentin.operate
      }
      this.form2.tureName = val.instrumentin.tureName
      this.form2.iDNum = val.instrumentin.iDNum
      this.form3.id = val.instrumentin.id
      this.form3.cname = val.instrumentin.cname
      this.form3.ename = val.instrumentin.ename
      this.form3.reviewno = val.instrumentin.reviewno
      this.form3.classify = val.instrumentin.classify
      this.form3.subclass = val.instrumentin.subclass
      this.form3.sharingtype = val.instrumentin.sharingtype
      this.form3.specification = val.instrumentin.specification
      this.form3.origin = val.instrumentin.origin
      this.form3.manufacturer = val.instrumentin.manufacturer
      this.form3.price = val.instrumentin.price
      // this.form3.acquisitiondate = val.instrumentin.acquisitiondate
      this.form3.standard = val.instrumentin.standard
      this.form3.indicator = val.instrumentin.indicator
      this.form3.function = val.instrumentin.function
      this.form3.operation_requirements = val.instrumentin.operation_requirements
      // this.form3.picture_ids = val.instrumentin.picture_ids
      // this.form3.attachment_ids = val.instrumentin.attachment_ids
    }
  }
}
</script>
<style lang="less">
.add-equip {
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
  .bot_login {
    justify-content: space-around;
    line-height: 40px;
    height: 40px;
  }
  .el-dialog {
    position: absolute;
    top: 90px;
    right: 0;
    width: 600px;
    height: calc(100vh - 90px);
    margin: 0 !important;
    border-radius: 0;

    .el-dialog__header {
      background-color: white;
      border-radius: 0;
      padding: 13px 20px;
      border-bottom: 1px solid #dddddd;

      .el-dialog__title {
        color: #474747;
        font-size: 16px;
      }

      i {
        color: #939393;
      }
    }

    .el-dialog__body {
      height: 78vh;
      padding-top: 30px;
      padding-right: 110px;
      overflow-y: auto;

      .el-form-item {
        margin-bottom: 18px;

        .el-form-item__label {
          width: 190px;
          text-align: right;
        }

        .el-form-item__content {
          margin-left: 190px !important;
          width: 300px;
          flex-wrap: wrap;

          .el-select {
            width: 300px;
          }

          input {
            height: 36px;
            border-color: #dddddd;
          }

          textarea {
            border-color: #dddddd;
            height: 100px;
          }

          .el-cascader__label {
            line-height: 40px;
          }

          .el-date-editor {
            width: 300px;
          }

          .picture-list,
          .file-list {
            width: 100%;

            .upload-demo {
              .el-upload--text {
                width: auto;

                button {
                  background-color: #eeeeee;
                  border-color: #eeeeee;
                  color: #474747;
                }
              }

              a {
                height: 20px;
              }

              li {
                margin: 0;
              }
            }
          }

          .map {
            margin-top: 10px;
            width: 300px;
            height: 300px;
            border: 1px solid #dddddd;
          }
        }

        .picture,
        .file {
          width: 300px;
          height: 36px;
          border: 1px solid #dddddd;
          line-height: 35px;
          padding-left: 5px;

          button {
            padding: 7px 22px;
            background-color: #dddddd;
            border: none;
            border-radius: 4px;
          }
        }
        .sleTecArea {
          position: absolute;
          right: 0px;
          width: 104px;
          height: 36px;
          display: flex;
          justify-content: center;
        }
        .el-upload {
          padding-top: 5px;
          padding-bottom: 10px;
        }

        .el-upload--picture {
          width: 82px;

          button {
            background-color: #eeeeee;
            color: #474747;
            border-color: #eeeeee;
          }
        }

        .el-upload-list--picture {
          display: flex;
          flex-wrap: wrap;

          .el-upload-list__item {
            width: 100px;
            padding: 10px 10px 10px 88px;
          }
        }
      }
    }

    .el-dialog__footer {
      padding-top: 14px;
      padding-bottom: 14px;
      border-top: 1px solid #dddddd;

      .dialog-footer {
        .prev-step {
          border-radius: 10px;
          border: none;
          background-color: #61a3fe;
          padding: 11px 19px;
        }

        .submit {
          border: none;
          border-radius: 10px;
          background-color: #61a3fe;
          padding: 11px 26px;
        }

        .cancel {
          background-color: #cccccc;
          border: none;
          border-radius: 10px;
          padding: 11px 26px;
        }
      }
    }
  }
}

.el-select-dropdown__wrap.el-scrollbar__wrap {
  margin-bottom: 0 !important;
}

::-webkit-scrollbar {
  display: none;
}
</style>