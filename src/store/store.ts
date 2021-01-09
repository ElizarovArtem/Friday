import {combineReducers, createStore} from "redux";
import {loginReducer} from "./login-reducer";
import {registrationReducer} from "./registration-reducer";
import {profileReducer} from "./profile-reducer";
import {recoveryPassReducer} from "./recoveryPass-reducer";
import {enterNewPassReducer} from "./enterNewPass-reducer";

const reducers = combineReducers({
    login: loginReducer,
    registration: registrationReducer,
    profile: profileReducer,
    recoveryPass: recoveryPassReducer,
    enterNewPass: enterNewPassReducer
})

export const store = createStore(reducers)

export type AppRootStateType = ReturnType<typeof reducers>