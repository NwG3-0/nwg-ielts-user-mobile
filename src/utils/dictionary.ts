export const API_DICTIONARY_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/'

//Dictionary
export const getDictionary = async (searchWord: string) => {
  try {
    const response = await fetch(`${API_DICTIONARY_URL}${searchWord}`, {
      method: 'GET',
    })

    const rawResponse = await response.json()

    if (rawResponse) {
      return rawResponse
    }
    // return response.json()
  } catch (error) {
    return []
  }
}
