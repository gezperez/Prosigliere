import { configureStore } from '@reduxjs/toolkit';
import hpReducer from './hpSlice';

export const store = configureStore({
  reducer: {
    hp: hpReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'hp/fetchCharacters/pending',
          'hp/fetchCharacters/fulfilled',
          'hp/fetchCharacters/rejected',
        ],
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        ignoredPaths: ['hp.characters', 'hp.spells'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
