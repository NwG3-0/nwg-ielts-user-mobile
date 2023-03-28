import AsyncStorage from '@react-native-async-storage/async-storage'
import { USER_INFO } from 'models/api'
import { DEVICES } from './common'

export const _API_BASE_URL='https://englishbe.lampnm.com'

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

export const getNewsList = async (input: { limit: number; page: number; keyword: string;type:string; startDate:number; endDate:number }) => {

  try {
    const limit = input.limit ?? 10
    const page = input.page ?? 1
    const keyword = input.keyword ?? ''
    const type = input.type
    const startDate= input.startDate
    const endDate=input.endDate
    const response = await fetch(
      `${_API_BASE_URL}/api/news-type?limit=${limit}&page=${page}&keyword=${keyword}&device=${DEVICES.MOBILE}&type=${type}&startDate=${startDate}&endDate=${endDate}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const rawResponse = await response.json()

    if (rawResponse) {
      console.log('raw',rawResponse)
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
export const checkNewViews = async (input: { newsId: string,userId:string }) => {
  try {
    const { newsId,userId } = input

    if (!newsId || newsId === '' || !userId || userId==='') {
      return { success: false, data: null, message: 'Invalid Id' }
    }

    const response = await fetch(`${_API_BASE_URL}/api/news/check-views?newsId=${newsId}&userId=${userId}`, {
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
export const addNewViews = async (input: { newsId: string,userId:string }) => {
  try {
    const { newsId,userId } = input

    if (!newsId || newsId === '' || !userId || userId==='') {
      return { success: false, data: null, message: 'Invalid Id' }
    }

    const response = await fetch(`${_API_BASE_URL}/api/view-news/create?newsId=${newsId}&userId=${userId}`, {
      method: 'POST',
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
export const updateNewViews = async (input: { newsId: string,userId:string }) => {
  try {
    const { newsId } = input

    if (!newsId || newsId === '' ) {
      return { success: false, data: null, message: 'Invalid Id' }
    }

    const response = await fetch(`${_API_BASE_URL}/api/news/update-views?newsId=${newsId}`, {
      method: 'POST',
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

