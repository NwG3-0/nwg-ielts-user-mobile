import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

interface WordDetailsProps {
  word: string
  wordDetail: any
  setDisplayTopicPicker: Function
  checkSave: any
  setOpen: Function
  PlayAudio: Function
}

function WordDetails({ word, wordDetail, setDisplayTopicPicker, checkSave, setOpen, PlayAudio }: WordDetailsProps) {
  return (
    <>
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

      <View style={{ flexDirection: 'row', marginTop: 8, alignSelf: 'flex-start' }}>
        <Text style={styles.meaningSubtitle}>Spelling: </Text>
        <Text>{wordDetail?.phonetic}</Text>
      </View>

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
      <Pressable
        disabled={checkSave? true : false}
        onPress={() => setDisplayTopicPicker(true)}
        style={{ alignSelf: 'center' }}
      >
        <View style={styles.saveButtonContainer}>
          <Text>Save</Text>
        </View>
      </Pressable>
    </>
  )
}

export default WordDetails
const styles = StyleSheet.create({
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
