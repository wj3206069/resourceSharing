<template>
  <div class="amap-page-container">
    <div id="container"
         tabindex="0">
    </div>
    <!-- <div id="myPageTop">
      <table>
        <tr>
          <td>
            <label>请输入关键字：</label>
          </td>
        </tr>
        <tr>
          <td>
            <input id="tipinput" v-model="mapValue" @focus="true" />
          </td>
        </tr>
      </table>
    </div> -->
    <div id="myPageTop">
      <input id="tipinput" v-model="mapValue" @blur="blurInput"/>    
    </div>
  </div>
</template>
<script>
import AMap from 'AMap'

export default {
  name: 'GaoDeMap',
  props: {
    // 父组件传过来的地址
    parentAddress: {
      type: String
    }
  },
  data () {
    return {
      msg: 'hello',
      mapValue: ''
    }
  },
  watch: {
    parentAddress() {
      if (this.parentAddress === '') {
        this.mapValue = this.parentAddress
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init: function () {
      let map = new AMap.Map('container', {
        center: [114.027754, 22.6085],
        resizeEnable: true,
        zoom: 10,
        lang: 'zh'
      })
      // 输入提示
      var autoOptions = {
        input: 'tipinput'
      }
      var auto = new AMap.Autocomplete(autoOptions)
      var placeSearch = new AMap.PlaceSearch({
        map: map
      })  // 构造地点查询类
      AMap.event.addListener(auto, 'select', select)// 注册监听，当选中某条记录时会触发
      function select (e) {
        placeSearch.setCity(e.poi.adcode)
        placeSearch.search(e.poi.name)  // 关键字查询查询
      }
    },
    // input框聚焦消失后获取vlaue，传给父组件，否则取不到点击高德列表后的value值
    blurInput(event) {
      setTimeout(() => {
        this.$emit('changeAddress', event.target.value)
      }, 100)
    }
  }
}
</script>
<style lang="less" scoped>
.amap-page-container {
  width: 100%;
  height: 100%;
  #container{
    height: 85%;
    margin-top: 20%;
    border: 1px solid #dddddd;
  }
  #myPageTop{
    width: 100%;
    padding: 0 10px;
    margin: 0;    
    right: 0;
  }
}
</style>