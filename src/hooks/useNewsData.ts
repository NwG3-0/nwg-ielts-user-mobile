import { useQuery } from '@tanstack/react-query'
import { getNewsTypeList } from 'utils/apis/newsApi/newsApi'
import { QUERY_KEYS } from 'utils/keys'

interface Parameters {
  limit: number
  page: number
  keyword: string
  type: string
}

export const useNewsData = ({ limit, page, keyword, type,  }: Parameters) => {
  return useQuery({
    queryKey: [QUERY_KEYS.NEWS_LIST, limit, page, keyword, type ],
    queryFn: () => getNewsTypeList({ limit, page, keyword, type}),
    staleTime: 2 * 60 * 1000,
  })
}
