import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers";
import { useDispatch } from "react-redux";

const persistConfig = {
  key: "root",
  version: 8,
  storage,
  blacklist: ["todo", "stock", "asset", "mca", "viewHistory"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const stockListener = {
  type: "stock/saveStock",
  effect: async () => {},
};
const listenerMiddleware = createListenerMiddleware();
export const stockUnsubscribe =
  listenerMiddleware.startListening(stockListener);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).prepend(
      listenerMiddleware.middleware
    ),
});
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();

export const persistor = persistStore(store);
