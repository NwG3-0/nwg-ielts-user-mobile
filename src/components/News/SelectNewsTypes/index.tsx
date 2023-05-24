import { useState } from 'react'
import { View } from 'react-native'
import { NEWS_LIST, SELECT_NEWS } from 'utils/common'
import { useNewsStore } from '../store'
import SelectDropdown from 'react-native-select-dropdown'

export const SelectNewsTypes = () => {
  const { setTypes } = useNewsStore((state: any) => state.typeNewsStore)

  const onChangeValue = (values: string | null) => {
    setTypes(values)
  }

  return (
    <View
      style={{
        backgroundColor: 'transparent',
        zIndex: 999,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        marginTop: 20,
      }}
    >
      <SelectDropdown data={SELECT_NEWS} onSelect={onChangeValue} />
    </View>
  )
}
