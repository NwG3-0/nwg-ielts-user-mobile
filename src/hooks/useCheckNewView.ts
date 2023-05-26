import { useQuery } from '@tanstack/react-query'
import { checkNewViews } from 'utils/apis/newsApi/viewApi'
import { QUERY_KEYS } from 'utils/keys'

interface Parameters {
  newsId: string
  userId: string
}

export const useCheckNewsDetail = ({ newsId, userId }: Parameters) => {
  return useQuery({
    queryKey: [QUERY_KEYS.CHECK_VIEWS, newsId, userId],
    queryFn: () => checkNewViews({ newsId, userId }),
    enabled: !!newsId && !!userId,
  })
}
