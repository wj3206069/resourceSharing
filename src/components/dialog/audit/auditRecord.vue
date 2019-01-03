<template>
  <!-- 审核记录 -->
  <div class="common-dialog">
    <el-dialog title="审核记录"
               :visible.sync="Audit_records">
      <div class="tab_color common-table">
        <el-table ref="multipleTable"
                  tooltip-effect="dark"
                  style="width: 100%"
                  :data="tableDataList">
          <el-table-column prop="auditname"
                           label="审核人"
                           align="center">
          </el-table-column>
          <el-table-column prop="isagree"
                           label="审核状态"
                           align="center">
          </el-table-column>
          <el-table-column prop="audittime"
                           label="时间"
                           align="center">
          </el-table-column>
          <el-table-column prop="auditrem"
                           label="备注"
                           align="center">
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button class="cancel"
                   type="primary"
                   @click="cancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import './auditRecord.css'
export default {
  props: {
    showRecord: {
      type: Boolean,
      default: false
    },
    // 单条数据源
    auditList: {
      type: Array
    }
  },

  data () {
    return {
      Audit_records: false,
      tableDataList: []
    }
  },
  watch: {
    Audit_records () {
      if (!this.Audit_records) {
        this.$emit('showRecordDialog', this.Audit_records)
      }
    },
    showRecord () {
      this.Audit_records = this.showRecord
    },
    auditList () {
      this.tableDataList = this.auditList
    }
  },
  methods: {
    // 取消
    cancel () {
      this.$emit('showRecordDialog', false)
    }
  },
  created () {
    this.tableDataList = []
  }
}
</script>
