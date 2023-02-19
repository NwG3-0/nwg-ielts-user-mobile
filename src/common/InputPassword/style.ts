import { StyleSheet } from 'react-native'
import colors from '../../../assets/theme/index'

export default StyleSheet.create({
  wrapper: {
    height: 42,
    backgroundColor: '#808080',
    paddingHorizontal: 5,
    marginTop: 10,
  },

  inputContainer: {
    paddingVertical: 10,
  },

  textInput: {
    flex: 1,
    width: '100%',
    color: '#FFFFFF',
  },

  error: {
    color: colors.danger,
    paddingTop: 4,
    fontSize: 12,
  },
})
