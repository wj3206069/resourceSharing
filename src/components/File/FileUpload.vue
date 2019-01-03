<template>
  <el-upload :action="uploadFile" :multiple="multiple" :limit="limit" :on-error="errorUpload" :on-success="successUpload" :on-progress="progressUpload" :disabled="disabled" :show-file-list="false">
    <template v-if="!disabled">
      <el-button type="success" :loading="fileLoading">上传附件</el-button>
    </template>
    <template v-if="fileList && fileList.length">
      <div class="file-box" @click.stop>
          <!-- <div class="file-list-tit">
          <div class="index">序号</div>
          <div class="flex-1 file-center">附件名称</div>
          <div class="file-scope">操作</div>
        </div> -->
        <div class="file-item" v-for="(file, f) in fileList" :key="f">
          <!-- <div class="index">{{f + 1}}</div> -->
          <div class="flex-1 file-center">
            {{file.fileName}}
          </div>
          <div class="item-button-box file-scope">
            <el-button class="btn-purple" @click.stop="downLoad(file)">下载</el-button>
            <!-- <el-button class="btn-yellow" @click.stop="handleDetail(file)">预览</el-button> -->
            <!-- <div  style="color:red"  @click.stop="handleRemove(file,f)">X</div> -->
            <img src="../../assets/cha.png" style="color:red"  class="file-center__span" @click.stop="handleRemove(file,f)"/>
          </div>
        </div>      
      </div>
    </template>
  </el-upload>
</template>

<script>
// deleteFile
import { uploadFile, downloadFile } from '@/api/article'

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
    // 删除方法
    handleRemove(file, index) {
      this.fileList.splice(index, 1)
      this.$emit('handleRemove', file, this.fileList)
      // if (!this.disabled) {
      //   const data = file.fileId
      //   deleteFile(data)
      //     .then(res => {
      //       console.log(res.data)
      //       const data = res.data
      //       if (data.success) {
      //         this.fileList.splice(index, 1)
      //         this.$notify.success({
      //           message: '删除成功'
      //         })
      //       } else {
      //         this.$notify.error({
      //           message: '删除失败，请重试'
      //         })
      //       }
      //     })
      //     .catch(() => {
      //       this.$notify.error({
      //         message: '删除失败，请重试'
      //       })
      //     })
      // }
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
