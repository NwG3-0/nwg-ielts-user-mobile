import React, { useCallback, useRef, useState } from 'react'
import { InView, IOScrollView } from 'react-native-intersection-observer'

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useGetLearningVideoDetail } from 'hooks/useGetLearningVideoDetail'
import { useGetLearningVideoSubtitle } from 'hooks/useGetVideoSubtitle'
import { RootStackParamList } from 'models/common'
import { Text, SafeAreaView, View, ScrollView, Pressable } from 'react-native'
import YoutubePlayer from 'react-native-youtube-iframe'
import { useVideoDetailController } from './controller/useVideoDetailController'

type VideoDetailProps = NativeStackScreenProps<RootStackParamList, 'VideoDetail'>

function VideoDetail({ ...props }: VideoDetailProps) {
  const { video, videoVietSub } = useVideoDetailController(props.route.params?.videoId)

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
  const onChangeVideoDetail = (e: string) => {
    if (e == 'playing') {
      const playInterval = setInterval(async () => {
        const elapsed_sec = await playerRef.current.getCurrentTime()

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setCurrentTime(elapsed_sec || 0)
      }, 1000)

      return () => {
        clearInterval(playInterval)
      }
    }
  }

  const onChangeView = useCallback(
    (inViewCheck: boolean) => {
      console.log('Inview:', inViewCheck)
    },
    [currentTime],
  )

  return (
    <View>
      <SafeAreaView />
      <Pressable
        onPress={() => {
          props.navigation.goBack()
        }}
      >
        <Text>Back</Text>
      </Pressable>
      {video && videoVietSub && (
        <React.Fragment>
          <YoutubePlayer
            height={235}
            play={playing}
            videoId={video.data?.Link}
            onChangeState={(e) => onChangeVideoDetail(e)}
            ref={playerRef}
          />
          <IOScrollView style={{ height: 300 }}>
            {videoVietSub.data.map((item: any, index: number) => {
              if (
                index < videoVietSub.data.length - 1 &&
                item.start < currentTime &&
                videoVietSub.data[index + 1].start > currentTime
              ) {
                return (
                  <View ref={subRef}>
                    <InView
                      onChange={onChangeView}
                      style={{ alignItems: 'center', backgroundColor: 'red', paddingVertical: 8 }}
                    >
                      <Text>{item.text}</Text>
                    </InView>
                  </View>
                )
              } else {
                return (
                  <View style={{ alignItems: 'center', backgroundColor: 'yellow', paddingVertical: 8 }}>
                    <Text>{item.text}</Text>
                  </View>
                )
              }
            })}
          </IOScrollView>
        </React.Fragment>
      )}
    </View>
  )
}

export default VideoDetail
