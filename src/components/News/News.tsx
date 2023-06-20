import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { useState } from 'react'
import { Text, View, ScrollView, StyleSheet } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { SafeAreaView } from 'react-native-safe-area-context'
import { enGB, registerTranslation } from 'react-native-paper-dates'

import { Header } from 'common/Header'
import { RootStackParamList } from 'models/common'
import { WIDTH } from 'utils/common'

import { useNewsData } from 'hooks/useNewsData'

import { SelectNewsTypes } from './SelectNewsTypes'
import { NewsItem } from './NewsItem'
import { useNewsStore } from './store'

dayjs.extend(utc)
registerTranslation('en', enGB)

type NewsProps = NativeStackScreenProps<RootStackParamList, 'News'>

export const News = ({ navigation }: NewsProps) => {
  const { types } = useNewsStore((state: any) => state.typeNewsStore)

  const [limit] = useState<number>(10)
  const [page] = useState<number>(1)
  const [keyword] = useState<string>('')


  const { data: news_list } = useNewsData({
    limit,
    page,
    keyword,
    type: types,
  })
  console.log(news_list)
  return (
    <SafeAreaView>
      <Header />
      <ScrollView>
        <View style={newsStyle.content}>
          <Text style={newsStyle.title}>News</Text>
          <SelectNewsTypes />
          <View>
            {news_list &&
              news_list.data.map((news: any) => {
                return <NewsItem news={news} navigation={navigation} />
              })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const newsStyle = StyleSheet.create({
  content: {
    width: WIDTH,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    width: WIDTH - 40,
    paddingTop: 10,
    marginTop: 20,
    fontSize: 18,
    fontWeight: '600',
  },
})
