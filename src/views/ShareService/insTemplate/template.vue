<template>
  <div class="ins-template">
    <!-- 步骤条 -->
    <div class="steps">
      <div class="step-warpper "
           @click="chooseForm1"
           :class="showForm==='form1'?'active':''">
        <div class="step-top">
          <div class="step-circle">
            <i class="zxicon zx-danwei1"></i>
          </div>
          <div class="line"></div>
        </div>
        <div class="step-title">
          <span>单位信息</span>
        </div>
      </div>
      <div class="step-warpper"
           style="margin-left: -5px;"
           :class="showForm==='form2'?'active':''"
           @click="chooseForm2">
        <div class="step-top">
          <div class="step-circle">
            <i class="zxicon zx-wenjianbianji"></i>
          </div>
          <!-- <div class="line"></div> -->
        </div>
        <div class="step-title">
          <span>仪器信息</span>
        </div>
      </div>
    </div>
    <div class="template-body">
      <!-- 第一个步骤条的内容 -->
      <div class="form1"
           v-show="showForm=='form1'">
        <div class="form-item">
          <div class="item-left">
            <label class=""
                   for="">所属地
              <span>*</span>
            </label>
          </div>
          <div class="item-right">
            <div class="right-top">
              <span class="company">单位</span>
              <span class="">创新载体</span>
            </div>
            <div class="right-bottom">
              <el-select v-model="region"
                         placeholder="请选择单位">
                <el-option label="区域一"
                           value="shanghai"></el-option>
                <el-option label="区域二"
                           value="beijing"></el-option>
              </el-select>
              <el-select v-model="region"
                         disabled
                         placeholder="请先选择单位">
                <el-option label="区域一"
                           value="shanghai"></el-option>
                <el-option label="区域二"
                           value="beijing"></el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="form-item">
          <div class="item-left">
            <label class=""
                   for="">实验地区
              <span>*</span>
            </label>
          </div>
          <div class="item-right">
            <div class="right-top">
              <span class="company"
                    style="width:21%;">所属区</span>
              <span class="">具体地址</span>
            </div>
            <div class="right-bottom">
              <el-select v-model="region"
                         class="select-adddress"
                         placeholder="区">
                <el-option label="区域一"
                           value="shanghai"></el-option>
                <el-option label="区域二"
                           value="beijing"></el-option>
              </el-select>
              <span style="font-size: 38px;vertical-align: top;">·</span>
              <el-select v-model="region"
                         disabled
                         placeholder="请先选择区">
                <el-option label="区域一"
                           value="shanghai"></el-option>
                <el-option label="区域二"
                           value="beijing"></el-option>
              </el-select>
            </div>
            <div class="map">
              <!-- <Map></Map> -->
            </div>
          </div>
        </div>
        <div class="form-footer">
          <el-button class="next-page"
                     type="primary">下一页</el-button>
          <el-button class="add-item"
                     type="primary">新增数据项</el-button>
        </div>
      </div>
      <!-- 第二个步骤条的内容 -->
      <div class="form2"
           v-show="showForm=='form2'">
        <div class="form-item">
          <div class="item-left">
            <label class=""
                   for="">人员
            </label>
          </div>
          <div class="item-right">
            <div class="right-top">
              <span class="company">
                负责人
                <span style="color:red;">*</span>
              </span>
              <span class="">操作员</span>
            </div>
            <div class="right-bottom">
              <el-select v-model="region"
                         placeholder="请选择负责人">
                <el-option label="区域一"
                           value="shanghai"></el-option>
                <el-option label="区域二"
                           value="beijing"></el-option>
              </el-select>
              <el-select v-model="region">
                <el-option label="区域一"
                           value="shanghai"></el-option>
                <el-option label="区域二"
                           value="beijing"></el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="form-item">
          <div class="item-left">
            <label class=""
                   for="">联系方式
            </label>
          </div>
          <div class="item-right">
            <div class="right-top">
              <span class="company">电话
                <span style="color:red;">*</span>
              </span>
              <span class="">邮箱</span>
            </div>
            <div class="right-bottom">
              <el-input v-model="region"></el-input>
              <el-input v-model="region"></el-input>
            </div>
          </div>
        </div>
        <div class="form-item">
          <div class="item-left">
            <label class=""
                   for="">设备名称
            </label>
          </div>
          <div class="item-right">
            <div class="right-top">
              <span class="company">中文
                <span style="color:red;">*</span>
              </span>
              <span class="">英文</span>
            </div>
            <div class="right-bottom">
              <el-input v-model="region"></el-input>
              <el-input v-model="region"></el-input>
            </div>
          </div>
        </div>
        <div class="form-item">
          <div class="item-left">
            <label class=""
                   for="">评议编号
            </label>
          </div>
          <div class="item-right">
            <el-select v-model="region"
                       style="width:100%;">
              <el-option label="区域一"
                         value="shanghai"></el-option>
              <el-option label="区域二"
                         value="beijing"></el-option>
            </el-select>
            <div class="tips">
              <span class="tips-first">仪器名称：
                <span>某某仪器名称</span>
              </span>
              <span class="tips-second">申购人：
                <span>申购人名称</span>
              </span>
            </div>
          </div>
        </div>
        <div class="form-item">
          <div class="item-left">
            <label class=""
                   for="">仪器分类
            </label>
          </div>
          <div class="item-right select-equip">
            <span class="equip-type active">分析仪器</span>
            <span class="equip-type">物理性能测试仪器</span>
            <span class="equip-type">计量仪器</span>
            <span class="equip-type">电子测量仪器</span>
            <span class="equip-type">大气探测仪器</span>
            <span class="equip-type">海洋仪器</span>
            <span class="equip-type">地球探测仪器</span>
            <span class="equip-type">天文仪器</span>
            <span class="equip-type active">医学诊断仪器</span>
            <span class="equip-type">核仪器</span>
            <span class="equip-type">特种检测仪器</span>
            <span class="equip-type">工艺试验设备</span>
            <span class="equip-type">计算机及其配套设备</span>
            <span class="equip-type">激光器</span>
          </div>
        </div>
        <div class="form-item">
          <div class="item-left">
            <label class=""
                   for="">文件附件
            </label>
          </div>
          <div class="item-right">
            <div class="zx-flex between">
              <div class="item-file-input"></div>
              <span class="upload-file">上传附件</span>
            </div>
          </div>
        </div>
        <div class="form-item">
          <div class="item-left">
            <label class=""
                   for="">图片附件
            </label>
          </div>
          <div class="item-right">
            <div class="limit-title">最多九张</div>
            <div class="item-unpload-pic">
              <el-upload action="https://jsonplaceholder.typicode.com/posts/"
                         list-type="picture-card"
                         :on-preview="handlePictureCardPreview"
                         :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%"
                     :src="dialogImageUrl"
                     alt="">
              </el-dialog>
            </div>
          </div>
        </div>
        <div class="form-footer">
          <el-button class="prev-page"
                     type="primary">上一页</el-button>
          <el-button class="add-item"
                     type="primary">新增数据项</el-button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// import Map from '@/components/map/index'
