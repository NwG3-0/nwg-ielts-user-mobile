import { Header } from 'common/Header'
import { NewsScreenProps } from 'models/common'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getNewsDetail } from 'utils/api'
import { QUERY_KEYS } from 'utils/keys'
import IconIon from 'react-native-vector-icons/Ionicons'
import { HEIGHT, WIDTH } from 'utils/common'

export const NewsScreen = ({ route, navigation }: NewsScreenProps) => {
  const { newsId } = route.params

  const { data: news_detail, isLoading } = useQuery(
    [QUERY_KEYS.NEWS_DETAIL, newsId],
    async () => {
      try {
        const { data } = await getNewsDetail({ news_id: newsId })

        return data
      } catch (error) {
        console.log(error)
      }
    },
    {
      enabled: !!newsId,
      refetchOnWindowFocus: false,
    },
  )

  return (
    <SafeAreaView>
      <Header />
      {isLoading && <Text>Loading ...</Text>}
      {news_detail && (
        <View style={{ width: WIDTH, paddingTop: 20 }}>
          <TouchableOpacity
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => {
              navigation.goBack()
            }}
          >
            <IconIon name="arrow-back" size={24} color="#000" />
            <Text style={{ fontSize: 18, marginLeft: 5 }}>Back to Home</Text>
          </TouchableOpacity>
          <ScrollView style={{ width: WIDTH, marginTop: 10, height: HEIGHT - 130 }}>
            <Image source={{ uri: news_detail.Image }} style={{ width: '100%', height: 300 }} />
            <Text style={{ fontSize: 24, fontWeight: '600', textAlign: 'center' }}>{news_detail.Title}</Text>
            <Text style={{ fontSize: 20, paddingHorizontal: 10 }}>{news_detail.Content}</Text>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  )
}
