import AsyncStorage from '@react-native-async-storage/async-storage'
import { USER_INFO } from 'models/api'
import { DEVICES } from 'utils/common' 
import { _API_BASE_URL } from 'utils/api'
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