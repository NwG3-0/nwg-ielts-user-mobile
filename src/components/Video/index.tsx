import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useGetLearningVideo } from 'hooks/useGetLearningVideo'
import { RootStackParamList } from 'models/common'
import React, { useState } from 'react'
import { Text } from 'react-native'
type NewsProps = NativeStackScreenProps<RootStackParamList, 'Videos'>
function LearningVideos({...props}) {
    const [limit,setLimit] = useState<number>(10)
    const [page,setPage] = useState<number>(1)
    const [keyword,setKeyword]=useState<string>('')
    const { data: videos } = useGetLearningVideo({
        limit: limit,
        page: page,
        keyword: keyword,
      })
      console.log(videos)
  return <Text>LearningVideos</Text>
}

export default LearningVideos
