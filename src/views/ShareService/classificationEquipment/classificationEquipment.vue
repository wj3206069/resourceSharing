<template>
  <div class="service">
    <div class="service-header zx-flex between">
      <div class="flex_ju">
        <div class="select-item">
          <label for="">设备分类：</label>
          <el-select v-model="region"
                     placeholder="请选择">
            <el-option label="区域一"
                       value="shanghai"></el-option>
            <el-option label="区域二"
                       value="beijing"></el-option>
          </el-select>
        </div>
        <div class="search">

          <el-input v-model="search"
                    placeholder="请输入仪器分类名称"></el-input>
          <el-button type="primary"
                     icon="el-icon-search">搜索</el-button>
        </div>
      </div>
      <div class="operation-button">
        <el-button type="primary"
                   icon="zxicon zx-xinzeng2"
                   @click="new_form= true">新增</el-button>
      </div>
    </div>
    <div class="service-table common-table">
      <el-table :data="tableData"
                border
                style="width: 100%"
                @selection-change="handleSelectionChange"
                tooltip-effect="dark">
        <el-table-column type="selection"
                         align="center"
                         width="50">
        </el-table-column>
        <el-table-column label="序号"
                         type="index"
                         width="80"
                         align="center"></el-table-column>
        <el-table-column prop="name"
                         label="仪器分类名称"
                         align="center">
        </el-table-column>

        <el-table-column prop="founder"
                         label="创建人"
                         align="center">
        </el-table-column>

        <el-table-column prop="time"
                         label="创建时间"
                         align="center">
        </el-table-column>

        <el-table-column label="操作"
                         width="200"
                         align="center">
          <template slot-scope="scope">
            <el-button type="text"
                       size="small">编辑</el-button>
            <el-button type="text"
                       size="small">删除</el-button>

          </template>
        </el-table-column>
      </el-table>
      <el-pagination background
                     layout="prev, pager, next"
                     :total="1000"
                     @current-change="handleCurrentChange"></el-pagination>
    </div>

    <!-- 新增设备--------------------- -->
    <div class="common-dialog">
      <el-dialog title="新增-设备分类"
                 :visible.sync="new_form">
        <el-form :model="new_equipment"
                 :rules="rules"
                 ref="new_equipment"
                 class="margin_top_30">
          <el-form-item label="设备分类："
                        prop="classification_equipment">
            <el-input v-model="new_equipment.classification_equipment"
                      placeholder="请设置设备分类"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button class="submit primary-btn"
                     type="primary"
                     @click="submitForm('new_equipment')">保存</el-button>
          <el-button class="cancel"
                     type="primary"
                     @click="new_form=false">取消</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
import './equipment.css'
export default {
  data () {
    return {
      title: '设备管理',
      search: '',
      region: '',
      multipleSelection: [],
      new_form: false,
      tableData: [{
        id: 1,
        name: '分析仪器1',
        founder: '张三',
        time: '2018 - 11 -12'

      },
      {
        id: 2,
        name: '分析仪器2',
        founder: '张四',
        time: '2018 - 11 -13'

      }],
      rules: {
        classification_equipment: [
          { required: true, message: '请输入设备分类', trigger: 'blur' }
        ]
      },
      new_equipment: {
        classification_equipment: ''
      }
    }
  },
  methods: {
    //  分页
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style scoped>
.flex_ju {
  display: flex;
  justify-content: space-between;
}
</style>



