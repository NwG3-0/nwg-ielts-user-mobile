import AsyncStorage from '@react-native-async-storage/async-storage'
import { USER_INFO } from 'models/api'
import { DEVICES } from 'utils/common'
import { _API_BASE_URL } from 'utils/api'
export const checkSavedWord = async (input: { word: string,userId:string,accessToken:string  }) => {
    try {
      const { word,userId,accessToken  } = input
   
      if (!word || word === '' || !userId || userId==='') {
        return { success: false, data: null, message: 'Invalid Id' }
      }
      const response = await fetch(`${_API_BASE_URL}/api/card/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer${accessToken}`,
        },
        body: JSON.stringify({word,userId})
      })
  
      const rawResponse = await response.json()
     
      if (rawResponse) { 
        console.log(rawResponse)
        return rawResponse
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  export const saveWord = async (input: { word: string,userId:string,accessToken:string,topicName:string,phonetic?:string,audio?:string,meanings:string  }) => {
    try {
      const { word,userId,accessToken,topicName,phonetic,audio,meanings  } = input
   
      if (!word || word === '' || !userId || userId==='') {
        return { success: false, data: null, message: 'Invalid Id' }
      }
      const response = await fetch(`${_API_BASE_URL}/api/card/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer${accessToken}`,
        },
        body: JSON.stringify({word,userId ,topicName,phonetic,audio,meanings})
      })
  
      const rawResponse = await response.json()
     
      if (rawResponse) { 
        console.log(rawResponse)
   
        return rawResponse
      }
    } catch (error) {
      console.log(error)
    }
  }
  