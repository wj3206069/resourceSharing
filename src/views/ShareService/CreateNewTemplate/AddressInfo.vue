<template>
  <div class="AddressInfo  BasicInfo zx-flex justify">
    <el-form :model="BasicInfoForm"
             :rules="BasicInfoRules"
             :label-position="'right'"
             label-width="120px"
             class="demo-ruleForm">

      <el-form-item label="实验地址"
                    prop="name">
        <div class="custom fs-16">
          <div class="custom-title zx-flex align line-bottom grey-2">
            <div class="choose-one must">所属区</div>
            <div class="flex-1"
                 style="margin-left: 10px;">具体地址</div>
          </div>
          <div class="custom-handle zx-flex align">
            <div class="choose-one select zx-flex align grey">
              <el-select v-model="district"
                         placeholder="区">
                <el-option v-for="item in districtOptions"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div style="margin-left: 10px;">
              <el-select v-model="detailAddress"
                         :disabled='!district'
                         placeholder="请先选择区">
                <el-option v-for="item in detailAddressOptions"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="map mg-t-6">
            <!-- <zx-amap></zx-amap> -->
          </div>
        </div>

      </el-form-item>

    </el-form>
  </div>
</template>

<script>
// import zxAmap from '@/components/map/index'
export default {
  name: 'AddressInfo',
  components: {
    // zxAmap
  },
  data () {
    return {
      district: '',  // 区
      detailAddress: '',
      BasicInfoForm: {
        name: ''
      },
      BasicInfoRules: {
        name: { required: true, message: '100字符以内', trigger: 'blur' }
      },
      districtOptions: [{
        value: '选项1',
        label: '福田区'
      }, {
        value: '选项2',
        label: '南山区'
      }],
      detailAddressOptions: [{
        value: '选项1',
        label: '桃源街道'
      }, {
        value: '选项2',
        label: '车公庙'
      }]
    }
  }
}
</script>

<style lang="less" scoped>
.map {
  width: 570px;
  height: 310px;
}
</style>