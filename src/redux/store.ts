import {configureStore} from "@reduxjs/toolkit";
import compilerSlice from "./slices/CompilerSlice";
import userSlice from "./slices/UserSlice";

export const store = configureStore({
  reducer: {
    compilerSlice,
    userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
