<template>
  <div class="checkDeal">
    <div class="common-dialog">
      <el-dialog title="查看"
                 :visible.sync="dialogFormVisible">
        <div class="upload-btn">
          <el-button class="primary-btn"
                     @click.stop.prevent="goDownloadMore">全部下载<i class="zxicon zx-xiazai el-icon--right"></i></el-button>
        </div>
        <div class="common-table">
          <el-table :data="checkDealData"
                    border
                    style="width: 100%">
            <el-table-column prop="name"
                             align="center"
                             label="文件名称">
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
                      @click.stop.prevent="goDownloadSingle(scope.row)">下载</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div slot="footer"
             class="dialog-footer">
          <el-button class="primary-btn"
                     @click="dialogFormVisible = false">确 定</el-button>
          <el-button class="cancel"
                     @click="dialogFormVisible = false">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { preview, downloadOne, downloadFileOne, downloadMore, downloadFileMore } from '@/api'
export default {
  name: 'checkDeal',
  props: {
    ShowCheckDeal: {
      type: Boolean,
      default: false
    },
    checkDealData: {
      type: Array,
      default: []
    }
  },
  watch: {
    ShowCheckDeal () {
      this.dialogFormVisible = this.ShowCheckDeal
    },
    dialogFormVisible () {
      this.$emit('returnBool', this.dialogFormVisible)
    }
  },
  data () {
    return {
      dialogFormVisible: false
    }
  },
  methods: {
    // 预览
    goPreview (item) {
      console.log(`${location.host}${preview}/${item.attachment_id}`)
      let { href } = this.$router.resolve({ path: `${preview}/${item.attachment_id}` })
      window.open(href)
    },
    // 单个下载
    goDownloadSingle (item) {
      downloadOne({
        attachment_id: item.attachment_id
      }).then(res => {
        let { href } = this.$router.resolve({ path: `${downloadFileOne}?attachment_id=${item.attachment_id}` })
        window.open(href)
      })
    },
    goDownloadMore () {
      let ids = []
      if (this.checkDealData) {
        this.checkDealData.map(item => {
          ids.push(item.attachment_id)
        })
      }

      downloadMore({
        attachment_id: ids.join(',')
      }).then(res => {
        let { href } = this.$router.resolve({ path: `${downloadFileMore}?attachmentids=${ids.join(',')}` })
        window.open(href)
      })
    }
  }
}
</script>

<style lang="less" >
.checkDeal {
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