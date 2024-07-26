import { configureStore } from '@reduxjs/toolkit';
import vocabReducer from  './features/vocab/vocabslice';
import authReducer from './features/auth/authslice';

export const store = configureStore({
  reducer: {
    vocab: vocabReducer,
    auth: authReducer
  },
})
