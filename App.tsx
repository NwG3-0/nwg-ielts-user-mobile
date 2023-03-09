import { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { PrivateLayout } from 'layouts/PrivateLayout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { USER_INFO } from 'models/api'
import { useDataLoginInfoStore } from 'zustand/index '
import { LoginScreen } from 'components/Auth/Login'
import { NewsScreen } from 'components/News'

const Stack = createNativeStackNavigator()

const App = () => {
  const queryClient = new QueryClient()
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
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={userInfo ? 'PrivateLayout' : 'Login'} screenOptions={{ headerShown: false }}>
          {!userInfo ? (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="PrivateLayout" component={PrivateLayout} />
              <Stack.Screen name="News" component={NewsScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  )
}

export default App
