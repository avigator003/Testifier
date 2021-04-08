import * as actionTypes from './ActionTypes';
import { getPersistedState } from './persist';

const initialState = {
     user:getPersistedState('user') || null,
     //TOSATER
    toaster: {
        msg:null,
        timeout:0,
        color:'green'
    },
    //Timer
    
}


const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.LOGIN_USER_SUCCESS:
            return {
                ...state,
                user:action.payload
            }
        case actionTypes.LOGOUT_USER:
            return {
                ...state,
                user:null
            }
             case actionTypes.SET_RESET_TOKEN:
                return {
                    ...state,
                    resetToken:action.payload
                }

        default:
            return state;
    }
};

export default reducer;