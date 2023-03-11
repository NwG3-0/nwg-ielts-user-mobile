import React, { useEffect, useRef, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { WIDTH } from 'utils/common'

export const Slide = ({ image }: any) => {
  const [imageActive, setImageActive] = useState(0)
  const ref = useRef() as React.MutableRefObject<ScrollView>

  const onChange = (nativeEvent: any) => {
    if (nativeEvent) {
      const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)

      if (slide != imageActive) {
        setImageActive(slide)
      }
    }
  }

  useEffect(() => {
    const slideAutoPlay = setInterval(() => {
      if (imageActive < image.length - 1) {
        ref.current.scrollTo({ x: WIDTH * 0.9 * (imageActive + 1) })
        setImageActive(imageActive + 1)
      } else {
        ref.current.scrollTo({ x: WIDTH * 0.9 * -(imageActive + 1) })
        setImageActive(0)
      }
    }, 2000)

    return () => clearInterval(slideAutoPlay)
  }, [imageActive])

  return (
    <View style={styles.wrap}>
      <ScrollView
        ref={ref}
        onScroll={({ nativeEvent }) => onChange(nativeEvent)}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={5}
        pagingEnabled
        horizontal
        style={styles.wrap}
      >
        {image.map((e: any) => (
          <Image key={e.id} alt={e.name} resizeMode="cover" source={{ uri: e.url }} style={styles.wrap} />
        ))}
      </ScrollView>
      <View style={styles.wrapDot}>
        {image.map((e: any, index: number) => (
          <Text key={e.id} style={imageActive === index ? styles.dotActive : styles.dot}>
            ●
          </Text>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrap: {
    width: WIDTH * 0.9,
    height: 200,
    borderRadius: 20,
  },
  wrapDot: {
    position: 'absolute',
    bottom: 5,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dotActive: {
    margin: 3,
    color: '#FFFFFF',
  },
  dot: {
    margin: 3,
    color: '#808080',
  },
})
