import {combineReducers, createStore} from "redux";
import {appReducer} from "./app-reducer";
import {authReducer} from "./auth-reducer";
import {profileReducer} from "./profile-reducer";

const reducers = combineReducers({
    app: appReducer,
    auth: authReducer,
    profile: profileReducer
})

export const store = createStore(reducers)

export type AppRootStateType = ReturnType<typeof reducers>