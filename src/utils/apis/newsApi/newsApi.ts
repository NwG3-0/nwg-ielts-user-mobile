import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { DEVICES } from 'utils/common'
import { _API_BASE_URL } from 'utils/api'
import axiosInstance from 'utils/axios'

dayjs.extend(utc)

export const getNewsTypeList = async (input: {
  limit: number
  page: number
  keyword: string
  type: string

}) => {
  const limit = input.limit ?? 10
  const page = input.page ?? 1
  const keyword = input.keyword ?? ''
  const type = input.type

  const { data } = await axiosInstance.get(
    `/api/news-type?limit=${limit}&page=${page}&keyword=${keyword}&device=${DEVICES.MOBILE}&type=${type}`,
  )

  return data
}

export const getNewsDetail = async (input: { news_id: string }) => {
  try {
    const { news_id } = input

    if (!news_id || news_id === '') {
      return { success: false, data: null, message: 'Invalid News Id' }
    }

    const { data } = await axiosInstance.get(`${_API_BASE_URL}/api/news/detail?news_id=${news_id}`)

    return data
  } catch (error) {
    console.log(error)
  }
}