// import { getLogin, test } from '@/api/article'
export default {
  // components: { Map },
  name: 'ins-template',
  data () {
    return {
      showForm: 'form1',  // 显示哪个步骤的form表单
      region: '',
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    chooseForm1 () {
      this.showForm = 'form1'
      console.log(this.showForm === 'form1')
      console.log(this.showForm === 'form2')
    },
    chooseForm2 () {
      this.showForm = 'form2'
      console.log(this.showForm === 'form2')
      console.log(this.showForm === 'form1')
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  },
  created () {
    // getLogin({
    //   username: 'szzx',
    //   password: '123456'
    // })
    //   .then(res => {
    //     const data = res.data

    //     if (data.success) {
    //       console.log('成功了')
    //     } else {
    //       console.log('失败了')
    //     }
    //   })
    //   .catch(() => {
    //     console.log('异常了')
    //   })
    // test()
    //   .then(res => {
    //     const data = res.data

    //     if (data.success) {
    //       console.log('成功了')
    //     } else {
    //       console.log('失败了')
    //     }
    //   })
    //   .catch(() => {
    //     console.log('异常了')
    //   })
  }
}
</script>

<style lang="less">
.ins-template {
  width: 100%;
  .steps {
    margin-left: 43%;
    padding: 20px 0;
    .step-warpper {
      display: inline-block;
      width: 267px;
      .step-top {
        position: relative;
        .step-circle {
          display: inline-block;
          width: 70px;
          height: 70px;
          border: 1px solid #c6c6c6;
          border-radius: 70px;
          text-align: center;
          line-height: 75px;
          color: #c6c6c6;
          background-color: white;
          cursor: pointer;
          i {
            font-size: 35px;
          }
        }
        .line {
          position: absolute;
          top: 35px;
          left: 70px;
          width: 197px;
          height: 2px;
          background-color: #61a3fe;
        }
      }
      .step-title {
        padding: 10px;
        color: #c6c6c6;
        font-size: 14px;
      }
    }
    .active {
      .step-circle {
        color: #61a3fe !important;
        border: 1px solid #61a3fe !important;
        background-color: #d1e3ff !important;
      }
      .step-title {
        color: #61a3fe !important;
      }
    }
  }
  .template-body {
    max-height: 68vh;
    overflow-y: auto;
    .form1,
    .form2 {
      width: 700px;
      margin: auto;
      text-align: right;

      .form-item {
        .item-left {
          display: inline-block;
          vertical-align: top;
          padding-top: 10px;
          padding-right: 30px;
          color: #999999;
          span {
            color: red;
          }
        }
        .item-right {
          display: inline-block;
          width: 570px;
          padding-bottom: 10px;
          .right-top {
            text-align: left;
            padding: 10px 0;
            border-bottom: 1px solid #dddddd;
            color: #666666;
            .company {
              display: inline-block;
              width: 49%;
            }
          }
          .right-bottom {
            padding: 10px 0;
            text-align: left;
            .el-select,
            .el-input {
              width: 280px;
            }
            .select-adddress {
              width: 110px !important;
              .el-input {
                width: 110px !important;
              }
            }
          }
          input {
            border-color: #dadada;
          }
          .map {
            width: 570px;
            height: 308px;
          }
          .tips {
            text-align: left;
            font-size: 14px;
            padding: 10px 0;
            .tips-first {
              width: 45%;
              display: inline-block;
            }
            .tips-first,
            .tips-second {
              span {
                color: #61a3fe;
              }
            }
          }
          .item-file-input {
            width: 450px;
            height: 40px;
            border: 1px solid #dddddd;
          }
          .upload-file {
            border: 1px solid #61a3fe;
            padding: 7px 15px;
            background-color: #d1e3ff;
            color: #61a3fe;
            line-height: 24px;
          }
          .limit-title {
            text-align: left;
            padding: 10px 0;
            color: #999999;
          }
          .item-unpload-pic {
            width: 570px;
            height: 232px;
            border: 1px solid #dadada;
            border-radius: 5px;
            padding: 24px;
            text-align: left;
            .el-upload {
              width: 180px;
              height: 180px;
              overflow: hidden;
              padding-top: 10px;
            }
          }
        }
        .select-equip {
          text-align: left;
          color: #999999;
          padding-top: 10px;
          span {
            display: inline-block;
            padding: 7px 15px;
            margin-bottom: 10px;
            margin-right: 10px;
            border: 1px solid #dddddd;
            cursor: pointer;
          }
          .active {
            border-color: #61a3fe;
            color: #333333;
            background-color: #d1e3ff;
          }
        }
      }
      .form-footer {
        padding-right: 205px;
        .next-page,
        .prev-page,
        .add-item {
          background-color: #61a3fe;
          border-color: #61a3fe;
          padding: 12px 33px;
        }
        .add-item {
          padding: 12px 19px;
        }
      }
    }
  }
}
</style>