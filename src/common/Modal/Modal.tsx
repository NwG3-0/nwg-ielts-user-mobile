import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
interface CommonModalProps{
  open: boolean,
  setOpen: Function,
  data: string
}
function CommonModal({open,setOpen,data}:CommonModalProps) {
  console.log(data)
  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={open}
    
    onRequestClose={() => {
      Alert.alert('Modal has been closed.');
      setOpen(false);
    }}>
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>{data}</Text>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => setOpen(false)}>
          <Text style={styles.textStyle}>Hide Modal</Text>
        </Pressable>
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
    backgroundColor:'rgba(0,0,0,0.6)'
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
});
export default CommonModal