import { configureStore } from "@reduxjs/toolkit";
import searchReducer from '../Home/Search/searchReducer'

const store = configureStore({
  reducer: {
    search: searchReducer,
  }
}); 


export default store;