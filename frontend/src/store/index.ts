import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './reducers/user/UserSlice'
import typesReduser from './reducers/types/TypesSlice'
const rootReducer = combineReducers({
    userReducer,
    typesReduser
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}


export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']