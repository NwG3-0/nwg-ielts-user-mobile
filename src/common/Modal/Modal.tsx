import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useRef, useState } from 'react'
import { Alert, Modal, StyleSheet, Text, Pressable, View, ScrollView } from 'react-native'
import { getDictionary } from 'utils/dictionary'
import { QUERY_KEYS } from 'utils/keys'

import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av'
import { useDataLoginInfoStore } from 'zustand/index '
import { checkSavedWord, saveWord } from 'utils/apis/cardApi/wordApi'
import { WIDTH } from 'utils/common'
import WordDetails from './WordDetails'
import TopicPicker from './TopicPicker'
interface CommonModalProps {
  open: boolean
  setOpen: Function
  word: string
}
function CommonModal({ open, setOpen, word }: CommonModalProps) {
  const sound = useRef(new Audio.Sound())
  const [userInfo] = useDataLoginInfoStore((state: any) => [state.userInfo])
  const [openDrop, setOpenDrop] = useState(false)
  const [displayTopicPicker, setDisplayTopicPicker] = useState(false)
  const [pickedTopic, setPickedTopic] = useState('')

  const [phoneticAudio, setPhoneticAudio] = useState('')

  const { data: wordDetail, isLoading: isLoadingWord } = useQuery(
    [QUERY_KEYS.WORD, word],
    async () => {
      try {
        const response = await getDictionary(word)

        return response[0]
      } catch (error) {
        console.log(error)
      }
    },
    {
      refetchInterval: false,
      enabled: word !== '',
      refetchOnWindowFocus: false,
    },
  )

  const { data: checkSave } = useQuery(
    [QUERY_KEYS.WORD, word, userInfo.id, userInfo.token],
    async () => {
      try {
        const response = await checkSavedWord({ word: word, userId: userInfo.id, accessToken: userInfo.token })

        return response
      } catch (error) {
        console.log(error)
      }
    },
    {
      refetchInterval: false,
      enabled: word !== '',
      refetchOnWindowFocus: false,
    },
  )

  const getPhonetic = () => {
    var phoneticLink
    for (let i = 0; i < wordDetail?.phonetics.length; i++) {
      if (wordDetail?.phonetics[i].audio.length > 0) {
        phoneticLink = wordDetail?.phonetics[i]
        console.log('res', phoneticLink)
        break
      }
    }

    setPhoneticAudio(phoneticLink)
  }

  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
      shouldDuckAndroid: true,
      playsInSilentModeIOS: true,
      playThroughEarpieceAndroid: false,
    })
    const LoadAudio = async () => {
      await sound.current.loadAsync({ uri: 'https://api.dictionaryapi.dev/media/pronunciations/en/been-us.mp3' })
    }
    LoadAudio()

    return () => {
      sound.current.unloadAsync()
    }
  }, [])

  const PlayAudio = async () => {
    try {
      await sound.current.playAsync()
      await sound.current.replayAsync()
    } catch (error) {
      console.log('There was an error')
    }
  }

  useEffect(() => {
    if (isLoadingWord == false && wordDetail) {
      getPhonetic()
    }
  }, [wordDetail])

  return (
    <Modal
      transparent={true}
      visible={open}
      onRequestClose={() => {
        setOpen(false)
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {isLoadingWord && !wordDetail ? (
            <Text>Loading ...</Text>
          ) : (
            <ScrollView style={{ width: '100%' }}>
              {displayTopicPicker ? (
                <TopicPicker
                  pickedTopic={pickedTopic}
                  word={word}
                  userInfo={userInfo}
                  phoneticAudio={phoneticAudio}
                  wordDetail={wordDetail}
                  setDisplayTopicPicker={setDisplayTopicPicker}
                  openDrop={openDrop}
                  setOpenDrop={setOpenDrop}
                  setPickedTopic={setPickedTopic}
                  setOpen={setOpen}
                />
              ) : (
                <WordDetails
                  word={word}
                  wordDetail={wordDetail}
                  setDisplayTopicPicker={setDisplayTopicPicker}
                  checkSave={checkSave}
                  setOpen={setOpen}
                  PlayAudio={PlayAudio}
                />
              )}
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  )
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    paddingHorizontal: 32,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 17,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  meaningContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  closeIcon: {
    fontSize: 18,
    color: '#6B6B6B',
  },
  meaningSubtitle: {
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  saveButtonContainer: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: '#13B2E2',
    borderRadius: 8,
    marginTop: 15,
  },
  dropdownContainer: {
    borderWidth: 1,
    borderRadius: 8,
    width: '100%',
    marginTop: 15,
    paddingVertical: 7,
    paddingHorizontal: 13,
  },
})
export default CommonModal
