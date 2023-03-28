import { Header } from 'common/Header'
import React, { useState } from 'react'
import {  RootStackParamList } from 'models/common'
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getNewsDetail } from 'utils/api'
import { QUERY_KEYS } from 'utils/keys'
import IconIon from 'react-native-vector-icons/Ionicons'
import { HEIGHT, WIDTH } from 'utils/common'
import { images } from '../../images'
import CommonModal from 'common/Modal/Modal'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

type NewsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'NewDetails'
>;
export const NewDetails = ({ route, navigation }: NewsScreenProps) => {
  const { newsId } = route.params
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [pickedWord, setPickedWord] = useState<string>('')

  const { data: news_detail, isLoading } = useQuery(
    [QUERY_KEYS.NEWS_DETAIL, newsId],
    async () => {
      try {
        const { data } = await getNewsDetail({ news_id: newsId })
        return {
          Image: data.Image,
          Title: data.Title,
          Content: data.Content.split(' '),
        }
      } catch (error) {
        console.log(error)
      }
    },
    {
      enabled: !!newsId,
      refetchOnWindowFocus: false,
    },
  )

  // const updateView =async ()=>{
  //   await 
  // }
  return (
    <SafeAreaView>
      <Header />
      {isLoading && <Text>Loading ...</Text>}

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
            <Image source={{ uri: news_detail.Image }} style={{ width: '100%', height: 300 }} />
            <Text style={{ marginVertical: 20, fontSize: 24, fontWeight: '600', textAlign: 'center' }}>
              {news_detail.Title}
            </Text>
            <Text style={{ fontSize: 20 }}>
              {news_detail.Content.map((item: any, id: any) => {
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
      <View style={{ backgroundColor: 'rgba:0,0,0,0.8', height: '100%' }}>
        <CommonModal open={modalVisible} setOpen={setModalVisible} word={pickedWord} />
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 30,
  },
})
