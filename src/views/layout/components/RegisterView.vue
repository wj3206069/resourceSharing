<template>
  <div class="RegisterView">
    <header class="header zx-flex align">
      <div class="logo-box">
        <img src="../../../assets/images/logo.png"
             alt=""
             width="45"
             height="45">
      </div>
      <p class="zx-flex align c-white fs-30"
         style="margin-left: 12px;">深圳市大型科学仪器设施资源共享平台</p>
    </header>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <footer class="footer zx-flex column fs-12 c-white">
      <p class="zx-flex align justify">深圳市卓讯信息技术有限公司</p>
      <p class="zx-flex align justify">深圳科创委版权所有 @2018. All rights reserved. 网站标识码：4403000018粤ICP备18010673号-1 粤公网安备</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'RegisterView',
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
.RegisterView {
  height: 100%;
  padding: 90px 0 50px 0;
  .header {
    position: fixed;
    top: 0;
    left: 0;
    height: 90px;
    width: 100%;
    padding-left: 19.5%;
    background-color: #24292e;
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background-color: #24292e;
  }
}
</style>