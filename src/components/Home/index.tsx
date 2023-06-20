import { Header } from 'common/Header'
import { Slide } from 'common/Slide'
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/FontAwesome'
import IconIon from 'react-native-vector-icons/Ionicons'
import { useDataLoginInfoStore } from 'zustand/index '
import { CountDown } from './CountDown'
import { ListResource, LIST_RESOURCE, WIDTH, HEIGHT } from 'utils/common'
import { HomeStyles } from 'style/home'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from 'models/common'
type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;
const IMAGE = [
  {
    id: 1,
    name: 'Image 1',
    url: 'https://res.edu.vn/wp-content/uploads/2021/02/ielts-la-gi.jpg',
  },
  {
    id: 2,
    name: 'Image 2',
    url: 'https://cdnmedia.baotintuc.vn/Upload/gYJXHsn6VBCJnSv7rj8xYQ/files/2022/11/ielts.jpg',
  },
  {
    id: 3,
    name: 'Image 3',
    url: 'https://vcdn1-vnexpress.vnecdn.net/2022/11/12/du-hoc1-6028-1668240303.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=AsZPgZGGXTU3joox4MzmPw',
  },
]

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [setUserInfo] = useDataLoginInfoStore((state: any) => [state.setUserInfo])

  return (
    <SafeAreaView>
      <Header />
      <View style={HomeStyles.flashSaleBanner}>
        <View style={HomeStyles.flashSaleContent}>
          <View>
            <Text style={HomeStyles.textFlash}>Flash</Text>
            <Text style={HomeStyles.textSale}>Sale</Text>
          </View>
          <View style={HomeStyles.icon}>
            <Icon name="flash" size={40} color="#FFFFFF" />
          </View>
        </View>
        <View>
          <CountDown />
        </View>
      </View>
      <ScrollView style={{ width: WIDTH, height: HEIGHT * 0.73 }}>
        <View style={HomeStyles.dictionary}>
          <Text style={HomeStyles.dictionaryTitle}>Dictionary</Text>
          <View style={HomeStyles.searchDictionary}>
            <Icon name="search" size={22} style={HomeStyles.searchDictionaryIcon} color="#fc6262" />
            <TextInput placeholder="Search" placeholderTextColor={'#808080'} style={HomeStyles.searchDictionaryInput} />
          </View>
        </View>
        <View style={HomeStyles.backgroundEmpty}></View>
        <View style={HomeStyles.resource}>
          <Text style={HomeStyles.textResource}>Resources</Text>
          <Slide image={IMAGE} />
        </View>
        <View style={{ width: WIDTH, flexWrap: 'wrap', display: 'flex', flexDirection: 'row', paddingHorizontal: 20 }}>
          {LIST_RESOURCE.map((item: ListResource) => (
            <Pressable onPress={() => navigation.navigate(item.title)} key={item.id}>
              <View
                style={{
                  width: (WIDTH - 40) / 5,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 20,
                }}
              >
                <View style={{ padding: 8, borderRadius: 6, backgroundColor: item.color }}>
                  <IconIon name={item.icon} color="#FFFFFF" size={26} />
                </View>
                <Text style={{ marginTop: 6, fontSize: 13 }}>{item.title}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
