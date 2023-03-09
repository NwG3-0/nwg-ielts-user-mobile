import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Button, ImageBackground } from 'react-native'
import { Link } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDataLoginInfoStore } from 'zustand/index '
import { USER_INFO } from 'models/api'
import { login } from 'utils/api'
import Input from 'common/InputPassword'
import { AuthStyles } from 'style/auth'
import { OpenURLButton } from 'common/OpenURLButton'
import { LoginScreenProps } from 'models/common'

export const LoginScreen = ({ navigation }: any) => {
  const [isHidePassword, setIsHidePassword] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [info, setInfo] = useState({ email: '', password: '' })

  const [setUserInfo] = useDataLoginInfoStore((state: any) => [state.setUserInfo])

  const onLogin = async (e: { preventDefault: () => void }) => {
    try {
      e.preventDefault()
      setIsLoading(true)
      if (info.email !== '' && info.password !== '') {
        const { success, data } = await login({
          email: info.email,
          password: info.password,
        })
        if (success) {
          AsyncStorage.setItem(USER_INFO, JSON.stringify(data))
          setUserInfo(data)

          navigation.navigate('PrivateLayout')
        }
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View style={AuthStyles.container}>
      <View style={AuthStyles.blurBackground}></View>
      <ImageBackground
        source={require('../../../../assets/images/IELTS-background-auth.jpg')}
        resizeMode="cover"
        style={AuthStyles.imageBackground}
      />
      <View style={AuthStyles.box}>
        <Text style={AuthStyles.title}>Login</Text>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#cccccc"
          onChangeText={(value: any) => setInfo((prev) => ({ ...prev, email: value }))}
          style={AuthStyles.inputUserName}
        />
        <Input
          placeholder="Password"
          secureTextEntry={isHidePassword}
          onChangeText={(value: any) => setInfo((prev) => ({ ...prev, password: value }))}
          icon={
            isHidePassword ? (
              <TouchableOpacity onPress={() => setIsHidePassword(false)}>
                <Text>Show</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setIsHidePassword(true)}>
                <Text>Hide</Text>
              </TouchableOpacity>
            )
          }
          iconPosition="right"
        />
        <OpenURLButton
          customStyle={{
            textAlign: 'right',
            color: '#FFFFFF',
            textDecorationLine: 'underline',
          }}
          url="https://ielts.lampnm.com/register"
          text="Don't have account ?"
        />
        <View style={AuthStyles.button}>
          <Button onPress={onLogin} title={isLoading ? 'Loading' : 'Login'} disabled={isLoading} />
        </View>
      </View>
    </View>
  )
}
