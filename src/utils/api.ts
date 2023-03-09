import AsyncStorage from '@react-native-async-storage/async-storage'
import { USER_INFO } from 'models/api'
import { DEVICES } from './common'

export const _API_BASE_URL = 'http://192.168.55.107:4000'

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

export const getNewsList = async (input: { limit: number; page: number; keyword: string }) => {
  try {
    const limit = input.limit ?? 10
    const page = input.page ?? 1
    const keyword = input.keyword ?? ''

    const response = await fetch(
      `${_API_BASE_URL}/api/news?limit=${limit}&page=${page}&keyword=${keyword}&device=${DEVICES.MOBILE}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const rawResponse = await response.json()

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    return { success: false, data: null, message: 'Something went wrong' }
  }
}

export const getNewsDetail = async (input: { news_id: string }) => {
  try {
    const { news_id } = input

    if (!news_id || news_id === '') {
      return { success: false, data: null, message: 'Invalid News Id' }
    }

    const response = await fetch(`${_API_BASE_URL}/api/news/detail?news_id=${news_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const rawResponse = await response.json()

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    console.log(error)
  }
}
