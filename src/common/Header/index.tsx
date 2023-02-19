import { Image, StyleSheet, View } from 'react-native'

export const Header = () => {
  return (
    <View style={styles.header}>
      <Image source={require('../../../assets/images/ielts-logo.png')} style={styles.logo} resizeMode="contain" />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 50,
    display: 'flex',
    alignContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  logo: {
    width: 100,
    height: 58,
  },
})
