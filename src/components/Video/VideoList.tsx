import React from 'react'
import { View, Text, Image, StyleSheet,Pressable } from 'react-native'
function VideoList({ ...props }) {

  return (
    <Pressable onPress={()=>{props.navigation.navigate('VideoDetail',{videoId:props.data.id})}}>
    <View style={styles.container}>
      <Image source={{ uri: props.data.image }} style={{ width: 160, height: 160 }}></Image>
      <Text style={styles.title}>{props.data.title}</Text>
    </View></Pressable>
  )
}

export default VideoList
const styles = StyleSheet.create({
  container: {
    marginVertical: 24,
    marginHorizontal: 16,
    maxWidth:160
  },
  title:{
    fontSize:16,
    fontWeight:'600'
  }
})
