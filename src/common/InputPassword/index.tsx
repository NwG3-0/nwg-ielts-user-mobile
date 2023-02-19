import React from 'react'
import { View, Text, TextInput } from 'react-native'
import colors from '../../../assets/theme/index'
import styles from './style'

const Input = React.forwardRef(
  ({ onChangeText, iconPosition, icon, style, value, label, error, ...props }: any, ref) => {
    const [focused, setFocused] = React.useState(false)

    const getFlexDirection = () => {
      if (icon && iconPosition) {
        if (iconPosition === 'left') {
          return 'row'
        } else if (iconPosition === 'right') {
          return 'row-reverse'
        }
      }
    }

    const getBorderColor = () => {
      if (error) {
        return colors.danger
      }

      if (focused) {
        return colors.primary
      } else {
        return colors.grey
      }
    }
    return (
      <View style={styles.inputContainer}>
        {label && <Text>{label}</Text>}

        <View
          style={[
            styles.wrapper,
            { alignItems: icon ? 'center' : 'baseline' },
            { borderColor: getBorderColor(), flexDirection: getFlexDirection() },
          ]}
        >
          <View>{icon && icon}</View>
          <TextInput
            style={[styles.textInput, style]}
            onChangeText={onChangeText}
            ref={ref}
            placeholderTextColor="#cccccc"
            value={value}
            onFocus={() => {
              setFocused(true)
            }}
            onBlur={() => {
              setFocused(false)
            }}
            {...props}
          />
        </View>

        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    )
  },
)

export default Input
