import { StyleSheet } from 'react-native'
import { WIDTH } from 'utils/common'

export const HomeStyles = StyleSheet.create({
  flashSaleBanner: {
    display: 'flex',
    width: WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f2c618',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 15,
  },
  flashSaleContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 15,
  },
  textFlash: {
    fontSize: 18,
    color: '#f25918',
    textAlign: 'center',
    fontWeight: '700',
    textShadowColor: '#FFFFFF',
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 5,
  },
  textSale: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '700',
    textShadowColor: '#F25918',
    textShadowOffset: {
      width: 3,
      height: 3,
    },
    textShadowRadius: 10,
  },
  dictionary: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  dictionaryTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  searchDictionary: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6e6e6',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 100,
  },
  searchDictionaryIcon: {
    marginRight: 10,
  },
  searchDictionaryInput: {
    flex: 3,
  },
  backgroundEmpty: {
    marginTop: 10,
    width: WIDTH,
    height: 10,
    backgroundColor: '#e6e6e6',
  },
  resource: {
    width: WIDTH,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  textResource: {
    textAlign: 'left',
    width: WIDTH * 0.9,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
})
