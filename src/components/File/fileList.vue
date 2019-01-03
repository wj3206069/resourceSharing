<template>
  <el-upload :action="uploadFile" :multiple="multiple" :limit="limit" :on-error="errorUpload" :on-success="successUpload" :on-progress="progressUpload" :disabled="disabled" :show-file-list="false">
    <template v-if="!disabled">
      <el-button type="success" :loading="fileLoading">上传附件</el-button>
    </template>
    <template v-if="fileList && fileList.length">
      <div class="file-box" @click.stop>
          <div class="file-list-tit">
        </div>
        <div class="file-item" v-for="(file, f) in fileList" :key="f">
          <div class="flex-1 file-center">
            {{file.fileName}}
          </div>
          <div class="item-button-box file-scope">
            <el-button class="btn-purple" @click.stop="downLoad(file)">下载</el-button>
            <!-- <el-button class="btn-yellow" @click.stop="handleDetail(file)">预览</el-button> -->
            <!-- <el-button type="danger" @click.stop="handleRemove(file,index)">删除</el-button> -->
          </div>
        </div>      
      </div>
    </template>
  </el-upload>
</template>

<script>
import { uploadFile, downloadFile, deleteFile } from '@/api/article'

export default {
  props: {
    type: {
    },
    code: {
      type: String,
      default: ''
    },
    formFileList: {},
    multiple: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 3
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    formFileList(val) {
      this.fileList = val
    }
  },
  data() {
    return {
      fileLoading: false,
      uploadFile: uploadFile,
      fileList: this.formFileList ? this.formFileList : []
    }
  },
  methods: {
    successUpload(response, file, fileList) {
      this.fileLoading = false
      if (response.success) {
        this.$notify({
          title: '成功',
          message: '上传成功',
          type: 'success',
          duration: 1000
        })
        this.fileList.push(response)
        this.$emit('changeBussId', response, this.code)
      }
    },
    errorUpload() {
      this.fileLoading = false
      this.$notify({
        title: '失败',
        message: '上传失败，请重试',
        type: 'error',
        duration: 1000
      })
    },
    progressUpload(event, file) {
      this.fileLoading = true
    },
    downLoad(file) {
      location.href = `${downloadFile}?fileId=${file.fileId}&fileName=${file.fileName}`
    },
    handleDetail(file) {
      // window.open(`${viewFile}?fileId=${file.fileId}&fileName=${file.fileName}`)
    },
    handleRemove(file, index) {
      if (!this.disabled) {
        const data = file.fileId
        deleteFile(data)
          .then(res => {
            console.log(res.data)
            const data = res.data
            if (data.success) {
              this.fileList.splice(index, 1)
              this.$notify.success({
                message: '删除成功'
              })
            } else {
              this.$notify.error({
                message: '删除失败，请重试'
              })
            }
          })
          .catch(() => {
            this.$notify.error({
              message: '删除失败，请重试'
            })
          })
      }
    }
  },
  created() {
    this.$on('handleInitcomponent', function(list) {
      this.fileList = list
    })
  }
}
</script>

<style>
</style>
