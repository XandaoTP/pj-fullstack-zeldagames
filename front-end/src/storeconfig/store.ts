
import { configureStore } from '@reduxjs/toolkit'

import bgsReducer from './bg'


export const store = configureStore({
  reducer: {
    bgsReducer, 
  },
})