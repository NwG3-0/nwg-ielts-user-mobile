import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import jwtDecode from 'jwt-decode'

import { globalStore } from 'hocs/globalStore'
import { ITokenJwt, USER_INFO } from 'models/api'
import { UserInfo } from 'utils/zustand'

dayjs.extend(utc)

export const withAuth = (Component: any) => {
  const WithAuthWrapper = (props: any) => {
    const { user, setUser } = globalStore((state: any) => state.userStore)
console.log(user)
    const onGetCurrentUser = async () => {
      try {
        const authDataSerialized = await AsyncStorage.getItem(USER_INFO)

        if (authDataSerialized) {
          const _authData: UserInfo = JSON.parse(authDataSerialized)

          const jwtToken: ITokenJwt = jwtDecode(_authData.token)

          if (dayjs.utc(jwtToken?.exp).isBefore(dayjs.utc().unix())) {
            await AsyncStorage.removeItem(USER_INFO)

            setUser({
              id: '',
              email: '',
              token: '',
            })
          } else {
            setUser(_authData)
          }
        }
      } catch (error) {
        await AsyncStorage.removeItem(USER_INFO)

        setUser({
          id: '',
          email: '',
          token: '',
        })
      }
    }

    useEffect(() => {
      onGetCurrentUser()
    }, [])

    return Component({ ...props, user })
  }

  return WithAuthWrapper
}
