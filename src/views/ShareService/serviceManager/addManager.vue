<template>
  <div class="add-equip_y">
    <el-dialog :title="add_dialog_title"
               :visible.sync="dialogFormVisible"
               :class="this.step ===4 ?'width_1000':''">
      <!-- 第一步 start 新增服务基本信息-->
      <div class="popping_s basic_services">
        <el-form :model="new_service"
                 label-position="right"
                 label-width="167px"
                 class="form_basic margin_top_30"
                 :rules='new_service_rules'
                 ref='new_service_rules'
                 v-show="step === 1">
          <el-form-item label="服务名称:"
                        prop="servicename">
            <el-input v-model="new_service.servicename"
                      placeholder="请输入服务名称"
                      :disabled='detailsDisabled'></el-input>
          </el-form-item>
          <el-form-item label="服务简要说明:"
                        class="textarea_h80"
                        prop="brief">
            <el-input v-model="new_service.brief"
                      type="textarea"
                      placeholder="请输入内容"
                      maxlength="200"
                      @input="descInput"
                      :disabled='detailsDisabled'></el-input>
            <span class="number_f">
              {{brief_lenght}}/200
            </span>
          </el-form-item>
          <el-form-item label="服务图片上传:"
                        class="img_mg_10">
            <div>
              <el-upload action="/Sz_dxyq/fileAction/uploadFile"
                         list-type="picture"
                         :on-preview="handlePreview"
                         :on-remove="handleRemove"
                         :on-success='handleSuccess'
                         :limit="9"
                         :on-exceed="handleExceed"
                         :file-list="fileList"
                         :disabled='detailsDisabled'>
                <span class="">选择图片</span>
              </el-upload>
            </div>
          </el-form-item>
          <el-form-item label="服务适用范围:"
                        prop='application'>
            <el-input v-model="new_service.application"
                      type="textarea"
                      placeholder="请输入"
                      class="textarea_h80"
                      @input="applicationInput"
                      :disabled='detailsDisabled'></el-input>
            <span class="number_f">
              {{application_lenght}}/200
            </span>
          </el-form-item>
          <el-form-item label="预计服务周期:"
                        prop='period'>
            <el-select v-model="new_service.period"
                       placeholder="请选择"
                       :disabled='detailsDisabled'
                       @change="serviceperiod">
              <el-option label="1天"
                         value="1"></el-option>
              <el-option label="1-2天"
                         value="1-2"></el-option>
              <el-option label="2-3天"
                         value="2-3"></el-option>
              <el-option label="3-4天"
                         value="3-4"></el-option>
              <el-option label="4-5天"
                         value="4-5"></el-option>
              <el-option label="自定义周期"
                         value="6"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="自定义周期:"
                        v-if="this.new_service.period==='6'"
                        prop='customcycle'>
            <el-input v-model="new_service.customcycle"
                      placeholder="请输入自定义周期"
                      :disabled='detailsDisabled'
                      type='number'></el-input>
            <span style=" line-height: 36px;margin-left: 5px;">天</span>
          </el-form-item>
          <!-- 行业分类 -->
          <el-form-item label="行业分类:"
                        prop='industryclassification'>
            <el-button @click="tradeClassificationS"
                       style="cursor: pointer;">选择</el-button>
          </el-form-item>
          <el-form-item label="是否要买家委托单:"
                        prop='is_orderticket'>
            <el-select v-model="new_service.is_orderticket"
                       placeholder="请选择"
                       :disabled='detailsDisabled'
                       @change="orderTicket">
              <el-option label="是"
                         value="1"></el-option>
              <el-option label="否"
                         value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择委托单:"
                        v-if="this.new_service.is_orderticket==='1'"
                        prop='orderticket'>
            <el-select v-model="new_service.orderticket"
                       placeholder="请选择"
                       :disabled='detailsDisabled'>
              <el-option :label="item.name"
                         :value="item.id"
                         v-for="item in orders_list"
                         :key="item.id"></el-option>
            </el-select>
            <!-- <span class="preview"
                  v-if="detailsDisabled">预览</span> -->
          </el-form-item>
          <el-form-item label="是否要买家签电子协议:"
                        prop='is_electronic'>
            <el-select v-model="new_service.is_electronic"
                       :disabled='detailsDisabled'
                       @change="Electronicagreement">
              <el-option label="是"
                         value="1"></el-option>
              <el-option label="否"
                         value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择协议模板:"
                        v-if="this.new_service.is_electronic==='1'"
                        prop='modelagreement'>
            <el-select v-model="new_service.modelagreement"
                       placeholder="请选择"
                       :disabled='detailsDisabled'>
              <el-option :label="item.name"
                         :value="item.id"
                         v-for="item in electronic_contract_list"
                         :key="item.id"></el-option>
            </el-select>
            <!-- <span class="preview"
                  v-if="detailsDisabled">预览</span> -->
          </el-form-item>
          <el-form-item label="是否提供发票:"
                        prop='is_invoice'>
            <el-select v-model="new_service.is_invoice"
                       :disabled='detailsDisabled'
                       @change="provideInvoice">
              <el-option label="是"
                         value="1"></el-option>
              <el-option label="否"
                         value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发票类型:"
                        v-if="this.new_service.is_invoice==='1'"
                        prop='invoicetype'>
            <el-checkbox-group v-model="new_service.invoicetype"
                               :disabled='detailsDisabled'>
              <el-checkbox label="1"
                           name="type">电子普通发票</el-checkbox>
              <el-checkbox label="2"
                           name="type">纸质普通发票</el-checkbox>
              <el-checkbox label="3"
                           name="type">增值税专用发票</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="发票类目:"
                        class="Invoice_type">
            <el-input v-model="new_service.invoice_category"
                      placeholder="输入发票类目点击新增按钮添加(最多五个)"
                      :disabled='detailsDisabled'></el-input>
            <span>
              <i class="zxicon zx-xinzeng2"
                 @click="addRnvoiCecategory"
                 v-show="addRnvoiCecategory_s"></i>
            </span>
          </el-form-item>
          <el-form-item>
            <ul class="ul_add">
              <li v-for="(item,index) in RnvoiCecategoryList"
                  :key='index'>
                <span>{{item}}
                  <i class="zxicon zx-shanchu3"
                     @click="removeRnvoiCecategory(index)"></i>
                </span>
              </li>
            </ul>
          </el-form-item>
          <el-form-item label="是否提供报告:"
                        prop='is_report'>
            <el-select v-model="new_service.is_report"
                       :disabled='detailsDisabled'
                       @change="offerReport">
              <el-option label="是"
                         value="1"></el-option>
              <el-option label="否"
                         value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="报告类型:"
                        class="checkedCities2"
                        v-if="this.new_service.is_report==='1'"
                        prop='reporttype'>
            <el-checkbox-group v-model="new_service.reporttype"
                               :min="1"
                               :max="2"
                               :disabled='detailsDisabled'>
              <el-checkbox label="1"
                           name="type">电子报告</el-checkbox>
              <el-checkbox label="2"
                           name="type">纸质报告</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="共享类型:"
                        prop='sharingtype'>
            <el-select v-model="new_service.sharingtype"
                       :disabled='detailsDisabled'>
              <el-option :label="item.fieldname"
                         :value="item.fieldcode"
                         v-for="item in SharingTypeList"
                         :key='item.id'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="服务类型:"
                        prop='type'>
            <el-select v-model="new_service.type"
                       :disabled='detailsDisabled'>
              <el-option :label="item.fieldname"
                         :value="item.fieldcode"
                         v-for="item in ServiceTypeList"
                         :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="服务详情:"
                        prop='details'>
            <el-input v-model="new_service.details"
                      type="textarea"
                      placeholder="请输入"
                      class="textarea_h160"
                      @input="detailsInput"
                      :disabled='detailsDisabled'></el-input>
            <span class="number_f number_160">
              {{details_lenght}}/200
            </span>
          </el-form-item>
          <el-form-item label="服务详情图片上传:"
                        class="img_mg_10">
            <div>
              <el-upload action="/Sz_dxyq/fileAction/uploadFile"
                         list-type="picture"
                         :on-preview="handlePreviewS"
                         :on-remove="handleRemoveS"
                         :limit="9"
                         :on-exceed="handleExceedS"
                         :on-success='handleSuccessS'
                         :file-list="fileListS"
                         :disabled='detailsDisabled'>
                <span class="">选择图片</span>
              </el-upload>
            </div>
          </el-form-item>
          <el-form-item label="是否提供操作人员:"
                        prop='is_operator'>
            <el-select v-model="new_service.is_operator"
                       :disabled='detailsDisabled'>
              <el-option label="是"
                         value="1"></el-option>
              <el-option label="否"
                         value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="样品要求:"
                        prop='sample_required'>
            <el-input v-model="new_service.sample_required"
                      type="textarea"
                      placeholder="请输入"
                      class="textarea_h160"
                      @input="sampleInput"
                      :disabled='detailsDisabled'></el-input>
            <span class="number_f number_160">
              {{sample_required_lenght}}/200
            </span>
          </el-form-item>
        </el-form>
      </div>
      <!-- 第一步 end -->

      <!-- 第二步 start 新增关联服务资质-->
      <div class="popping_s service_s service_price">
        <el-form :model="service_qualification"
                 class="margin_top_20"
                 ref="service_qualification_rules"
                 v-if="step === 2">
          <p class="ser_header"
             v-if="!detailsDisabled">
            <el-row>
              <el-button round
                         :class="relevance?'white_q':'white_f'"
                         @click="allAssociated">全部</el-button>
              <el-button type="primary"
                         round
                         :class="relevance_s?'white_f':'white_q'"
                         @click="beenAssociated">已关联</el-button>
            </el-row>
          </p>
          <div class="tab_color"
               v-loading="loadingAptitude"
               element-loading-text="拼命加载中"
               element-loading-spinner="el-icon-loading"
               element-loading-background="rgba(0, 0, 0, 0.8)">
            <el-table ref="multipleTable"
                      :data="service_data"
                      tooltip-effect="dark"
                      style="width: 100%">
              <el-table-column label="序号"
                               width="80"
                               align="center"
                               prop="rowno"></el-table-column>
              <el-table-column prop="detectaptitude"
                               label="资质名称"
                               align="center">
              </el-table-column>
              <el-table-column label="操作"
                               width="200"
                               align="center">
                <template slot-scope="scope">
                  <el-button type="text"
                             size="small"
                             v-if="detailsDisabled">查看详情</el-button>
                  <el-button type="text"
                             size="small"
                             :class="scope.row.type ==='1' ?'class_s':''"
                             v-text="scope.row.type ==='1' ?'取消关联' : '关联服务'"
                             @click="associatedServices(scope.row)"
                             v-if="!detailsDisabled"></el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination_s">
              <el-pagination background
                             layout="prev, pager, next"
                             :total="aptitudetotal"
                             @current-change="handleCurrentChangeAptitude">
              </el-pagination>
            </div>
          </div>
        </el-form>
      </div>
      <!-- 第二步 end -->

      <!-- 第三步 start 服务地点与联系方式-->
      <div class="popping_s location_connection">
        <el-form :model="location_connection_from"
                 label-position="right"
                 label-width="130px"
                 class="form_basic margin_top_30"
                 :rules='location_connection_from_rules'
                 ref="location_connection_from_rules"
                 v-show="step === 3">
          <el-form-item label="联系人:"
                        prop='linkman'>
            <el-input v-model="location_connection_from.linkman"
                      :disabled='detailsDisabled'></el-input>
          </el-form-item>
          <el-form-item label="手机号:"
                        prop='mobile'>
            <el-input v-model="location_connection_from.mobile"
                      :disabled='detailsDisabled'></el-input>
          </el-form-item>
          <el-form-item label="QQ号:"
                        prop='mobile'>
            <el-input v-model="location_connection_from.qq"
                      :disabled='detailsDisabled'></el-input>
          </el-form-item>
          <el-form-item label="邮箱号:"
                        proo='mail'>
            <el-input v-model="location_connection_from.mail"
                      :disabled='detailsDisabled'></el-input>
          </el-form-item>
          <el-form-item label="服务地点:"
                        prop='address'>
            <el-input v-model="location_connection_from.address"
                      :disabled='detailsDisabled'></el-input>
          </el-form-item>
        </el-form>
      </div>
      <!-- 第三步 end-->

      <!-- 第四步 start 新增关联服务仪器-->
      <div class="popping_s service_s correlation_service">
        <el-form v-if="step === 4"
                 :model="form"
                 ref="form_rules">
          <div class="flex_s"
               v-if="!detailsDisabled">
            <div class="">
              <span>设备分类:</span>
              <el-select v-model="form.classificationEquipmentList"
                         clearable>
                <el-option :label="item.fieldname"
                           :value="item.fieldcode"
                           v-for="item in classificationEquipmentList"
                           :key='item.id'></el-option>
              </el-select>
            </div>
            <div class="">
              <span>设备小类:</span>
              <el-select v-model="form.Small_equipment"
                         clearable>
                <el-option :label="item.fieldname"
                           :value="item.fieldcode"
                           v-for="item in smallEquipmentList"
                           :key='item.id'></el-option>
              </el-select>
            </div>
            <div class="">
              <el-input clearable
                        placeholder="请输入设备名称"
                        v-model="form.cname"
                        class="search_name"></el-input>
              <el-button type="primary"
                         icon="search"
                         class="seach_s margin_5"
                         @click="equipmentSearch">搜索</el-button>
            </div>

          </div>
          <p class="ser_header"
             v-if="!detailsDisabled">
            <el-row>
              <el-button round
                         :class="relevance?'white_q':'white_f'"
                         @click="allinstruments">全部</el-button>
              <el-button type="primary"
                         round
                         :class="relevance_s?'white_f':'white_q'"
                         @click="instrumentsAssociated">已关联</el-button>
            </el-row>
          </p>
          <div class="tab_color"
               v-loading="loadingInstrument"
               element-loading-text="拼命加载中"
               element-loading-spinner="el-icon-loading"
               element-loading-background="rgba(0, 0, 0, 0.8)">
            <el-table ref="multipleTable"
                      :data="instruments_form_data"
                      tooltip-effect="dark"
                      style="width: 100%">
              <el-table-column label="序号"
                               width="80"
                               align="center"
                               prop="rowno"></el-table-column>
              <el-table-column prop="cname"
                               label="仪器名称"
                               align="center">
              </el-table-column>
              <el-table-column prop="specification"
                               label="型号规格"
                               align="center">
              </el-table-column>
              <el-table-column label="共享类型"
                               align="center">
                <template slot-scope="scope">
                  <span v-text="scope.row.sharingtype === '1'?'内部共享' : '外部共享'"></span>
                </template>
              </el-table-column>
              <el-table-column prop="standard"
                               label="单位标准工作时长(小时)"
                               align="center">
              </el-table-column>
              <el-table-column label="是否涉及他人仪器"
                               align="center">
                <template slot-scope="scope">
                  <span type="text"
                        v-text="scope.row.principal  ==='1' ?'是' : '否'">
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="操作"
                               width="200"
                               align="center">
                <template slot-scope="scope">
                  <el-button type="text"
                             size="small">查看详情</el-button>
                  <el-button type="text"
                             size="small"
                             :class="scope.row.type ==='1' ?'class_s':''"
                             v-text="scope.row.type ==='1' ?'取消关联' : '关联仪器'"
                             @click="instrumentCancel(scope.row)"
                             v-if="!detailsDisabled"></el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination_s">
              <el-pagination background
                             layout="prev, pager, next"
                             :total="apparatustotal"
                             @current-change="handleCurrentChangeApparatus">
              </el-pagination>
            </div>
          </div>
        </el-form>
      </div>
      <!-- 第四步 end-->

      <!-- 第五步 start 新增服务价格信息-->
      <div class="popping_s service_price basic_services">
        <el-form :model="service_price_from"
                 label-position="right"
                 label-width="160px"
                 class="service_price_from margin_top_10"
                 v-show="step === 5"
                 :rules='service_price_from_rules'
                 ref="service_price_from_rules">
          <div class="price_heade">
            <span v-for="(item,index) in service_price_from.servicePricelist"
                  :key="item.key">
              <el-input v-model="item.itemname"
                        placeholder="请设置检测项目名称"
                        class="project_s"
                        :disabled='detailsDisabled'></el-input>
              <el-input v-model="item.insideprice"
                        placeholder="请设置内部价"
                        class="external_price"
                        type="number"
                        :disabled='detailsDisabled'></el-input>
              <el-input v-model="item.externalprice"
                        placeholder="请设置外部价"
                        class="inside_price"
                        type="number"
                        :disabled='detailsDisabled'></el-input>
              <span v-if="!detailsDisabled">
                <i class="zxicon zx-xinzeng2"
                   @click="addDomain"
                   v-show="index===0"></i>
              </span>
              <span v-if="!detailsDisabled">
                <i class="zxicon zx-cha1"
                   v-show="index>0"
                   @click.prevent="removeDomain(item)"></i>

              </span>
            </span>

          </div>
          <el-form-item label="订单是否需要审核:"
                        prop='isaudit'>
            <el-select v-model="service_price_from.isaudit"
                       :disabled='detailsDisabled'
                       @change="Whetheraudit">
              <el-option label="是"
                         value="1"></el-option>
              <el-option label="否"
                         value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日订单量:"
                        v-if="service_price_from.isaudit==='1'"
                        prop='quantities'>
            <el-input v-model="service_price_from.quantities"
                      placeholder="请设置每日能接最大订单量"
                      type="number"
                      :disabled='detailsDisabled'></el-input>
          </el-form-item>
          <el-form-item label="是否支持使用创新卷:"
                        prop='is_voucher'>
            <el-select v-model="service_price_from.is_voucher"
                       :disabled='detailsDisabled'
                       @change="InnovationVolume">
              <el-option label="是"
                         value="1"></el-option>
              <el-option label="否"
                         value="0"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="使用比例:"
                        v-if="this.service_price_from.is_voucher==='1'"
                        prop='voucherratio'>
            <el-select v-model="service_price_from.voucherratio"
                       :disabled='detailsDisabled'>
              <el-option label="10"
                         value="10"></el-option>
              <el-option label="20"
                         value="20"></el-option>
              <el-option label="30"
                         value="30"></el-option>
              <el-option label="40"
                         value="40"></el-option>
              <el-option label="50"
                         value="50"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="创新卷使用额度:"
                        v-if="this.service_price_from.is_voucher==='1'"
                        prop='voucherlimit'>
            <el-input v-model="service_price_from.voucherlimit"
                      placeholder="请设置使用额度(元)"
                      type="number"
                      :disabled='detailsDisabled'></el-input>
          </el-form-item>
          <el-form-item label="付款方式:"
                        class="totalpaymen"
                        prop='paymethod'>
            <el-radio v-model="service_price_from.paymethod"
                      label="1"
                      :disabled='detailsDisabled'
                      @change="totalPayment">全款</el-radio>
            <span style="margin-left: 20px;">预付款</span>
            <!-- <el-radio v-model="service_price_from.paymethod"
                      label="2"
                      :disabled='detailsDisabled'>预付款</el-radio> -->
          </el-form-item>
          <el-form-item label="预付款比例:"
                        v-if="this.service_price_from.paymethod==='2'">
            <el-input v-model="service_price_from.prepaymentratio"
                      placeholder="请设置预付款比例"
                      type="number"
                      :disabled='detailsDisabled'></el-input>
            <i class="per_cent">%</i>
          </el-form-item>
          <div class="gathering_f">
            <div>
              <span class="gathering_set"><i style="color: #C51316;padding-right: 4px;">*</i>收款账户设置:</span>
              <span class="set_tc add-equip_y">
                <el-dialog title="账户选择"
                           :visible.sync="innerVisible"
                           append-to-body
                           width="560px"
                           class="collection add-equip_y">
                  <div class="account">
                    <span :class="individual?'individual_account':'corporate_account'"
                          @click="individualAccount">个人账户</span>
                    <span :class="corporate?'corporate_account':'individual_account'"
                          @click="corporateAccount">对公账户</span>
                  </div>
                  <div class="tab_color">
                    <el-table ref="multipleTable"
                              :data="tableAccountList"
                              tooltip-effect="dark"
                              style="width: 100%"
                              @selection-change="handleSelectionChangeAccount">
                      <el-table-column type="selection"
                                       align="center"
                                       width="50">
                      </el-table-column>
                      <el-table-column prop="accountname"
                                       label="账户名称"
                                       align="center"
                                       width="120">
                      </el-table-column>
                      <el-table-column prop="account"
                                       label="账号"
                                       align="center">
                      </el-table-column>
                      <el-table-column prop="unitname"
                                       label="开户行"
                                       align="center">
                      </el-table-column>
                    </el-table>
                  </div>
                  <div class="pagination_s">
                    <el-pagination background
                                   layout="prev, pager, next"
                                   :total="accounttotal"
                                   @current-change="handleCurrentChangeaccount">
                    </el-pagination>
                  </div>
                  <div slot="footer"
                       class="dialog-footer">
                    <el-button type="primary"
                               @click="accountDetermine">确定</el-button>
                    <el-button @click="innerVisible= false"
                               class="color_c">取 消</el-button>
                  </div>
                </el-dialog>
                <div slot="footer"
                     class="dialog-footer">
                  <el-button type="primary"
                             @click="innerVisible = true"
                             :disabled='detailsDisabled'>选择收款账户</el-button>
                </div>
              </span>
              <ul class="account_shows">
                <li v-for="item in SelectaccountList"
                    :key='item.id'>
                  <div class="account_bgc">
                    <span>{{item.accountname}}</span>
                    <span>{{item.account}}</span>
                    <span>
                      <el-input v-model="item.distribution"
                                placeholder="设置收款比例"
                                type="number"
                                :disabled='detailsDisabled'
                                @blur='Paymentproportion'></el-input><span>%</span>
                    </span>
                  </div>
                  <span>
                    <i class="zxicon zx-cha1"
                       @click="deleteAccount(item.id)"
                       v-if="!detailsDisabled"></i>
                  </span>
                </li>
              </ul>
              <span v-if='SelectaccountListVerify'
                    style="margin-left: 198px;color: #C51316;position: relative;top: -25px;font-size: 12px;">收款账户不能为空</span>
            </div>
          </div>

        </el-form>

      </div>
      <!-- 第五步 end-->

      <!-- 行业分类 -->
      <span class="set_tc add-equip_y">
        <el-dialog title="行业分类"
                   :visible.sync="tradeClassification"
                   append-to-body
                   width="560px"
                   class="collection add-equip_y">
          <el-tree :data="ChooseclassificationList"
                   show-checkbox
                   node-key="fieldcode"
                   :default-expanded-keys="selectedList"
                   :default-checked-keys="selectedList"
                   :props="defaultProps"
                   @check-change="handleCheckChange">
          </el-tree>
          <div slot="footer"
               class="dialog-footer"
               v-if="!isstate">
            <el-button type="primary"
                       @click="tradeClassification=false">确定</el-button>
            <el-button @click="tradeClassification= false"
                       class="color_c">取 消</el-button>
          </div>
        </el-dialog>
      </span>

      <div slot="footer"
           class="dialog-footer">
        <!-- 第一步 -->
        <div v-if="step === 1">
          <span v-if="this.title === '编辑' || this.title === '新增'">
            <el-button class="submit"
                       type="primary"
                       @click="save_1('new_service_rules')">暂存</el-button>
            <el-button class="submit"
                       type="primary"
                       @click="save_step_1('new_service_rules')">暂存进入下一步</el-button>
          </span>
          <span v-else-if="this.title === '详情'">
            <el-button class="submit"
                       type="primary"
                       @click="details_step1">下一步</el-button>
          </span>
          <el-button class="cancel"
                     type="primary"
                     @click="cancel">取消</el-button>
        </div>
        <!-- 第二步 -->
        <div v-if="step === 2">
          <el-button class="prev-step"
                     type="primary"
                     @click="prevStep">上一步</el-button>
          <span v-if="this.title === '编辑' || this.title === '新增'">
            <el-button class="submit"
                       type="primary">暂存</el-button>
            <el-button class="submit"
                       type="primary"
                       @click="save_step_2">暂存进入下一步</el-button>
          </span>
          <span v-else-if="this.title === '详情'">
            <el-button class="submit"
                       type="primary"
                       @click="details_step2">下一步</el-button>
          </span>
          <el-button class="cancel"
                     type="primary"
                     @click="cancel">取消</el-button>

        </div>
        <!-- 第三步 -->
        <div v-if="step === 3">
          <el-button class="prev-step"
                     type="primary"
                     @click="prevStep">上一步</el-button>
          <span v-if="this.title === '编辑' || this.title === '新增'">
            <el-button class="submit"
                       type="primary"
                       @click="save_3('location_connection_from_rules')">暂存</el-button>
            <el-button class="submit"
                       type="primary"
                       @click="save_step_3('location_connection_from_rules')">暂存进入下一步</el-button>
          </span>
          <span v-else-if="this.title === '详情'">
            <el-button class="submit"
                       type="primary"
                       @click="details_step3">下一步</el-button>
          </span>
          <el-button class="cancel"
                     type="primary"
                     @click="cancel">取消</el-button>
        </div>

        <!-- 第四步 -->
        <div v-if="step === 4">
          <el-button class="prev-step"
                     type="primary"
                     @click="prevStep">上一步</el-button>
          <span v-if="this.title === '编辑' || this.title === '新增'">
            <el-button class="submit"
                       type="primary">暂存</el-button>
            <el-button class="submit"
                       type="primary"
                       @click="save_step_4">暂存进入下一步</el-button>
          </span>
          <span v-else-if="this.title === '详情'">
            <el-button class="submit"
                       type="primary"
                       @click="details_step4">下一步</el-button>
          </span>
          <el-button class="cancel"
                     type="primary"
                     @click="cancel">取消</el-button>
        </div>

        <!-- 第五步 -->
        <div v-if="step === 5">
          <el-button class="prev-step"
                     type="primary"
                     @click="prevStep">上一步</el-button>
          <span v-if="this.title === '编辑' || this.title === '新增'">
            <el-button class="submit"
                       type="primary"
                       @click="submitData('service_price_from_rules')">提交</el-button>
          </span>
          <el-button class="cancel"
                     type="primary"
                     @click="cancel">取消</el-button>

        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { preview } from '@/api/index'
