import axios from 'axios'
import
{
  Message
} from 'element-ui'
import config from './config'

// 用于跳转登录zxpaas

const getRefreshToken = function (instance)
{
  sessionStorage.removeItem('access_token')
  let authToken = sessionStorage.getItem('refresh_token')
  return instance.post(config.proxyPath + 'api/oauth/refreshtoken/' + authToken, {})
}

const SERVICE = axios.create({
  timeout: process.env.NODE_ENV === 'production' ? 3000 : 10000
})

SERVICE.interceptors.request.use(
  config =>
  {
    let authToken = sessionStorage.getItem('access_token')
    if (authToken != null)
    {
      config.headers.Authorization = `Bearer ` + authToken
    }
    return config
  },
  err =>
  {
    return Promise.reject(err)
  }
)

SERVICE.interceptors.response.use(
  response =>
  {
    return response
  },
  error =>
  {
    if (error.response)
    {
      switch (error.response.status)
      {
        case 401:
          let config = error.config
          if (!config.isRetryRequest)
          {

            let authToken = sessionStorage.getItem('refresh_token')
            if (authToken == null)
            {
              sessionStorage.removeItem('access_token')
              sessionStorage.removeItem('refresh_token')
              sessionStorage.removeItem('user')
              window.location.href = window.location.protocol + '//' + window.location.host + config.context
            } else
            {
              return getRefreshToken(SERVICE)
                .then(function (res)
                {
                  let data = res.data
                  sessionStorage.setItem('access_token', data.access_token)
                  sessionStorage.setItem('refresh_token', data.refresh_token)
                  config.isRetryRequest = true
                  let authToken = data.access_token
                  config.headers.Authorization = `Bearer ` + authToken
                  config.baseURL = ''
                  return axios(config)
                })
                .catch(function ()
                {
                  sessionStorage.removeItem('access_token')
                  sessionStorage.removeItem('refresh_token')
                  sessionStorage.removeItem('user')
                  window.location.href = window.location.protocol + '//' + window.location.host + config.context
                })
            }
          }
          break
        default:
          Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
          })
      }
    }
    return Promise.reject(error)
  }
)

export default SERVICE
