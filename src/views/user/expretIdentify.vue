<template>
  <div class="zy-main">
    <div class="wrap"
         style="height: 95%;    margin-top: 20px;">
      <el-scrollbar style="height: 100%;">
        <div class="back">
          <img width="30"
               height="30"
               src="../../assets/images/getBack.png"
               alt="">
        </div>
        <!--以下是要滚动的内容-->
        <div class="wrap_form zx-flex column"
             style="align-items:center">
          <span class="span_expert">专家认证</span>
          <el-form style="margin-top:60px"
                   v-show="changeTitle === 0"
                   :model="registerForm"
                   :rules="rules"
                   ref="registerForm"
                   label-width="126px">
            <el-form-item label="用户名称："
                          prop="userName"
                          verify
                          :minLength='3'
                          empty>
              <el-input v-model="registerForm.userName"
                        placeholder="请输入真实姓名">
              </el-input>
            </el-form-item>
            <el-form-item label="身份证号："
                          prop="IDCard">
              <el-input v-model="registerForm.IDCard"
                        type="IDCard"
                        placeholder="请输入用户真实身份证号">
              </el-input>
            </el-form-item>

            <el-form-item label="头像：">
              <el-upload class="avatar-uploader"
                         action="https://jsonplaceholder.typicode.com/posts/"
                         :show-file-list="false"
                         :on-success="handleAvatarSuccess"
                         :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl"
                     :src="imageUrl"
                     class="avatar">
                <i v-else
                   class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>

            <el-form-item label="手机号："
                          prop="confirmPassWord">
              <el-input v-model="registerForm.confirmPassWord"
                        type="password"
                        placeholder="请输入手机号">
              </el-input>
            </el-form-item>
            <el-form-item label="个人邮箱："
                          verify
                          phone>
              <el-input v-model="registerForm.telNumber"
                        placeholder="请输入邮箱">
              </el-input>
            </el-form-item>
            <el-form-item label="QQ号："
                          verify
                          :minLength='3'
                          empty>
              <el-input v-model="registerForm.userName"
                        placeholder="请输入QQ号">
              </el-input>
            </el-form-item>
            <el-form-item label="微信号：">
              <el-input v-model="registerForm.passWord"
                        type="password"
                        placeholder="请输入微信号">
              </el-input>
            </el-form-item>

            <el-form-item label="银行账号：">
              <el-input v-model="registerForm.confirmPassWord"
                        type="password"
                        placeholder="请输入银行账号">
              </el-input>
            </el-form-item>
            <el-form-item label="开户行：">
              <el-select v-model="value"
                         style="    width: 100%;"
                         multiple
                         collapse-tags
                         placeholder="请选择开户行">
                <el-option v-for="item in options"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="紧急联系人："
                          verify
                          :minLength='3'
                          empty>
              <el-input v-model="registerForm.userName"
                        placeholder="请输入紧急联系人">
              </el-input>
            </el-form-item>
            <el-form-item label="紧急联系电话：">
              <el-input v-model="registerForm.passWord"
                        type="password"
                        placeholder="请输入紧急联系电话">
              </el-input>
            </el-form-item>

            <el-form-item label="详细地址">
              <div style=" display:flex; flex-direction:column">
                <div class="zx-flex "
                     style="margin-bottom: 20px;width:100% ">
                  <el-select v-model="value"
                             multiple
                             collapse-tags
                             style="width:127px"
                             placeholder="省份">
                    <el-option v-for="item in options"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                    </el-option>
                  </el-select>
                  <el-select v-model="value"
                             multiple
                             collapse-tags
                             style="margin-left: 20px; width:127px"
                             placeholder="城市">
                    <el-option v-for="item in options"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                    </el-option>
                  </el-select>
                  <el-select v-model="value"
                             multiple
                             collapse-tags
                             style="margin-left: 20px; width:127px"
                             placeholder="区县">
                    <el-option v-for="item in options"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <el-input :disabled="isDesable"
                          style="width:420px"
                          auto-complete="off"
                          placeholder="请输入详细地址信息"></el-input>
              </div>

            </el-form-item>
            <el-form-item label="公司名称："
                          verify
                          phone>
              <el-input v-model="registerForm.telNumber"
                        placeholder="请输入公司名称">
              </el-input>
            </el-form-item>
            <el-form-item label="管理职务："
                          verify
                          :minLength='3'
                          empty>
              <el-select v-model="value"
                         style="    width: 100%;"
                         multiple
                         collapse-tags
                         placeholder="请选择开户行">
                <el-option v-for="item in options"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="个人职务：">
              <el-input v-model="registerForm.passWord"
                        type="password"
                        placeholder="请输入个人职务">
              </el-input>
            </el-form-item>

            <el-form-item label="专家职称："
                          prop="zjzc">
              <div class="zx-flex">
                <el-select v-model="value"
                           prop="zhichen"
                           multiple
                           collapse-tags
                           style="width:140px; margin-right:20px"
                           placeholder="请选择职称级别">
                  <el-option v-for="item in options"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
                <el-input :disabled="isDesable"
                          style="width:260px"
                          auto-complete="off"
                          placeholder="请输入专家职称"></el-input>
              </div>
            </el-form-item>
            <el-form-item label="学科："
                          prop="xueke">
              <el-input :disabled="isDesable"
                        auto-complete="off">
              </el-input>
              <el-button type="info"
                         @click="selectxk"
                         class="btn_tecArea">选择学科</el-button>
            </el-form-item>
            <!-- 选择学科 -->
            <el-dialog title="提示"
                       :visible.sync="dialogVisible"
                       width="50%"
                       height="440px"
                       :before-close="handleClose">
              <el-transfer filterable
                           :filter-method="filterMethod"
                           filter-placeholder="请输入城市拼音"
                           v-model="value2"
                           :data="data2">
              </el-transfer>
            </el-dialog>
            <el-form-item label="技术领域："
                          prop="peoject">
              <el-input :disabled="isDesable"
                        auto-complete="off">
              </el-input>
              <el-button type="info"
                         class="btn_tecArea"
                         @click="tecArea">技术领域</el-button>
            </el-form-item>
            <el-dialog title="提示"
                       :visible.sync="dialogVisible_tecArea"
                       width="50%"
                       height="440px"
                       :before-close="handleClose">
              <el-form :model="form">
                <el-form-item label="分类名称"
                              style="margin-top:40px"
                              :label-width="formLabelWidth">
                  <el-input v-model="form.name"
                            placeholder="请输入分类名称"
                            :maxlength="200"
                            style="width: 217px;"
                            autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="父级分类"
                              :label-width="formLabelWidth">
                  <el-select v-model="form.region"
                             placeholder="请选择活动区域">
                    <el-option label="区域一"
                               value="shanghai"></el-option>
                    <el-option label="区域二"
                               value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="备注"
                              style="margin-top:40px"
                              :label-width="formLabelWidth">
                  <el-input v-model="form.name"
                            type="textarea"
                            :rows="6"
                            style="width: 217px;"
                            autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer"
                   class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary"
                           @click="dialogFormVisible = false">确 定</el-button>
              </div>
            </el-dialog>

            <el-form-item label="专家资质上传："
                          prop="zjzz">
              <el-upload style="width:178px"
                         :show-file-list="true"
                         action="https://jsonplaceholder.typicode.com/posts/"
                         list-type="picture-card"
                         :on-preview="handlePictureCardPreview"
                         :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="其他补充资质：">
              <el-upload style="width:178px"
                         :show-file-list="true"
                         action="https://jsonplaceholder.typicode.com/posts/"
                         list-type="picture-card"
                         :on-preview="handlePictureCardPreview"
                         :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible_zzload">
                <img width="178px"
                     :src="dialogImageUrl"
                     alt="">
              </el-dialog>
            </el-form-item>
            <el-form-item>
            </el-form-item>
            <el-form-item>
              <button class="register-btn"
                      @click.stop.prevent="registerBtn">提交认证</button>
            </el-form-item>
          </el-form>

        </div>
      </el-scrollbar>
    </div>

  </div>
