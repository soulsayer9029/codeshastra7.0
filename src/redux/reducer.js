import {combineReducers} from 'redux'
import {CHANGE_LOG_STATUS , CLEAR_USER_DATA , UPDATE_LANGUAGE , UPDATE_USER_DEETS} from './actions.js'

const merge = (prev,next) => Object.assign({} , prev,next)

const userReducer = (state = {} , action) => {
    switch(action.type){
        case CLEAR_USER_DATA:
            return ({})
        case UPDATE_USER_DEETS:
            return ({user_info : action.payload})
        default:
            return state
    }
}

const logReducer = (state = false , action) => {
    switch(action.type){
        case CHANGE_LOG_STATUS:
            return (action.payload)
        default:
            return state
    }
}

const langReducer = (state = "en" , action) => {
    //en for english(default)
    //hnd for hindi
    switch(action.type){
        case UPDATE_LANGUAGE:
            return (action.payload)
        default:
            return state
    }
}

const reducer = combineReducers({
    user : userReducer,
    log : logReducer,
    lang : langReducer
})

export default reducer