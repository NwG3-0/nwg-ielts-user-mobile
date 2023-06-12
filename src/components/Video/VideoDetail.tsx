import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useGetLearningVideoDetail } from 'hooks/useGetLearningVideoDetail'
import { useGetLearningVideoSubtitle } from 'hooks/useGetVideoSubtitle'
import { RootStackParamList } from 'models/common'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import InViewPort  from 'react-native-inviewport'
import { Text, SafeAreaView, View, ScrollView } from 'react-native'
import YoutubePlayer from 'react-native-youtube-iframe'
type VideoDetailProps = NativeStackScreenProps<RootStackParamList, 'VideoDetail'>
function VideoDetail({ ...props }: VideoDetailProps) {
  const { data: videoId } = useGetLearningVideoDetail({ learningVideoId: props.route.params?.videoId })
  const { data: videoSub } = useGetLearningVideoSubtitle({ learningVideoId: props.route.params?.videoId })
  const [startTime, setStartTime] = useState<number>(0)
  const opts = useMemo(() => {
    return {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 1,
        start: startTime, // set the start time in seconds
      },
    }
  }, [startTime])
  const playerRef = useRef<any>(null)
  const subRef = useRef<any>(null)
  const [playing, setPlaying] = useState(false)
  const [inView, setInView] = useState<boolean>(false)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [wordTranslate, setWordTranslate] = useState({
    text: '',
    translate: '',
  })

  // console.log(props.route.params.videoId)
  const onChangeVideoDetail = (e) => {
    if (e == 'playing') {
     setInterval(async () => {
        const elapsed_sec = await playerRef.current.getCurrentTime()
       
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setCurrentTime(elapsed_sec || 0)
      }, 1000)
    }
  }

  return (
    <View >
      <SafeAreaView />

      <YoutubePlayer
        height={235}
        play={playing}
        videoId={videoId?.data.Link}
        onChangeState={(e) => onChangeVideoDetail(e)}
        ref={playerRef}
      />
      <ScrollView style={{marginBottom:300}}>
    
        {videoSub?.data.map((item, index) => {
         
          if (index < videoSub.data.length - 1 && item.start < currentTime && videoSub.data[index + 1].start > currentTime) {
           
            return (
              <View style={{alignItems:'center',backgroundColor:'red',paddingVertical:8}} ref={subRef}>
                <Text>{item.text}</Text>
              </View>
            )
          }

          else{
            return (
              <View style={{alignItems:'center',backgroundColor:'yellow',paddingVertical:8}}>
                <Text>{item.text}</Text>
              </View>
            )
          }
        })}
    
      </ScrollView>
    </View>
  )
}

export default VideoDetail
