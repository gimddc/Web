import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";

import dataReducer from "./modules/dataStore";
import openReducer from "./modules/openStore";
import tagsReducer from "./modules/tagsStore";
import langReducer from "./modules/langStore";

const store = configureStore({
  reducer: {
    dataList: dataReducer,
    open: openReducer,
    tags: tagsReducer,
    lang: langReducer
  }
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
