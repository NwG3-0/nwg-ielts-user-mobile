import { Linking, Text, TouchableOpacity, View } from 'react-native'

interface Props {
  text: string
  customStyle?: any
  url: string
}

export const OpenURLButton = ({ text, customStyle, url }: Props) => {
  const handleClick = () => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url)
      } else {
        console.log("Don't know how to open URI: " + url)
      }
    })
  }

  return (
    <TouchableOpacity onPress={handleClick}>
      <View style={customStyle}>
        <Text style={[customStyle,{alignSelf:'flex-start'}]}>{text}</Text>
      </View>
    </TouchableOpacity>
  )
}
