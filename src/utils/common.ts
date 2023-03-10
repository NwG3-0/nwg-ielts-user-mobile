import { Dimensions } from 'react-native'

export const WIDTH = Dimensions.get('window').width
export const HEIGHT = Dimensions.get('window').height

export interface ListResource {
  id: number
  icon: string
  color: string
  title: string
}

export const LIST_RESOURCE: ListResource[] = [
  {
    id: 1,
    icon: 'newspaper',
    color: '#00b33c',
    title: 'News',
  },
  {
    id: 2,
    icon: 'language',
    color: '#ffa31a',
    title: 'Song ngữ',
  },
  {
    id: 3,
    icon: 'logo-youtube',
    color: '#e62e00',
    title: 'Videos',
  },
  {
    id: 4,
    icon: 'book-outline',
    color: '#2eb8b8',
    title: 'Books',
  },
  {
    id: 5,
    icon: 'headset-outline',
    color: 'orange',
    title: 'Listening',
  },
  {
    id: 6,
    icon: 'checkbox-outline',
    color: '#cccc00',
    title: 'Exercise',
  },
  {
    id: 7,
    icon: 'md-bookmarks-outline',
    color: '#2eb8b8',
    title: 'Vocab Pack',
  },
  {
    id: 8,
    icon: 'pencil',
    color: '#0066cc',
    title: 'Blogs',
  },
  {
    id: 9,
    icon: 'checkbox-outline',
    color: '#0059b3',
    title: 'Grammar',
  },
]
