import { StyleSheet } from 'react-native'
import { WIDTH } from 'utils/common'

export const AuthStyles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: '100%',
    backgroundColor: '#FFFFFF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    position: 'relative',
    width: 300,
    zIndex: 100,
  },
  title: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 35,
  },
  inputUserName: {
    color: '#FFFFFF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#808080',
    marginTop: 20,
  },
  blurBackground: {
    position: 'absolute',
    backgroundColor: '#00000099',
    width: WIDTH,
    height: '100%',
    zIndex: 50,
  },
  imageBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 10,
  },
  button: {
    marginTop: 10,
  },
  link: {
    textAlign: 'right',
    color: '#FFFFFF',
    textDecorationLine: 'underline',
  },
})
