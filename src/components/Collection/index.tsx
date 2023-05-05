import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useQuery } from '@tanstack/react-query'
import DropdownPicker from 'common/DropdownPicker/DropdownPicker'
import dayjs from 'dayjs'
import { RootStackParamList } from 'models/common'
import React, { useCallback, useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { DatePickerModal, enGB, registerTranslation } from 'react-native-paper-dates'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getWord } from 'utils/apis/cardApi/wordApi'
import { WIDTH } from 'utils/common'
import { QUERY_KEYS } from 'utils/keys'
import { useDataLoginInfoStore } from 'zustand/index '
import CommonModal from './Modal'
type CollectionScreenProps = NativeStackScreenProps<RootStackParamList, 'Collection'>
export const Collection = ({ route, navigation }: CollectionScreenProps) => {
  const [userInfo] = useDataLoginInfoStore((state: any) => [state.userInfo])
  const [pickedTopic, setPickedTopic] = useState('')
  const data = ['today', 'tomorrow']
  const [range, setRange] = useState<any>({ startDate: undefined, endDate: undefined })
  const [open, setOpen] = useState(false)
  const [limit] = useState<number>(10)
  const [page] = useState<number>(1)
  const [keyword, setKeyword] = useState<string>('')
  const [inspectedWord, setInspectedWord] = useState('')
  const [openModal, setOpenModal] = useState(false)
  registerTranslation('en', enGB)
  const onDismiss = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  const onConfirm = useCallback(
    ({ startDate, endDate }: any) => {
      setOpen(false)
      setRange({ startDate, endDate })
    },
    [setOpen, setRange],
  )
  const { data: words } = useQuery(
    [
      QUERY_KEYS.COLLECTION_WORDS,
      limit,
      page,
      keyword,
      pickedTopic,
      dayjs(range.startDate).unix(),
      dayjs(range.endDate).unix(),
      userInfo.token,
      userInfo.id,
    ],
    async () => {
      try {
        const { data } = await getWord({
          limit,
          page,
          keyword,
          topicName: pickedTopic.toString(),
          startDate: dayjs(range.startDate).unix(),
          endDate: dayjs(range.endDate).unix(),
          accessToken: userInfo.token,
          userId: userInfo.id,
        })

        return data
      } catch (error) {
        console.log(error)
      }
    },
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    },
  )

  const handleInspectWord = (word: any) => {
    setInspectedWord(word)
    setOpenModal(true)
  }
  return (
    <>
      <SafeAreaView />
      <CommonModal open={openModal} setOpen={setOpenModal} word={inspectedWord} />
      <DatePickerModal
        locale="en"
        mode="range"
        visible={open}
        onDismiss={onDismiss}
        startDate={range.startDate}
        endDate={range.endDate}
        onConfirm={onConfirm}
      />
      <View style={{ marginHorizontal: 20 }}>
        <View style={styles.input}>
          <TextInput
            placeholder="Pick a range date"
            // value={startDate + '-' + endDate}
            onFocus={() => setOpen(true)}
          />
        </View>
        <DropdownPicker data={data} pickedItem={pickedTopic} setPickedItem={setPickedTopic} />
        <Text style={{ marginTop: 20, fontWeight: '600', fontSize: 16 }}>Saved word:</Text>
        <View style={{ marginTop: 15 }}>
          {words?.map((item: any, index: number) => {
            return (
              <Pressable
                onPress={() => {
                  handleInspectWord(item.word)
                }}
                key={index}
              >
                <View key={index} style={{ borderBottomWidth: 1, borderBottomColor: '#CCCCCC', paddingVertical: 10 }}>
                  <Text>{item.word}</Text>
                </View>
              </Pressable>
            )
          })}
        </View>
      </View>
    </>
  )
}
const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderColor: '#6B6B6B',
    borderRadius: 8,
    borderWidth: 1,
    width: WIDTH - 40,
    marginTop: 15,
  },
})
