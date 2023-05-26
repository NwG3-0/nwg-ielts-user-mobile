import { useQuery } from '@tanstack/react-query'
import { checkSavedWord } from 'utils/apis/cardApi/wordApi'
import { QUERY_KEYS } from 'utils/keys'

interface Parameters {
  word: string
  userId: string
}

export const useCheckSaveWord = ({ word, userId }: Parameters) => {

  return useQuery({
    queryKey: [QUERY_KEYS.WORD, word, userId],
    queryFn: () => checkSavedWord({ word, userId }),
    enabled: !!word && !!userId,
  })
}
