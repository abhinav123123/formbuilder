import { configureStore } from '@reduxjs/toolkit'
import elementSlice from './slices/elementSlice'
import pagesSlice  from './slices/pagesSlice'
import storeSlice from './slices/storeSlice'
import tailwindClassSlice from './slices/tailwindClassSlice'
import appsSlice from './slices/appsSlice'
import userSlice from './slices/userSlice'
import moduleSlice from './slices/moduleSlice'

export default configureStore({
  reducer: {
    elements:elementSlice,
    pages:pagesSlice,
    add:storeSlice,
    tailwindCSS:tailwindClassSlice,
    appsSlice:appsSlice,
    user:userSlice,
    module:moduleSlice
  }
})
