import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import storage from "redux-persist/lib/storage";
import apiSlice from "../service/api/apiSlice";
import user from "./slices/user.slice";
import hardSet from "redux-persist/es/stateReconciler/hardSet";
import logoutMiddleware from "./middleware/logoutMiddleware";
import filterSlice from "./slices/filter.slice";
import storiesSlice from './slices/stories.slice'

const rootReducer = combineReducers({
  user,
  filter: filterSlice,
  stories: storiesSlice,
  [apiSlice.reducerPath]: apiSlice.reducer
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  transforms: [
    encryptTransform({
      secretKey: import.meta.env.VITE_REACT_APP_ENCRYPT_KEY,
      onError: function (error) {
        console.log(error);
      }
    })
  ],
  stateReconciler: hardSet,
  // blacklist: apiSlice.reducerPath,
  blacklist: [apiSlice.reducerPath]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
      // serializableCheck: false,
    }).concat(apiSlice.middleware, logoutMiddleware)
});

const persistor = persistStore(store);

export { store, persistor };
