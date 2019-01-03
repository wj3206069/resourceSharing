<template>
  <div class="createTemp common-dialog">
    <el-dialog title="新增-服务类目"
               :visible.sync="dialogFormVisible">
      <el-form :model="detailData"
               class="mg-t-30">
        <el-form-item label="服务类目名称：">
          <el-input v-model="detailData.realName"
                    readonly
                    placeholder="请输入分类名称"></el-input>
        </el-form-item>
        <el-form-item label="所需资质">
          <el-input v-model="detailData.realName"
                    readonly
                    placeholder="服务资质1"></el-input>
        </el-form-item>
        <el-form-item label="所需资质">
          <el-input v-model="detailData.realName"
                    readonly
                    placeholder="服务资质2"></el-input>
        </el-form-item>
        <el-form-item label="备注说明：">
          <template slot-scope="scope">
            <el-input type="textarea"
                      readonly
                      :autosize="{ minRows: 2}"
                      placeholder="请输入服务类目说明">
            </el-input>
          </template>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button v-for="(item, index) in dialogFooter"
                   :key="index"
                   :style="item.color"
                   v-show="item.isShow"
                   @click.stop.prevent="onDialogFooter(index)">{{item.name}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'createTemp',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    detailData: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      dialogFormVisible: false,
      dialogFooter: [{
        name: '上一步',
        color: 'background: #61A3FE;',
        isShow: false
      }, {
        name: '保存',
        color: 'background: #61A3FE;',
        isShow: false
      }, {
        name: '返回',
        color: 'background: #ccc;',
        isShow: true
      }]
    }
  },
  created () {
    this.initCity()
    this.initCounty()
  },
  watch: {
    showDialog () {
      this.dialogFormVisible = this.showDialog
    },
    dialogFormVisible () {
      this.$emit('returnBool', this.dialogFormVisible)
    }
  },
  methods: {
    onDialogFooter (index) {
      if (index === 2) this.dialogFormVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../../assets/style/color.less";
.createTemp {
  .add-btn {
    position: absolute;
    right: -35px;
    top: 50%;
    transform: translateY(-50%);
  }
  .select-item {
    min-width: 20px;
    height: 24px;
    padding: 0 6px;
    background: #edf3f8;
    margin-left: 5px;
    margin-top: 5px;
    .del-btn {
      margin: 0 0 0 5px;
    }
  }
  .el-button {
    border: none;
    border-radius: 10px;
    color: #fff;
  }
}
</style>
