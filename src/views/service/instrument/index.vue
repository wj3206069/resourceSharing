<template>
  <BTable v-bind="table" @handleSelectionChange="handleSelectionChange"  @handleCurrentChange="handleCurrentChange" />
</template>

<script>
export default {
  data() {
    return {
      table: {
        title: {
          show: false
        },
        list: [{
          index: 1,
          code: '201810171630452048911111111111111111111111111111101',
          servicename: 'XX服务',
          company: '深圳清华大学研究院',
          account: '用户1',
          ordermoney: '3500',
          status: '1',
          payment: '2',
          paymoney: '200',
          cardmoney: '200',
          paytime: '2018/10/07'
        }], // 列表数据
        isMultiple: true, // 是否多选
        tableHeader: [
          {
            label: '序号',
            name: 'index',
            width: 50
          },
          {
            label: '订单编号', // label required
            name: 'code', // key 与list数据字段对应 required
            width: 80, // width 列宽
            tooltip: true // 超出隐藏 optional
          },
          {
            label: '服务名称',
            name: 'servicename',
            width: 90
          },
          {
            label: '服务提供单位',
            name: 'company',
            width: 90
          },
          {
            label: '买家账号',
            name: 'account',
            width: 90
          },
          {
            label: '订单金额（元）',
            name: 'ordermoney',
            width: 90
          },
          {
            label: '订单状态',
            name: 'status',
            width: 70
          },
          {
            label: '支付方式',
            name: 'payment',
            width: 80
          },
          {
            label: '支付金额',
            name: 'paymoney',
            width: 80
          },
          {
            label: '创新券使用金额',
            name: 'cardmoney',
            width: 80
          },
          {
            label: ' 支付时间',
            name: 'paytime',
            width: 60
          }
        ], // 表头数据
        listQuery: {
          page: 1,
          pageSize: 10
        }, // 分页
        total: 50, // 总数
        multipleSelection: [], // 多行选中的数组
        operates: {
          show: true,
          list: [
            {
              label: '查看详情',
              type: 'text',
              method: (index, row) => {
                console.log(index, row)
              }
            }
          ]
        } // 操作组
      }
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.table.multipleSelection = val
    },
    handleCurrentChange(val) {
      this.table.listQuery.page = val
    }
  }
}
</script>

<style>

</style>
