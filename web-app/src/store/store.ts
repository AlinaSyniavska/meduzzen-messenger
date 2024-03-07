import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import type { PreloadedState } from "@reduxjs/toolkit";

import { messagesApi } from "./apis";

const rootReducer = combineReducers({
    [messagesApi.reducerPath]: messagesApi.reducer,
})

// export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
export const setupStore = (preloadedState?: Partial<RootState>) => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            // adding the api middleware enables caching, invalidation, polling and other features of `rtk-query`
            getDefaultMiddleware().concat(
                messagesApi.middleware,
            ),
        preloadedState,
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']