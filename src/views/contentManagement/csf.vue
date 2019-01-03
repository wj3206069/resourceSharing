<template>
  <div>
    <quill-editor ref="myTextEditor"
                  v-model="science_form.mainContent"
                  :config="editorOption"></quill-editor>

    <el-button class="submit primary-btn"
               type="primary"
               @click="tj">提交</el-button>
  </div>
</template>
<script>
import '@/views/ShareService/serviceManager/service.css'
import { quillEditor } from 'vue-quill-editor'
// import { queryScienceInfoList, login, pubScienceInfo, topScienceInfo, addScienceInfo } from '@/api/contentManagementApi'
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      science_form: {
        title: 'dsd',
        infoFrom: '45445',
        mainContent: '<p>Hello BBK</p>'
      },
      editorOption: {
        // something config
      }

    }
  },
  methods: {
    getTemplateRow (row) {
      this.templateSelection = row
      console.log(row)
    },

    // 富文本编译器
    onEditorChange ({ editor, html, text }) {
      this.science_form.mainContent = html
      console.log(html)
    },
    tj () {
      console.log(this.science_form)
    }

  },

  computed: {
    editor () {
      return this.$refs.myTextEditor.quillEditor
    }
  }
}
</script>
