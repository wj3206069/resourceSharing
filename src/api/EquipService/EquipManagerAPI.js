/* eslint-disable */
/*
 * @Author: lijun 
 * @Date: 2018-11-20 09:37:00 
 * @Last Modified by: lijun
 * @Last Modified time: 2018-12-23 17:51:47
 * 共享服务管理-----设备管理API----------
 * POST - data
 * GET - params
 */

import request from '../define.js'
import { API } from '../article.js'

// 登录
export function login (query)
{
  return request({
    url: API + '/login/addlogin',
    method: 'post',
    data: query
  })
}

//----------------------------------------机构角色----------------------------------------------

// 设备列表
export function getTableData (query)
{
  return request({
    url: API + '/instrumentManagementMechanism/getInstrumentListInformation',
    method: 'get',
    params: query
  })
}

// 仪器管理--新增--获取单位列表
export function companyInfo ()
{
  return request({
    url: API + '/instrumentManagementMechanism/getUnitInformationByUserId',
    method: 'get'
  })
}

// 获取创新载体列表
export function getInnovation ()
{
  return request({
    url: API + '/instrumentManagementMechanism/getInnovationCarrierList',
    method: 'get'
  })
}

// 仪器管理--新增--新增设备第一步
export function addEquipment (query)
{
  console.log(query)
  return request({
    url: API + '/instrumentManagementMechanism/addInstrumentInformation',
    method: 'post',
    data: query
  })
}

//仪器管理--修改--修改设备信息---第二步、第三步
export function editEquipment (query)
{
  return request({
    url: API + '/instrumentManagementMechanism/editInstrumentInformation',
    method: 'post',
    data: query
  })
}

//仪器管理--获取数据字典
export function getSelectData (query)
{
  return request({
    url: API + '/utils/getCodeInfoByCode/' + query,
    method: 'get'
  })
}

// //仪器管理--获取多级数据字典
export function getMultilevelSelect (query)
{
  return request({
    url: API + '/utils/getTreeCodeInfoByCode/' + query,
    method: 'get'
  })
}

//仪器管理--获取人员信息
export function getUserInfo ()
{
  return request({
    url: API + '/instrumentManagementMechanism/getUserformationByUnitId',
    method: 'get'
  })
}


// 文件、图片删除
export function deleteFile (query)
{
  return request({
    url: API + '/fileAction/deleteFile/' + query,
    method: 'get'
  })
}

// 仪器管理--单个、批量删除
export function deleteList (query)
{
  console.log(query);

  return request({
    url: API + '/instrumentManagementMechanism/deleteInstrumentInformationByInstrumentInId',
    method: 'post',
    data: query
  })
}


// 仪器管理--上一步、查看详情、编辑
export function editDetail (query)
{
  return request({
    url: API + '/instrumentManagementMechanism/getInstrumentInformationByInstrumentInId',
    method: 'get',
    params: query
  })
}

// 机构导入
export function importFile (query)
{
  return request({
    url: API + '/instrumentManagementMechanism/instrumentListInformationImport',
    method: 'get',
    params: query
  })
}


//----------------------------------------平台角色----------------------------------------------
//仪器列表
export function getTableDataPlat (query)
{
  return request({
    url: API + '/instrumentManagementPlatform/getInstrumentListInformation',
    method: 'get',
    params: query
  })
}


//获取单位列表
export function companyInfoPlat (query)
{
  return request({
    url: API + '/instrumentManagementPlatform/getUnitInformationByUserId',
    method: 'get'
  })
}

// 新增仪器信息---第一步
export function addEquipmentPlat (query)
{
  return request({
    url: API + '/instrumentManagementPlatform/addInstrumentInformation',
    method: 'post',
    data: query
  })
}


// 获取人员信息
export function getUserInfoPlat (query)
{
  return request({
    url: API + '/instrumentManagementPlatform/getUserformationByUnitId',
    method: 'get'
  })
}


// 修改仪器信息----第二步、第三步
export function editEquipmentPlat (query)
{
  return request({
    url: API + '/instrumentManagementPlatform/editInstrumentInformation',
    method: 'post',
    data: query
  })
}


// 查看详情、编辑、上一步
export function editDetailPlat (query)
{
  return request({
    url: API + '/instrumentManagementPlatform/getInstrumentInformationByInstrumentInId',
    method: 'get',
    params: query
  })
}


// 删除
export function deleteListPlat (query)
{
  return request({
    url: API + '/instrumentManagementPlatform/deleteInstrumentInformationByInstrumentInId',
    method: 'post',
    data: query
  })
}


// 平台导入
export function importFilePlat (query)
{
  return request({
    url: API + '/instrumentManagementPlatform/instrumentListInformationImport',
    method: 'get',
    params: query
  })
}