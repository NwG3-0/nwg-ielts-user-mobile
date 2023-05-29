import { useQuery } from '@tanstack/react-query'
import { getLearningVideoDetail } from 'utils/apis/videosApi/videosApi'
import { QUERY_KEYS } from 'utils/keys'

interface Parameters {
  learningVideoId:string
}

export const useGetLearningVideoDetail = ({ learningVideoId }: Parameters) => {
  return useQuery({
    queryKey: [QUERY_KEYS.VIDEO_DETAIL, learningVideoId],
    queryFn: () => getLearningVideoDetail({learningVideoId }),
    enabled:!!learningVideoId
  })
}
