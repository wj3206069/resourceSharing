<template>
  <div class="createUnit">
    <!-- <div class="common-dialog">
      <el-dialog el-dialog
                 title="新增-单位信息"
                 :visible.sync="dialogFormVisible">
        <el-form :model="unitInfoForm"
                 :rules="unitInfoRules"
                 class="mg-t-30">
          <el-form-item label="用户名称："
                        prop="realName">
            <el-input v-model="unitInfoForm.realName"
                      placeholder="请输入真实姓名"></el-input>
          </el-form-item>
          <el-form-item label="单位类型："
                        prop="realName">
            <template slot-scope="scope">
              <el-select v-model="unitInfoForm.unitType"
                         placeholder="请选择">
                <el-option v-for="(item, index) in unitTypeOptions"
                           :key="index"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-form-item>

          <div class="zx-flex end">
            <el-button type="primary"
                       round>保存</el-button>
            <el-button type="info"
                       round
                       @click="dialogFormVisible = false">取消</el-button>
          </div>

        </el-form>
      </el-dialog>
    </div> -->
    <zx-dialog :title="'新增-单位信息'"
               :showDialog="dialogFormVisible"
               @returnBool="val => { $emit('returnBool', val) }">
      <el-form :model="unitInfoForm"
               :rules="unitInfoRules"
               class="mg-t-30">
        <el-form-item label="用户名称："
                      prop="realName">
          <el-input v-model="unitInfoForm.realName"
                    placeholder="请输入真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="单位类型："
                      prop="realName">
          <template slot-scope="scope">
            <el-select v-model="unitInfoForm.unitType"
                       placeholder="请选择">
              <el-option v-for="(item, index) in unitTypeOptions"
                         :key="index"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-form-item>

        <!-- <div class="zx-flex end">
          <el-button type="primary"
                     round>保存</el-button>
          <el-button type="info"
                     round
                     @click="dialogFormVisible = false">取消</el-button>
        </div> -->

      </el-form>
    </zx-dialog>
  </div>
</template>

<script>
import zxDialog from '@/components/dialog'
export default {
  name: 'createUnit',
  components: {
    zxDialog
  },
  data () {
    return {
      dialogFormVisible: false,
      isDesable: false,
      value: '',
      // 表单2
      unitInfoForm: {
        id: '',             // 提交的时候需要
        realName: '',       // 真实姓名
        unitType: ''       // 单位类型

      },
      // 表单2规则
      unitInfoRules: {
        realName: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' }
        ],
        unitType: [
          { required: true, message: '请选择单位类型', trigger: 'change' }
        ]
      },
      unitTypeOptions: [
        {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }
      ] // 单位类型数据字典
    }
  },
  props: {
    showCreateNnitDialog: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    showCreateNnitDialog () {
      this.dialogFormVisible = this.showCreateNnitDialog
    },
    dialogFormVisible () {
      this.$emit('returnBool', this.dialogFormVisible)
    }
  }
}
</script>

<style lang="" scoped>
</style>