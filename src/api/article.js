/* eslint-disable */
import request from './define.js'

const API = '/Sz_dxyq' // 后台项目名
const uploadFile = `${API}/fileAction/uploadFile`
const imageUpload = `${API}/person/imageUpload`
const downloadFile = `${API}/fileAction/downloadFile`

export {
  uploadFile,
  imageUpload,
  downloadFile,
  API
}
// POST - data
// GET - params

// 登录
export function getLogin(query) {
  return request({
    url: API + '/login/addlogin',
    method: 'post',
    data: query
  })
}
// 退出
export function loginOut(query) {
  return request({
    url: API + '/login/cancellation',
    method: 'get',
    params: query
  })
}

// test
export function test() {
  return request({
    url: API + '/instrumentManagementPlatform/getInstrumentListInformation',
    method: 'get'
  })
}
