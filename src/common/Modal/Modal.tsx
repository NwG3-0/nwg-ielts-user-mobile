import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useRef, useState } from 'react'
import { Alert, Modal, StyleSheet, Text, Pressable, View, ScrollView } from 'react-native'
import { getDictionary } from 'utils/dictionary'
import { QUERY_KEYS } from 'utils/keys'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av'
interface CommonModalProps {
  open: boolean
  setOpen: Function
  word: string
}
function CommonModal({ open, setOpen, word }: CommonModalProps) {
  const sound = useRef(new Audio.Sound())
  const [playing, setPlaying] = useState(false)
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
  const object = {
    license: { name: 'CC BY-SA 3.0', url: 'https://creativecommons.org/licenses/by-sa/3.0' },
    meanings: [
      { antonyms: [Array], definitions: [Array], partOfSpeech: 'verb', synonyms: [Array] },
      { antonyms: [Array], definitions: [Array], partOfSpeech: 'adjective', synonyms: [Array] },
    ],
    phonetic: '/juːˈnaɪtɪd/',
    phonetics: [
      { audio: '', text: '/juːˈnaɪtɪd/' },
      {
        audio: 'https://api.dictionaryapi.dev/media/pronunciations/en/united-us.mp3',
        license: [Object],
        sourceUrl: 'https://commons.wikimedia.org/w/index.php?curid=1227485',
        text: '/juˈnaɪtɪd/',
      },
    ],
    sourceUrls: ['https://en.wiktionary.org/wiki/unite', 'https://en.wiktionary.org/wiki/united'],
    word: 'united',
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
  }, [])

  const PlayAudio = async () => {
    try {
      await sound.current.playAsync()
      await sound.current.replayAsync()
    } catch (error) {
      console.log('There was an error')
    }
  }
  return (
    <Modal
      transparent={true}
      visible={open}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.')
        setOpen(false)
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {isLoadingWord && !wordDetail ? (
            <Text>Loading ...</Text>
          ) : (
            <ScrollView style={{ width: '100%' }}>
              <View style={styles.meaningContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.title}>{word}</Text>
                  <Pressable onPress={() => PlayAudio()}>
                    <Icon name="volume-up" style={{ marginLeft: 8, fontSize: 14 }} />
                  </Pressable>
                </View>

                <Pressable onPress={() => setOpen(false)}>
                  <Icon name="close" style={styles.closeIcon} />
                </Pressable>
              </View>
              {/* {wordDetail?.phonetic && ( */}
              <View style={{ flexDirection: 'row', marginTop: 8, alignSelf: 'flex-start' }}>
                <Text style={styles.meaningSubtitle}>Spelling: </Text>
                <Text>{wordDetail?.phonetic}</Text>
              </View>
              {/* )} */}
              <View style={{ flexDirection: 'row', marginTop: 8, alignSelf: 'flex-start' }}>
                <Text style={styles.meaningSubtitle}>Definitions: </Text>
              </View>

              {wordDetail?.meanings?.map((item: any, id: any) => {
                return (
                  <View style={{ marginTop: 8 }} key={id}>
                    <Text style={[styles.meaningSubtitle, { fontSize: 14 }]}>{item.partOfSpeech}: </Text>

                    {item?.definitions?.map((it: any, idx: any) => {
                      return (
                        <Text style={{ marginTop: 5 }} key={idx}>
                          - {it.definition}
                        </Text>
                      )
                    })}
                  </View>
                )
              })}
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
})
export default CommonModal
