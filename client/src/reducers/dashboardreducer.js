export default function reducer(state={},action){
    
    switch(action.type){
        case "FETCH_USER_DATA":
        state={...state,data:action.payload}
        break;

        default:
        break;
    }
    return state

}

