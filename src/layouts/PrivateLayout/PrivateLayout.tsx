import { HomeScreen } from 'components/Home'
import Icon from 'react-native-vector-icons/FontAwesome'
import { AppTabs } from './AppTabs'
import { NewDetails } from 'components/News/NewDetails'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { News } from 'components/News/News'
import { RootStackParamList } from 'models/common'
import { Collection } from 'components/Collection'
import LearningVideos from 'components/Video'

const Stack = createNativeStackNavigator<RootStackParamList>()
export const PrivateLayout = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BottomTab" component={AppTabs} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="News" component={News} options={{ headerShown: false }} />
      <Stack.Screen name="NewDetails" component={NewDetails} options={{ headerShown: false }} />
      <Stack.Screen name="Collection" component={Collection} options={{ headerShown: false }} />
      <Stack.Screen name="Videos" component={LearningVideos} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}
