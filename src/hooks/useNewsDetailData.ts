import { useQuery } from '@tanstack/react-query'
import { getNewsDetail } from 'utils/apis/newsApi/newsApi'
import { QUERY_KEYS } from 'utils/keys'

export const useNewsDetailData = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.NEWS_DETAIL, id],
    queryFn: () => getNewsDetail({ news_id: id }),
    enabled: !!id,
  })
}
