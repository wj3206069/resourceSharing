<template>
  <div style="">
    <div class="submenu-wrapper">
      <div class="navside-content"
           style="display:inline-block;"
           v-if="treeExpand">
        <div v-if="subMenuInfo.length != 0">
          <h3 class="tree-title">
            <strong>{{subMenuInfo.title}}</strong>
          </h3>
        </div>
        <div class="nav-sub-item">
          <ul>
            <template v-if="subMenuInfo.length != 0">
              <!-- <router-link :to="{name: item.path}"> -->
              <li v-for="(item, index) in subMenuInfo.children"
                  v-if="item.name!='index' && !item.hidden"
                  :key="item.name"
                  :class="{'nav-sub-active': subActive === index}"
                  @click="chooseSubMenu(item, index)">
                <strong>{{item.title}}</strong>
              </li>
              <!-- </router-link> -->

            </template>
          </ul>
        </div>
      </div>
      <button @click="treeTrigger"
              :class="['btn-trigger', {'expanded': !treeExpand}]">
        <span :class="['zxicon', 'zx-zhankai', {'zxicon-rotate': !treeExpand}]"></span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SubMenu',
  props: ['navSubActive'],
  data () {
    return {
      treeExpand: true,
      subTitle: '',
      subActive: 0
    }
  },
  computed: {
    ...mapGetters(['subMenuInfo'])
  },
  mounted () {
    this.subActive = sessionStorage.getItem('subActive') ? parseInt(sessionStorage.getItem('subActive')) : 0
  },
  methods: {
    treeTrigger () {
      this.treeExpand = !this.treeExpand
      this.$emit('subMenuClick', this.treeExpand)
    },
    handleNodeClick (data) {
      if (!!data.path && !!data.path.name) {
        console.log(data.path.name)
        this.$router.push({ name: data.path.name })
      }
    },
    chooseSubMenu (item, index) {
      this.subActive = index
      sessionStorage.setItem('subActive', this.subActive) // 保存二级菜单active状态
      console.log(item)
      this.$router.push({ name: item.name })
      this.subTitle = item.title
      this.$emit('getSubTitle', this.subTitle)
      // ----------------------
    }
  },
  watch: {
    navSubActive () {
      this.subActive = 0
    }
  }
}
</script>
<style lang='less'>
.btn-trigger {
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: calc(180px - 16px);
  transform: translateY(-50%);
  border: none;
  background: #fff;
  outline: none;
  z-index: 1;
}
.btn-trigger:hover .zxicon {
  color: #0f619f;
}
.btn-trigger.expanded {
  left: 0;
  background: #d9dee4;
}
.btn-trigger:before {
  position: absolute;
  left: 0;
  top: -10px;
  display: block;
  content: ' ';
  border: solid transparent;
  border-width: 5px 8px;
  border-right-color: #fff;
  border-bottom-color: #fff;
}
.btn-trigger:after {
  position: absolute;
  left: 0;
  display: block;
  content: ' ';
  border: solid transparent;
  border-width: 5px 8px;
  border-right-color: #fff;
  border-top-color: #fff;
}
.btn-trigger.expanded:before {
  position: absolute;
  left: 0;
  top: -10px;
  display: block;
  content: ' ';
  border: solid transparent;
  border-width: 5px 8px;
  border-left-color: #d9dee4;
  border-bottom-color: #d9dee4;
}
.btn-trigger.expanded:after {
  border-left-color: #d9dee4;
  border-top-color: #d9dee4;
}
.btn-trigger span {
  display: inline-block;
  transform: rotateZ(0);
  transition: transform 0.3s;
}
.btn-trigger span.zxicon-rotate {
  transform: rotateZ(180deg);
}
.zx-zhankai {
  font-size: 10px;
  color: #939393;
}
</style>
