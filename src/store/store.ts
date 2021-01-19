import {applyMiddleware, combineReducers, createStore} from "redux";
import {loginReducer} from "./login-reducer";
import {registrationReducer} from "./registration-reducer";
import {profileReducer} from "./profile-reducer";
import {recoveryPassReducer} from "./recoveryPass-reducer";
import {enterNewPassReducer} from "./enterNewPass-reducer";
import thunk from "redux-thunk";
import {packsReducer} from "./packs-reducer";

const reducers = combineReducers({
    login: loginReducer,
    registration: registrationReducer,
    profile: profileReducer,
    recoveryPass: recoveryPassReducer,
    enterNewPass: enterNewPassReducer,
    packs: packsReducer
})

export const store = createStore(reducers, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof reducers>