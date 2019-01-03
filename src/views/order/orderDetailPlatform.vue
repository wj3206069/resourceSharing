<template>
  <div class="orderDetail">
    <div class="zx-flex align"
         style="width:100%;position:fixed">
      <div class="c-success"
           style="margin-left:20px;"
           @click.stop.prevent="$router.back(-1)">
        <i class="zxicon zx-icon-arrow-left2-copy cursor"
           style="margin-right:0px"></i>
        <span class="cursor">返回 |</span>
      </div>
      <span style="margin-left: 5px">订单详情</span>
    </div>
    <div class="wrap">
      <div class="wrap_top">
        <div class="detail_jindu">
          <i class="zxicon zx-dingdan "></i>
        </div>
        <div class="line"></div>
        <div class="detail_jindu">
          <i class="zxicon zx-shijian1 "></i>
        </div>
        <div class="line"></div>
        <div class="detail_jindu">
          <i class="zxicon zx-fuwu "></i>
        </div>
        <div class="line"
             style="background:rgba(200,200,200,1);"></div>
        <div class="detail_jindu"
             style=" border: 2px solid rgb(200, 200, 200);">
          <i style="color:rgba(200,200,200,1);"
             class="zxicon zx-bingzhuangtu "></i>
        </div>
      </div>
      <div class="wrap_bottom">
        <div class="item_flex">
          <span class="otder_time">下单时间</span>
          <span class="sj">2018-01-01 10：00：00</span>
        </div>
        <div class="item_flex">
          <span class="otder_time">支付时间</span>
          <span class="sj">2018-01-01 10：00：00</span>
        </div>
        <div class="item_flex">
          <span class="otder_time">开始服务</span>
          <span class="sj">2018-01-01 10：00：00</span>
        </div>
        <div class="item_flex"
             style="justify-content:unset;">
          <span class="otder_time"
                style="color:rgba(147,147,147,1);">交易完成</span>
        </div>
      </div>

    </div>
    <div class="zhuangtai">
      <div class="flex column"
           style="width:41%;">
        <span v-if="baseInfo.service_state==1">当前订单状态：待审核</span>
        <span v-if="baseInfo.service_state==2">当前订单状态：待付款</span>
        <span v-if="baseInfo.service_state==3">当前订单状态：已付款</span>
        <span v-if="baseInfo.service_state==4">当前订单状态：已付首款</span>
        <span v-if="baseInfo.service_state==5">当前订单状态：已接单</span>
        <span v-if="baseInfo.service_state==6">当前订单状态：拒接单</span>
        <span v-if="baseInfo.service_state==7">当前订单状态：交易完成</span>
        <span style="line-height: 50px;">基本信息</span>
      </div>
      <div class="zhuang_w">
        <!-- 基本信息表格 -->
        <div>
          <div class="table_baseInfo">
            <span class="baseInfo_span">订单编号</span>
            <span class="baseInfo_span">服务名称</span>
            <span class="baseInfo_span">服务类型</span>
            <span class="baseInfo_span"
                  style=" border-right: none">是否使用创新券</span>
          </div>
          <div class="table_data">
            <span class="baseInfo_span">{{baseInfo.orderno}}</span>
            <span class="baseInfo_span">{{baseInfo.servicename}}</span>
            <span class="baseInfo_span">{{baseInfo.typeDesc}}</span>
            <span class="baseInfo_span"
                  v-if="baseInfo.is_voucher=='1'"
                  style=" border-right: none">支持</span>
            <span class="baseInfo_span"
                  v-if="baseInfo.is_voucher!='1'"
                  style=" border-right: none">支持</span>
          </div>
          <div class="table_baseInfo2">
            <span class="baseInfo_span">支付渠道</span>
            <span class="baseInfo_span">买家账号</span>
            <span class="baseInfo_span">联系人</span>
            <span class="baseInfo_span"
                  style=" border-right: none">电话</span>
          </div>
          <div class="table_data">
            <span class="baseInfo_span">微信支付</span>
            <span class="baseInfo_span">{{baseInfo.buyerid}}</span>
            <span class="baseInfo_span">{{baseInfo.linkman}}</span>
            <span class="baseInfo_span"
                  style=" border-right: none">{{baseInfo.mobile}}</span>
          </div>
          <div class="table_data2">
            <span class="baseInfo_span2"
                  style="width:177px">买家备注</span>
            <span class="baseInfo_span2"
                  style="    padding-left: 20px; border-right: none">{{baseInfo.buyersnote}}</span>
          </div>
          <div class="table_data2">
            <span class="baseInfo_span2"
                  style="width:177px">订单备注</span>
            <span class="baseInfo_span2"
                  style="    padding-left: 20px; border-right: none">{{baseInfo.ordernote}}</span>
          </div>
        </div>

        <!-- 合约时间表格 -->
        <div class="flex column">
          <span style="line-height: 50px;">合约时间</span>
          <div class="table_2">
            <el-table :data="contratTable"
                      border
                      style="width: 100%">
              <el-table-column prop="name"
                               label="合约名称"
                               align="center"
                               width="180">
              </el-table-column>
              <el-table-column prop="consignee"
                               align="center"
                               label="签订人"
                               width="180">
              </el-table-column>
              <el-table-column prop="signingtime"
                               align="center"
                               label="签订时间">
              </el-table-column>
              <el-table-column prop=""
                               align="center"
                               label="操作">
                <template slot-scope="scope">
                  <span class='cursor'
                        style="color:RGBA(0, 144, 255, 1)"
                        @click="yulan(scope.$index,scope.rows)">预览</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <el-dialog title="合约时间"
                     :visible.sync="dialogFormVisible_heyue">
            <el-form :model="form_yulan"
                     class="zx-flex column pd-t-22"
                     style="width:80%">
              <el-form-item label="合约名称"
                            :label-width="formLabelWidth">
                <el-input disabled
                          v-model="form_yulan.date"
                          auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="签订人"
                            :label-width="formLabelWidth">
                <el-input disabled
                          v-model="form_yulan.name"
                          auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="签订时间"
                            :label-width="formLabelWidth">
                <el-input disabled
                          v-model="form_yulan.address"
                          auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer"
                 class="dialog-footer">
              <el-button @click="dialogFormVisible_heyue = false">取 消</el-button>
              <el-button type="primary"
                         @click="dialogFormVisible_heyue = false">确 定</el-button>
            </div>
          </el-dialog>
        </div>

        <!-- 收货地址表格 -->
        <div class="flex column"
             style=" padding-top:150px">
          <span style="line-height: 50px;">收货地址</span>
          <div class="table_2">
            <el-table :data="tableData2"
                      border
                      style="width: 100%">
              <el-table-column prop="access"
                               label="收货方式"
                               align="center"
                               width="180">
              </el-table-column>
              <el-table-column prop="recipients"
                               align="center"
                               label="收货人"
                               width="180">
              </el-table-column>
              <el-table-column prop="phone"
                               align="center"
                               label="电话">
              </el-table-column>
              <el-table-column prop="detailed"
                               align="center"
                               width=120
                               label="收货地址">
              </el-table-column>
              <el-table-column prop=""
                               align="center"
                               label="操作">
                <template slot-scope="scope">
                  <span class='cursor'
                        style="color:RGBA(0, 144, 255, 1)"
                        v-if="!isAddress"
                        @click="edit_Address(scope.store.states.columns,scope.$index,scope.rows)">修改</span>
                  <span class='cursor'
                        style="color:RGBA(0, 144, 255, 1)"
                        v-if="!isAddress">保存</span>
                  <span class='cursor'
                        style="color:RGBA(0, 144, 255, 1)"
                        v-if="isAddress"
                        @click="deleteRow(scope.$index, tableData2)">删除</span>
                  <span class='cursor'
                        style="color:RGBA(0, 144, 255, 1)"
                        v-if="isAddress"
                        @click="cancle_address()">取消</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <el-dialog title="收货地址"
                     :visible.sync="dialogFormVisible_adress">
            <el-form :model="form_address"
                     class="zx-flex column pd-t-22"
                     style="width:80%">
              <el-form-item label="收货方式"
                            :label-width="formLabelWidth">
                <el-input v-model="form_address.date"
                          auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="收货人"
                            :label-width="formLabelWidth">
                <el-input v-model="form_address.name"
                          auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="电话"
                            :label-width="formLabelWidth">
                <el-input v-model="form_address.tel"
                          auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="收货地址"
                            :label-width="formLabelWidth">
                <el-input v-model="form_address.address"
                          auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer"
                 class="dialog-footer">
              <el-button @click="dialogFormVisible_adress = false">取 消</el-button>
              <el-button type="primary"
                         @click="dialogFormVisible_adress = false">确 定</el-button>
            </div>
          </el-dialog>
        </div>

        <!-- 发票信息表格 -->
        <div style=" padding-top:178px"
             class="flex column">
          <span style="line-height: 50px;">发票信息</span>
          <div class="table_2">
            <el-table :data="tableData3"
                      border
                      style="width: 100%">
              <el-table-column prop="invoicetype"
                               label="发票类型"
                               align="center"
                               width="180">
              </el-table-column>
              <el-table-column prop="title"
                               align="center"
                               label="发票抬头"
                               width="180">
              </el-table-column>
              <el-table-column prop="invoice_category"
                               align="center"
                               label="类目">
              </el-table-column>
              <el-table-column prop="receiveaddr"
                               align="center"
                               label="收票地址">
              </el-table-column>
              <el-table-column prop=""
                               align="center"
                               label="操作">
                <template slot-scope="scope">
                  <span class='cursor'
                        v-if="!isBill"
                        style="color:RGBA(0, 144, 255, 1)"
                        @click="billEdit(scope.store.states.columns,scope.$index,scope.rows)">修改</span>
                  <span class='cursor'
                        v-if="!isBill"
                        style="color:RGBA(0, 144, 255, 1)">保存</span>
                  <span class='cursor'
                        v-if="isBill"
                        style="color:RGBA(0, 144, 255, 1)"
                        @click="deleteRow(scope.$index, tableData3)">删除</span>
                  <span class='cursor'
                        v-if="
                        isBill"
                        @click="billCancle"
                        style="color:RGBA(0, 144, 255, 1)">取消</span>
                </template>
              </el-table-column>
            </el-table>

            <!-- 发票信息弹窗 -->
          </div>
          <el-dialog title="发票信息"
                     :visible.sync="dialogFormVisible_BillInfo">
            <el-form :model="form_Bill"
                     class="zx-flex column pd-t-22"
                     style="width:80%">
              <el-form-item label="发票类型"
                            :label-width="formLabelWidth">
                <el-select v-model="form_Bill.date"
                           placeholder="性别">
                  <el-option label="电子普通发票"
                             value="电子普通发票"></el-option>
                  <el-option label="纸质普通发票"
                             value="纸质普通发票"></el-option>
                  <el-option label="增值税专用发票"
                             value="增值税专用发票"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="发票抬头"
                            :label-width="formLabelWidth">
                <el-input v-model="form_Bill.name"
                          auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="类目"
                            :label-width="formLabelWidth">
                <el-input v-model="form_Bill.leimu"
                          auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="收票地址"
                            :label-width="formLabelWidth">
                <el-input v-model="form_Bill.address"
                          auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer"
                 class="dialog-footer">
              <el-button @click="dialogFormVisible_BillInfo = false">取 消</el-button>
              <el-button @click="dialogFormVisible_BillInfo = false"
                         type="primary">确 定</el-button>
            </div>
          </el-dialog>
        </div>

        <!-- 费用信息表格 -->
        <div style="padding-top:150px"
             class="flex column pd-t-150">
          <div style="line-height:50px;">
            <span>费用信息</span>
            <span style="margin-left:40px">创新卷使用比例：50% 创新卷使用额度：500.00元</span>
          </div>
          <div class="table_2">
            <el-table :data="tableData4"
                      border
                      style="width: 100%">
              <el-table-column prop="itemname"
                               label="服务内容"
                               align="center"
                               width="180">
              </el-table-column>
              <el-table-column prop="itemnums"
                               align="center"
                               label="数量"
                               width="180">
              </el-table-column>
              <el-table-column prop="insideprice"
                               align="center"
                               label="内部价格（元）">
              </el-table-column>
              <el-table-column prop="externalprice"
                               align="center"
                               label="外部单价（元）">
              </el-table-column>
              <el-table-column prop=""
                               align="center"
                               label="操作">
                <template slot-scope="scope">
                  <span class='cursor'
                        style="color:RGBA(0, 144, 255, 1)"
                        v-if="!isSave"
                        @click="toEdit(scope.store.states.columns,scope.$index,scope.rows)">修改</span>
                  <span class='cursor'
                        style="color:RGBA(0, 144, 255, 1)"
                        @click="deleteRow(scope.$index, tableData4)"
                        v-if="isSave">删除</span>

                  <span class='cursor'
                        style="color:RGBA(0, 144, 255, 1)"
                        @click="toSave"
                        v-show="!isSave">保存</span>
                  <span class='cursor'
                        style="color:RGBA(0, 144, 255, 1)"
                        @click="toCancle"
                        v-show="isSave">取消</span>

                </template>
              </el-table-column>
            </el-table>
            <!-- 费用信息弹窗 -->
            <el-dialog title="费用信息"
                       :visible.sync="dialogFormVisible">
              <el-form :model="form"
                       class="zx-flex column pd-t-22"
                       style="width:80%">
                <el-form-item label="服务内容"
                              :label-width="formLabelWidth">
                  <el-input v-model="form.date"
                            auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="数量"
                              :label-width="formLabelWidth">
                  <el-input v-model="form.name"
                            auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="内部价格（元）"
                              :label-width="formLabelWidth">
                  <el-input v-model="form.tel"
                            auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="内部价格（元）"
                              :label-width="formLabelWidth">
                  <el-input v-model="form.address"
                            auto-complete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer"
                   class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary"
                           @click="dialogFormVisible = false">确 定</el-button>
              </div>
            </el-dialog>
            <div class="pices">
              <span>订单总价： ¥ 4000.00</span>
              <span>创新卷： ¥ 500.00</span>
              <div>
                <span>实付款： </span>
                <span style="color:RGBA(255, 54, 0, 1)">¥ 3500.00</span>
              </div>
            </div>
            <div class="wl_info">
              <div>
                <span>物流信息</span>
              </div>
              <div class="wl_wrap">
                <div class="wl_left">
                  <span>来样物流</span>
                  <span style="color:RGBA(255, 90, 0, 1)">更多</span>
                </div>
                <div class="wl_left">
                  <span>报告物流</span>
                  <span style="color:RGBA(255, 90, 0, 1)">更多</span>
                </div>
              </div>
              <div class="wl_jd">
                <div class="flex-de jd_activity"
                     style="    padding-right: 66px;">
                  <span>08-26</span>
                  <span>20：44</span>
                </div>
                <div class="flex-de jd_activity"
                     style="padding-right:69px">
                  <span> 已签收</span>
                  <span>包裹已到达末端站点，请及时取件</span>
                </div>
                <span>暂无数据</span>
              </div>
              <div class="wl_jd">
                <div class="flex-de"
                     style="    padding-right: 66px;">
                  <span>08-26</span>
                  <span>20：44</span>
                </div>
                <div class="flex-de"
                     style="padding-right:69px">
                  <span> 已签收</span>
                  <span>包裹已到达末端站点，请及时取件</span>
                </div>
                <!-- <span>暂无数据</span> -->
              </div>
              <div class="wl_jd">
                <div class="flex-de"
                     style="    padding-right: 66px;">
                  <span>08-26</span>
                  <span>20：44</span>
                </div>
                <div class="flex-de"
                     style="padding-right:69px">
                  <span> 已签收</span>
                  <span>包裹已到达末端站点，请及时取件</span>
                </div>
                <!-- <span>暂无数据</span> -->
              </div>
              <div class="wl_jd">
                <div class="flex-de"
                     style="    padding-right: 66px;">
                  <span>08-26</span>
                  <span>20：44</span>
                </div>
                <div class="flex-de"
                     style="padding-right:69px">
                  <span> 已签收</span>
                  <span>包裹已到达末端站点，请及时取件</span>
                </div>
                <!-- <span>暂无数据</span> -->
              </div>
              <div class="wl_jd">
                <div class="flex-de"
                     style="    padding-right: 66px;">
                  <span>08-26</span>
                  <span>20：44</span>
                </div>
                <div class="flex-de"
                     style="padding-right:69px">
                  <span> 已签收</span>
                  <span>包裹已到达末端站点，请及时取件</span>
                </div>
                <!-- <span>暂无数据</span> -->
              </div>
              <div class="wl_jd">
                <div class="flex-de"
                     style="    padding-right: 66px;">
                  <span>08-26</span>
                  <span>20：44</span>
                </div>
                <div class="flex-de"
                     style="padding-right:69px">
                  <span> 已签收</span>
                  <span>包裹已到达末端站点，请及时取件</span>
                </div>
                <!-- <span>暂无数据</span> -->
              </div>
              <div class="pos_line">
                <i style="position: absolute;top: -13px;left: -14px;"
                   class="zxicon zx-shijian1 "></i>
                <div class="line_down"></div>
              </div>
              <div class="pos_line"
                   style="top:188px">
                <i style="position: absolute;top: -13px;left: -14px;"
                   class="zxicon zx-shijian1 "></i>
                <div class="line_down"></div>
              </div>
              <div class="pos_line"
                   style="top:253px">
                <i style="position: absolute; top: -13px; left: -14px;"
                   class="zxicon zx-shijian1 "></i>
                <div class="line_down"></div>
              </div>
              <div class="pos_line"
                   style="top:318px">
                <i style="position: absolute; top: -13px;left: -14px;"
                   class="zxicon zx-shijian1 "></i>
                <div class="line_down"></div>
              </div>
              <div class="pos_line"
                   style="top:383px">
                <i style="position: absolute;top: -13px;left: -14px;"
                   class="zxicon zx-shijian1 "></i>
                <div class="line_down"></div>
              </div>
              <i style="position: absolute;left: 22%; bottom: -1%;"
                 class="zxicon zx-shijian1 "></i>
            </div>
            <div style="height: 400px;">
              <div>
                <span>评价</span>
              </div>
              <div style="display:flex">
                <div class="flex-de"
                     style="margin-left: 36px;  margin-top: 20px;">
                  <span style="    height: 30px;">服务</span>
                  <img src="../../assets/images/login-bg.png"
                       style="width:231px;height:154px"
                       alt="">
                  <div class="flex-de ">
                    <div style="line-height:40px;">
                      <span>服务名称：</span>
                      <span>热仪器检测</span>
                    </div>
                    <div style="line-height:40px; margin-left:30px;">
                      <span>卖家：</span>
                      <span>龙岗区仪器中心</span>
                    </div>
                  </div>
                </div>
                <div style="margin-top: 96px;">
                  <div style="margin-left:40px;">
                    <div style="display:flex;align-items:center;height:30px;">
                      <span class="demonstration"
                            style="margin-right:10px; ">评价</span>
                      <el-rate disabled
                               show-score
                               text-color="#ff9900"
                               v-model="value1"></el-rate>
                    </div>
                    <p style="width: 382px;height: 100px; padding:10px; border: 1px solid RGBA(221, 221, 221, 1)">仪器很先进，很有用。</p>
                    <!-- <el-input disabled
                              style="width:382px"
                              rows='4'
                              :value="value3"
                              type="textarea"></el-input> -->
                    <div style="display:flex;align-items:center;height:30px;">
                      <span class="demonstration"
                            style="margin-right:10px; ">服务水平</span>
                      <el-rate disabled
                               show-score
                               text-color="#ff9900"
                               v-model="value1"></el-rate>
                    </div>
                    <div style="display:flex;align-items:center;height:30px;">
                      <span class="demonstration"
                            style="margin-right:10px; ">服务态度</span>
                      <el-rate disabled
                               show-score
                               text-color="#ff9900"
                               v-model="value1"></el-rate>
                    </div>
                    <div style="display:flex;align-items:center;height:30px; ">
                      <span class="demonstration"
                            style="margin-right:10px; ">服务响应</span>
                      <el-rate disabled
                               show-score
                               text-color="#ff9900"
                               v-model="value1"></el-rate>
                    </div>
                  </div>
                </div>
              </div>
              <div style="display:flex"
                   v-for="(item, index) in EvaluateList"
                   :key="index">
                <div class="
                   flex-de"
                     style="margin-left: 36px; margin-top: 20px;">
                  <span style="    height: 30px;">服务</span>
                  <img src="../../assets/images/login-bg.png"
                       style="width:231px;height:154px"
                       alt="">
                  <div class="flex-de ">
                    <div style="line-height:40px;">
                      <span>服务名称：</span>
                      <span>{{item.insname}}</span>
                    </div>
                    <div style="line-height:40px; margin-left:30px;">
                      <span>卖家：</span>
                      <span>龙岗区仪器中心</span>
                    </div>
                  </div>
                </div>
                <div style="margin-top: 96px;">
                  <div style="margin-left:40px;">
                    <div style="display:flex;align-items:center;height:30px;">
                      <span class="demonstration"
                            style="margin-right:10px; ">评价</span>
                      <el-rate v-model="item.grade"
                               disabled
                               show-score
                               text-color="#ff9900"></el-rate>
                    </div>
                    <p style="width: 382px;height: 100px; padding:10px; border: 1px solid RGBA(221, 221, 221, 1)">{{item.content}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { checkCompactList, checkOrderAddress, checkInvoiceList, checkOrderCostList, checkOrderEvaluationList } from '@/api/orderListPlatform'
export default {
  name: 'orderListPlatform',
  data () {
    return {
      orderId: '', // 订单id
      baseInfo: {}, // 基础表格信息
      formLabelWidth: '128px',
      tableData3: [],
      tableData: [{
        date: '20181018173112345',
        name: '门口网站',
        address: '2018-01-01 10'
      }],
      tableData2: [],
      tableData4: [],
      value1: 5,
      value3: ' 仪器很先进，很有用。',
      isSave: false,
      isBill: false,
      isAddress: false,
      form: {},
      form_Bill: {},
      form_address: {},
      form_yulan: {},
      dialogFormVisible: false,
      dialogFormVisible_BillInfo: false,
      dialogFormVisible_adress: false,
      dialogFormVisible_heyue: false,
      currentIndex: '',
      EvaluateList: [],
      alogin: [],
      contratTable: []

    }
  },
  computed: {
    ...mapGetters(['orderDeatil'])
  },
  mounted () {
    this.orderId = this.$route.params.id
    this.baseInfo = this.orderDeatil
    this.getcontratTable()
    this.getOrderAddress()
    this.getOrderBill()
    this.getOrderCost()
    this.getOrderEvaluate()
  },
  methods: {
    billEdit (data, index, rows) {
      this.isBill = true
      this.dialogFormVisible_BillInfo = true
      this.form_Bill = this.tableData3[index]
    },
    toEdit (data, index, rows) {
      this.isSave = true
      this.form = this.tableData4[index]
      this.currentIndex = index
      this.dialogFormVisible = true
    },
    yulan (index, rows) {
      this.dialogFormVisible_heyue = true
      this.form_yulan = this.tableData[index]
    },
    edit_Address (data, index, rows) {
      this.isAddress = true
      this.form_address = this.tableData2[index]
      this.currentIndex = index
      this.dialogFormVisible_adress = true
    },
    cancle_address () {
      this.isAddress = false
    },
    billCancle () {
      this.isBill = false
    },
    toSave () { },
    toCancle () {
      this.isSave = false
    },
    deleteRow (index, rows) {
      console.log('index', index, rows)
      rows.splice(index, 1)
    },
    // 订单合约
    getcontratTable () {
      checkCompactList(this.orderId).then(res => {
        if (res.data.success) {
          this.ShowDisposeDialog = true // 获取数据成功显示
          console.log('res.datad', res.data)
          this.contratTable = res.data.list
        } else {
          this.$message.error(res.data.message)
        }
      }).catch(() => {
      })
    },
    // 订单地址
    getOrderAddress () {
      checkOrderAddress(this.orderId).then(res => {
        if (res.data.success) {
          this.ShowDisposeDialog = true // 获取数据成功显示
          console.log('res.datad', res.data)
          this.tableData2.push(res.data.addrInfo)
        } else {
          this.$message.error(res.data.message)
        }
      }).catch(() => {
      })
    },
    // 订单发票
    getOrderBill () {
      checkInvoiceList(this.orderId).then(res => {
        if (res.data.success) {
          this.ShowDisposeDialog = true // 获取数据成功显示
          console.log('res.datad', res.data)
          this.tableData3 = res.data.list
        } else {
          this.$message.error(res.data.message)
        }
      }).catch(() => {
      })
    },
    // 费用列表
    getOrderCost () {
      checkOrderCostList(this.orderId).then(res => {
        if (res.data.success) {
          this.ShowDisposeDialog = true // 获取数据成功显示
          console.log('res.datad', res.data)
          this.tableData4 = res.data.list
        } else {
          this.$message.error(res.data.message)
        }
      }).catch(() => {
      })
    },
    // 评价列表
    getOrderEvaluate () {
      checkOrderEvaluationList(this.orderId).then(res => {
        if (res.data.success) {
          this.ShowDisposeDialog = true // 获取数据成功显示
          this.EvaluateList = res.data.list
          console.log('EvaluateList', this.EvaluateList)
        } else {
          this.$message.error(res.data.message)
        }
      }).catch(() => {
      })
    }
  }
}
</script>

<style lang="css" scoped>
.el-table thead {
  color: brown !important;
}
.jd_activity {
  color: RGBA(255, 90, 0, 1) !important;
}
.pos_line {
  position: absolute;
  top: 122px;
  left: 24%;
}
.wl_info {
  position: relative;
}
.line_down {
  width: 2px;
  height: 50px;
  background: rgba(147, 147, 147, 1);
  position: absolute;
  left: -7px;
  top: 2px;
}
.flex-de {
  display: flex;
  flex-direction: column;
}
.wl_jd {
  display: flex;
  padding-left: 85px;
  padding-top: 35px;
}
.wl_left {
  display: flex;
  width: 220px;
  justify-content: space-around;
}
.wl_wrap {
  display: flex;
  justify-content: space-between;
  padding: 0 48px;
  padding-top: 40px;
}
.pices {
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.pices span {
  line-height: 30px;
}
.orderDetail {
  min-width: 1656px;
  display: flex;
  padding: 35px 0;
  overflow: auto;
  flex-direction: column;
}
.table_2 {
  width: 102%;
}
.baseInfo_span {
  width: 177px;
  height: 47px;
  justify-content: center;
  border-right: 1px solid rgba(221, 221, 221, 1);
  display: flex;
  align-items: center;
}
.baseInfo_span2 {
  height: 70px;
  justify-content: center;
  border-right: 1px solid rgba(221, 221, 221, 1);
  display: flex;
  align-items: center;
}
.zhuang_w {
  width: 41%;
  flex-direction: column;
  height: 420px;
  display: flex;
}

.wrap {
  display: flex;
  flex-direction: column;
  height: 150px;
  align-items: center;
}

.wrap_top {
  display: flex;
  height: 94px;
}
.line {
  width: 127px;
  height: 2px;
  background: rgba(97, 163, 254, 1);
  margin-top: 35px;
}
.detail_jindu {
  width: 76px;
  height: 76px;
  background: rgba(97, 163, 254, 0.1);
  border: 2px solid rgba(97, 163, 254, 1);
  border-radius: 50%;
  position: relative;
}
.detail_jindu i {
  width: 29px;
  height: 33px;
  color: RGBA(97, 163, 254, 1);
  position: absolute;
  font-size: 30px;
  left: 30%;
  top: 30%;
}
.sj {
  font-size: 14px;
  font-family: Adobe Heiti Std R;
  font-weight: normal;
  color: rgba(147, 147, 147, 1);
}
.otder_time {
  font-size: 14px;
  font-family: Adobe Heiti Std R;
  font-weight: normal;
  color: rgba(97, 163, 254, 1);
  margin-bottom: 10px;
}
.item_flex {
  display: flex;
  width: 20%;
  flex: 2;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.wrap_bottom {
  display: flex;
  justify-content: space-around;
  width: 49%;
}
.zhuangtai {
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(71, 71, 71, 1);
  line-height: 59px;
  display: flex;
  /* justify-content: center; */
  margin-top: 30px;
  margin-left: -10px;
  flex-direction: column;
  align-items: center;
  margin-left: 12px;
}
.table_baseInfo {
  width: 708px;
  height: 47px;
  justify-content: space-around;
  display: flex;
  border: 1px solid rgba(221, 221, 221, 1);
  background-color: RGBA(231, 242, 254, 1);
}
.table_baseInfo2 {
  width: 708px;
  height: 47px;
  justify-content: space-around;
  display: flex;
  border-left: 1px solid rgba(221, 221, 221, 1);
  border-bottom: 1px solid rgba(221, 221, 221, 1);
  border-right: 1px solid rgba(221, 221, 221, 1);
  background-color: RGBA(231, 242, 254, 1);
}
.table_data {
  width: 708px;
  height: 47px;
  justify-content: space-around;
  display: flex;
  border-left: 1px solid rgba(221, 221, 221, 1);
  border-bottom: 1px solid rgba(221, 221, 221, 1);
  border-right: 1px solid rgba(221, 221, 221, 1);
}
.table_data2 {
  width: 708px;
  height: 70px;
  display: flex;
  border-left: 1px solid rgba(221, 221, 221, 1);
  border-bottom: 1px solid rgba(221, 221, 221, 1);
  border-right: 1px solid rgba(221, 221, 221, 1);
}
.wrapper_scroll {
  overflow: auto !important;
}
body .is-component,
html .is-component {
  overflow: auto !important;
}
#app .sidebar-container {
  overflow: auto !important;
}
.selectMenu {
}
.tableMain {
  top: 10px;
}
.page {
  float: right;
}
</style>