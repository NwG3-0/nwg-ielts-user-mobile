import AsyncStorage from '@react-native-async-storage/async-storage'
import { Header } from 'common/Header'
import { USER_INFO } from 'models/api'
import { Text, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDataLoginInfoStore } from 'zustand/index '

export const HomeScreen = ({ navigation }: any) => {
  const [setUserInfo] = useDataLoginInfoStore((state: any) => [state.setUserInfo])

  const onLogout = () => {
    AsyncStorage.removeItem(USER_INFO)
    setUserInfo(undefined)
    navigation.navigate('Login')
  }

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Header />
      <Image source={require('../../../assets/images/ielts-logo.png')} style={{ width: 60 }} />
      <Text onPress={onLogout}>Home Screen</Text>
    </SafeAreaView>
  )
}
