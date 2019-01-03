// localStorage
const err = new Error('key must be a string') // 错误提示
export function setSate(k, v) {
  // 判断参数
  if (typeof k !== 'string') throw err
  // 删除指定k
  if (v === null) localStorage.removeItem(k)
  // 清空
  if (v === null && k === null) localStorage.clear()
  // 判断类型
  if (typeof v !== 'string') v = JSON.stringify(v)
  localStorage.setItem(k, v)
}

export function getState(k) {
  // 判断参数
  if (typeof k !== 'string') throw err
  let v = localStorage.getItem(k)
  // 判断类型
  if (typeof JSON.parse(v) === 'string') {
    return v
  } else {
    return JSON.parse(v)
  }
}
// sessionStorage
export function setSession(k, v) {
  // 判断参数
  if (typeof k !== 'string') throw err
  // 删除指定k
  if (v === null) sessionStorage.removeItem(k)
  // 清空
  if (v === null && k === null) sessionStorage.clear()
  // 判断类型
  if (typeof v !== 'string') v = JSON.stringify(v)
  sessionStorage.setItem(k, v)
}

export function getSessios(k) {
  // 判断参数
  if (typeof k !== 'string') throw err
  let v = sessionStorage.getItem(k)
  // 判断类型
  if (typeof JSON.parse(v) === 'string') {
    return v
  } else {
    return JSON.parse(v)
  }
}
