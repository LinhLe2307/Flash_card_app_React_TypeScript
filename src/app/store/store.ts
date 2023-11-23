import { legacy_createStore as createStore} from 'redux'
import rootReducers from '../reducers'

export const store = createStore(rootReducers)

store.subscribe(() => {
    const storeNow = store.getState()
    console.log(storeNow)
  })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch