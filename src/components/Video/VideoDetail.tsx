import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useGetLearningVideoDetail } from 'hooks/useGetLearningVideoDetail'
import { useGetLearningVideoSubtitle } from 'hooks/useGetVideoSubtitle'
import { RootStackParamList } from 'models/common'
import React, { useCallback, useState } from 'react'
import { Text, SafeAreaView } from 'react-native'
import  YoutubePlayer  from 'react-native-youtube-iframe'
type VideoDetailProps = NativeStackScreenProps<RootStackParamList, 'VideoDetail'>
function VideoDetail({ ...props }: VideoDetailProps) {
  const { data: videoId } = useGetLearningVideoDetail({ learningVideoId: props.route.params?.videoId })
  const { data: videoSub } = useGetLearningVideoSubtitle({ learningVideoId: props.route.params?.videoId })
  const [playing, setPlaying] = useState(false)
  console.log(videoSub)
  // console.log(props.route.params.videoId)
  const onStateChange = useCallback((state: string) => {
    if (state === 'ended') {
      setPlaying(false)
      console.log('video has finished playing!')
    }
  }, [])
  return (
    <>
      <SafeAreaView />
      <Text>VideoDetail</Text>
      <YoutubePlayer
        height={300}
        play={playing}
        videoId={videoId?.data.Link}
        onChangeState={onStateChange}
      />
    </>
  )
}

export default VideoDetail
