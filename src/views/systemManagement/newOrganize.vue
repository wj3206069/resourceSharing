<template>
  <div class="common-dialog organization_data">
    <el-dialog :title="title"
               :visible.sync="dialogFormVisible">
      <el-form :model="science_form"
               ref='science_form'
               :rules="rules">
        <el-form-item label="用户名:"
                      prop='nickname'>
          <el-input placeholder="请输入"
                    v-model='science_form.nickname'
                    :disabled="viewdisable"></el-input>
        </el-form-item>
        <el-form-item label="头像:">
          <div class="img_s">
            <el-upload action="/Sz_dxyq/fileAction/uploadFile"
                       list-type="picture"
                       :on-preview="handlePreview"
                       :on-remove="handleRemove"
                       :on-success='handleSuccess'
                       :limit="1"
                       :on-exceed="handleExceed"
                       :file-list="fileList"
                       :disabled="viewdisable">
              <span class="">选择图片</span>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="部门:">
          <el-input disabled
                    v-model="science_form.deptname"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码:"
                      prop='idcard'>
          <el-input placeholder="请输入证件号码"
                    v-model="science_form.idcard"
                    :disabled="viewdisable"></el-input>
        </el-form-item>
        <el-form-item label="性别:">
          <el-select v-model="science_form.sex"
                     :disabled="viewdisable">
            <el-option :label="item.label"
                       :value="item.value"
                       v-for="(item,index) in sexList"
                       :key='index'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期:">
          <div class="block">
            <el-date-picker v-model="science_form.birthday"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            :disabled="viewdisable">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="手机号:"
                      prop='phone'>
          <el-input placeholder="请输入手机号"
                    v-model="science_form.phone"
                    :disabled="viewdisable"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:"
                      prop='email'>
          <el-input placeholder="请输入邮箱"
                    v-model="science_form.email"
                    :disabled="viewdisable"></el-input>
        </el-form-item>
        <el-form-item label="QQ号:"
                      prop='qq'>
          <el-input placeholder="请输入QQ号"
                    v-model="science_form.qq"
                    type='qq'
                    :disabled="viewdisable"></el-input>
        </el-form-item>
        <el-form-item label="微信号:">
          <el-input placeholder="请输入微信号"
                    v-model="science_form.wechatNumber"
                    :disabled="viewdisable"></el-input>
        </el-form-item>
        <el-form-item label="登陆账号:"
                      prop='account'>
          <el-input placeholder="请输入账号"
                    v-model="science_form.account"
                    :disabled="viewdisable"></el-input>
        </el-form-item>
        <el-form-item label="登陆密码:"
                      prop='password'
                      v-if="this.title === '新增-用户信息'">
          <el-input placeholder="请输入密码"
                    v-model="science_form.password"
                    type='password'></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button class="submit primary-btn"
                   type="primary"
                   @click="submitForm('science_form')"
                   v-if='!viewdisable'>确定</el-button>
        <el-button class="cancel"
                   type="primary"
                   @click="cancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { preview } from '@/api/index'
import { editUserInfo, deleteFile, addUserInfo } from '@/api/systemManagementApi'

