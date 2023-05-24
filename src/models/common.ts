import { NativeStackScreenProps } from '@react-navigation/native-stack'

export type RootStackParamList = {
  Login: undefined
  News: undefined
  NewDetails: { newsId: string }
  Post: { postId: string }
  Home: undefined
  BottomTab: undefined
  Collection: undefined
}
export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>

export enum NEWS {
  SPORT = 'sport',
  BUSINESS = 'business',
  EDUCATION = 'education',
  ENTERTAINMENT = 'entertainment',
  TECHNOLOGY = 'technology',
  MUSIC = 'music',
  TRAVEL = 'travel',
}
export interface NewsList {
  label: string
  value: string
}
export type NewsScreenProps = NativeStackScreenProps<RootStackParamList, 'News'>
export type NewDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'NewDetails'>
export type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>
