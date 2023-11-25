import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import rootReducers from '../reducers'
import rootSaga from '../sagas'

const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]

export const store = configureStore({
  reducer: rootReducers,
  // middleware: (getDefaultMiddleware)=>getDefaultMiddleware().concat(middleware)
  middleware: ()=>(middleware)
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

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch