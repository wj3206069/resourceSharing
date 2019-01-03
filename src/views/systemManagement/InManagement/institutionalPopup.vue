<template>
  <div class="common-dialog qualification">
    <el-dialog :title="title"
               :visible.sync="dialogFormVisible">
      <el-form :model="formList"
               ref='formList'
               :rules="rules">
        <el-form-item label="资质名称:"
                      prop='detectaptitude'>
          <el-input placeholder="请输入"
                    v-model='formList.detectaptitude'
                    :disabled="isstateT"></el-input>
        </el-form-item>
        <el-form-item label="资质说明:">
          <el-input placeholder="请输入"
                    v-model='formList.content'
                    :disabled="isstateT"></el-input>
        </el-form-item>
        <el-form-item required
                      label="资质有效期:"
                      class="timen_qualification">
          <el-col :span="11">
            <el-form-item prop="aptitude_sdate"
                          class="component_year">
              <el-date-picker v-model="formList.aptitude_sdate"
                              type="date"
                              placeholder="开始日期"
                              style="width:140px"
                              :disabled="isstateT">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line"
                  :span="2"
                  style="padding: 0 5px;line-height: 36px;">至</el-col>
          <el-col :span="11">
            <el-form-item prop="aptitude_edate"
                          class="component_year">
              <el-date-picker v-model="formList.aptitude_edate"
                              type="date"
                              placeholder="结束日期"
                              style="width:140px"
                              :disabled="isstateT">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <div class="zizi_title">
          <span style="margin-left: 113px"
                :class="isstateT?'zizi_title_s':''"><i class="signal">*</i><i>资质上传:</i>
            <el-upload action="/Sz_dxyq/fileAction/uploadFile"
                       list-type="picture-card"
                       :on-preview="handlePictureCardPreview"
                       :on-remove="handleRemove"
                       :on-success='handleSuccess'
                       :limit="1"
                       :on-exceed="handleExceed"
                       :file-list="fileList"
                       :before-upload="beforeAvatarUpload">
              <p>上传图片</p>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible"
                       class="show_img_s">
              <img width="100%"
                   :src="dialogImageUrl"
                   alt="">
            </el-dialog>
          </span>
        </div>
        <p class="img_fs"
           v-show="img_s_false">请上传图片</p>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button class="submit primary-btn"
                   type="primary"
                   @click="submitForm('formList')">确定</el-button>
        <el-button class="cancel"
                   type="primary"
                   @click="cancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { preview } from '@/api/index'
import { addQualifications, deleteFile } from '@/api/systemManagementApi'
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
    },
    type: {
      type: String
    }
  },
  data () {
    return {
      dialogFormVisible: false, // 弹框
      img_s_false: false, // 图片判断
      isstateT: false,
      formList: {
        aptitude_edate: '', // 检测资质有效期结束时间
        aptitude_sdate: '', // 检测资质有效期起始时间
        detectaptitude: '', //  资质名称
        content: '', // 检测资质说明
        detectaptitude_ids: ''// 资质附件
      },
      dialogImageUrl: '',
      dialogVisible: false, // 图片预览
      preview: `http://${location.host}${preview}/`, // 预览地址
      fileList: [], // 图片
      rules: {
        detectaptitude: [{
          required: true, message: '请输入标题', trigger: 'blur'
        }],
        aptitude_sdate: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        aptitude_edate: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ]
      }

    }
  },
  watch: {
    dialogFormVisible () {
      if (!this.dialogFormVisible) {
        this.$emit('serviceDialog', this.dialogFormVisible)
        this.formList = {
          aptitude_edate: '',
          aptitude_sdate: '',
          detectaptitude: '',
          content: '',
          detectaptitude_ids: ''
        }
        this.fileList = []
        this.$refs['formList'].resetFields()
      }
    },
    showDialog () {
      this.dialogFormVisible = this.showDialog
      if (this.showDialog) {

      }
    },
    title () {
      this.title = this.title
    },
    // 监听编辑、查看详情当前行的信息
    row () {
      if (this.title === '详情-机构资质') {
        this.formList = this.row
        this.fileList.push({ url: `${preview}/` + this.row.detectaptitude_ids })
      }
    },
    isstate () {
      this.isstateT = this.isstate
    }

  },
  methods: {
    // 图片 start------------------------
    // handleRemove (file, fileList) {
    //   console.log(file, fileList)
    //   this.fileList = []
    //   this.formList.detectaptitude_ids = ''
    // },
    handleRemove (file) {
      let id = file.response.id
      deleteFile(id).then(res => {
        console.log(res.data)
        this.fileList = []
        this.formList.detectaptitude_ids = ''
      })
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      // const isPNG = file.type === 'image/PNG'
      console.log(file.type)

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG格式!')
      }
      return isJPG
    },
    handlePreview (file, fileList) {
    },
    handleSuccess (response, file, fileList) {
      this.formList.detectaptitude_ids = fileList[0].response.fileid
      if (this.formList.detectaptitude_ids !== '') {
        this.img_s_false = false
      }
    },

    handleExceed (files, fileList) {
      console.log(fileList)
      this.$message.warning(`当前限制选择 1个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    // 图片end----------------------

    // 确定
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.formList.detectaptitude_ids === '') {
            this.img_s_false = true
            return false
          }
          this.formList.aptitude_edate = this.$moment(this.formList.aptitude_edate).format('YYYY-MM-DD')
          this.formList.aptitude_sdate = this.$moment(this.formList.aptitude_sdate).format('YYYY-MM-DD')
          this.cancel()
          addQualifications(this.formList).then(res => {
            if (res.data.success) {
              this.$message.success('新增成功')
            } else {
              this.$message.error('新增失败')
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    cancel () {
      console.log('取消')
      this.$emit('serviceDialog', false)
    }

  }
}
</script>
<style>
.qualification
  .el-dialog__wrapper
  .el-dialog
  .el-dialog__body
  .qualification
  .el-form-item__content {
  margin-left: 0;
}
</style>




