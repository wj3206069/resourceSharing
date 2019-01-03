/*
 * @Author: mikey.yiqiaohua
 * @Date: 2018-11-19 11:50:14
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-12-27 03:06:23
 */
import request from './define.js'

const API = '/Sz_dxyq' // 后台项目名
const uploadFile = `${API}/fileAction/uploadFile`
const imageUpload = `${API}/person/imageUpload`
const downloadFile = `${API}/fileAction/downloadFile`
export {
  uploadFile,
  imageUpload,
  downloadFile
}
// POST - data
// GET - params
// 数据字典通用接口 start----------------------------------------------------
// 共享类型
export function addSharingType() {
  return request({
    url: API + '/utils/getCodeInfoByCode/SharingType',
    method: 'get'
  })
}
// 服务类型
export function addServiceType() {
  return request({
    url: API + '/utils/getCodeInfoByCode/SERVICETYPE',
    method: 'get'
  })
}
// 服务状态
export function serviceState() {
  return request({
    url: API + '/utils/getCodeInfoByCode/SERVICESTATUS',
    method: 'get'
  })
}
// 设备分类
export function EquiClassification() {
  return request({
    url: API + '/utils/getTreeCodeInfoByCode/EquiClassification',
    method: 'get'
  })
}
// 设备小类
export function AnalyticalInstruments() {
  return request({
    url: API + '/utils/getTreeCodeInfoByCode/AnalyticalInstruments',
    method: 'get'
  })
}
//  行业分类/utils/ getTreeCodeInfoByCode/HYFL
export function HYFL() {
  return request({
    url: API + '/utils/getTreeCodeInfoByCode/HYFL',
    method: 'get'
  })
}

export function getHyflByCode() {
  return request({
    url: API + '/serviceManagementMechanism/getHyflByCode',
    method: 'get'
  })
}

// 创新卷使用比例
export function InnovationSybl() {
  return request({
    url: API + '/utils/getCodeInfoByCode/sybl',
    method: 'get'
  })
}

// 审核记录通用接口
export function queryAuditRecordList(id) {
  return request({
    url: API + '/workFlow/queryAuditRecordList/' + id,
    method: 'get'
  })
}
// 电子协议
export function getProtocolList2() {
  return request({
    url: API + '/serviceManagementMechanism/getProtocolList/2',
    method: 'get'
  })
}
// 委托单
export function getProtocolList3() {
  return request({
    url: API + '/serviceManagementMechanism/getProtocolList/3',
    method: 'get'
  })
}
// 数据字典通用接口 end------------------------------------------=-----------

// 新增上一步下一都调用 除了第二页
export function getServiceInformationGM(query) {
  return request({
    url: API + '/serviceManagementMechanism/getServiceInformation',
    method: 'get',
    params: query
  })
}
// 公共调用修改
export function editServiceInformationGM(query) {
  return request({
    url: API + '/serviceManagementMechanism/editServiceInformation',
    method: 'post',
    data: query
  })
}

// 服务平台新增基本信息(第一页)----------
export function addFacilitatingAgency(query) {
  return request({
    url: API + '/serviceManagementMechanism/addServiceInformation',
    method: 'post',
    data: query
  })
}
// 获取新增服务关联资质信息列表-------------
export function addRelatedQualification(query) {
  return request({
    url: API + '/serviceManagementMechanism/getQualificationsInformation',
    method: 'get',
    params: query
  })
}
// 资质信息 关联与取消关联•
export function addCancelAssociated(query) {
  return request({
    url: API + '/serviceManagementMechanism/associationCancellationQualificationsInformation',
    method: 'post',
    data: query
  })
}
// 服务管理_机构模块_获取检测服务信息（仪器）（第四步）
export function getDetectionServiceInformation(query) {
  return request({
    url: API + '/serviceManagementMechanism/getDetectionServiceInformation',
    method: 'get',
    params: query
  })
}
// 仪器取消关联与已关联
export function associationCancellationDetectionServiceInformation(query) {
  return request({
    url: API + '/serviceManagementMechanism/associationCancellationDetectionServiceInformation',
    method: 'get',
    params: query
  })
}
// 获取服务价格信息
export function getServicePriceInformation(query) {
  return request({
    url: API + '/serviceManagementMechanism/getServicePriceInformation',
    method: 'get',
    params: query
  })
}
// 服务机构列表
export function getServiceListInformationOrganic(query) {
  return request({
    url: API + '/serviceManagementMechanism/getServiceListInformation',
    method: 'get',
    params: query
  })
}
// 服务平台列表
export function getServiceListInformationList(query) {
  return request({
    url: API + '/serviceManagementPlatform/getServiceListInformation',
    method: 'get',
    params: query
  })
}
// 服务平台批量上下架
export function upperFrameServiceInformation(query) {
  return request({
    url: API + '/serviceManagementMechanism/upperFrameServiceInformation',
    method: 'post',
    data: query
  })
}
// 删除图片
export function deleteFile(id) {
  return request({
    url: API + '/fileAction/deleteFile/' + id,
    method: 'get'
  })
}
// 服务机构模块获取个人与对公账户
export function getBankaccountPublicaccounts(query) {
  return request({
    url: API + '/serviceManagementMechanism/getBankaccountPublicaccounts',
    method: 'get',
    params: query
  })
}
// 获取服务账户(第五步)
export function getServiceaccounts(query) {
  return request({
    url: API + '/serviceManagementMechanism/getServiceaccounts',
    method: 'get',
    params: query
  })
}
// 审核服务机构列表-----------------------------------------------------
export function queryOrgServiceAuditList(query) {
  return request({
    url: API + '/serviceManagementMechanism/queryOrgServiceAuditList',
    method: 'get',
    params: query
  })
}

// 服务审核通用接口
export function goWorkflow(query) {
  return request({
    url: API + '/workFlow/goWorkflow',
    method: 'post',
    data: query
  })
}

// 审核服务列表平台------------------------------------------------------
export function queryPlatformServiceAuditList(query) {
  return request({
    url: API + '/serviceManagementPlatform/queryPlatformServiceAuditList',
    method: 'get',
    params: query
  })
}
// 获取创新载体列表
export function getInnovation() {
  return request({
    url: API + '/instrumentManagementMechanism/getInnovationCarrierList',
    method: 'get'
  })
}
// 获取单位列表
export function getUserformationByUnitId() {
  return request({
    url: API + '/instrumentManagementMechanism/getUserformationByUnitId',
    method: 'get'
  })
}

// 服务平台所属单位
export function getUnitInformationByUserId() {
  return request({
    url: API + '/instrumentManagementPlatform/getUnitInformationByUserId',
    method: 'get'
  })
}

// 登陆接口
export function login(query) {
  return request({
    url: API + '/login/addlogin',
    method: 'post',
    data: query
  })
}
