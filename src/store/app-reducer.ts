

const InitialState = {}

export const appReducer = (state: InitialStateType = InitialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {

        default:
            return state
    }
};

type ActionTypes = any
type InitialStateType = any