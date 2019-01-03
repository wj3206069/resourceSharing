<template>
  <div class="CreateNewTemplate">
    <div class="create-steps mg-t-30">
      <ul class="zx-flex align">
        <li v-for="(item, index) in stepsList"
            :key="index"
            class="steps-item flex-1"
            :class="{'active': isActive === index}"
            @click.stop.prevent="isActive=index">
          <div class="icon-box round zx-flex align justify cursor">
            <i class="zxicon fs-30"
               :class="item.icon"></i>
          </div>
          <span class="name block fs-14 text-c">{{item.name}}</span>
        </li>
      </ul>
    </div>
    <basic-info class="step-content"
                v-show="isActive === 0"></basic-info>
    <service-time class="step-content"
                  v-show="isActive === 1"></service-time>
    <status-info class="step-content"
                 v-show="isActive === 2"></status-info>
    <address-info class="step-content"
                  v-show="isActive === 3"></address-info>
    <device-info class="step-content"
                 v-show="isActive === 4"></device-info>
    <service-info class="step-content"
                  v-show="isActive === 5"></service-info>
    <contact-way class="step-content"
                 v-show="isActive === 6"></contact-way>
    <footer class="footer zx-flex align justify">
      <el-button class="fs-16 c-white bg-primary">上一页</el-button>
      <el-button class="fs-16 c-white bg-primary"
                 style="margin-left: 30px;">新增数据项</el-button>
    </footer>
  </div>
</template>

<script>
import BasicInfo from './BasicInfo'
import ServiceTime from './ServiceTime'
import StatusInfo from './StatusInfo'
import AddressInfo from './AddressInfo'
import DeviceInfo from './DeviceInfo'
import ServiceInfo from './ServiceInfo'
import ContactWay from './ContactWay'
export default {
  name: 'CreateNewTemplate',
  components: {
    BasicInfo,
    ServiceTime,
    StatusInfo,
    AddressInfo,
    DeviceInfo,
    ServiceInfo,
    ContactWay
  },
  data () {
    return {
      stepsList: [{
        icon: 'zx-jibenxinxi',
        name: '基本信息'
      }, {
        icon: 'zx-shijian',
        name: '服务时间'
      }, {
        icon: 'zx-zizhi',
        name: '资质信息'
      }, {
        icon: 'zx-dizhi',
        name: '地址信息'
      }, {
        icon: 'zx-shebei',
        name: '设备信息'
      }, {
        icon: 'zx-fuwu',
        name: '服务信息'
      }, {
        icon: 'zx-lianxi',
        name: '联系方式'
      }],
      isActive: 0
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../assets/style/color.less';
.CreateNewTemplate {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  .create-steps {
    width: 100%;
    padding: 0 180px;
    .steps-item {
      position: relative;
      color: @borderColor1;
      &::before {
        content: ' ';
        position: absolute;
        left: 76px;
        right: 0;
        top: 38px;
        height: 2px;
        background-color: @borderColor1;
        z-index: 9;
      }
      &:last-child::before {
        display: none;
      }
      .icon-box {
        width: 76px;
        height: 76px;
        margin-bottom: 10px;
        border: 2px solid @borderColor1;
      }
      .name {
        width: 76px;
      }
    }
    .active {
      color: @primary;
      &::before {
        background-color: @primary;
      }
    }
    .active .icon-box {
      border-color: @primary;
      background-color: rgba(97, 163, 254, 0.1);
    }
  }
  .step-content {
    margin-top: 80px;
  }
  .footer {
    width: 100%;
    margin-bottom: 70px;
    > button {
      border: none;
    }
  }
}
.BasicInfo {
  width: 100%;
  .upload-img {
    .warning-text {
      height: 44px;
      line-height: 44px;
    }
    .upload {
      width: 570px;
      min-height: 230px;
      border: 1px solid @borderColor1;
      padding-bottom: 24px;
      .upload-btn {
        width: 155px;
        height: 155px;
        border: 1px dashed @borderColor1;
        border-radius: 10px;
        margin-left: 24px;
        margin-top: 24px;
        .avatar-uploader {
          height: inherit;
          width: inherit;
        }
      }
    }
  }
  .custom {
    .custom-title {
      height: 44px;
      width: 570px;
    }
    .choose-one {
      width: 160px;
    }
    .custom-handle {
      padding: 15px 0;
      .choose {
        height: 40px;
        border: 1px solid @primary;
        > div {
          height: 100%;
          line-height: 40px;
        }
        .active {
          background-color: @primary;
          color: @white;
        }
      }
    }
  }
  .service-type {
    height: 40px;
    > div {
      width: 110px;
      height: 38px;
      border: 1px solid @borderColor1;
    }
    .active {
      border-color: @primary;
      background-color: rgba(97, 163, 254, 0.1);
      color: @grey;
    }
  }
}
</style>