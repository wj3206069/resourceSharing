/* eslint-disable */
/*
 * @Author: lijun
 * @Date: 2018-12-10 11:20:08
 * @Last Modified by: lijun
 * @Last Modified time: 2018-12-12 16:24:37
 * POST - data
 * GET - params
 */

import request from '../define.js'
import { API } from '../article.js'


//  --------------------仪器审核-------机构----待办列表------------------
export function tablelist (query)
{
  return request({
    url: API + '/instrumentManagementMechanism/queryOrgInstrumentAuditList',
    method: 'get',
    params: query
  })
}


//  -------------------仪器审核--------平台----待办列表------------------
export function tablelistPlat (query)
{
  return request({
    url: API + '/instrumentManagementPlatform/queryPlatformInstrumentAuditList',
    method: 'get',
    params: query
  })
}




//---------------------仪器审核--------审核---------------------  
export function AuditAPI (query)
{
  return request({
    url: API + '/workFlow/goWorkflow',
    method: 'POST',
    data: query
  })
}

// -------------------- 专家审核-----审核列表-------
export function exportList (query)
{
  return request({
    url: API + '/backstagemanagement/getBackstageSystemUserInformationList',
    method: 'GET',
    params: query
  })
}

export function exportDetail (query)
{
  return request({
    url: API + '/backstagemanagement/getBackstageSystemUserInformationById',
    method: 'get',
    params: query
  })
}