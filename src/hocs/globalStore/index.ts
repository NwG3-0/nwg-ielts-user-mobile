import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import userStore from 'hocs/withauth/store'

export const globalStore = create(
  devtools((set) => ({
    userStore: { ...userStore(set) },
  })),
)
