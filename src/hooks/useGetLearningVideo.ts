import { useQuery } from '@tanstack/react-query'
import { getLearningVideo } from 'utils/apis/videosApi/videosApi'
import { QUERY_KEYS } from 'utils/keys'

interface Parameters {
  limit: number
  page: number
  keyword:string
}

export const useGetLearningVideo = ({ limit, page,keyword }: Parameters) => {
  return useQuery({
    queryKey: [QUERY_KEYS.VIDEO, limit, page,keyword],
    queryFn: () => getLearningVideo({ limit, page,keyword }),
  })
}
