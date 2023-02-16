import { DataLoginInfo, UserInfo } from 'utils/zustand'
import create from 'zustand'

export const useDataLoginInfoStore = create<DataLoginInfo>((set) => ({
  userInfo: undefined,
  setUserInfo: (info: UserInfo) => set({ userInfo: info }),
}))
