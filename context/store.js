import { configureStore, combineReducers } from '@reduxjs/toolkit';
import savingsSlice from './slices/savings';

const reducers = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  savings: savingsSlice,
});

//carga el estado de la aplicación con localStorage

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
