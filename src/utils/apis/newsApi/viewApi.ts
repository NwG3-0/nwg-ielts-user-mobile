import AsyncStorage from '@react-native-async-storage/async-storage'
import { USER_INFO } from 'models/api'
import { DEVICES } from 'utils/common'
import { _API_BASE_URL } from 'utils/api'
import axiosInstance from 'utils/axios'

export const checkNewViews = async (input: { newsId: string; userId: string }) => {
  const { newsId, userId } = input

  if (!newsId || newsId === '' || !userId || userId === '') {
    return { success: false, data: null, message: 'Invalid Id' }
  }

  const { data } = await axiosInstance.get(`${_API_BASE_URL}/api/news/check-views?newsId=${newsId}&userId=${userId}`)

  return data
}

export const addNewViews = async (input: { newsId: string; userId: string; accessToken: string }) => {
  try {
    const { newsId, userId, accessToken } = input

    if (!newsId || newsId === '' || !userId || userId === '') {
      return { success: false, data: null, message: 'Invalid Id' }
    }

    const response = await fetch(`${_API_BASE_URL}/api/view-news/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer${accessToken}`,
      },
      body: JSON.stringify({ newsId, userId }),
    })

    const rawResponse = await response.json()

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    console.log(error)
  }
}
export const updateNewViews = async (input: { newsId: string; userId: string; accessToken: string }) => {
  try {
    const { newsId, userId, accessToken } = input

    if (!newsId || newsId === '') {
      return { success: false, data: null, message: 'Invalid Id' }
    }

    const response = await fetch(`${_API_BASE_URL}/api/news/update-views`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer${accessToken}`,
      },
      body: JSON.stringify({ newsId, userId }),
    })

    const rawResponse = await response.json()

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    console.log(error)
  }
}
