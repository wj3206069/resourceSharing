<template>
  <div class="add-equip">
    <el-dialog :title="add_dialog_title"
               :visible.sync="dialogFormVisible">
      <!-- 第一步 start -->
      <el-form :model="form1"
               :rules='rules1'
               ref="dataForm1"
               v-show="show.form1.show">
        <el-form-item label="所属单位："
                      prop="unit_id">
          <el-select v-model="form1.unit_id"
                     :disabled="isDesable"
                     placeholder="请选择"
                     :autofocus="isDesable">
            <el-option v-for="item in companyList"
                       :key='item.unit_id'
                       :label="item.unitname"
                       :value="item.unit_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属创新载体："
                      prop="platform_id">
          <el-select v-model="form1.platform_id"
                     :disabled="isDesable"
                     placeholder="请选择">
            <el-option v-for="(item,index) in InnovationList"
                       :key="index"
                       :label="item.name"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="实验地址："
                      prop="address">
          <el-input v-model="form1.address"
                    :disabled="isDesable"
                    auto-complete="off"></el-input>
          <div class="map">
            <vue-map></vue-map>
          </div>
        </el-form-item>

      </el-form>
      <!-- 第一步 end -->

      <!-- 第二步 start -->
      <el-form :model="form2"
               :rules="rules2"
               ref="dataForm2"
               v-show="show.form2.show">
        <el-form-item label="负责人："
                      prop="principal_id">
          <el-select v-model="form2.principal_id"
                     :disabled="true"
                     placeholder="请选择">
            <el-option v-for='item in userInfo'
                       :key="item.id"
                       :label="item.username"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系方式："
                      prop="phone">
          <el-input v-model="form2.phone"
                    :disabled="isDesable"
                    auto-complete="off"
                    placeholder="请输入联系方式"></el-input>
        </el-form-item>
        <el-form-item label="邮箱："
                      prop="mail">
          <el-input v-model="form2.mail"
                    :disabled="isDesable"
                    auto-complete="off"
                    placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="操作员："
                      prop="operate">
          <el-select v-model="form2.operate"
                     multiple
                     :disabled="isDesable"
                     placeholder="请选择">
            <el-option v-for='item in userInfo'
                       :key="item.id"
                       :label="item.username"
                       :value="`${item.username}~${item.id}`"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否自制设备："
                      prop="operate">
          <el-radio v-model="form2.isMyCreate"
                    label="1">是</el-radio>
          <el-radio v-model="form2.isMyCreate"
                    label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="是否海关监管："
                      prop="operate">
          <el-radio v-model="form2.isCustomsSupervise"
                    label="1">是</el-radio>
          <el-radio v-model="form2.isCustomsSupervise"
                    label="0">否</el-radio>
        </el-form-item>
      </el-form>
      <!-- 第二步 end -->

      <!-- 第三步 start-->
      <el-form :model="form3"
               :rules='rules3'
               ref="dataForm3"
               v-show="show.form3.show">
        <el-form-item label="设备中文名称："
                      prop="cname">
          <el-input v-model="form3.cname"
                    :disabled="isDesable"
                    auto-complete="off"
                    placeholder="请输入设备中文名称"></el-input>
        </el-form-item>
        <el-form-item label="设备英文名称："
                      prop='ename'>
          <el-input v-model="form3.ename"
                    :disabled="isDesable"
                    auto-complete="off"
                    placeholder="请输入设备英文名称"></el-input>
        </el-form-item>
        <el-form-item label="评议编号："
                      prop='reviewno'>
          <el-select v-model="form3.reviewno"
                     :disabled="true"
                     placeholder="请选择">
            <el-option v-for="(item,index) in InnovationList"
                       :key="index"
                       :label="item.name"
                       :value="item.id"></el-option>
            <!-- <el-option label="区域二"
                       value="2"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="设备分类："
                      prop='classify'>
          <el-select v-model="form3.classify"
                     :disabled="isDesable"
                     placeholder="请选择">
            <el-option v-for="item in classifyList"
                       :key="item.levelcode"
                       :label="item.fieldname"
                       :value="item.levelcode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备小类："
                      prop='subclass'>
          <el-select v-model="form3.subclass"
                     :disabled="isDesable"
                     placeholder="请选择">
            <el-option v-for="item in subclassList"
                       :key="item.fieldcode"
                       :label="item.fieldname"
                       :value="item.fieldcode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="共享类型："
                      prop='sharingtype'>
          <el-select v-model="form3.sharingtype"
                     :disabled="isDesable"
                     placeholder="请选择">
            <el-option v-for="item in sharingTypeList"
                       v-if="sharingTypeList.length>0"
                       :key="item.fieldcode"
                       :label="item.fieldname"
                       :value="item.fieldcode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="型号规格："
                      prop='specification'>
          <el-input v-model="form3.specification"
                    :disabled="isDesable"
                    auto-complete="off"
                    placeholder="请输入型号规格"></el-input>
        </el-form-item>
        <el-form-item label="设备产地："
                      prop='origin'>
          <el-input v-model="form3.origin"
                    :disabled="isDesable"
                    auto-complete="off"
                    placeholder="请输入设备产地"></el-input>
        </el-form-item>
        <el-form-item label="制造厂商："
                      prop='manufacturer'>
          <el-input v-model="form3.manufacturer"
                    :disabled="isDesable"
                    auto-complete="off"
                    placeholder="请输入制造厂商"></el-input>
        </el-form-item>
        <el-form-item label="设备单价："
                      prop='price'>
          <el-input v-model="form3.price"
                    :disabled="isDesable"
                    auto-complete="off"
                    placeholder="请输入设备单价(万元)"></el-input>
        </el-form-item>
        <el-form-item label="购置日期："
                      prop='acquisitiondate'>
          <el-date-picker v-model="form3.acquisitiondate"
                          :disabled="isDesable"
                          type="date"
                          format="yyyy 年 MM 月 dd 日"
                          value-format="yyyy-MM-dd"
                          placeholder="请选择">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="单次标准工作时长："
                      prop='standard'>
          <el-input v-model="form3.standard"
                    :disabled="isDesable"
                    auto-complete="off"
                    placeholder="请输入单次标准工作时长(小时)"></el-input>
        </el-form-item>
        <el-form-item label="技术指标："
                      prop='indicator'>
          <el-input type="textarea"
                    :disabled="isDesable"
                    v-model="form3.indicator"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="主要功能："
                      prop='function'>
          <el-input type="textarea"
                    :disabled="isDesable"
                    v-model="form3.function"
                    placeholder="请输入">
          </el-input>
        </el-form-item>
        <el-form-item label="图片：">

          <div class="picture-list">
            <el-upload class="upload-demo"
                       list-type="picture"
                       :disabled="isDesable"
                       :limit="9"
                       :on-exceed='exceedFile'
                       :file-list="fileList2"
                       action="/Sz_dxyq/fileAction/uploadFile"
                       :data='picObj'
                       :before-upload="pictureLoading"
                       :on-success="picSuccess"
                       :on-remove="picRemove">
              <el-button size="small"
                         v-show="!isDesable"
                         type="primary">点击上传</el-button>
              <!-- <div slot="tip"
                   class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload>
          </div>

        </el-form-item>
        <el-form-item label="上机操作协议附件：">
          <div class="file-list">
            <el-upload class="upload-demo"
                       :disabled="isDesable"
                       :file-list="fileList3"
                       action="/Sz_dxyq/fileAction/uploadFile"
                       :data='fileObj'
                       :before-upload="fileLoading"
                       :on-success="fileSuccess"
                       :on-remove="fileRemove">
              <el-button size="small"
                         v-show="!isDesable"
                         type="primary">点击上传</el-button>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="上机操作要求："
                      prop='operation_requirements'>
          <el-input type="textarea"
                    :disabled="isDesable"
                    v-model="form3.operation_requirements"
                    placeholder="请输入">
          </el-input>
        </el-form-item>
      </el-form>
      <!-- 第三步 end-->

      <div slot="footer"
           class="dialog-footer">
        <el-button class="prev-step"
                   type="primary"
                   @click="prevStep"
                   v-show="form_button.prevStep">上一步</el-button>
        <el-button class="submit"
                   type="primary"
                   @click="submitData"
                   v-show="form_button.submit"
                   v-if="!isDesable">提交</el-button>
        <el-button class="submit"
                   type="primary"
                   @click="save"
                   v-show="form_button.save"
                   v-if="!isDesable">暂存</el-button>
        <el-button class="submit"
                   type="primary"
                   @click="save_step"
                   v-show="form_button.save_step">{{btn_title}}</el-button>
        <el-button class="cancel"
                   type="primary"
                   @click="cancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { preview } from '@/api/index'
