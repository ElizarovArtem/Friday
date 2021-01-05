

const InitialState = {}

export const authReducer = (state: InitialStateType = InitialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {

        default:
            return state
    }
};

type ActionTypes = any
type InitialStateType = any