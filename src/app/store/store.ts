import { legacy_createStore as createStore, applyMiddleware} from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import rootReducers from '../reducers'
import formSaga from '../sagas/formSaga'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: rootReducers,
  middleware: ()=>[sagaMiddleware]
}
)
// export const store = createStore(
//   rootReducers,
//   applyMiddleware(sagaMiddleware)
// )

// store.subscribe(() => {
//     const storeNow = store.getState()
//     console.log(storeNow)
// })

sagaMiddleware.run(formSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch