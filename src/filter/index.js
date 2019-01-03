import store from '@/store'
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}

export function CodeFormat (type, key) {
  const code = store.getters[key]
  let codeObj = code.find(v => {
    return v.value === Number(type)
  })
  if (codeObj) {
    return codeObj.label
  } else {
    return type
  }
}
export function AsyncFormat (type, key) {
  const code = store.getters[key]
  let codeObj = code.find(v => {
    return v.fieldcode === type
  })
  if (codeObj) {
    return codeObj.fieldname
  } else {
    return type
  }
}

// 判断对象是否为空
export function getObjLength(obj) {
  var data = Object.keys(obj)
  return data.length
}
