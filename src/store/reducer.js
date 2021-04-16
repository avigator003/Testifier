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
    
    sidebarShow: 'responsive',
    timer: parseInt(localStorage.getItem('timer')) || 0,
   
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
            console.log("lo")
            return {
                ...state,
                user:null
            }
             case actionTypes.SET_RESET_TOKEN:
                return {
                    ...state,
                    resetToken:action.payload
                }
                case 'set':
                return {...state, sidebarShow:action.sidebarShow}


           case actionTypes.UPDATE_TIMER:{
             return {
                 ...state,
                 timer:state.timer++
             }
         }
         case actionTypes.RESET_TIMER:{
             return {
                 ...state,
                 timer : 0
             }
         }
        case actionTypes.SET_TIMER:
            return {
                ...state,
                timer : action.payload
            }
     

        default:
            return state;
    }
};

export default reducer;