</template>

<script>
export default {
  name: 'person',
  data () {
    var validatePass2 = (rule, value, callback) => {
      console.log('rule, value', rule, value)
      if (value === '') {
        callback(new Error('请输入密码'))
      }
      if (value !== this.registerForm.passWord) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    const generateData2 = _ => {
      const data = []
      const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都']
      const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu']
      cities.forEach((city, index) => {
        data.push({
          label: city,
          key: index,
          pinyin: pinyin[index]
        })
      })
      return data
    }
    return {
      gridData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
      registerDisabled: true,
      dialogVisible_tecArea: false,
      InputRight: [],
      changeTitle: 0,
      isAgreeUserName: '',
      isAgreeTel: '',
      imgUrl: '',
      isAgreeTo: false,
      dialogVisible: false,
      registerForm: {
        userName: '',
        passWord: '',
        confirmPassWord: '',
        telNumber: '',
        picCode: '',
        IDCard: '',
        // NickName: '',
        telcode: '',
        picTel: '',
        dialogImageUrl: '',
        dialogVisible_zzload: false
      },
      rules: {
        userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        zjzc: [{ required: true, message: '请输入专家职称', trigger: 'blur' }],
        zjzz: [{ required: true, message: '请输入专家资质', trigger: 'blur' }],
        xueke: [{ required: true, message: '请输入学科', trigger: 'blur' }],
        passWord: [{ required: true, message: '请输入您的密码', trigger: 'blur' }],
        confirmPassWord: [{ required: true, validator: validatePass2, trigger: 'blur' }],
        telNumber: [{ required: true, message: '请输入您的手机号', trigger: 'blur' }],
        picCode: [{ required: true, message: '请输入图形验证码', trigger: 'blur' }],
        telcode: [{ required: true, message: '请输入短信验证码', trigger: 'blur' }],
        IDCard: [{ required: true, message: '请输入身份证号码', trigger: 'blur' }]
      },
      data2: generateData2(),
      value2: [],
      filterMethod (query, item) {
        return item.pinyin.indexOf(query) > -1
      },
      isDisabled: true, // 禁用获取验证码按钮
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }
      ]
    }
  },
  created () {
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible_zzload = true
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    isAgree (isAgreeUserName) {
      console.log('1', isAgreeUserName)
      this.isAgreeTo = isAgreeUserName
    },
    // 提交注册数据
    registerBtn () {
      this.$router.push({ name: 'identificationAll' })
      let err
      if (!this.registerForm.userName || !this.registerForm.passWord || !this.registerForm.confirmPassWord || !this.registerForm.telNumber || !this.registerForm.picCode || !this.registerForm.telcode) {
        err = '请输入必填项'
      }
      if (err) {
        this.$message({
          message: err,
          type: 'warning'
        })
      }
    },
    checkForm (boolean, object) {
      console.log('registerForm', boolean, object)
      this.toObj1(boolean, object)
      this.registerDisabled = !object
    },
    toObj1 (key, val) {
      var data = {}
      data[key] = val
      this.InputRight.forEach((ele, idx) => {
        console.log('ele')
        if (ele.value !== val) {
          this.InputRight.push(data)
        }
      })
      console.log('InputRight', this.InputRight)
      return data
    },
    selectxk () {
      this.dialogVisible = true
    },
    tecArea () {
      this.dialogVisible_tecArea = true
    }

    // 获取短信验证码
  }
}
</script>

<style lang="" scoped>
.yzm {
  position: absolute;
  top: 8%;
  right: 5px;
}
.btn_tecArea {
  position: absolute;
  right: 2px;
  background: rgba(56, 126, 232, 1);
  border-radius: 5px;
  top: 2px;
  height: 36px;
}
.back {
  width: 50px;
  height: 50px;
  background-color: #387ee8;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  position: absolute;
  top: 6%;
  left: 4%;
}
.wrap_form {
  display: flex;
  justify-content: center;
}
.zy-main {
  width: 100%;
  height: 100%;
  background: url("../../assets/images/register-bg.png") no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
}
.wrap {
  width: 1170px;
  height: 1522px;
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
}
.span_expert {
  width: 96px;
  height: 24px;
  font-size: 24px;
  font-family: MicrosoftYaHei-Bold;
  font-weight: bold;
  color: rgba(71, 71, 71, 1);
  line-height: 77px;
  margin-left: 108px;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.register-btn {
  width: 400px;
  height: 40px;
  color: white;
  border-radius: 3px;
  border: none;
  background-color: #387ee8;
}
</style>