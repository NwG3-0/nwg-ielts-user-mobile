import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { saveWord } from 'utils/apis/cardApi/wordApi'
import Icon from 'react-native-vector-icons/FontAwesome'
interface TopicPickerProps {
  word: string
  pickedTopic: string
  userInfo: any
  phoneticAudio: any
  wordDetail: any
  setDisplayTopicPicker: Function
  openDrop: boolean
  setOpenDrop: Function
  setPickedTopic: Function
  setOpen: Function
}
function TopicPicker({
  word,
  pickedTopic,
  userInfo,
  phoneticAudio,
  wordDetail,
  setDisplayTopicPicker,
  openDrop,
  setOpenDrop,
  setPickedTopic,
  setOpen,
}: TopicPickerProps) {
  const topic = ['today', 'hehe', 'haha', 'hu']
  const handleTopicPicker = (topic: string) => {
    setPickedTopic(topic)
    setOpenDrop(false)
  }
  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text>Choose Topic:</Text>
        <Pressable onPress={() => setOpen(false)}>
          <Icon name="close" style={styles.closeIcon} />
        </Pressable>
      </View>
      <Pressable onPress={() => setOpenDrop(!openDrop)}>
        <View style={styles.dropdownContainer}>
          <Text>{pickedTopic}</Text>
        </View>
      </Pressable>

      {openDrop && (
        <View  style={[{marginTop:7}]} >
          {topic.map((item, id) => {
            return (
              <Pressable
                onPress={() => {
                  handleTopicPicker(item)
                }}
                key={id}
                style={[{paddingVertical:5},id !== topic.length&&{borderBottomWidth:1}]}
              >
                <Text>{item}</Text>
              </Pressable>
            )
          })}
        </View>
      )}
      <Pressable
        disabled={pickedTopic == '' ? true : false}
        onPress={() => {
          saveWord({
            word: word,
            userId: userInfo.id,
            topicName: pickedTopic,
            audio: phoneticAudio?.audio,
            phonetic: wordDetail.phonetic,
            meanings: JSON.stringify(wordDetail.meanings),
          })
          setDisplayTopicPicker(false)
        }}
        style={{ alignSelf: 'center' }}
      >
        <View style={styles.saveButtonContainer}>
          <Text>Save</Text>
        </View>
      </Pressable>
    </View>
  )
}

export default TopicPicker
const styles = StyleSheet.create({
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
