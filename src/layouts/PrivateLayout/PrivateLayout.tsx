import { HomeScreen } from 'components/Home'
import Icon from 'react-native-vector-icons/FontAwesome'
import { AppTabs } from './AppTabs'
import { NewsScreen } from 'components/News'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
const Stack = createNativeStackNavigator()
export const PrivateLayout = () => {
  return (
    <Stack.Navigator>

      <Stack.Screen name='BottomTab' component={AppTabs} options={{headerShown:false}}/>
      <Stack.Screen name='Home' component={HomeScreen} options={{headerShown:false}}/>
      <Stack.Screen name='News' component={NewsScreen} options={{headerShown:false}}/>
    </Stack.Navigator>
  )
}
