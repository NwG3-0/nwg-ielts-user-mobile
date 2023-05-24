import { useQuery } from '@tanstack/react-query'
import { getNewsTypeList } from 'utils/apis/newsApi/newsApi'
import { QUERY_KEYS } from 'utils/keys'

interface Parameters {
  limit: number
  page: number
  keyword: string
  type: string
  startDate: number
  endDate: number
}

export const useNewsData = ({ limit, page, keyword, type, startDate, endDate }: Parameters) => {
  return useQuery({
    queryKey: [QUERY_KEYS.NEWS_LIST, limit, page, keyword, type, startDate, endDate],
    queryFn: () => getNewsTypeList({ limit, page, keyword, type, startDate, endDate }),
    staleTime: 2 * 60 * 1000,
  })
}
