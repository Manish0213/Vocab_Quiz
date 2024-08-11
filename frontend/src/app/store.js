import { configureStore } from '@reduxjs/toolkit';
import vocabReducer from  './features/vocab/vocabslice';
import authReducer from './features/auth/authslice';
import folderReducer from './features/folder/folderslice';

export const store = configureStore({
  reducer: {
    vocab: vocabReducer,
    auth: authReducer,
    folder: folderReducer
  },
})