import VueMap from '@/components/map/index'
import { successTips, failTips } from '@/until/showTips'
import {
  addEquipmentPlat,
  editEquipmentPlat,
  getUserInfoPlat,
  deleteFile,
  editDetailPlat
} from '@/api/EquipService/EquipManagerAPI.js'

export default {
  components: { VueMap },
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    // 是否可编辑    true:不可编辑   false 可编辑
    isDesable: {
      type: Boolean
    },
    // dialog标题
    title: {
      type: String
    },
    // 父组件传过来的分析仪器数据
    sharingTypeList: {
      type: Array
    },
    // 父组件传过来的所属单位的数据
    companyList: {
      type: Array
    },
    // 父组件传过来的所属单位的数据
    InnovationList: {
      type: Array
    },
    // 父组件传过来的设备分类数据
    classifyList: {
      type: Array
    },
    // 父组件传过来的编辑、查看详情当前行的信息
    row: {
      type: Object
    }
  },
  watch: {
    // 监听内部弹框变量
    dialogFormVisible () {
      if (!this.dialogFormVisible) {
        this.$emit('closeAddDialog', this.dialogFormVisible)
        // 让step重置为1，保证下次进来的是第一步
        this.step = 1
        // 让form1的id置为空，防止下次新增进来仍然是编辑
        this.form1.id = ''
        // 弹框消失清空form表单的内容
        this.$refs['dataForm1'].resetFields()
        this.$refs['dataForm2'].resetFields()
        this.$refs['dataForm3'].resetFields()
        // 重置row，防止点击同一条记录的详情和编辑因为数据没变导致不请求接口
        // this.row = {}
        this.form3.picture_ids = []
        this.form3.attachment_ids = []
        this.fileList2 = []
        this.fileList3 = []
      }
    },
    // 监听外部传进来的弹框变量
    showDialog () {
      this.dialogFormVisible = this.showDialog
      // 弹框显示时判断当前是哪一步，显示哪一步的内容
      this.show_hidden_form()
    },
    // 监听编辑状态变量
    isDesable () {
      if (this.isDesable) {
        this.btn_title = '下一步'
      } else {
        this.btn_title = '暂存进入下一步'
      }
    },
    // 监听dialog标题变量
    title () {
      // 刚进来时是哪一步就改变哪一步的title
      if (this.step === 1) {
        this.add_dialog_title = this.title + '-单位信息'
      }
      if (this.step === 2) {
        this.add_dialog_title = this.title + '-联系方式'
      }
      if (this.step === 3) {
        this.add_dialog_title = this.title + '-仪器信息'
      }
    },
    // 监听设备分类变量
    'form3.classify' () {
      for (var i = 0; i < this.classifyList.length; i++) {
        if (this.classifyList[i].levelcode === this.form3.classify) {
          this.subclassList = this.classifyList[i].children
          this.form3.subclass = this.subclassList[0].fieldcode
          break
        }
      }
    },
    // 监听编辑、查看详情当前行的信息
    row () {
      if (this.title === '新增') return
      if (this.row === {}) return
      editDetailPlat({
        id: this.row.row.id
      }).then(res => {
        const data = res.data
        if (data.success) {
          this.initForm(data)
        }
      })
    }
  },
  data () {
    return {
      dialogFormVisible: false,
      // 图片列表
      fileList2: [],
      // 图片上传额外参数
      picObj: {
        MultipartFile: ''
      },
      // 文件列表
      fileList3: [],
      // 文件上传额外参数
      fileObj: {
        MultipartFile: ''
      },
      // 表单1
      form1: {
        id: '',
        unit_id: '',
        platform_id: '',
        address: '',
        status: 1   // 第一步、第二步传1，第三步传2
      },
      addId: '',         // 添加第一步时候的id或者编辑进来的Id
      subclassList: [],  // 设备小类列表
      // 表单1规则
      rules1: {
        unit_id: [
          { required: true, message: '请选择所属单位', trigger: 'blur' }
        ],
        platform_id: [
          { required: false, message: '请选择所属创新载体', trigger: 'blur' }
        ],
        address: [
          { required: false, message: '请输入试验地址', trigger: 'blur' }
        ]
      },
      // 表单2
      form2: {
        id: '',             // 提交的时候需要
        principal_id: '',   // 负责人
        operate: '',        //
        phone: '',          // 联系电话
        mail: '',            // 邮箱
        status: 1,   // 第一步、第二步传1，第三步传2
        isMyCreate: '0',    // 新增字段 是否自制设备  1：是  0：否
        isCustomsSupervise: '0'    // // 新增字段 是否海关监管  1：是  0：否
      },
      // 表单2规则
      rules2: {
        principal_id: [
          { required: true, message: '请选择负责人', trigger: 'blur' }
        ],
        operate: [
          { required: false, message: '请选择操作员', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入联系方式', trigger: 'blur' }
        ],
        mail: [
          { required: false, message: '请输入邮箱', trigger: 'blur' }
        ]
      },
      userInfo: [],      // 人员信息
      // 表单3
      form3: {
        id: '',                 // 提交的时候需要
        cname: '',              // 设备中文名称
        ename: '',              // 设备英文名称
        reviewno: '',           // 评议编号
        classify: '',           // 设备分类
        subclass: '',           // 设备小类
        sharingtype: '',        // 共享类型
        specification: '',      // 型号规格
        origin: '',             // 设备产地
        manufacturer: '',       // 制造厂商
        price: '',              // 设备单价
        acquisitiondate: '',    // 购置日期
        standard: '',           // 标准工作时长
        indicator: '',          // 技术指标
        function: '',           // 主要功能
        picture_ids: [],        // 图片
        attachment_ids: [],     // 附件
        operation_requirements: '', // 上级操作要求
        status: 3   // 第一步、第二步传1，机构第三步传2，平台第三步传3
      },
      // 表单3规则
      rules3: {
        cname: [
          { required: true, message: '请输入设备中文名称', trigger: 'blur' }
        ],
        ename: [
          { required: false, message: '请输入活动名称', trigger: 'blur' }
        ],
        reviewno: [
          { required: false, message: '请输入活动名称', trigger: 'blur' }
        ],
        classify: [
          { required: true, message: '请选择设备分类', trigger: 'blur' }
        ],
        subclass: [
          { required: true, message: '请选择设备小类', trigger: 'blur' }
        ],
        sharingtype: [
          { required: true, message: '请选择共享类型', trigger: 'blur' }
        ],
        specification: [
          { required: false, message: '请输入活动名称', trigger: 'blur' }
        ],
        origin: [
          { required: false, message: '请输入活动名称', trigger: 'blur' }
        ],
        manufacturer: [
          { required: false, message: '请输入活动名称', trigger: 'blur' }
        ],
        price: [
          { required: false, message: '请输入活动名称', trigger: 'blur' }
        ],
        acquisitiondate: [
          { required: false, message: '请输入活动名称', trigger: 'blur' }
        ],
        standard: [
          { required: false, message: '请输入活动名称', trigger: 'blur' }
        ],
        indicator: [
          { required: false, message: '请输入活动名称', trigger: 'blur' }
        ],
        function: [
          { required: true, message: '请描述主要功能', trigger: 'blur' }
        ],
        operation_requirements: [
          { required: false, message: '请输入活动名称', trigger: 'blur' }
        ]
      },
      show: {
        form1: {
          show: true,
          save: true,
          save_step: true,
          prevStep: false,
          submit: false
        },
        form2: {
          show: false,
          prevStep: true,
          save: true,
          save_step: true,
          submit: false
        },
        form3: {
          show: false,
          prevStep: true,
          submit: true,
          save_step: false,
          save: false
        }
      },
      form_button: {},
      value1: '',
      step: 1,  // 记录步骤
      dialogImageUrl: '',
      dialogVisible: false,
      add_dialog_title: '',
      btn_title: '下一步',
      preview: `http://${location.host}${preview}/` // 预览地址
    }
  },
  created () {
    // 获取人员信息
    getUserInfoPlat().then(res => {
      let data = res.data
      if (data.success) {
        this.userInfo = data.unitinformationlist
        // 机构进来负责人不可更改，只能是自己
        for (let i = 0; i < this.userInfo.length; i++) {
          if (this.userInfo[i].status === '1') {
            this.form2.principal_id = this.userInfo[i].id
            break
          }
        }
      }
    })
  },
  mounted () {
    // 默认显示第一步
    this.form_button = this.show.form1
    // 默认显示第一个设备分类的设备小类
    // this.subclassList = this.classifyList[0].children
  },
  methods: {
    closeDialog () {
      this.$emit('closeAddDialog', false)
    },
    // 限制图片上传
    exceedFile (files, fileList) {
      this.$message.warning(`最多只能上传9张图片`)
    },
    // 图片上传额外参数赋值
    pictureLoading (file) {
      this.picObj.MultipartFile = file
    },
    // 图片删除
    picRemove (file, fileList) {
      deleteFile(file.response.fileid).then(res => {
        const data = res.data
        if (data.success) {
          // let piclist = this.form3.picture_ids.split(',')
          let piclist = this.form3.picture_ids
          for (let i = 0; i < piclist.length; i++) {
            if (file.response.fileid === piclist[i]) {
              piclist.splice(i, 1)
              // this.form3.picture_ids = piclist.join(',')
              this.form3.picture_ids = piclist
              break
            }
          }
        }
      })
    },
    // 图片上传成功回调
    picSuccess (response, file, fileList) {
      if (response.success) {
        // this.form3.picture_ids = response.fileid + ',' + this.form3.picture_ids
        this.form3.picture_ids.push(response.fileid)
      }
    },
    // 文件上传额外参数赋值
    fileLoading (file) {
      this.fileObj.MultipartFile = file
    },
    // 文件上传成功回调
    fileSuccess (response, file, fileList) {
      // this.form3.attachment_ids = response.fileid + ',' + this.form3.attachment_ids
      this.form3.attachment_ids.push(response.fileid)
    },
    // 文件删除,清除form3表单里面绑定的值
    fileRemove (file, fileList) {
      deleteFile(file.response.fileid).then(res => {
        const data = res.data
        if (data.success) {
          // let fileIds = this.form3.attachment_ids.split(',')
          let fileIds = this.form3.attachment_ids
          for (let i = 0; i < fileIds.length; i++) {
            if (file.response.fileid === fileIds[i]) {
              fileIds.splice(i, 1)
              // this.form3.attachment_ids = fileIds.join(',')
              this.form3.attachment_ids = fileIds
              break
            }
          }
        }
      })
    },
    // 上一步
    prevStep () {
      this.step--
      this.show_hidden_form()
    },
    // 暂存
    save () {
      this.save_submit(true)
    },
    // 暂存进入下一步
    save_step () {
      // 如果是查看详情，直接下一步，无需提交数据
      if (this.isDesable) {
        this.step++
        this.show_hidden_form()
        return
      }
      this.save_submit(false)
    },
    // 提交
    submitData () {
      this.save_submit(false)
    },
    // 取消
    cancel () {
      this.$emit('closeAddDialog', false)
    },
    // 显示或隐藏form表单
    show_hidden_form () {
      switch (this.step) {
        case 1:
          this.form_button = this.show.form1
          this.show.form3.show = false
          this.show.form2.show = false
          this.show.form1.show = true
          this.add_dialog_title = this.title + '-单位信息'
          break
        case 2:
          this.form_button = this.show.form2
          this.show.form3.show = false
          this.show.form2.show = true
          this.show.form1.show = false
          this.add_dialog_title = this.title + '-联系方式'
          break
        case 3:
          this.form_button = this.show.form3
          this.show.form3.show = true
          this.show.form2.show = false
          this.show.form1.show = false
          this.add_dialog_title = this.title + '-仪器信息'
          break
        default:
          break
      }
    },
    // 暂存或者暂存下一步  status: 判断是暂存还是暂存下一步  true: 暂存 false: 暂存下一步
    save_submit (status) {
      switch (this.step) {
        case 1:
          // 判断所属单位是否为空
          this.$refs['dataForm1'].validate((valid) => {
            // valid 判断表单是否为空  true：成功  false：表单项必填字段为空
            if (valid) {
              // 如果 form1的id为空，则为新增，不为空，则为编辑
              if (this.form1.id === '') {
                addEquipmentPlat(this.form1).then(res => {
                  const data = res.data
                  if (data.success) {
                    this.addId = data.id
                    if (!status) {
                      this.step++
                      this.show_hidden_form()
                    }
                  }
                })
              } else {
                // 判断角色

                editEquipmentPlat(this.form1).then(res => {
                  let data = res.data
                  if (data.success) {
                    if (!status) {
                      this.step++
                      this.show_hidden_form()
                    }
                  }
                })
              }
            }
          })
          break
        case 2:
          // 提交第二步的数据
          // 判断所属单位是否为空
          this.$refs['dataForm2'].validate((valid) => {
            if (valid) {
              this.form2.id = this.addId
              // 重新用一个变量赋值为form2，因为要将多选数组切割成字符串，返回上一步会出问题
              let form2 = JSON.parse(JSON.stringify(this.form2))
              form2.operate = form2.operate.join(',')

              editEquipmentPlat(form2).then(res => {
                const data = res.data
                if (data.success) {
                  if (!status) {
                    this.step++
                    this.show_hidden_form()
                  }
                }
              })
            }
          })
          break
        case 3:
          // 提交第三步的数据
          this.$refs['dataForm3'].validate((volid) => {
            if (volid) {
              this.form3.id = this.addId
              // this.form3.picture_ids = this.form3.picture_ids.substring(0, this.form3.picture_ids.length - 1)
              // this.form3.attachment_ids = this.form3.attachment_ids.substring(0, this.form3.attachment_ids.length - 1)
              this.form3.picture_ids = this.form3.picture_ids.join(',')
              this.form3.attachment_ids = this.form3.attachment_ids.join(',')

              editEquipmentPlat(this.form3).then(res => {
                const data = res.data
                if (data.success) {
                  this.$emit('closeAddDialog', false)
                  // 操作成功提示
                  successTips(this)
                } else {
                  failTips(this)
                }
              }).catch(() => {
                failTips(this)
              })
            }
          })
          break
        default:
          break
      }
    },
    // 编辑或者查看详情时给表单赋值
    initForm (val) {
      this.addId = val.instrumentin.id
      this.form1.id = val.instrumentin.id
      this.form1.unit_id = val.instrumentin.unit_id
      this.form1.platform_id = val.instrumentin.platform_id
      this.form1.address = val.instrumentin.address
      this.form2.id = val.instrumentin.id
      // 机构进来负责人不可更改，只能是自己,所以此处不赋值
      // this.form2.principal_id = val.instrumentin.principal_id
      if (val.instrumentin.operator) {
        this.form2.operate = val.instrumentin.operator.split(',')
      }

      this.form2.phone = val.instrumentin.phone
      this.form2.mail = val.instrumentin.mail
      this.form3.id = val.instrumentin.id
      this.form3.cname = val.instrumentin.cname
      this.form3.ename = val.instrumentin.ename
      this.form3.reviewno = val.instrumentin.reviewno
      this.form3.classify = val.instrumentin.classify
      this.form3.subclass = val.instrumentin.subclass
      this.form3.sharingtype = val.instrumentin.sharingtype
      this.form3.specification = val.instrumentin.specification
      this.form3.origin = val.instrumentin.origin
      this.form3.manufacturer = val.instrumentin.manufacturer
      this.form3.price = val.instrumentin.price
      this.form3.acquisitiondate = val.instrumentin.acquisitiondate
      this.form3.standard = val.instrumentin.standard
      this.form3.indicator = val.instrumentin.indicator
      this.form3.function = val.instrumentin.function
      this.form3.operation_requirements = val.instrumentin.operation_requirements

      if (val.instrumentin.picture_ids) {
        // this.form3.picture_ids = val.instrumentin.picture_ids
        this.form3.picture_ids = val.instrumentin.picture_ids.split(',')
        let picIdList = val.instrumentin.picture_ids.split(',')
        let arr = []
        for (let i = 0; i < picIdList.length; i++) {
          arr.push({ url: `${preview}/${picIdList[i]}` })
        }
        this.fileList2 = arr
      }

      if (val.attachment_ids.length > 0) {
        // this.form3.attachment_ids = val.instrumentin.attachment_ids
        // this.form3.attachment_ids = val.instrumentin.attachment_ids.split(',')
        let fileIdList = val.attachment_ids
        let arr = []
        for (let i = 0; i < fileIdList.length; i++) {
          arr.push(
            {
              url: `${preview}/${fileIdList[i].attachment_id}`,
              name: `${fileIdList[i].attachmentname}`
            }
          )
          this.form3.attachment_ids.push(fileIdList[i].attachment_id)
        }
        this.fileList3 = arr
      }
    },
    // 默认下拉框第一个选中
    initSelect () {
      setTimeout(() => {
        if (this.companyList.length > 0) {
          this.form1.unit_id = this.companyList[0].unit_id
        }
        if (this.InnovationList.length > 0) {
          this.form1.platform_id = this.InnovationList[0].id
        }
        if (this.classifyList.length > 0) {
          this.form3.classify = this.classifyList[0].levelcode
        }
        if (this.classifyList.length > 0) {
          this.form3.subclass = this.classifyList[0].children[0].fieldcode
        }
        this.form3.sharingtype = 1
      }, 2000)
    }
  }
}
</script>
<style lang="less">
.add-equip {
  .el-dialog {
    position: absolute;
    top: 50px;
    right: 0;
    width: 600px;
    height: calc(100vh - 50px);
    margin: 0 !important;
    border-radius: 0;
    .el-dialog__header {
      background-color: white;
      border-radius: 0;
      padding: 13px 20px;
      border-bottom: 1px solid #dddddd;
      .el-dialog__title {
        color: #474747;
        font-size: 16px;
      }
      i {
        color: #939393;
      }
    }
    .el-dialog__body {
      height: 82vh;
      padding-top: 30px;
      padding-right: 110px;
      overflow-y: auto;
      .el-form-item {
        margin-bottom: 18px;
        .el-form-item__label {
          width: 190px;
          text-align: right;
        }
        .el-form-item__content {
          margin-left: 190px !important;
          width: 300px;
          flex-wrap: wrap;
          .el-select {
            width: 300px;
          }
          input {
            height: 36px;
            border-color: #dddddd;
          }
          textarea {
            border-color: #dddddd;
            height: 100px;
          }
          .el-cascader__label {
            line-height: 40px;
          }
          .el-date-editor {
            width: 300px;
          }
          .picture-list,
          .file-list {
            width: 100%;
            .upload-demo {
              .el-upload--text {
                width: auto;
                button {
                  background-color: #eeeeee;
                  border-color: #eeeeee;
                  color: #474747;
                }
              }
              a {
                height: 20px;
              }
              li {
                margin: 0;
              }
            }
          }
          .map {
            position: relative;
            margin-top: 10px;
            width: 300px;
            height: 300px;
            border: 1px solid #dddddd;
          }
        }
        .picture,
        .file {
          width: 300px;
          height: 36px;
          border: 1px solid #dddddd;
          line-height: 35px;
          padding-left: 5px;
          button {
            padding: 7px 22px;
            background-color: #dddddd;
            border: none;
            border-radius: 4px;
          }
        }
        .el-upload {
          padding-top: 5px;
          padding-bottom: 10px;
        }
        .el-upload--picture {
          width: 82px;
          button {
            background-color: #eeeeee;
            color: #474747;
            border-color: #eeeeee;
          }
        }
        .el-upload-list--picture {
          display: flex;
          flex-wrap: wrap;
          .el-upload-list__item {
            width: 100px;
            padding: 10px 10px 10px 88px;
          }
        }
      }
    }
    .el-dialog__footer {
      padding-top: 14px;
      padding-bottom: 14px;
      border-top: 1px solid #dddddd;
      .dialog-footer {
        .prev-step {
          border-radius: 10px;
          border: none;
          background-color: #61a3fe;
          padding: 11px 19px;
        }
        .submit {
          border: none;
          border-radius: 10px;
          background-color: #61a3fe;
          padding: 11px 26px;
        }
        .cancel {
          background-color: #cccccc;
          border: none;
          border-radius: 10px;
          padding: 11px 26px;
        }
      }
    }
  }
}
.el-select-dropdown__wrap.el-scrollbar__wrap {
  margin-bottom: 0 !important;
}
::-webkit-scrollbar {
  display: none;
}
</style>

