import { NativeStackScreenProps } from '@react-navigation/native-stack'

type RootStackParamList = {
  Login: undefined
  News: { newsId: string }
  Post: { postId: string }
}

export type NewsScreenProps = NativeStackScreenProps<RootStackParamList, 'News'>
export type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>
