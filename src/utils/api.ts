import AsyncStorage from '@react-native-async-storage/async-storage'
import { AUTH_TOKEN, USER_INFO } from 'models/api'
import { API_BASE_URL } from '@env'

export const _API_BASE_URL = 'https://nwg-ielts-backend.onrender.com'

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
    return { success: false, data: null, message: 'Something went wrong' }
  }
}
