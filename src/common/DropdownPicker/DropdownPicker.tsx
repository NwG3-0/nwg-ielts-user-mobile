import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { saveWord } from 'utils/apis/cardApi/wordApi'
import Icon from 'react-native-vector-icons/FontAwesome'
interface DropdownPickerProps {
  data: any
  setPickedItem: Function
  pickedItem: string
}
function DropdownPicker({ data, setPickedItem, pickedItem }: DropdownPickerProps) {
  const [openDrop, setOpenDrop] = useState(false)

  const handleTopicPicker = (topic: string) => {
    setPickedItem(topic)
    setOpenDrop(false)
  }
  return (
    <View>
      <Pressable onPress={() => setOpenDrop(!openDrop)}>
        <View style={styles.dropdownContainer}>
          <Text>{pickedItem}</Text>
        </View>
      </Pressable>

      {openDrop && (
        <View>
          {data.map((item: any, id: number) => {
            return (
              <Pressable
                onPress={() => {
                  handleTopicPicker(item)
                }}
                key={id}
              >
                <Text>{item}</Text>
              </Pressable>
            )
          })}
        </View>
      )}
    </View>
  )
}

export default DropdownPicker
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
