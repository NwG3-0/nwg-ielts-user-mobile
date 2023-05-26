import axios from 'axios'
import { _API_BASE_URL } from '../../utils/api'
import { USER_INFO } from 'models/api'
import AsyncStorage from '@react-native-async-storage/async-storage'

const axiosInstance = axios.create({
  baseURL: _API_BASE_URL,
})

// Add a request interceptor for authentication
axiosInstance.interceptors.request.use(
  async (config) => {
    const userInfo = await AsyncStorage.getItem(USER_INFO)

    if (userInfo) {
      const accessToken = JSON.parse(userInfo).token
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Add a response interceptor for handling errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
      } else if (error.response.status === 500) {
      } else if (error.response.status === 404) {
        console.log('Errorrr', error)
      }
    }

    return Promise.reject(error)
  },
)

export default axiosInstance
