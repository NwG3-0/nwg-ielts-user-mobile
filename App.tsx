import { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { PrivateLayout } from 'layouts/PrivateLayout/PrivateLayout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LoginScreen } from 'components/Auth/Login'
import { withAuth } from 'hocs/withauth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { globalStore } from 'hocs/globalStore'

const Stack = createNativeStackNavigator()
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    },
  },
})

const App = ({ ...props }) => {

  const { user } = props
  // useEffect(()=>{
  //   AsyncStorage.clear()
  // },[])

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={user.email !== '' ? 'PrivateLayout' : 'Login'}
          screenOptions={{ headerShown: false }}
        >
          {user.email === '' ? (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
           
            </>
          ) : (
            <>
              <Stack.Screen name="PrivateLayout" component={PrivateLayout} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  )
}

export default withAuth(App)
