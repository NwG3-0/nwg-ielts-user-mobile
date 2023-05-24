import AsyncStorage from '@react-native-async-storage/async-storage'
import { USER_INFO } from 'models/api'
import { DEVICES } from 'utils/common'
import { _API_BASE_URL } from 'utils/api'

export const checkSavedWord = async (input: { word: string; userId: string; accessToken: string }) => {
  try {
    const { word, userId, accessToken } = input

    if (!word || word === '' || !userId || userId === '') {
      return { success: false, data: null, message: 'Invalid Id' }
    }
    const response = await fetch(`${_API_BASE_URL}/api/card/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer${accessToken}`,
      },
      body: JSON.stringify({ word, userId }),
    })

    const rawResponse = await response.json()

    if (rawResponse) {
      console.log(rawResponse)
      return rawResponse
    }
  } catch (error) {
    console.log(error)
  }
}

export const saveWord = async (input: {
  word: string
  userId: string
  accessToken: string
  topicName: string
  phonetic?: string
  audio?: string
  meanings: string
}) => {
  try {
    const { word, userId, accessToken, topicName, phonetic, audio, meanings } = input

    if (!word || word === '' || !userId || userId === '') {
      return { success: false, data: null, message: 'Invalid Id' }
    }
    const response = await fetch(`${_API_BASE_URL}/api/card/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer${accessToken}`,
      },
      body: JSON.stringify({ word, userId, topicName, phonetic, audio, meanings }),
    })

    const rawResponse = await response.json()

    if (rawResponse) {
      console.log(rawResponse)

      return rawResponse
    }
  } catch (error) {
    console.log(error)
  }
}

export const getWord = async (input: {
  limit: number
  page: number
  keyword: string
  startDate: number
  endDate: number
  topicName: string
  accessToken: string
  userId: string
}) => {
  try {
    const limit = input.limit ?? 10
    const page = input.page ?? 1
    const keyword = input.keyword ?? ''
    const startDate = input.startDate
    const topicName = input.topicName
    const endDate = input.endDate
    const accessToken = input.accessToken
    const userId = input.userId

    const response = await fetch(
      `${_API_BASE_URL}/api/card?limit=${limit}&page=${page}&keyword=${keyword}&startDate=${startDate}&endDate=${endDate}&topicName=${topicName}&userId=${userId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer${accessToken}`,
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
