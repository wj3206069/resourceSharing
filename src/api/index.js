/*
 * @Description:
 * @version: API 常量
 * @Company: zx
 * @Author: LiuHui
 * @Date: 2018-11-19 11:55:38
 * @LastEditors: LiuHui
 * @LastEditTime: 2018-12-11 19:48:13
 */
import request from './define.js'
const API = '/Sz_dxyq' // 后台项目名
const uploadPath = `${API}/fileAction/uploadFiles`
const downloadFileOne = `${API}/fileAction/downloadFile`
const downloadFileMore = `${API}/fileAction/batchDownload`
const preview = `${API}/fileAction/viewFile`
export {
  API,
  uploadPath,
  downloadFileOne,
  downloadFileMore,
  preview
}

// 数据字典 通用
export function getDataDictionary(query) {
  return request({
    url: API + `/utils/getCodeInfoByCode/${query}`,
    method: 'get'
  })
}
export function getDataDictionarys(query) {
  return request({
    url: API + `/utils/getTreeCodeInfoByCode/${query}`,
    method: 'get'
  })
}
// 文件、图片删除
export function deleteFile(query) {
  return request({
    url: API + '/fileAction/deleteFile/' + query,
    method: 'get'
  })
}

// 单个文件下载
export function downloadOne(query) {
  return request({
    url: downloadFileOne,
    method: 'get',
    params: query
  })
}

// 多个文件下载
export function downloadMore(query) {
  return request({
    url: downloadFileMore,
    method: 'get',
    params: query
  })
}

export function checkAround(query) {
  return request({
    url: query.url,
    method: 'post',
    data: query.data
  })
}