import { addRelatedQualification, HYFL, addFacilitatingAgency, addSharingType, addServiceType, addCancelAssociated, getServiceInformationGM, editServiceInformationGM, getDetectionServiceInformation, associationCancellationDetectionServiceInformation, EquiClassification, getServicePriceInformation, deleteFile, getBankaccountPublicaccounts, getServiceaccounts } from '@/api/serviceManagerPlatformApi'

export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    // 标题
    title: {
      type: String
    },
    // 单条数据源
    row: {
      type: Object
    },
    // 状态是否编辑
    isstate: {
      type: Boolean
    },
    electronic_contract_lists: {
      type: Array
    },
    orders_lists: {
      type: Array
    }

  },
  watch: {
    dialogFormVisible () {
      if (!this.dialogFormVisible) {
        this.$emit('serviceDialog', this.dialogFormVisible)
        this.new_service = {
          servicename: '',
          brief: '',
          images: '',
          application: '',
          period: '',
          customcycle: '',
          is_orderticket: '',
          modelagreement: '',
          is_invoice: '',
          invoicetype: [], //
          is_report: '',
          reporttype: [],
          sharingtype: '',
          type: '',
          details: '',
          details_ids: '',
          is_operator: '',
          sample_required: '',
          invoice_category: '',
          industryclassification: ''
        }
        this.step = 1
        this.fileListS = []
        this.fileList = []
        // id_s 每步记录的ID 汉子点完编辑点新增
        this.id_s = ''
        console.log(this.id_s)
        this.RnvoiCecategoryList = []
        this.selectedList = []
        this.brief_lenght = '0'
        this.application_lenght = '0'
        this.details_lenght = '0'
        this.sample_required_lenght = '0'
        this.selectedList = []
        console.log(this.new_service)
      }
    },
    showDialog () {
      this.dialogFormVisible = this.showDialog
      if (this.showDialog) {
        this.detailsDisabled = this.isstate
        this.addRnvoiCecategory_s = !this.isstate
      } else {
        this.$refs['new_service_rules'].resetFields()
        this.$refs['location_connection_from_rules'].resetFields()
        this.$refs['service_price_from_rules'].resetFields()
      }
    },

    title () {
      // 记录编辑时的title
      if (this.step === 1) {
        this.add_dialog_title = this.title + '-服务基本信息'
      }
      if (this.step === 2) {
        this.add_dialog_title = this.title + '-关联服务资质'
      }
      if (this.step === 3) {
        this.add_dialog_title = this.title + '-服务地点与联系方式'
      }
      if (this.step === 4) {
        this.add_dialog_title = this.title + '-关联服务仪器'
      }
      if (this.step === 5) {
        this.add_dialog_title = this.title + '-服务价格信息'
      }
    },
    // 监听编辑、查看详情当前行的信息
    row () {
      if (this.title === '新增') return
      if (this.row === {}) return
      if (this.title === '编辑' || this.title === '详情') {
        this.id_s = this.row.row.id
        console.log(this.id_s)
        getServiceInformationGM({ business_id: this.id_s, editor: 1 }).then(res => {
          if (res.data.success) {
            this.new_service = res.data.serviceInformation
            this.location_connection_from = res.data.userInfo
            this.brief_lenght = this.new_service.brief.length
            this.application_lenght = this.new_service.application.length
            this.new_service.business_id = this.id_s
            this.details_lenght = this.new_service.details.length
            this.sample_required_lenght = this.new_service.sample_required.length
            this.selectedList = res.data.serviceInformation.industryclassification.split(',')
            console.log(this.selectedList)
            this.new_service.invoicetype = res.data.serviceInformation.invoicetype.split(',')
            this.new_service.reporttype = res.data.serviceInformation.reporttype.split(',')
            if (res.data.invoice_categorylists.length !== 0) {
              this.RnvoiCecategoryList = res.data.invoice_categorylists.map(item => item.category)
            }
            // this.RnvoiCecategoryList = res.data.serviceInformation.invoice_category.split(',')
            this.new_service.invoice_category = ''
            // if (res.data.serviceInformation.images !== '' && res.data.serviceInformation.details_ids !== '') {
            let picIds = res.data.serviceInformation.images.split(',')
            for (let i = 0; i < picIds.length; i++) {
              this.fileList.push({ url: `${preview}/${picIds[i]}` })
            }
            let picIdsS = res.data.serviceInformation.details_ids.split(',')
            for (let i = 0; i < picIdsS.length; i++) {
              this.fileListS.push({ url: `${preview}/${picIdsS[i]}` })
            }
            // }
            // 第五步赋值
            this.service_price_from.isaudit = res.data.serviceInformation.isaudit
            this.service_price_from.is_voucher = res.data.serviceInformation.is_voucher
            this.service_price_from.quantities = res.data.serviceInformation.quantities
            this.service_price_from.voucherratio = res.data.serviceInformation.voucherratio
            this.service_price_from.voucherlimit = res.data.serviceInformation.voucherlimit
            this.service_price_from.paymethod = res.data.serviceInformation.paymethod
            this.service_price_from.prepaymentratio = res.data.serviceInformation.prepaymentratio
            this.service_price_from.business_id = res.data.serviceInformation.id
            this.service_price_from.servicePricelist[0].business_id = res.data.serviceInformation.id
            this.id_s = res.data.serviceInformation.id
          }
        })
      }
    },
    isstate () {
      // this.detailsDisabled = this.isstate
      // this.addRnvoiCecategory_s = !this.isstate
    },
    SelectaccountList () {
      if (this.SelectaccountList.length > 0) {
        this.SelectaccountListVerify = false
      } else {
        this.SelectaccountListVerify = true
      }
    },
    orders_lists () {
      this.orders_list = this.orders_lists
    },
    electronic_contract_lists () {
      this.electronic_contract_list = this.electronic_contract_lists
    }
  },
  computed: {
    smallEquipmentList: function () {
      for (var i = 0; i < this.classificationEquipmentList.length; i++) {
        if (this.classificationEquipmentList[i].fieldcode === this.form.classificationEquipmentList) {
          return this.classificationEquipmentList[i].children
        }
      }
    }
  },

  data () {
    return {
      brief_lenght: '0',
      application_lenght: '0',
      details_lenght: '0',
      sample_required_lenght: '0',
      dialogFormVisible: false,
      detailsDisabled: false, // 详情过来的
      buttondisabled: false,
      loadingAptitude: false, // 资质加载
      loadingInstrument: false, // 仪器加载
      addRnvoiCecategory_s: true,
      ChooseclassificationList: [], // 行业分类
      showDialogSet: false, // 行业分类的
      tradeClassification: false, // 行业分类
      selectedList: [], // 行业分类初始对应的某条数据
      aptitudetotal: 1, // 资质总条数
      apparatustotal: 1, // 服务仪器总条数
      accounttotal: 1, // 个人账户与对公账户的总条数
      innerVisible: false, // 收款弹出框
      SharingTypeList: [], // 共享类型
      ServiceTypeList: [], // 服务类型
      classificationEquipmentList: [], // 设备分类
      relevance: true, // 关联 全部 已关联
      relevance_s: true,
      fileList: [], // 图片
      fileListS: [], // 图片详情
      tableAccountList: [], // 个人与对公账户
      multipleSelection: [], // 对公账户全选
      SelectaccountList: [], // 选取显示账户
      hy: [],
      SelectaccountListVerify: false,
      individual: true, // 个人账户
      corporate: true,
      qureys: {
        type: '1',
        pageIndex: '1',
        pageSize: '10'
      }, // 个人与对公账户
      defaultProps: {
        children: 'children',
        label: 'fieldname',
        disable: true
      },
      preview: `http://${location.host}${preview}/`, // 预览地址
      // 新增基本服务1-----------------------------
      new_service: {
        servicename: '',
        brief: '',
        images: '',
        application: '',
        period: '',
        customcycle: '',
        is_orderticket: '',
        modelagreement: '',
        is_invoice: '',
        invoicetype: [], //
        is_report: '',
        reporttype: [],
        sharingtype: '',
        type: '',
        details: '',
        details_ids: '',
        is_operator: '',
        sample_required: '',
        invoice_category: '',
        industryclassification: ''
      },
      // 新增基本服务1校验服务
      new_service_rules: {
        servicename: [{
          required: true,
          message: '请输入服务名称',
          trigger: 'blur'
        }],
        invoicetype: [
          { type: 'array', required: true, message: '请至少选择一个', trigger: 'change' }
        ],
        reporttype: [
          { type: 'array', required: true, message: '请至少选择一个', trigger: 'change' }
        ],
        customcycle: [{
          required: true,
          message: '请输入内容',
          trigger: 'blur'
        }],
        brief: [{
          required: true,
          message: '请输入内容',
          trigger: 'blur'
        }, {
          min: 1,
          max: 200,
          message: '长度在 1 到 200 个字符',
          trigger: 'blur'
        }],
        application: [{
          required: true,
          message: '请输入内容',
          trigger: 'blur'
        }, {
          min: 1,
          max: 200,
          message: '长度在 1 到 200 个字符',
          trigger: 'blur'
        }],
        period: [{
          required: true,
          message: '请至少选择一个预计服务周期',
          trigger: 'change'
        }],
        is_orderticket: [{
          required: true,
          message: '请选择是否需要买家委托单',
          trigger: 'change'
        }],
        orderticket: [{
          required: true,
          message: '请选择委托单',
          trigger: 'change'
        }],
        is_electronic: [{
          required: true,
          message: '请选择是否需要买家签电子协议',
          trigger: 'change'
        }],
        modelagreement: [{
          required: true,
          message: '请选择电子协议',
          trigger: 'change'
        }],
        is_invoice: [{
          required: true,
          message: '请选择是否需要提供发票',
          trigger: 'change'
        }],
        is_report: [{
          required: true,
          message: '请选择是否需要提供报告',
          trigger: 'change'
        }],
        sharingtype: [{
          required: true,
          message: '请选择共享类型',
          trigger: 'change'
        }],
        type: [{
          required: true,
          message: '请选择服务类型',
          trigger: 'change'
        }],
        details: [{
          required: true,
          message: '请输入内容',
          trigger: 'blur'
        }, {
          min: 1,
          max: 200,
          message: '长度在 1 到 200 个字符',
          trigger: 'blur'
        }],
        is_operator: [{
          required: true,
          message: '请选择服务类型',
          trigger: 'change'
        }],

        sample_required: [{
          required: true,
          message: '请输入内容',
          trigger: 'blur'
        }, {
          min: 1,
          max: 200,
          message: '长度在 1 到 200 个字符',
          trigger: 'blur'
        }]

      },

      // 新增关联服务资质2-------------------------
      service_qualification: {
        pageIndex: '1',
        pageSize: '10',
        type: ''

      },
      // 新增服务地点与联系方式3-------------------
      location_connection_from: {
        linkman: '',
        mobile: '',
        qq: '',
        mail: '',
        address: ''
      },
      // 新增服务地点与联系方式3校验服务
      location_connection_from_rules: {
        linkman: [{
          required: true,
          message: '请输入内容',
          trigger: 'blur'
        }],
        mail: [{ required: false, message: '请输入邮箱地址', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }],
        mobile: [{ required: false, pattern: /^1[345789]\d{9}$/, message: '请输入有效的手机号', trigger: 'blur' }]
      },

      // 关联服务仪器4------------------------------
      form: {
        classificationEquipmentList: '',
        Small_equipment: '',
        cname: '',
        pageSize: '10',
        pageIndex: '1',
        type: '',
        principal: '',
        relation: ''
      },
      // 新增服务价格信息5--------------------------
      service_price_from: {
        isaudit: '',
        quantities: '',
        is_voucher: '',
        voucherratio: '',
        voucherlimit: '',
        paymethod: '1',
        prepaymentratio: '',
        business_id: '',
        servicePricelist: [{
          itemname: '',
          insideprice: '',
          externalprice: '',
          business_id: '',
          key: Date.now()
        }], // 内外部价格
        accountsList: [], // 收付款设置
        accountsList1: [],
        servicePricelist1: []

      },
      // 新增服务价格信息5校验服务
      service_price_from_rules: {
        isaudit: [{
          required: true,
          message: '请选择订单是否需要审核',
          trigger: 'change'
        }],
        is_voucher: [{
          required: true,
          message: '请选择是否使用创新卷',
          trigger: 'change'
        }],
        paymethod: [{ required: true, message: '请选择付款方式', trigger: 'change' }]

      },
      service_data: [], // 资质表格数据
      instruments_form_data: [], // 仪器表格数据
      picture: '',
      file: '',

      form_button: {},
      value1: '',
      step: 1,  // 记录步骤
      dialogVisible: false,
      RnvoiCecategoryList: [],
      electronic_contract_list: [], // 电子合同
      orders_list: [], // 委托单
      add_dialog_title: '新增',
      id_s: '', // 记录新增步骤变化的ID
      save_b: false, // 区分暂存与下一步
      distributionIntS: 0// 设置比例
    }
  },
  created () {
    //  初始接口调用------------------------------------------------------------
    // 共享类型
    addSharingType().then(res => {
      this.SharingTypeList = res.data.list
    })
    // 服务类型
    addServiceType().then(res => {
      this.ServiceTypeList = res.data.list
    })
    // 设备分类
    EquiClassification().then(res => {
      this.classificationEquipmentList = res.data.list
    })
  },
  methods: {
    navigationText () {
      if (this.step === 1) {
        this.add_dialog_title = this.title + '-服务基本信息'
      }
      if (this.step === 2) {
        this.add_dialog_title = this.title + '-关联服务资质'
      }
      if (this.step === 3) {
        this.add_dialog_title = this.title + '-服务地点与联系方式'
      }
      if (this.step === 4) {
        this.add_dialog_title = this.title + '-关联服务仪器'
      }
      if (this.step === 5) {
        this.add_dialog_title = this.title + '-服务价格信息'
      }
    },
    // 选择行业分类   start----------------------
    // 选中的节点
    tradeClassificationS () {
      // 行业分类
      HYFL().then(res => {
        if (res.data.success) {
          this.ChooseclassificationList = res.data.list
        }
      })

      setTimeout(() => {
        console.log(2222)
        this.tradeClassification = true
      }, 1000)
    },
    handleCheckChange (data, checked, indeterminate) {
      console.log(data, checked, indeterminate)
      if (checked) {
        this.selectedList.push(data.fieldcode)
      } else {
        for (let i = 0; i < this.selectedList.length; i++) {
          if (data.fieldcode === this.selectedList[i]) {
            this.selectedList.splice(i, 1)
          }
        }
      }
      this.new_service.industryclassification = this.selectedList.join(',')
    },
    // 行业分类  end-----------------------------
    // 新增修改公共的方法 1 3 5步------------------------------------------------
    editServiceInformationMethods (query) {
      console.log(query)
      // 第一步转化----------
      let query135 = JSON.parse(JSON.stringify(query))
      if (this.step === 1) {
        query135.invoicetype = query135.invoicetype.join(',')
        query135.reporttype = query135.reporttype.join(',')
        query135.invoice_category = this.RnvoiCecategoryList.join(',')
      }
      console.log(query135)
      // -------------------
      editServiceInformationGM(query135).then(res => {
        if (this.step === 1) {
          if (res.data.success) {
            if (this.save_b) {
              this.save_b = false
              this.addRelatedQualificationPage()
              this.step = 2
              this.navigationText()
              console.log(this.step)
            }
          }
        } else if (this.step === 3) {
          if (res.data.success) {
            if (this.save_b) {
              this.save_b = false
              this.step = 4
              this.navigationText()
              this.getDetectionServiceInformationList()
              console.log(this.step)
            }
          }
        } else if (this.step === 5) {
          if (res.data.success) {
            this.cancel()
          }
        }
      })
    },
    // 第三步与第5步初始调用渲染表单数据
    getServiceInformationMethods () {
      getServiceInformationGM({ business_id: this.id_s }).then(res => {
        if (this.step === 3) {
          this.location_connection_from = res.data.userInfo
        } else if (this.step === 5) {
          // 第五步渲染
          this.service_price_from.business_id = this.id_s
          this.service_price_from.isaudit = res.data.serviceInformation.isaudit
          this.service_price_from.quantities = res.data.serviceInformation.quantities
          this.service_price_from.is_voucher = res.data.serviceInformation.is_voucher
          this.service_price_from.voucherratio = res.data.serviceInformation.voucherratio
          this.service_price_from.voucherlimit = res.data.serviceInformation.voucherlimit
          this.service_price_from.paymethod = res.data.serviceInformation.paymethod
          this.service_price_from.prepaymentratio = res.data.serviceInformation.prepaymentratio
        }
      })
    },
    // 新增公共的调用方法 初始渲染end---------------------------------------------

    // x新增基本信息第一步 start------------------------------------------------------------------------------
    save_1 (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.selectedList.length > 3) {
            this.$message('最多只能选择3个')
            return false
          }
          if (this.new_service.details_ids === '' || this.new_service.images === '') {
            this.$message('请上传图片')
            return false
          }

          this.new_service.status = '1'
          if (this.title === '编辑') {
            this.editServiceInformationMethods(this.new_service)
          } else {
            this.addFirstStep()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 新增提交form表单
    addFirstStep () {
      // 重新定义一个对象 不改变原有的数据
      let query = JSON.parse(JSON.stringify(this.new_service))
      query.invoicetype = query.invoicetype.join(',')
      query.reporttype = query.reporttype.join(',')
      query.invoice_category = this.RnvoiCecategoryList.join(',')
      addFacilitatingAgency(query)
        .then(res => {
          const data = res.data
          this.id_s = res.data.id
          this.service_price_from.id = res.data.id
          this.service_price_from.servicePricelist[0].business_id = res.data.id
          console.log(this.id_s)
          if (data.success) {
            if (this.save_b) {
              this.save_b = false
              this.addRelatedQualificationPage()
              this.step = 2
              this.navigationText()
            }
            console.log('成功了')
          } else {
            console.log('失败了')
          }
        })
    },

    // 先选择是 然后选择否清空之前的
    // 预计服务周期
    serviceperiod () {
      if (this.new_service.period !== '6') {
        this.new_service.customcycle = ''
      }
    },
    // 选择委托单
    orderTicket () {
      if (this.new_service.is_orderticket === '0') {
        this.new_service.orderticket = ''
      }
    },
    // 电子协议
    Electronicagreement () {
      if (this.new_service.is_electronic === '0') {
        this.new_service.modelagreement = ''
      }
    },
    // 是否提供发票
    provideInvoice () {
      if (this.new_service.is_invoice === '0') {
        this.new_service.invoicetype = []
      }
    },
    // 是否提供报告
    offerReport () {
      if (this.new_service.is_report === '0') {
        this.new_service.reporttype = []
      }
    },

    //  动态更新textarea文字长度 start-----------
    descInput () {
      let briefVal = this.new_service.brief.length
      this.brief_lenght = briefVal
    },
    applicationInput () {
      let briefVal = this.new_service.application.length
      this.application_lenght = briefVal
    },
    detailsInput () {
      let briefVal = this.new_service.details.length
      this.details_lenght = briefVal
    },
    sampleInput () {
      let briefVal = this.new_service.sample_required.length
      this.sample_required_lenght = briefVal
    },
    //  动态更新textarea文字长度 end----------

    //  服务图片上传start------
    handleRemove (file) {
      let id = file.response.id
      deleteFile(id).then(res => {
        console.log(res.data)
      })
    },
    handlePreview (file, fileList) {
    },
    handleSuccess (response, file, fileList) {
      console.log(2)
      let IDimg = []
      for (let i = 0; i < fileList.length; i++) {
        IDimg.push(fileList[i].response.fileid)
      }
      this.new_service.images = IDimg.join(',')
      console.log(this.new_service)
    },

    handleExceed (files, fileList) {
      console.log(fileList)
      this.$message.warning(`当前限制选择 9 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    //  服务图片上传end----------

    // 服务详情图片上传start-----
    handleRemoveS (file) {
      let id = file.response.id
      deleteFile(id).then(res => {
        console.log(res.data)
      })
    },
    handlePreviewS (file, fileListS) {
    },
    handleSuccessS (response, file, fileListS) {
      let IDimg = []
      for (let i = 0; i < fileListS.length; i++) {
        IDimg.push(fileListS[i].response.fileid)
      }
      this.new_service.details_ids = IDimg.join(',')
      console.log(this.new_service)
    },

    handleExceedS (files, fileListS) {
      // console.log(fileList1)
      this.$message.warning(`当前限制选择 9 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileListS.length} 个文件`)
    },
    // 服务详情图片上传end-------

    // 发票类目 start--------
    removeRnvoiCecategory (index) {
      if (index !== -1) {
        this.RnvoiCecategoryList.splice(index, 1)
      }
      if (this.RnvoiCecategoryList.length < 5) {
        this.addRnvoiCecategory_s = true
      }
    },
    addRnvoiCecategory () {
      this.RnvoiCecategoryList.push(
        this.new_service.invoice_category
      )
      console.log(this.RnvoiCecategoryList.length)
      if (this.RnvoiCecategoryList.length > 4) {
        this.addRnvoiCecategory_s = false
      }
    },
    // 发票类目 end-------

    // 暂存进入下一步------
    save_step_1 (formName) {
      this.save_b = true
      this.loadingAptitude = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.save_1('new_service_rules')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    // x新增基本信息第一步 end--------------------------------------------------------------------------------

    // x新增资质第二步start-----------------------------------------------------------------------------------
    addRelatedQualificationPage () {
      // 初始渲染----
      addRelatedQualification(this.service_qualification)
        .then(res => {
          const data = res.data
          this.service_data = res.data.qualificationsList
          console.log(res.data)
          this.aptitudetotal = res.data.pageInfo.totalRecord
          if (data.success) {
            this.loadingAptitude = false
            console.log('成功了')
          } else {
            console.log('失败了')
          }
        })
    },
    // 分页
    handleCurrentChangeAptitude (val) {
      console.log(val)
      this.service_qualification.pageIndex = val
      this.addRelatedQualificationPage()
    },
    // 查询已关联
    beenAssociated () {
      this.relevance = false
      this.relevance_s = false
      this.loadingAptitude = true
      this.service_qualification.type = 1
      this.addRelatedQualificationPage()
    },
    // 查询全部
    allAssociated () {
      this.relevance = true
      this.relevance_s = true
      this.loadingAptitude = true
      this.service_qualification.pageIndex = 1
      this.service_qualification.type = ''
      this.addRelatedQualificationPage()
    },
    // 关联服务
    associatedServices (row) {
      this.loadingAptitude = true
      const qurey = {
        type: row.type,
        business_id: this.id_s,
        qualification_id: row.id
      }
      if (row.business_id !== '') {
        qurey.business_id = row.business_id
      }
      if (qurey.type === '1') {
        qurey.type = 0
      } else if (qurey.type === '0') {
        qurey.type = 1
      }
      console.log(qurey)
      addCancelAssociated(qurey).then(res => {
        if (res.data.success) {
          this.addRelatedQualificationPage()
        }
      })
    },
    // 暂存下一步
    save_step_2 () {
      this.step = 3
      this.navigationText()
      if (this.title === '新增') {
        this.getServiceInformationMethods()
      }
    },
    // x新增资质第二步end----------------------------------------------------------------------------------------

    // x新增服务地点与联系方式第三步end-------------------------------------------------------------------------------------
    // 暂存
    save_3 (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.location_connection_from.status = '1'
          this.location_connection_from.business_id = this.id_s
          this.editServiceInformationMethods(this.location_connection_from)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    // 暂存下一步
    save_step_3 (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.save_b = true
          this.loadingInstrument = true
          this.save_3('location_connection_from_rules')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // x新增服务地点与联系方式第三步end-----------------------------------------------------------------------

    // x新增服务关联服务仪器第四步start-----------------------------------------------------------------------
    //  获取表格信息
    getDetectionServiceInformationList () {
      getDetectionServiceInformation(this.form).then(res => {
        if (res.data.success) {
          this.loadingInstrument = false
          this.instruments_form_data = res.data.detectionServiceInList
          this.apparatustotal = res.data.pageInfo.totalRecord
        }
      })
    },
    // 分页
    handleCurrentChangeApparatus (val) {
      console.log(val)
      this.form.pageIndex = val
      this.getDetectionServiceInformationList()
    },
    // 查询仪器全部
    allinstruments () {
      this.relevance = true
      this.relevance_s = true
      this.loadingInstrument = true
      this.form.pageIndex = 1
      this.form.relation = ''
      this.getDetectionServiceInformationList()
    },
    // 查询仪器已关联
    instrumentsAssociated () {
      this.loadingInstrument = true
      this.relevance = false
      this.relevance_s = false
      this.form.relation = 1
      this.getDetectionServiceInformationList()
    },
    // 取消关联事件
    instrumentCancel (row) {
      this.loadingInstrument = true
      const qurey = {
        type: row.type,
        business_id: this.id_s,
        instrument_id: row.instrument_id
      }
      if (row.business_id !== '') {
        qurey.business_id = row.business_id
      }
      if (qurey.type === '1') {
        qurey.type = 0
      } else if (qurey.type === '0') {
        qurey.type = 1
      }
      associationCancellationDetectionServiceInformation(qurey).then(res => {
        console.log(res.data)
        if (res.data.success) {
          this.getDetectionServiceInformationList()
        }
      })
      console.log(11111111111111111)
    },
    // 搜索按钮查询
    equipmentSearch () {
      this.loadingInstrument = true
      console.log(this.form)
      this.getDetectionServiceInformationList()
    },
    // 暂存进入下一步
    save_step_4 () {
      // 调取第五步的信息
      this.step = 5
      this.getServicePriceInformationGM()
      if (this.title === '新增') {
        this.getServiceInformationMethods()
      }
      // this.getServiceInformationMethods()
      this.getBankaccountPublicaccountsGM()
      this.getServiceaccountsGM()
      this.navigationText()
    },
    // x新增服务关联服务仪器第四步end-------------------------------------------------------------------------

    // x新增服务价格信息第五步start---------------------------------------------------------------------------
    // 获取价格信息
    getServicePriceInformationGM () {
      console.log(this.id_s)
      getServicePriceInformation({ business_id: this.id_s }).then(res => {
        if (res.data.success) {
          if (res.data.servicePrice.length !== 0) {
            this.service_price_from.servicePricelist = res.data.servicePrice
            console.log(res.data.servicePrice.length)
          }
        }
      })
    },
    handleSelectionChangeAccount (val) {
      this.multipleSelection = val
    },
    getServiceaccountsGM () {
      getServiceaccounts({ business_id: this.id_s }).then(res => {
        for (let i = 0; i < res.data.serviceaccountsList.length; i++) {
          res.data.serviceaccountsList[i].business_id = this.id_s
        }
        this.SelectaccountList = res.data.serviceaccountsList
        if (this.SelectaccountList.length !== '') {
          this.SelectaccountListVerify = false
        }
        for (let i = 0; i < this.SelectaccountList.length; i++) {
          this.distributionIntS = this.distributionIntS + parseInt(this.SelectaccountList[i].distribution)
        }
      })
    },

    // 设置收款比例
    Paymentproportion () {
      this.distributionIntS = 0
      for (let i = 0; i < this.SelectaccountList.length; i++) {
        this.distributionIntS = this.distributionIntS + parseInt(this.SelectaccountList[i].distribution)
      }
      console.log(this.distributionIntS)
    },

    // 选取预付款在选取全款清空上次的操作
    totalPayment () {
      if (this.service_price_from.paymethod === '1') {
        this.service_price_from.prepaymentrati = ''
      }
    },
    // 同理是否订单
    Whetheraudit () {
      if (this.service_price_from.isaudit === '0') {
        // this.service_price_from.isaudit = ''
        this.service_price_from.quantities = ''
      }
    },
    // 同理是否使用创新卷
    InnovationVolume () {
      if (this.service_price_from.is_voucher === '0') {
        this.service_price_from.voucherratio = ''
        this.service_price_from.voucherlimit = ''
      }
    },

    // 获取账户信息(公共方法)
    getBankaccountPublicaccountsGM () {
      getBankaccountPublicaccounts(this.qureys).then(res => {
        this.tableAccountList = res.data.bankaccountPublicaccounts
        this.accounttotal = res.data.pageInfo.totalRecord
      })
    },
    // 获取个人账户
    individualAccount () {
      this.individual = true
      this.corporate = true
      this.qureys.type = 1
      this.qureys.pageIndex = 1
      this.getBankaccountPublicaccountsGM()
    },
    // 获取对公账户
    corporateAccount () {
      this.corporate = false
      this.individual = false
      this.qureys.type = 0
      this.qureys.pageIndex = 1
      this.getBankaccountPublicaccountsGM()
    },
    // 账户确定
    accountDetermine () {
      let tempT = []
      for (let i = 0; i < this.multipleSelection.length; i++) {
        this.multipleSelection[i].business_id = this.id_s
        tempT.push(this.multipleSelection[i])
      }
      for (let i = 0; i < tempT.length; i++) {
        let flag = true
        for (let j = 0; j < this.SelectaccountList.length; j++) {
          if (tempT[i].account === this.SelectaccountList[j].account) {
            flag = false
          }
        }
        if (flag) {
          this.SelectaccountList.push(tempT[i])
        }
      }

      this.innerVisible = false
      console.log(this.SelectaccountList)
    },
    // 个人账户与对公账户分页
    handleCurrentChangeaccount (val) {
      this.qureys.pageIndex = val
      this.getBankaccountPublicaccountsGM()
    },
    // 删除添加的个人或者对公账户
    deleteAccount (id) {
      let idD = []
      for (var i = 0; i < this.SelectaccountList.length; i++) {
        if (this.SelectaccountList[i].id !== id) {
          idD.push(this.SelectaccountList[i])
        }
      }
      this.SelectaccountList = idD
      console.log(this.SelectaccountList)
    },
    // 新增检测项目名称那一条
    addDomain () {
      let obj = {
        itemname: '',
        insideprice: '',
        externalprice: '',
        business_id: this.id_s,
        key: Date.now()
      }
      this.service_price_from.servicePricelist.push(obj)
      console.log(this.service_price_from.servicePricelist)
    },
    // 删除检测项目名称那一条
    removeDomain (item) {
      var index = this.service_price_from.servicePricelist.indexOf(item)
      if (index !== -1) {
        this.service_price_from.servicePricelist.splice(index, 1)
      }
    },

    // 提交service_price_from_rules
    submitData (formName) {
      console.log(this.distributionIntS)
      this.service_price_from.accountsList = this.SelectaccountList
      this.service_price_from.accountsList1 = JSON.stringify(this.service_price_from.accountsList)
      this.service_price_from.servicePricelist1 = JSON.stringify(this.service_price_from.servicePricelist)
      this.service_price_from.status = '2'
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.SelectaccountList.length === 0) {
            this.SelectaccountListVerify = true
            return false
          } else {
            if (this.distributionIntS !== 100) {
              this.$message({
                message: '设置收款比例不等于100%,请重新输入',
                type: 'warning'
              })
              return false
            }
          }
          this.editServiceInformationMethods(this.service_price_from)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // x新增服务价格信息第五步end-----------------------------------------------------------------------------
    serviceDialog () {
      this.$emit('serviceDialog', false)
    },
    prevStep () {
      this.step--
      console.log(this.step)
    },
    // 取消

    cancel () {
      console.log(12221)
      console.log('取消')
      this.$emit('serviceDialog', false)
    },

    //  分页
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    // 详情进来的步骤start----------------------------------------------------------------------------
    details_step1 () {
      this.addRelatedQualificationPage()
      this.step = 2
      this.loadingAptitude = true
      this.navigationText()
    },
    details_step2 () {
      this.step = 3
      this.loadingInstrument = true
      this.navigationText()
    },
    details_step3 () {
      this.getDetectionServiceInformationList()
      this.step = 4
      this.navigationText()
    },
    details_step4 () {
      this.getServicePriceInformationGM()
      this.getServiceaccountsGM()
      this.step = 5
      this.navigationText()
    }
    // 详情进来的步骤end------------------------------------------------------------------------------

  },
  mounted () {
    // this.form_button = this.show.new_service
  }
}
</script>

<style lang="less">
.add-equip_y {
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
      overflow-y: auto;
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
          margin-left: 0;
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
