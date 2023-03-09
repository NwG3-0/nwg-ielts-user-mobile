import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

dayjs.extend(utc)

const EXPIRE_DAY = 1678460928

export const CountDown = () => {
  const [flashSaleTime, setFlashSaleTime] = useState({
    h: 0,
    m: 0,
    s: 0,
  })

  useEffect(() => {
    const internal = setInterval(() => {
      const totalSeconds = EXPIRE_DAY - dayjs.utc().unix()

      const totalMinutes = Math.floor(totalSeconds / 60)

      const seconds = totalSeconds % 60
      const hours = Math.floor(totalMinutes / 60)
      const minutes = totalMinutes % 60

      setFlashSaleTime({
        h: hours,
        m: minutes,
        s: seconds,
      })
    }, 1000)

    return () => clearInterval(internal)
  }, [])

  const timeBox = (time: number, type: string) => {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View style={styleCountDown.timeBoxStyle}>
          <View style={{ backgroundColor: 'orange', width: 40, height: 20 }}></View>
          <View style={{ backgroundColor: 'yellow', width: 40, height: 20 }}></View>
          <View style={styleCountDown.textBoxStyle}>
            <Text>{time}</Text>
          </View>
        </View>
        <Text style={{ fontSize: 14 }}>{type}</Text>
      </View>
    )
  }

  return (
    <View style={styleCountDown.countdown}>
      {timeBox(flashSaleTime.h, 'hours')}
      <Text style={styleCountDown.spaceStyle}>:</Text>
      {timeBox(flashSaleTime.m, 'minutes')}
      <Text style={styleCountDown.spaceStyle}>:</Text>
      {timeBox(flashSaleTime.s, 'seconds')}
    </View>
  )
}

const styleCountDown = StyleSheet.create({
  countdown: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeBoxStyle: {
    position: 'relative',
    width: 40,
    height: 40,
    borderRadius: 10,
    borderColor: '#FFFFFF',
  },
  textBoxStyle: {
    position: 'absolute',
    width: 40,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 22,
  },
  spaceStyle: {
    paddingHorizontal: 9,
    marginBottom: 15,
    fontSize: 20,
    fontWeight: '700',
  },
})
