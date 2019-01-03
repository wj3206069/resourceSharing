<template>
<div class="container is-vertical">
    <!-- 表格标题 -->
    <template v-if="title.show">
      <div class="table-header">
        <h4 class="table-title" :class="[title.align ? 'is-' + title.align : null]">{{title.label}}</h4>
        <template v-if="title.list && title.list.length">
          <div class="table-title-slot">
            <template v-for="(item, t) in title.list">
              <template v-if="item.render">
                <titleDom :render="item.render" :method="item.method" :key="t"></titleDom>
              </template>
              <template v-else>
                <template v-if="item.type">
                  <el-button :type="item.type" :size="item.size || 'medium'" :icon="item.icon" :key="t" @click.native.prevent="item.method">
                    <template v-if="item.svg">
                      <svg-icon :icon-class="item.svg"></svg-icon>
                    </template>
                    {{item.label}}
                  </el-button>
                </template>
                <template v-else>
                  <span :key="t" class="button" :class="item.class">
                    <svg-icon :icon-class="item.svg" v-if="item.svg" @click.native.prevent="item.method"></svg-icon>
                    {{item.label}}
                  </span>
                </template>
              </template>
            </template>
          </div>
        </template>
      </div>
    </template>
    <!-- 表格标题 end -->
    <!-- 表格数据 -->
    <template v-if="show">
      <div class="flex-scroll">
      <el-table :data="list" style="width: 100%" border header-cell-class-name="default-bg"
        @selection-change="handleSelectionChange" @cell-click="handleCellClick" :height="height" :highlight-current-row="currentStatus" >
        <template v-if="isMultiple">
          <el-table-column v-if="isMultiple" type="selection" width="45" align="center"></el-table-column>
        </template>
        <template v-else-if="radio">
          <el-table-column label="" width="45" align="center">
            <template slot-scope="scope">
              <el-radio v-model="radioVal" :label="scope.row[radio]" @change.native="radioCurrentChange($event,scope.row)">
              </el-radio>
            </template>
          </el-table-column>
        </template>
        <el-table-column v-for="(col, c) in tableHeader" :prop="col.slot? null : col.name || col.label" :key="c" :label="col.label" :min-width="col.width" :show-overflow-tooltip="!!col.tooltip" :align="col.align || align" :type="col.type" :sortable="col.sortable">
            <template v-if="col.children">
                <el-table-column v-for="(ch,o) in col.children" :key="o" :label="ch.label" :prop="ch.name || ch.label" :min-width="col.width" align="center" ></el-table-column>
            </template>
            <template slot-scope="scope">
              <template v-if="col.render">
                <expand-dom :column="col" :row="scope.row" :render="col.render"></expand-dom>
              </template>
              <template v-else-if="col.formatter">
                <span v-html="col.formatter(scope.row, col)"></span>
              </template> 
              <template v-else>
                <span>{{scope.row[col.name]}}</span>
              </template>
            </template>   
        </el-table-column>
        <!-- 按钮操作组 -->
        <el-table-column v-if="operates.show && operates.list.length" label="操作" align="center" :width="operates.width">
          <template slot-scope="scope">
            <template v-for="(btn, key) in operates.list" >
              <template v-if="btn.filter">
                <el-button :type="btn.type" :size="btn.type || 'medium'" :icon="btn.icon" :disabled="btn.disabled" :plain="btn.plain"  @click.native.prevent="btn.method(key, scope.row)" :key="key" v-if="btn.filter(scope.row)">
                  <template v-if="btn.svg">
                    <svg-icon :icon-class="btn.svg"></svg-icon>
                  </template>
                  {{ btn.label }}
                </el-button>
              </template>
              <template v-else>
                <el-button :type="btn.type" :size="btn.type || 'medium'" :icon="btn.icon" :disabled="btn.disabled" :plain="btn.plain"  @click.native.prevent="btn.method(key, scope.row)" :key="key">
                  <template v-if="btn.svg">
                    <svg-icon :icon-class="btn.svg"></svg-icon>
                  </template>
                  {{ btn.label }}
                </el-button>
              </template>
            </template>
          </template>
          
        </el-table-column> 
        <!-- 按钮操作组 end-->
      </el-table>
      </div>
    </template>
    <!-- 表格数据 end-->
    <!-- 分页 -->
    <template v-if="total">
      <el-pagination :total="total" :current-page="listQuery.page" :page-size="listQuery.pageSize" layout="prev, pager, next, ->, jumper, slot, total" @current-change="handleCurrentChange" class="pagination">
        <slot>
          <span class="pagination__count">{{pageCount}}</span>
        </slot>
      </el-pagination> 
    </template>
    <!-- 分页 end -->
</div>

</template>

<script>
export default {
  name: 'BTable',
  props: {
    height: {
      type: String,
      default: '100%'
    },
    show: {
      type: Boolean,
      default: true
    },
    list: {
      type: Array,
      default() {
        return []
      }
    }, // 表格数据
    align: {
      type: String,
      default: 'center'
    }, // 对齐方式
    isMultiple: {
      type: Boolean,
      default: false
    }, // 是否多选
    radio: {
    }, // 单选唯一标示符
    tableHeader: {
      type: Array,
      default() {
        return []
      }
    }, // 表头
    listQuery: {
      type: Object,
      default() {
        return {
          page: 1,
          pageSize: 10
        }
      }
    }, // 分页参数
    total: {
      type: Number
    }, // 总数
    operates: {
      type: Object,
      default() {
        return {
          show: false,
          width: 150,
          list: []
        }
      }
    }, // 列操作按钮
    title: {
      type: Object,
      default() {
        return {
          show: true,
          align: 'left',
          label: '',
          list: []
        }
      }
    } // 表格标题
  },
  data () {
    return {
      radioVal: null
    }
  },
  components: {
    expandDom: {
      functional: true,
      props: {
        row: Object,
        render: Function,
        index: Number,
        column: {
          type: Object,
          default: null
        }
      },
      render: (h, ctx) => {
        const params = {
          row: ctx.props.row,
          index: ctx.props.index
        }
        if (ctx.props.column) params.column = ctx.props.column
        return ctx.props.render(h, params)
      }
    },
    titleDom: {
      functional: true,
      props: {
        render: Function,
        method: Function
      },
      render: (h, ctx) => {
        return ctx.props.render(h, ctx.props)
      }
    }
  },
  computed: {
    pageCount() {
      let count = Math.ceil(Number(this.total) / Number(this.listQuery.pageSize))
      return `共${count}页、`
    },
    currentStatus() {
      return !!this.radio
    }
  },
  methods: {
    // 单行选中
    radioCurrentChange(e, val) {
      if (val) {
        this.radioVal = val[this.radio]
      } else {
        this.radioVal = null
      }
      this.$emit('radioCurrentChange', val)
    },
    // 切换页码
    handleCurrentChange(index) {
      this.listQuery.page = index
      this.$emit('handleCurrentChange', index)
    },
    // 多选选中
    handleSelectionChange(val) {
      this.$emit('handleSelectionChange', val)
    },
    // 点击选择某行
    handleCellClick(row, column, cell, event) {
      // console.log(row, column, cell, event)
      this.$emit('cellClick', row, column)
    }
  }
}
</script>

<style>
</style>
