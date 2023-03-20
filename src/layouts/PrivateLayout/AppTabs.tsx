import { HomeScreen } from 'components/Home'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome'
import { News } from 'components/News/News'

const Tab = createBottomTabNavigator()

export const AppTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName: any

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home'
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={24} color="tomato" />
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="News" component={News} options={{ headerShown: false }} />
    </Tab.Navigator>
  )
}
