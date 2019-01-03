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
        <div class="select-item">
          <label for="">设备小类：</label>
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
    <div class="service-table">
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
        <el-table-column prop="small_name"
                         label="小类名称"
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
      <el-dialog title="新增-设备小类"
                 :visible.sync="new_form">
        <el-form :model="new_equipment"
                 :rules="rules"
                 ref="new_equipment"
                 class="margin_top_30">
          <el-form-item label="设备分类："
                        prop="classification_equipmen">
            <el-select v-model="new_equipment.classification_equipmen"
                       placeholder="请选择">
              <el-option label="区域一"
                         value="shanghai"></el-option>
              <el-option label="区域二"
                         value="beijing"></el-option>
            </el-select>

          </el-form-item>
          <el-form-item label="设备小类："
                        prop="xiao_equipment">
            <el-input v-model="new_equipment.xiao_equipment"
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
      new_form: false,
      multipleSelection: [],
      tableData: [{
        id: 1,
        name: '分析仪器1',
        small_name: '分析仪器1-1',
        founder: '张三',
        time: '2018 - 11 -12'

      },
      {
        id: 2,
        name: '分析仪器2',
        small_name: '分析仪器2-2',
        founder: '张四',
        time: '2018 - 11 -13'

      }],
      rules: {
        classification_equipmen: [
          { required: true, message: '请选择设备分类', trigger: 'change' }
        ],
        xiao_equipment: [
          { required: true, message: '请设置设备分类', trigger: 'blur' }
        ]
      },
      new_equipment: {
        classification_equipment: '',
        xiao_equipment: ''
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





