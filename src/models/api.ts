export const USER_INFO = 'ielts_user_info'
export const AUTH_TOKEN = 'ielts_user_token'

export interface ITokenJwt {
  email: string
  exp: number
  hobbies: string
  iat: number
  manager_id: string
  role: number
}
