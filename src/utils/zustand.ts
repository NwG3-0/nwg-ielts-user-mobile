export interface UserInfo {
  email: string
  id: string
  token: string
}

export interface DataLoginInfo {
  userInfo?: UserInfo
  setUserInfo: (state: UserInfo) => void
}
