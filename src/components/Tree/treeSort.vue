<template>
  <div class="slot-tree">
    <el-button class="slot-t-top"
               icon="el-icon-plus"
               type="primary"
               size="small"
               @click="handleAddTop">添加主机构</el-button>
    <el-tree ref="SlotMenuList"
             class="expand-tree"
             v-if="isLoadingTree"
             node-key="id"
             highlight-current
             :data="setTree"
             :props="defaultProps"
             :expand-on-click-node="false">
      <span class="slot-t-node"
            slot-scope="{ node, data }">
        <!-- 未编辑状态 -->
        <span v-show="!node.isEdit">
          <span :class="[data.id >= maxexpandId ? 'slot-t-node--label' : '']">{{ node.label }}</span>
          <span class="slot-t-icons">
            <!-- 新增按钮 -->
            <el-button icon="el-icon-plus"
                       circle
                       :size="iconSize"
                       type="text"
                       @click="NodeAdd(node, data)"></el-button>
            <!-- <i class="el-icon-plus" @click="NodeAdd(node, data)"></i> -->
            <!-- 编辑按钮 -->
            <el-button icon="el-icon-edit"
                       circle
                       :size="iconSize"
                       type="text"
                       @click="NodeEdit(node, data)"></el-button>
            <!-- <i class="el-icon-edit" @click="NodeEdit(node, data)"></i> -->
            <!-- 删除按钮 -->
            <el-button icon="el-icon-delete"
                       circle
                       :size="iconSize"
                       type="text"
                       @click="NodeDel(node, data)"></el-button>
            <!-- <i class="el-icon-delete" @click="NodeDel(node, data)"></i> -->
          </span>
        </span>
        <!-- 编辑输入框 -->
        <span v-show="node.isEdit">
          <el-input class="slot-t-input"
                    size="mini"
                    autofocus
                    v-model="data.name"
                    :ref="'slotTreeInput'+data.id"
                    @blur.stop="NodeBlur(node, data)"
                    @keyup.enter.native="NodeBlur(node, data)"></el-input>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
export default {
  data () {
    return {
      iconSize: 'mini',
      isLoadingTree: true,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      maxexpandId: 95,
      non_maxexpandId: 95
    }
  },
  props: {
    // maxexpandId: {
    //   type: Number
    // }, // 新增节点开始id
    // non_maxexpandId: {
    //   type: Number
    // }, // 新增节点开始id(不更改)
    setTree: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    handleAddTop () { // 添加顶级节点
      this.setTree.push({
        id: ++this.maxexpandId,
        name: '新增主机构',
        pid: '',
        children: []
      })
    },
    NodeBlur (n, d) { // 输入框失焦
      console.log(n, d)
      if (n.isEdit) {
        this.$set(n, 'isEdit', false)
      }
      this.$nextTick(() => {
        this.$refs['slotTreeInput' + d.id].$refs.input.focus()
      })
    },
    NodeEdit (n, d) { // 编辑节点
      console.log(n, d)
      if (!n.isEdit) { // 检测isEdit是否存在or是否为false
        this.$set(n, 'isEdit', true)
      }
    },
    NodeDel (n, d) { // 删除节点
      console.log(n, d)
      if (d.children && d.children.length !== 0) {
        this.$message.error('此机构有子菜单，不可删除！')
        return false
      } else {
        // 新增节点可直接删除，已存在的节点要二次确认
        // 删除操作
        let DelFun = () => {
          let _list = n.parent.data.children || n.parent.data // 节点同级数据
          if (_list) {
            let _index = _list.map((c) => c.id).indexOf(d.id)
            console.log(_index)
            _list.splice(_index, 1)
            this.$message.success('删除成功！')
          }
        }
        // 二次确认
        let ConfirmFun = () => {
          this.$confirm('是否删除此机构？', '提示', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            DelFun()
          }).catch(() => { })
        }
        // 判断是否是新增节点
        d.id > this.non_maxexpandId ? DelFun() : ConfirmFun()
      }
    },
    NodeAdd (n, d) { // 新增节点
      console.log(n, d)
      // 判断层级
      if (n.level >= 5) {
        this.$message.error('最多只支持五级！')
        return false
      }
      // 新增数据
      d.children.push({
        id: ++this.maxexpandId,
        name: '新增机构',
        pid: d.id,
        children: []
      })
      // 同时展开节点
      if (!n.expanded) {
        n.expanded = true
      }
    }
  }
}
</script>

<style>
.slot-tree {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 1em;
  max-width: 600px;
  overflow-y: auto;
}
/*顶部按钮*/
.slot-tree .slot-t-top {
  margin-bottom: 15px;
}
.slot-tree .slot-t-node span {
  display: inline-block;
}
/*节点*/
.slot-tree .slot-t-node--label {
  font-weight: 600;
}
/*输入框*/
.slot-tree .slot-t-input .el-input__inner {
  height: 26px;
  line-height: 26px;
}
/*按钮列表*/
.slot-tree .slot-t-node .slot-t-icons {
  display: none;
  margin-left: 10px;
}
.slot-tree .slot-t-icons .el-button + .el-button {
  margin-left: 6px;
}
.slot-tree .el-tree-node__content:hover .slot-t-icons {
  display: inline-block;
}
.el-tree-node__content {
  height: 40px;
}
</style>