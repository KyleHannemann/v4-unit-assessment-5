
const initialState = {
    username: '',
    profile_pic: ''
}
const UPDATE_USER = 'UPDATE_USER'
const LOGOUT = 'LOGOUT'
export function updateUser(user){
    return{
        type:UPDATE_USER,
        payload: user 
    }
}
export function logout(){
    return{
        type:LOGOUT
    }
}

export default function reducer(state=initialState, action){
    switch(action.type){
        case LOGOUT:
            return {
                username: '',
                profile_pic: ''
            }
        case UPDATE_USER:
            return {username: action.payload.username, profile_pic: action.payload.profile_pic}
        default:
            return state;
    }
}