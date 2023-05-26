import { Header } from 'common/Header'
import React, { useEffect, useState } from 'react'
import { RootStackParamList } from 'models/common'
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { SafeAreaView } from 'react-native-safe-area-context'
import { addNewViews, checkNewViews, updateNewViews } from 'utils/apis/newsApi/viewApi'
import { getNewsDetail } from 'utils/apis/newsApi/newsApi'
import { QUERY_KEYS } from 'utils/keys'
import IconIon from 'react-native-vector-icons/Ionicons'
import { HEIGHT, WIDTH } from 'utils/common'
import { images } from '../../images'
import CommonModal from 'common/Modal/Modal'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useDataLoginInfoStore } from 'zustand/index '
import { useNewsDetailData } from 'hooks/useNewsDetailData'
import { globalStore } from 'hocs/globalStore'
import { useCheckNewsDetail } from 'hooks/useCheckNewsViews'

type NewsScreenProps = NativeStackScreenProps<RootStackParamList, 'NewDetails'>
export const NewDetails = ({ route, navigation }: NewsScreenProps) => {
  const { newsId } = route.params
  const { user } = globalStore((state: any) => state.userStore)
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [pickedWord, setPickedWord] = useState<string>('')

  const { data: news_detail, isLoading: isNewsDetailLoading } = useNewsDetailData(newsId)

  const { data: check_views } = useCheckNewsDetail({ newsId:newsId, userId: user.id })

  const addViewNews = async () => {
    try {
      await addNewViews({ newsId: newsId, userId: user.id })
      await updateNewViews({ newsId: newsId, userId: user.id })
    } catch (error) {
      console.log('Something went wrong')
    }
  }

  useEffect(() => {
    if (typeof check_views !== 'undefined' && !check_views.success) {
      addViewNews()
    }
  }, [check_views])

  return (
    <SafeAreaView>
      <Header />
      {isNewsDetailLoading && <Text>Loading ...</Text>}

      {news_detail && (
        <View style={{ paddingHorizontal: 16, paddingTop: 20 }}>
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

          <ScrollView style={{ paddingHorizontal: 7, marginTop: 18, height: HEIGHT - 130 }}>
            <Image source={{ uri: news_detail.data.Image }} style={{ width: '100%', height: 300 }} />
            <Text style={{ marginVertical: 20, fontSize: 24, fontWeight: '600', textAlign: 'center' }}>
              {news_detail.data.Title}
            </Text>

            <Text style={{ fontSize: 20 }}>
              {news_detail.data.Content.split(' ').map((item: any, id: any) => {
                return (
                  <Pressable
                    onPress={() => {
                      setPickedWord(item)
                      setModalVisible(!modalVisible)
                    }}
                    key={id}
                  >
                    <Text>{item} </Text>
                  </Pressable>
                )
              })}
            </Text>
          </ScrollView>
        </View>
      )}

      <CommonModal open={modalVisible} setOpen={setModalVisible} word={pickedWord} />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 30,
  },
})
