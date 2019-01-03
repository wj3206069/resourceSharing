<template>
  <div class="common-dialog">
    <el-dialog :title="title"
               :visible.sync="dialogFormVisible">
      <el-form :model="science_form"
               ref='science_form'
               :rules="rules">
        <el-form-item label="标题:"
                      prop='title'>
          <el-input placeholder="请输入"
                    v-model='science_form.title'
                    :disabled="viewdisable"></el-input>
        </el-form-item>
        <el-form-item label="信息来源:"
                      v-if="sourceinformation">
          <el-input placeholder="请输入"
                    v-model="science_form.infoFrom"
                    :disabled="viewdisable"></el-input>
        </el-form-item>
        <el-form-item label="发布人:">
          <el-input placeholder=""
                    disabled
                    v-model="username"></el-input>
        </el-form-item>
        <div>
          <quill-editor ref="myTextEditor"
                        v-model="science_form.mainContent"
                        :config="editorOption"
                        prop='mainContent'
                        :disabled="viewdisable"></quill-editor>
        </div>
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
import { quillEditor } from 'vue-quill-editor'
import { addScienceInfo, editScienceInfo, addNotification, editNotification } from '@/api/contentManagementApi'
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
  components: {
    quillEditor
  },
  data () {
    return {
      // title: '新增-科技资讯',
      viewdisable: false, // 显示隐藏内容与禁用
      dialogFormVisible: false,
      username: JSON.parse(sessionStorage.getItem('userInfo')).nickname,
      id: '', // 编辑id
      sourceinformation: true,
      rules: { title: [{
        required: true, message: '请输入标题', trigger: 'blur'
      }],
        mainContent: [{
          required: true, message: '请输入内容', trigger: 'blur'
        }] },
      science_form: {
        title: '',
        infoFrom: '',
        mainContent: '<p>请输入内容</p>'
      }, // 科技资讯与通知公告
      editorOption: {
        // something config
      }

    }
  },
  watch: {
    dialogFormVisible () {
      if (!this.dialogFormVisible) {
        this.$emit('serviceDialog', this.dialogFormVisible)
        this.science_form = {
          title: '',
          infoFrom: '',
          mainContent: '<p>请输入内容</p>'
        }
      }
    },
    showDialog () {
      this.dialogFormVisible = this.showDialog
    },

    title () {
      if (this.title === '新增-通知公告' || this.title === '详情-通知公告' || this.title === '编辑-通知公告') {
        this.sourceinformation = false
      } else if (this.title === '新增-科技资讯' || this.title === '编辑-科技资讯' || this.title === '详情-科技资讯') {
        this.sourceinformation = true
      }
    },
    // 监听编辑、查看详情当前行的信息
    row () {
      if (this.title === '新增-科技资讯') return
      if (this.row === {}) return
      if (this.title === '编辑-科技资讯' || this.title === '详情-科技资讯' || this.title === '编辑-通知公告' || this.title === '详情-通知公告') {
        console.log(this.row)
        this.science_form.title = this.row.title
        this.science_form.infoFrom = this.row.infofrom
        this.science_form.mainContent = this.row.maincontent
        this.science_form.id = this.row.id
      }
    },
    isstate () {
      this.viewdisable = this.isstate
    }

  },
  methods: {
    // 富文本编译器
    onEditorChange ({ editor, html, text }) {
      this.science_form.mainContent = html
    },
    // 确定
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.title === '新增-科技资讯') {
            addScienceInfo(this.science_form).then(res => {
              if (res.data.success) {
                this.$message.success('新增成功')
              } else {
                this.$message.error('新增失败')
              }
              this.cancel()
            })
          } else if (this.title === '编辑-科技资讯') {
            this.science_form.id = this.id
            editScienceInfo(this.science_form).then(res => {
              if (res.data.success) {
                this.$message.success('编辑成功')
              } else {
                this.$message.error('编辑失败')
              }
              this.cancel()
            })
          } else if (this.title === '新增-通知公告') {
            addNotification(this.science_form).then(res => {
              if (res.data.success) {
                this.$message.success('新增成功')
              } else {
                this.$message.error('新增失败')
              }
              this.cancel()
            })
          } else if (this.title === '编辑-通知公告') {
            editNotification(this.science_form).then(res => {
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
    },
    cancel () {
      console.log('取消')
      this.$emit('serviceDialog', false)
    }

  },
  computed: {
    editor () {
      return this.$refs.myTextEditor.quillEditor
    }
  }
}
</script>

