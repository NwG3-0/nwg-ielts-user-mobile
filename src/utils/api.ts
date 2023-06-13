import AsyncStorage from '@react-native-async-storage/async-storage'
import { USER_INFO } from 'models/api'
import axios from 'axios'

export const _API_BASE_URL = 'http://192.168.16.170:4000'

export const isLogin = async () => {
  console.log(await AsyncStorage.getItem(USER_INFO))
  //   return !!AsyncStorage.getItem(USER_INFO) && !!AsyncStorage.getItem(AUTH_TOKEN)
}

export const login = async ({ email, password }: { email: string; password: string }) => {
  if (email === '') {
    return { success: false, data: null, message: 'Please enter your email' }
  }
  if (password === '') {
    return { success: false, data: null, message: 'Please enter your password' }
  }

  const { data } = await axios.post(`${_API_BASE_URL}/api/auth/login`, {
    email: email,
    password: password,
  })
  return data
}
