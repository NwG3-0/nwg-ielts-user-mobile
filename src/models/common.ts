import { NativeStackScreenProps } from '@react-navigation/native-stack'

type RootStackParamList = {
  Login: undefined
  News: undefined
  NewDetails :{newsId:string}
  Post: { postId: string }
}

export type NewsScreenProps = NativeStackScreenProps<RootStackParamList, 'News'>
export type NewDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'NewDetails'>
export type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>
