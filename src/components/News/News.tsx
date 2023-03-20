import { useState, useEffect } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from 'utils/keys'
import { getNewsList } from 'utils/api'
import { WIDTH } from 'utils/common'
import moment from 'moment'
import DateRangePicker from 'react-native-daterange-picker'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Header } from 'common/Header'
export const News = () => {
  const [limit] = useState<number>(5)
  const [page] = useState<number>(1)
  const [keyword, setKeyword] = useState<string>('')
  const [type, setType] = useState<string>('')
  const [date, setDate] = useState()

  const [openCalendar, setOpenCalendar] = useState<boolean>(false)
  // const { data: news, isLoading: isNewsLoading } = useQuery(
  //   [QUERY_KEYS.NEWS_LIST, limit, page, keyword, type, startDate, endDate],
  //   async () => {
  //     try {
  //       const { data, success } = await getNewsList({ limit, page, keyword, type, startDate, endDate })
  //       console.log(data)
  //       return data
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   },
  //   {
  //     refetchInterval: false,
  //     refetchOnWindowFocus: false,
  //   },
  // )
  // const handlePickDate = (day: any) => {
  //   if (startDate == '') {
  //     setStartDate(day.dateString)
  //   } else if (startDate !== '') {
  //     setEndDate(day.dateString)
  //   }
  // }

  return (
    <SafeAreaView>
      <Header />
      <View
        style={{
          width: WIDTH,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
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
            onFocus={() => setOpenCalendar(true)}
          />
        </View>
        {/* {news &&
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
        })} */}
        <View></View>
      </View>
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
