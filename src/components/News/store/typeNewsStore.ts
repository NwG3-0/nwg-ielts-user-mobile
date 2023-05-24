import { produce } from 'immer'

export interface TypesState {
  types: string
  setTypes: (user: string) => unknown
}

const initialTypes = 'sport'

const typeNewsStore = (set: any) => ({
  types: initialTypes,
  setTypes: (type: string) => {
    return set(
      produce((state: { typeNewsStore: { types: string } }) => {
        state.typeNewsStore.types = type
      }),
    )
  },
})

export default typeNewsStore
