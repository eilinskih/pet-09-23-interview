import React, { useState } from 'react'
import styles from './currencies_list.module.scss'
import { useAppDispatch, useAppSelector } from '../../hooks/typedReact-ReduxHooks'
import { selectCurrencies } from '../../redux/reducer/common'
import { wsConnectData, wsDisconnectData } from '../../redux/reducer/wsConnectionActions'
import { CurrenciesState } from '../../types/currencies'

const CurrenciesList = () => {
  const currencies = useAppSelector(selectCurrencies)
  const currencyNames = Object.keys(currencies)
  const dispatch = useAppDispatch()
  const [isShowPrice, setIsShowPrice] = useState('')

  const currencyClickHandler = (currency: keyof CurrenciesState) => {
    dispatch(wsConnectData(currency))
    setIsShowPrice(currency)
  }
  const unsubscribeHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    e.preventDefault()
    dispatch(wsDisconnectData())
    setIsShowPrice('')
  }
  return (
    <div className={styles.container} >
        {currencyNames.map((currency) => {
          const currencyItem = currencies[currency as keyof CurrenciesState]
          return (
            <div
            onClick={() => currencyClickHandler(currency as keyof CurrenciesState)}
            key={currency}
            className={styles.currencyItem}
            >
                <span className={styles.currencyName}>{currency}</span>
                <img src={currencyItem.iconUrl} width={60} alt={currency} />
                {isShowPrice === currency &&
                  <>
                  <span className={styles.currencyName}>
                    {currencyItem.price}
                  </span>
                  <button onClick={unsubscribeHandler}>unsubscribe</button>
                  </>
                }
            </div>
          )
        })}
    </div>
  )
}

export default CurrenciesList
