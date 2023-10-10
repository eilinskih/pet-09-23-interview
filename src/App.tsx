import React, { useEffect } from 'react'
import ImageLoader from './components/ImageLoader'
import { useAppDispatch, useAppSelector } from './hooks/typedReact-ReduxHooks'
import { fetchUserData, isAuthorizedSelector, loginUser } from './redux/reducer/user'
import CurrenciesList from './components/CurrenciesList'

function App () {
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(isAuthorizedSelector)

  useEffect(() => {
    dispatch(fetchUserData())
  }, [])

  const loginHandler = () => {
    dispatch(loginUser({ login: 'test@test.com', password: '1234' }))
  }

  return (
    <div className="App">
      {isAuth
        ? <ImageLoader />
        : <div style={{
          color: '#fff',
          fontSize: '48px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
        onClick={loginHandler}
        >
          LOGIN
        </div>
      }
      <CurrenciesList />
    </div>
  )
}

export default App
