import { DEVICES } from 'utils/common'
import { _API_BASE_URL } from 'utils/api'
import axiosInstance from 'utils/axios'

export const getLearningVideo = async (input: { limit: number; page: number,keyword:string }) => {
  const limit = input.limit ?? 10
  const page = input.page ?? 1
const keyword = input.keyword??''
  const { data } = await axiosInstance.get(`${_API_BASE_URL}/api/learning-video?limit=${limit}&page=${page}`)

  return data
}

export const getLearningVideoDetail = async (input: { learningVideoId: string }) => {
  const { learningVideoId } = input

  if (!learningVideoId || learningVideoId === '') {
    return { success: false, data: null, message: 'Invalid Id' }
  }
  const { data } = await axiosInstance.get(
    `${_API_BASE_URL}/api/learning-video-detail?learningVideoId=${learningVideoId}`,
  )

  return data
}

export const getVideoSubtitle = async (input: { learningVideoId: string }) => {
  const { learningVideoId } = input
  if (!learningVideoId || learningVideoId === '') {
    return { success: false, data: null, message: 'Invalid Id' }
  }
  const { data } = await axiosInstance.get(`${_API_BASE_URL}/api/subtitle?learningVideoId=${learningVideoId}`)

  return data
}
