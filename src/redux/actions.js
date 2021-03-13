//action types
export const CLEAR_USER_DATA = 'CLEAR_USER_DATA'
export const CHANGE_LOG_STATUS = 'CHANGE_LOG_STATUS'
export const UPDATE_LANGUAGE = 'UPDATE_LANGUAGE'
export const UPDATE_USER_DEETS = 'UPDATE_USER_DEETS'

//action creators
export const clear_user_data = update => ({
    type : CLEAR_USER_DATA,
    payload : update
})

export const change_log_stat = update => ({
    type : CHANGE_LOG_STATUS,
    payload : update
})

export const update_language = update => ({
    type : UPDATE_LANGUAGE,
    payload : update
})

export const update_user_info = update => ({
    type : UPDATE_USER_DEETS,
    payload : update
})

//async action creators
export const loginUser = (email , password) => async dispatch => {
    try{
        dispatch(change_log_stat(true))
        //do async call for login
        dispatch(update_user_info({this_is : temp_user}))
    }catch(e){
        dispatch(change_log_stat(false))
        alert(e)
        console.log(e);
    }
}