import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { notification } from 'antd'
import store from 'store'

const axiosClient = axios.create()

const globalErrorHandler = (error: AxiosError) => {
  if (error.response?.status === 401) {
    store.api.setLoggedOut()
    notification.info({
      message: 'Токен устарел',
      description: 'Повторите авторизацию',
    })
  }
}

axiosClient.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = localStorage.getItem('jwt')
  if (config.headers) {
    config.headers.Authorization = token ? token : ''
  }
  return config
})

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => globalErrorHandler(error)
)

export default axiosClient
