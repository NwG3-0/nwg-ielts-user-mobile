import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import typeNewsStore from './store/typeNewsStore'

export const useNewsStore = create(
  devtools((set) => ({
    typeNewsStore: { ...typeNewsStore(set) },
  })),
)
