import { useState, useEffect, useCallback, useRef } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from 'utils/keys'
import { getNewsList } from 'utils/apis/newsApi/newsApi'
import { NEWS_LIST, WIDTH } from 'utils/common'
import { DatePickerModal } from 'react-native-paper-dates'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Header } from 'common/Header'
import { enGB, registerTranslation } from 'react-native-paper-dates'
import dayjs from 'dayjs'
import DropDownPicker from 'react-native-dropdown-picker'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from 'models/common'

type NewsProps = NativeStackScreenProps<RootStackParamList, 'News'>
export const News = ({ navigation }: NewsProps) => {
  const [limit] = useState<number>(10)
  const [page] = useState<number>(1)
  const [keyword, setKeyword] = useState<string>('')
  const [range, setRange] = useState<any>({ startDate: undefined, endDate: undefined })
  const [open, setOpen] = useState(false)
  const [dropOpen, setDropOpen] = useState(false)
  const [value, setValue] = useState([])
  const [items, setItems] = useState(NEWS_LIST)
  var customParseFormat = require('dayjs/plugin/customParseFormat')
  const topic = ['hihi', 'hehe', 'haha', 'huhu']
  registerTranslation('en', enGB)
  const onDismiss = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  const onConfirm = useCallback(
    ({ startDate, endDate }: any) => {
      setOpen(false)
      // let startDate = dayjs(start).format('DD/MM/YYYY')
      // let endDate = dayjs(end).format('DD/MM/YYYY')
      setRange({ startDate, endDate })
    },
    [setOpen, setRange],
  )
  dayjs.extend(customParseFormat)
  const { data: news, isLoading: isNewsLoading } = useQuery(
    [
      QUERY_KEYS.NEWS_LIST,
      limit,
      page,
      keyword,
      value.toString(),
      dayjs(range.startDate).unix(),
      dayjs(range.endDate).unix(),
    ],
    async () => {
      try {
        const { data, success } = await getNewsList({
          limit,
          page,
          keyword,
          type: value.toString(),
          startDate: dayjs(range.startDate).unix(),
          endDate: dayjs(range.endDate).unix(),
        })

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
  const onSwitchNewsDetailScreen = (id: string) => {
    navigation.navigate('NewDetails', { newsId: id })
  }

  return (
    <SafeAreaView>
      <Header />
      <ScrollView>
        <View
          style={{
            width: WIDTH,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <DatePickerModal
            locale="en"
            mode="range"
            visible={open}
            onDismiss={onDismiss}
            startDate={range.startDate}
            endDate={range.endDate}
            onConfirm={onConfirm}
          />
          <Text
            style={{
              width: WIDTH - 40,
              paddingTop: 10,
              marginTop: 20,
              fontSize: 18,
              fontWeight: '600',
            }}
          >
            News
          </Text>
          <View style={styles.input}>
            <TextInput
              placeholder="Pick a range date"
              // value={startDate + '-' + endDate}
              onFocus={() => setOpen(true)}
            />
          </View>
          <View
            style={{
              backgroundColor: 'transparent',
              zIndex: 999,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 20,
              marginTop: 20,
            }}
          >
            <DropDownPicker
              open={dropOpen}
              value={value}
              items={items}
              dropDownContainerStyle={{
                backgroundColor: 'white',
              }}
              style={{
                backgroundColor: 'transparent',
              }}
              listMode="MODAL"
              setOpen={setDropOpen}
              setValue={setValue}
              setItems={setItems}
              multiple={true}
              mode="BADGE"
              badgeDotColors={['#e76f51', '#00b4d8', '#e9c46a', '#e76f51', '#8ac926', '#00b4d8', '#e9c46a']}
            />
          </View>
          <View>
            {news &&
              news.map((cont: any) => {
                return (
                  <TouchableOpacity
                    key={cont.id}
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
                    onPress={() => onSwitchNewsDetailScreen(cont.id)}
                  >
                    <Image source={{ uri: cont.image }} style={{ width: '100%', height: 200 }} />
                    <View style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                      <Text style={{ fontSize: 18, fontWeight: '600' }}>{cont.title}</Text>
                      <Text numberOfLines={4}>{cont.content}</Text>
                    </View>
                  </TouchableOpacity>
                )
              })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderColor: '#6B6B6B',
    borderRadius: 8,
    borderWidth: 1,
    width: WIDTH - 40,
    marginTop: 15,
  },
})
