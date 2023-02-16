import { StyleSheet } from 'react-native'

export const AuthStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 250,
  },
  title: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 30,
  },
  inputUserName: {
    color: '#FFFFFF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#808080',
    marginTop: 10,
  },
})
