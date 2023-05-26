import AsyncStorage from '@react-native-async-storage/async-storage'
import { USER_INFO } from 'models/api'
import { DEVICES } from 'utils/common'
import { _API_BASE_URL } from 'utils/api'
import axios from 'axios'
import axiosInstance from 'utils/axios'

export const checkSavedWord = async (input: { word: string; userId: string }) => {
  const { word, userId } = input

  if (!word || word === '' || !userId || userId === '') {
    return { success: false, data: null, message: 'Invalid Id' }
  }
  const data = await axiosInstance.post(`${_API_BASE_URL}/api/card/check`, {
    word: word,
    userId: userId,
  })

  return data
}

export const saveWord = async (input: {
  word: string
  userId: string
  topicName: string
  phonetic?: string
  audio?: string
  meanings: string
}) => {
  const { word, userId, topicName, phonetic, audio, meanings } = input

  if (!word || word === '' || !userId || userId === '') {
    return { success: false, data: null, message: 'Invalid Id' }
  }
  const data = await axiosInstance.post(`${_API_BASE_URL}/api/card/create`, {
    word,
    userId,
    topicName,
    phonetic,
    audio,
    meanings,
  })

  console.log(data)

  return data
}

export const getWord = async (input: {
  limit: number
  page: number
  keyword: string
  startDate: number
  endDate: number
  topicName: string
  userId: string
}) => {
  const limit = input.limit ?? 10
  const page = input.page ?? 1
  const keyword = input.keyword ?? ''
  const startDate = input.startDate
  const topicName = input.topicName
  const endDate = input.endDate
  const userId = input.userId

  const data = await axiosInstance.get(
    `${_API_BASE_URL}/api/card?limit=${limit}&page=${page}&keyword=${keyword}&startDate=${startDate}&endDate=${endDate}&topicName=${topicName}&userId=${userId}`,
  )
console.log(data)
  return data
}
