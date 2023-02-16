import { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { PrivateLayout } from 'layouts/PrivateLayout'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { USER_INFO } from 'models/api'
import { useDataLoginInfoStore } from 'zustand/index '
import { LoginScreen } from 'components/Auth/Login'
import { RegisterScreen } from 'components/Auth/Register'

const Stack = createNativeStackNavigator()

const App = () => {
  const [userInfo, setUserInfo] = useDataLoginInfoStore((state: any) => [state.userInfo, state.setUserInfo])

  const loadStorageData = async (): Promise<void> => {
    try {
      const authDataSerialized = await AsyncStorage.getItem(USER_INFO)

      if (authDataSerialized) {
        const _authData: any = JSON.parse(authDataSerialized)
        setUserInfo(_authData)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadStorageData()
  }, [userInfo])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={userInfo ? 'PrivateLayout' : 'Login'} screenOptions={{ headerShown: false }}>
        {!userInfo ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          <Stack.Screen name="PrivateLayout" component={PrivateLayout} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
