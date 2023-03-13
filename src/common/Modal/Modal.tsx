import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native'
import { getDictionary } from 'utils/dictionary'
import { QUERY_KEYS } from 'utils/keys'
interface CommonModalProps {
  open: boolean
  setOpen: Function
  word: string
}
function CommonModal({ open, setOpen, word }: CommonModalProps) {
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

  return (
    <Modal
      animationType="slide"
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
            <>
              <Text style={styles.modalText}>{word}</Text>
              <Text>{wordDetail?.phonetics[0]?.text}</Text>
              <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setOpen(false)}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </>
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
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
  buttonClose: {
    backgroundColor: '#2196F3',
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
})
export default CommonModal
