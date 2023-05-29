import { useQuery } from '@tanstack/react-query'
import {  getVideoSubtitle } from 'utils/apis/videosApi/videosApi'
import { QUERY_KEYS } from 'utils/keys'

interface Parameters {
  learningVideoId:string
}

export const useGetLearningVideoSubtitle = ({ learningVideoId }: Parameters) => {
  return useQuery({
    queryKey: [QUERY_KEYS.VIDEO_SUBTITLE, learningVideoId],
    queryFn: () => getVideoSubtitle({learningVideoId }),
    enabled:!!learningVideoId
  })
}
