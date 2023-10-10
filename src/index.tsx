import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { persistor, sagaMiddleware, store, wsRootSaga } from './redux/store'
import './styles.module.scss'
import rootSaga from './redux/saga/rootWatcherSaga'
import { PersistGate } from 'redux-persist/integration/react'
import { wsConnectionsWatcher } from './redux/saga/wsConnectionSaga'

sagaMiddleware.run(rootSaga)
wsRootSaga.run(wsConnectionsWatcher)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} >
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
