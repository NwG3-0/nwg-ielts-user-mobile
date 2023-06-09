import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Header } from 'common/Header'
import { useGetLearningVideo } from 'hooks/useGetLearningVideo'
import { RootStackParamList } from 'models/common'
import React, { useState } from 'react'
import { FlatList, SafeAreaView, Text } from 'react-native'
import VideoList from './VideoList'
type VideoProps = NativeStackScreenProps<RootStackParamList, 'Videos'>
function LearningVideos({ ...props }: VideoProps) {
  const [limit, setLimit] = useState<number>(10)
  const [page, setPage] = useState<number>(1)
  const [keyword, setKeyword] = useState<string>('')
  const { data: videos } = useGetLearningVideo({
    limit: limit,
    page: page,
    keyword: keyword,
  })

  return (
    <SafeAreaView>
      <Header />
      <FlatList renderItem={({item})=><VideoList data={item} {...props} />} data={videos?.data} horizontal={true}/>
    </SafeAreaView>
  )
}

export default LearningVideos
