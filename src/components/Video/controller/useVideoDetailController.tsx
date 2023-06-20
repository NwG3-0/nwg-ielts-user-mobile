import { useGetLearningVideoDetail } from 'hooks/useGetLearningVideoDetail'
import { useGetLearningVideoSubtitle } from 'hooks/useGetVideoSubtitle'

const ctx = {}

export function useVideoDetailController(video_id: string) {
  const video = useGetLearningVideoDetail({ learningVideoId: video_id })
  const videoVietSub = useGetLearningVideoSubtitle({ learningVideoId: video_id })

  return {
    video,
    videoVietSub,
  }
}
