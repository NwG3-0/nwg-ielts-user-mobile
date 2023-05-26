import { useQuery } from '@tanstack/react-query'
import { checkSavedWord, getWord } from 'utils/apis/cardApi/wordApi'
import { QUERY_KEYS } from 'utils/keys'

interface Parameters {
  limit: number
  page: number
  keyword: string
  startDate: number
  endDate: number
  topicName: string
  userId: string
}

export const useGetWord = ({ limit, page, keyword, startDate, endDate, topicName, userId }: Parameters) => {
  return useQuery({
    queryKey: [QUERY_KEYS.COLLECTION_WORDS, limit, page, keyword, startDate, endDate, topicName, userId],
    queryFn: () => getWord({ limit, page, keyword, startDate, endDate, topicName, userId }),
    enabled: !!userId,
  })
}
