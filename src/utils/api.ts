import AsyncStorage from '@react-native-async-storage/async-storage'
import { USER_INFO } from 'models/api'
import { DEVICES } from './common'

export const _API_BASE_URL = 'http://10.31.0.37:4000'

export const isLogin = async () => {
  console.log(await AsyncStorage.getItem(USER_INFO))
  //   return !!AsyncStorage.getItem(USER_INFO) && !!AsyncStorage.getItem(AUTH_TOKEN)
}

export const login = async ({ email, password }: { email: string; password: string }) => {
  try {
    if (email === '') {
      return { success: false, data: null, message: 'Please enter your email' }
    }
    if (password === '') {
      return { success: false, data: null, message: 'Please enter your password' }
    }

    const response = await fetch(`${_API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    const rawResponse = await response.json()

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    console.log(error)
    return { success: false, data: null, message: 'Something went wrong' }
  }
}
