

const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
const changePassword = (password: string):ChangePasswordType  => {
    return {
        type: CHANGE_PASSWORD,
        password
    }
}


const InitialState = {
    newPassword:''
}



export const enterNewPassReducer = (state: InitialStateType = InitialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case CHANGE_PASSWORD: 
            return {
                ...state,
                newPassword: action.password
            }
        default:
            return state
    }
};


type ChangePasswordType = {
    type: typeof CHANGE_PASSWORD,
    password: string 
}
type ActionTypes = ChangePasswordType
type InitialStateType = typeof InitialState