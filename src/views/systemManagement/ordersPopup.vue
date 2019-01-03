<template>
  <div class="common-dialog">
    <el-dialog :title="title"
               :visible.sync="dialogFormVisible">
      <el-form :model="science_form"
               ref='science_form'
               :rules="rules">
        <el-form-item label="委托单名称:"
                      prop='name'
                      v-if="!typefalse">
          <el-input placeholder="请输入"
                    v-model='science_form.name'
                    :disabled="viewdisable"></el-input>
        </el-form-item>
        <el-form-item label="协议名称:"
                      prop='name'
                      v-if="typefalse">
          <el-input placeholder="请输入"
                    v-model='science_form.name'
                    :disabled="viewdisable"></el-input>
        </el-form-item>
        <div>
          <h3 style="text-align: -webkit-center; margin-bottom:10px"
              v-if="!typefalse">模板内容</h3>
          <h3 style="text-align: -webkit-center; margin-bottom:10px"
              v-if="typefalse">协议内容</h3>
          <quill-editor ref="myTextEditor"
                        v-model="science_form.mainContent"
                        :config="editorOption"
                        prop='mainContent'
                        :disabled="viewdisable"
                        @blur="PleaseEnter"></quill-editor>
          <span style="text-align: -webkit-center;color: #C51316;"
                v-if="contentfalse">请输入内容</span>
        </div>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button class="submit primary-btn"
                   type="primary"
                   @click="submitForm('science_form')"
                   v-show='!viewdisable'>确定</el-button>
        <el-button class="cancel"
                   type="primary"
                   @click="cancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { quillEditor } from 'vue-quill-editor'
import { addProtocol } from '@/api/systemManagementApi'
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
  components: {
    quillEditor
  },
  data () {
    return {
      viewdisable: false, // 显示隐藏内容与禁用
      contentfalse: false,
      dialogFormVisible: false,
      rules: { name: [{
        required: true, message: '请输入标题', trigger: 'blur'
      }],
        mainContent: [{
          required: true, message: '请输入内容', trigger: 'blur'
        }] },
      science_form: {
        name: '',
        type: '',
        mainContent: '<p></p>'
      },
      typefalse: true,
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
          name: '',
          type: '',
          mainContent: '<p></p>'
        }
      }
    },
    showDialog () {
      this.dialogFormVisible = this.showDialog
      if (this.showDialog) {
        if (this.title === '详情-创新卷免责协议' || this.title === '详情-电子协议' || this.title === '详情-委托单') {
          console.log(this.row)
          this.viewdisable = true
          this.science_form.name = this.row.name
          this.science_form.mainContent = this.row.maincontent
        }
        this.science_form.type = this.type
      }
    },
    type () {
      // this.science_form.type = this.type
      if (this.type === '3') {
        this.typefalse = false
      }
      console.log(this.science_form.mainContent)
    },

    title () {
      this.title = this.title
    },
    // 监听编辑、查看详情当前行的信息
    row () {
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
    PleaseEnter () {
      this.contentfalse = false
    },
    // 确定
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.science_form)
          if (this.title === '新增-创新卷免责协议' || this.title === '新增-电子协议' || this.title === '新增-委托单') {
            if (this.science_form.mainContent === '<p></p>' || this.science_form.mainContent === '') {
              this.contentfalse = true
              return false
            }
            this.cancel()
            this.contentfalse = false
            addProtocol(this.science_form).then(res => {
              if (res.data.success) {
                this.$message.success('新增成功')
              } else {
                this.$message.error('新增成功')
              }
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

