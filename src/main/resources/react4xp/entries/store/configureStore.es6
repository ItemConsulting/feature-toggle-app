import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { createInjectorsEnhancer } from 'redux-injectors'
import createSagaMiddleware from 'redux-saga'
import { createReducer } from './reducers'
import { reducer as mainReducer } from '../containers/Main/slice'

export function configureAppStore() {
  const reduxSagaMonitorOptions = {}
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions)
  const {
    run: runSaga
  } = sagaMiddleware

  // Create the store with saga middleware
  const middlewares = [sagaMiddleware]

  const enhancers = [
    createInjectorsEnhancer({
      createReducer,
      runSaga
    })
  ]

  const store = configureStore({
    reducer: {
      main: mainReducer
    },
    middleware: [...getDefaultMiddleware(), ...middlewares],
    devTools: process.env.NODE_ENV !== 'production',
    enhancers
  })

  return store
}
