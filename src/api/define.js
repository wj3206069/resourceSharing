import axios from 'axios'
import Qs from 'qs'
import {
  Message
} from 'element-ui'

const SERVICE = axios.create({
  timeout: process.env.NODE_ENV === 'production' ? 5000 : 10000,
  transformRequest: [function (data) {
    data = Qs.stringify(data)
    return data
  }],
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

SERVICE.interceptors.response.use(
  response => response,
  error => {
    console.log('err' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default SERVICE
