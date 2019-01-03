<template>
  <div class="UploadReport">
    <div class="common-dialog">
      <el-dialog title="上传报告"
                 :visible.sync="dialogFormVisible">
        <div class="upload-btn">
          <el-upload :drag="true"
                     :action="uploadPath"
                     multiple
                     :limit="9"
                     :on-progress="onProgress"
                     :on-success="onSuccess"
                     :on-error="onError">
            <el-button class="primary-btn">上传<i class="zxicon zx-shangchuan el-icon--right"></i></el-button>
          </el-upload>
        </div>
        <div class="common-table">
          <el-table :data="reportlist"
                    border
                    style="width: 100%">
            <el-table-column prop="attachmentname"
                             align="center"
                             label="文件名">
            </el-table-column>
            <el-table-column prop="uploadtime"
                             align="center"
                             label="上传时间">
            </el-table-column>
            <el-table-column prop="attachment_id"
                             align="center"
                             label="操作">
              <template slot-scope="scope">
                <span class='cursor'
                      @click.stop.prevent="goPreview(scope.row)">预览</span>
                <span class='cursor'
                      style="margin-left:10px;"
                      @click.stop.prevent="deletePreviewOne(scope.row, index)">删除</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div slot="footer"
             class="dialog-footer">
          <!-- <el-button class="primary-btn"
                     @click="dialogFormVisible = false">确 定</el-button> -->
          <el-button class="cancel"
                     @click="dialogFormVisible = false">返 回</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { uploadPath, preview } from '@/api'
import { deletePreview } from '@/api/order'
export default {
  name: 'UploadReport',

  props: {
    ShowReportDialog: {
      type: Boolean,
      default: false
    },
    reportlist: {
      type: Array,
      default: []
    }
  },
  watch: {
    ShowReportDialog () {
      this.dialogFormVisible = this.ShowReportDialog
    },
    dialogFormVisible () {
      this.$emit('returnBool', this.dialogFormVisible)
    }
  },
  data () {
    return {
      dialogFormVisible: false,
      tableData: [
        {
          attachment_id: 'id',
          attachmentname: '检测报告1',
          uploadtime: '2018-05-12   20:15'
        }
      ],
      uploadPath: uploadPath,
      loading: ''
    }
  },
  methods: {
    deletePreviewOne (item) {
      this.loading = this.$loading()
      let _idnex = this.reportlist.findIndex((val, index) => {
        if (val === item) return index
      })
      deletePreview({
        id: item.id,
        attachmentid: item.attachment_id
      }).then(res => {
        this.loading.close()
        if (res.data.success) {
          this.reportlist.splice(_idnex, 1)
          this.$message.success('删除成功')
        } else {
          this.$message.error(res.data.message)
        }
      }).catch(err => {
        this.loading.close()
        this.$message.error(err.data.message)
      })
    },
    goPreview (item) {
      console.log(`${location.host}${preview}/${item.attachment_id}`)
      let { href } = this.$router.resolve({ path: `${preview}/${item.attachment_id}` })
      window.open(href)
      // openPreview(item.attachment_id, item.attachmentname)
      // preview(item.attachment_id).then(res => {
      //   console.log(res)
      // })
    },
    onProgress (event, file, fileList) {
      this.loading = this.$loading()
      console.log(event, file, fileList)
    },
    onSuccess (response, file, fileList) {
      // console.log(response, file, fileList)
      this.loading.close()
      if (response.success) {
        this.$message.success('上传成功')
        this.reportlist.push(
          {
            attachment_id: response.fileid,
            attachmentname: response.filename,
            uploadtime: this.$moment(parseInt(response.itime)).format('YYYY-MM-DD HH:mm:ss')
          }
        )
      } else {
        this.$message.success('上传失败')
      }
    },
    onError (err, file, fileList) {
      console.log(err, file, fileList)
      this.loading.close()
      this.$message.error('上传失败')
    }
  }
}
</script>

<style lang="less" >
.UploadReport {
  .el-dialog__wrapper .el-dialog .el-dialog__body {
    padding: 20px;
  }
  .upload-btn {
    text-align: center;
    padding-bottom: 10px;
    .primary-btn {
      background-color: #61a3fe;
      border-color: #61a3fe;
      border-radius: 10px;
      padding: 9px 12px;
    }
  }
}
</style>