import { TouchableOpacity, Image, View, Text } from 'react-native'
import { WIDTH } from 'utils/common'

interface Props {
  news: any
  navigation: any
}

export const NewsItem = ({ news, navigation }: Props) => {
  const onSwitchNewsDetailScreen = (id: string) => {
    navigation.navigate('NewDetails', { newsId: id })
  }

  return (
    <TouchableOpacity
      key={news.id}
      style={{
        width: WIDTH - 40,
        paddingVertical: 15,
        marginTop: 20,
        borderRadius: 2,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowRadius: 1.41,
        elevation: 2,
      }}
      onPress={() => onSwitchNewsDetailScreen(news.id)}
    >
      <Image source={{ uri: news.image }} style={{ width: '100%', height: 200 }} />
      <View style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
        <Text style={{ fontSize: 18, fontWeight: '600' }}>{news.title}</Text>
        <Text numberOfLines={4}>{news.content}</Text>
      </View>
    </TouchableOpacity>
  )
}
