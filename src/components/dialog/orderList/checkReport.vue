<template>
  <div class="checkReport">
    <div class="common-dialog">
      <el-dialog title="查看报告"
                 :visible.sync="dialogFormVisible">
        <div class="upload-btn">
          <el-button class="primary-btn">全部下载<i class="zxicon zx-xiazai el-icon--right"></i></el-button>
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
                      @click.stop.prevent="goDownloadFile(scope.row)">下载</span>
                <span class='cursor'
                      style="margin-left:10px;"
                      @click.stop.prevent="goPreview(scope.row)">预览</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div slot="footer"
             class="dialog-footer">
          <!-- <el-button class="primary-btn"
                     @click="">确 定</el-button> -->
          <el-button class="cancel"
                     @click="dialogFormVisible = false">返 回</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { preview, downloadOne } from '@/api'
export default {
  name: 'checkReport',
  props: {
    ShowCheckReportDialog: {
      type: Boolean,
      default: false
    },
    reportlist: {
      type: Array,
      default: []
    }
  },
  watch: {
    ShowCheckReportDialog () {
      this.dialogFormVisible = this.ShowCheckReportDialog
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
      ]

    }
  },
  methods: {
    goPreview (item) {
      console.log(`${location.host}${preview}/${item.attachment_id}`)
      let { href } = this.$router.resolve({ path: `${preview}/${item.attachment_id}` })
      window.open(href)
      // openPreview(item.attachment_id, item.attachmentname)
      // preview(item.attachment_id).then(res => {
      //   console.log(res)
      // })
    },
    goDownloadFile (item) {
      // let { href } = this.$router.resolve({ path: `${downloadFile}/${item.attachment_id}` })
      // window.open(href)
      downloadOne({
        attachment_id: item.attachment_id
      }).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="less" >
.checkReport {
  .el-dialog__wrapper .el-dialog .el-dialog__body {
    padding: 30px 20px;
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