export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    // 标题
    title: {
      type: String
    },
    // 单条数据源
    row: {
      type: Object
    },
    // 状态
    isstate: {
      type: Boolean
    }
  },
  data () {
    return {
      fileList: [],
      // editorFalse: false, // 编辑时某些内容不能更改
      sexList: [{
        value: '1',
        label: '男'
      }, {
        value: '2',
        label: '女'
      }],
      viewdisable: false, // 显示隐藏内容与禁用
      dialogFormVisible: false,
      rules: { nickname: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        idcard: [{ required: true, message: '请输入身份证号', trigger: 'blur' }, { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入有效证件号', trigger: 'blur' }
        ],
        account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        email: [{ required: false, message: '请输入邮箱地址', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }],
        phone: [{ required: false, pattern: /^1[345789]\d{9}$/, message: '请输入有效的手机号', trigger: 'blur' }]
      },
      science_form: {
        nickname: '', // 姓名,
        headPortrait: '', // 头像,
        unit_id: '', // 单位id,
        dept: '', // 部门id，
        deptname: this.row.name, // 部门名字
        email: '', // 邮箱
        idcard: '', // 身份证号，
        sex: '', // 性别 1男  2女，
        birthday: '', // 出生日期，
        roleid: '', // 角色id，
        phone: '', // 手机号，
        qq: '', // qq，
        wechatNumber: '', // 微信号,
        account: '', // 登录账号,
        password: ''// 登陆密码
      }
    }
  },
  watch: {
    dialogFormVisible () {
      if (!this.dialogFormVisible) {
        this.$emit('serviceDialog', this.dialogFormVisible)
        this.science_form = {
          nickname: '', // 姓名,
          headPortrait: '', // 头像,
          unit_id: '', // 单位id,
          dept: '', // 部门id，
          deptname: this.row.name, // 部门名字
          email: '', // 邮箱
          idcard: '', // 身份证号，
          sex: '', // 性别 1男  2女，
          birthday: '', // 出生日期，
          roleid: '', // 角色id，
          phone: '', // 手机号，
          qq: '', // qq，
          wechatNumber: '', // 微信号,
          account: '', // 登录账号,
          password: '', //
          preview: `http://${location.host}${preview}/` // 预览地址
        }
        this.science_form.headPortrait = ''
        this.fileList = []
        this.$refs['science_form'].resetFields()
      }
    },
    showDialog () {
      if (this.showDialog) this.science_form.deptname = this.row.name
      this.dialogFormVisible = this.showDialog
      if (this.showDialog) {
        this.science_form.dept = this.row.dept
        this.science_form.unit_id = this.row.unit_id
        this.science_form.deptname = this.row.name
      }
    },

    title () {
      console.log(this.title)
    },
    // 监听编辑、查看详情当前行的信息
    row () {
      if (this.title === '新增-用户信息') {
        console.log(this.science_form)
      } else if (this.title === '编辑-用户信息') {
        this.editPublic()
      } else if (this.title === '详情-用户信息') {
        this.editPublic()
      }
    },
    isstate () {
      this.viewdisable = this.isstate
    }
  },
  created () {
    console.log('执行？')

    console.log(this.row)
  },
  methods: {
    // 编辑详情公共的
    editPublic () {
      let organizationrow1 = JSON.parse(sessionStorage.getItem('organizationrow1'))
      this.science_form.deptname = organizationrow1.name
      this.science_form.idcard = this.row.idcard
      this.science_form.sex = this.row.sex
      this.science_form.birthday = this.row.birthday
      this.science_form.phone = this.row.phone
      this.science_form.qq = this.row.qq
      this.science_form.wechatNumber = this.row.wechatnumber
      this.science_form.account = this.row.account
      this.science_form.email = this.row.personalmailbox
      this.science_form.id = this.row.id
      this.science_form.nickname = this.row.username
      this.science_form.headPortrait = this.row.headportrait
      if (this.row.headportrait !== null && this.row.headportrait !== '') {
        this.fileList.push({ url: `${preview}/` + this.row.headportrait })
      }
    },
    // 头像-------------
    handleRemove (file) {
      // let id = file.uid
      let id = this.science_form.headPortrait
      console.log(id)
      deleteFile(id).then(res => {
        console.log(res.data)
      })
    },
    handlePreview (file, fileList) {
    },
    handleSuccess (response, file, fileList) {
      this.science_form.headPortrait = fileList[0].response.fileid
      console.log(this.science_form.headPortrait)
    },
    handleExceed (files, fileList) {
      console.log(fileList)
      this.$message.warning(`当前限制选择 1个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    //  服务图片上传end----------
    cancel () {
      console.log('取消')
      this.$emit('serviceDialog', false)
      this.fileList = []
    },
    // 确定
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.title === '新增-用户信息') {
            console.log(this.science_form)
            addUserInfo(this.science_form).then(res => {
              if (res.data.success) {
                this.$message.success('新增成功')
              } else {
                this.$message.error('新增失败')
              }
              this.cancel()
            })
            this.cancel()
          } else if (this.title === '编辑-用户信息') {
            if (this.science_form.sex === '女') {
              this.science_form.sex = 2
            } else if (this.science_form.sex === '男') {
              this.science_form.sex = 1
            }
            editUserInfo(this.science_form).then(res => {
              if (res.data.success) {
                this.$message.success('编辑成功')
              } else {
                this.$message.error('编辑失败')
              }
              this.cancel()
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }

  }
}
</script>
<style>
.organization_data .img_s .el-upload {
  background-color: #eee;
  width: 100px;
  height: 30px;
  line-height: 16px;
}
</style>

