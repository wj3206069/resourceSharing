<template>
  <div class="common-dialog qualification_s_f">
    <el-dialog :title="title"
               :visible.sync="dialogFormVisible">
      <el-form :model="science_form"
               ref='science_form'
               :rules="rules">
        <p class="title_p">基本信息：</p>
        <el-form-item label="创新载体名称:"
                      prop='name'>
          <el-input placeholder="请输入"
                    v-model='science_form.name'
                    :disabled='disableds'></el-input>
        </el-form-item>
        <el-form-item label="级别:"
                      prop='rank'>
          <el-select v-model="science_form.rank"
                     placeholder="请选择"
                     :disabled='disableds'>
            <el-option :label="item.fieldname"
                       :value="item.fieldname"
                       v-for="item in InnovationCarrierList"
                       :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类别:"
                      prop='institutionscategory'>
          <el-select v-model="science_form.institutionscategory"
                     placeholder="请选择"
                     :disabled='disableds'>
            <el-option :label="item.fieldname"
                       :value="item.fieldname"
                       v-for="item in InnovationCategoryList"
                       :key="item.fieldcode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="依托单位:"
                      prop='relyingunit'
                      v-show="uni_t">
          <el-input v-model='science_form.relyingunit'
                    disabled></el-input>
        </el-form-item>
        <el-form-item label="负责人:"
                      prop='principal'>
          <el-input placeholder="请输入"
                    v-model='science_form.principal'
                    :disabled='disableds'></el-input>
        </el-form-item>
        <!-- <el-form-item label="组件年份:"
                      required>
          <el-col :span="11">
            <el-form-item prop="year"
                          class="component_year">
              <el-date-picker v-model="science_form.year"
                              type="date"
                              placeholder="选择月"
                              class="year_t"
                              :disabled='disableds'>
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item> -->

        <el-form-item label="组件年份:">
          <el-col :span="11">
            <el-form-item class="component_year">
              <el-date-picker v-model="science_form.year"
                              type="date"
                              placeholder="选择月"
                              class="year_t"
                              :disabled='disableds'>
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>

        <p class="title_p">详细信息：</p>
        <el-form-item label="介绍:"
                      class="textarea_h80"
                      prop='detailed'>
          <el-input v-model="science_form.detailed"
                    type="textarea"
                    placeholder="请输入内容"
                    :disabled='disableds'></el-input>
        </el-form-item>
        <el-form-item label="通信地址:">
          <el-input placeholder="请输入"
                    v-model='science_form.address'
                    :disabled='disableds'></el-input>
        </el-form-item>
        <el-form-item label="涉及技术领域:"
                      class="textarea_h80">
          <el-input v-model="science_form.technosphere"
                    type="textarea"
                    placeholder="请输入内容"
                    :disabled='disableds'></el-input>
        </el-form-item>
        <el-form-item label="主要研究内容:"
                      class="textarea_h80">
          <el-input v-model="science_form.contents"
                    type="textarea"
                    placeholder="请输入内容"
                    :disabled='disableds'></el-input>
        </el-form-item>
        <el-form-item label="研究方向:"
                      class="textarea_h80">
          <el-input v-model="science_form.researchdirection"
                    type="textarea"
                    placeholder="请输入内容"
                    :disabled='disableds'></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button class="submit primary-btn"
                   type="primary"
                   @click="submitForm('science_form')"
                   v-show="!disableds">确定</el-button>
        <el-button class="cancel"
                   type="primary"
                   @click="cancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { addInnovativePlatform, editInnovativeById } from '@/api/systemManagementApi'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    // 标题
    title: {
      type: String
    },
    // 单条数据源
    row: {
      type: Object
    },
    // 状态
    isstate: {
      type: Boolean
    },
    InnovationCarrierList: {
      type: Array
    }, // 创新载体级别
    InnovationCategoryList: {
      type: Array
    }// 创新类别

  },
  data () {
    return {
      dialogFormVisible: false, // 弹出框
      disableds: false,
      uni_t: false,
      science_form: {
        name: '', // 创新载体名称
        rank: '', // 级别
        institutionscategory: '', // 类别
        relyingunit: '', // 依托单位
        principal: '', // 负责人
        year: '', // 组建年份
        detailed: '', // 介绍
        address: '', // 通信地址
        technosphere: '', // 涉及技术领域
        contents: '', // 主要研究内容
        researchdirection: '', // 研究方向
        creator: JSON.parse(sessionStorage.getItem('userInfo')).nickname// 操作人
      }, // 表单对象
      rules: {
        name: [{ required: true, message: '请输入载体名称', trigger: 'blur' }],
        rank: [{ required: true, message: '请选择级别', trigger: 'change' }],
        institutionscategory: [{ required: true, message: '请选择类别', trigger: 'change' }],
        principal: [{ required: true, message: '请输入负责人', trigger: 'blur' }],
        year: [{ type: 'date', required: false, message: '请选择日期', trigger: 'change' }],
        detailed: [{ required: true, message: '请输入介绍内容', trigger: 'blur' }]
      }
    }
  },
  watch: {
    dialogFormVisible () {
      if (!this.dialogFormVisible) {
        this.$emit('serviceDialog', this.dialogFormVisible)
        this.science_form = {
          name: '', // 创新载体名称
          rank: '', // 级别
          institutionscategory: '', // 类别
          relyingunit: '', // 依托单位
          principal: '', // 负责人
          year: '', // 组建年份
          detailed: '', // 介绍
          address: '', // 通信地址
          technosphere: '', // 涉及技术领域
          contents: '', // 主要研究内容
          researchdirection: '' // 研究方向
        }
        this.$refs['science_form'].resetFields()
      }
    },
    showDialog () {
      this.dialogFormVisible = this.showDialog
      if (this.showDialog) {
        this.science_form.creator = JSON.parse(sessionStorage.getItem('userInfo')).nickname
        if (this.title !== '新增-创新载体') {
          this.uni_t = true
        }
      }
    },
    title () {
    },
    row () {
      if (this.title === '详情-创新载体' || this.title === '编辑-创新载体') {
        this.science_form = this.row
      }
    },
    isstate () {
      this.disableds = this.isstate
      console.log(this.disableds)
    }
  },
  methods: {
    // 确定
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.science_form.year = this.$moment(this.science_form.year).format('YYYY-MM-DD')
          if (this.title === '新增-创新载体') {
            this.cancel()
            addInnovativePlatform(this.science_form).then(res => {
              if (res.data.success) {
                this.$message.success('恭喜你,新增成功')
              } else {
                this.$message.error('添加失败,' + res.data.message)
              }
            })
          } else if (this.title === '编辑-创新载体') {
            this.cancel()
            editInnovativeById(this.science_form).then(res => {
              if (res.data.success) {
                this.$message.success('恭喜你,编辑成功')
              } else {
                this.$message.error('添加失败,' + res.data.message)
              }
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    cancel () {
      console.log('取消')
      this.$emit('serviceDialog', false)
    }

  }
}
</script>
<style>
.qualification_s_f .year_t .el-form-item__error {
  left: -190px;
}
.qualification_s_f .year_t {
  width: 300px;
  margin-left: -190px;
}
.qualification_s_f
  .el-dialog__wrapper
  .el-dialog
  .el-dialog__body
  .component_year {
  margin-bottom: 0;
}
.qualification_s_f .title_p {
  color: #474747;
  font-size: 20px;
  font-weight: 700;
  padding: 10px 10px;
}
</style>

