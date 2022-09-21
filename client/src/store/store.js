import { configureStore } from '@reduxjs/toolkit'
import filesDataReducer from "./filesDataSlice"

export const store = configureStore({
  reducer: {
    filesData: filesDataReducer
  },
})