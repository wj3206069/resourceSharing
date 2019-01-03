/*
 * @Author: xiongzhihuang
 * @Date: 2018-11-30 09:49:54
 * @Last Modified by: lijun
 * @Last Modified time: 2018-12-08 10:46:12
 */
/* eslint-disable */
export function successTips (obj)
{
  obj.$notify({
    type: 'success',
    title: '操作成功',
    duration: '1500'
  })
}

export function failTips (obj)
{
  obj.$notify.error({
    type: 'error',
    title: '操作失败',
    duration: '1500'
  });
}

export function failDelete (obj)
{
  obj.$notify.error({
    type: 'error',
    title: '该仪器绑定了服务，不可删除！',
    duration: '1500'
  })
}