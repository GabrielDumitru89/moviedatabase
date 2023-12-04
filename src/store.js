import { configureStore } from '@reduxjs/toolkit'
import appReducer from './slices/appSlices'

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
})