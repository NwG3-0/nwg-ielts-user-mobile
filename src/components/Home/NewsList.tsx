import { useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from 'utils/keys'
import { getNewsList } from 'utils/api'
import { WIDTH } from 'utils/common'

export const NewsList = ({ onSwitchNewsDetailScreen }: { onSwitchNewsDetailScreen: any }) => {
  const [limit] = useState<number>(5)
  const [page] = useState<number>(1)
  const [keyword, setKeyword] = useState<string>('')

  const { data: news, isLoading: isNewsLoading } = useQuery(
    [QUERY_KEYS.NEWS_LIST, limit, page, keyword],
    async () => {
      try {
        const { data, success } = await getNewsList({ limit, page, keyword })
        console.log(data)
        return data
      } catch (error) {
        console.log(error)
      }
    },
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    },
  )

  return (
    <View
      style={{
        width: WIDTH,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ width: WIDTH - 40, paddingTop: 10, fontSize: 18, fontWeight: '600' }}>News</Text>
      {news &&
        news.map((cont: any) => {
          return (
            <TouchableOpacity
              key={cont.id}
              style={{
                width: WIDTH - 40,
                padding: 15,
                marginTop: 20,
                borderRadius: 2,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.2,
                shadowRadius: 1.41,
                elevation: 2,
              }}
              onPress={() => onSwitchNewsDetailScreen(cont.id)}
            >
              <Image source={{ uri: cont.image }} style={{ width: '100%', height: 200 }} />
              <View style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 18, fontWeight: '600' }}>{cont.title}</Text>
                <Text numberOfLines={4}>{cont.content}</Text>
              </View>
            </TouchableOpacity>
          )
        })}
      <View></View>
    </View>
  )
}
