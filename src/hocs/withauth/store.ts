import { produce } from 'immer'

export interface UserInfo {
  email: string
  id: string
  token: string
}

export interface UserState {
  user: UserInfo
  setUser: (user: UserInfo) => unknown
}

const initialUser = {
  id: '',
  email: '',
  token: '',
}

const userStore = (set: any) => ({
  user: initialUser,
  setUser: (user: UserInfo) => {
    return set(
      produce((state: { userStore: { user: UserInfo } }) => {
        state.userStore.user = user
      }),
    )
  },
})

export default userStore
