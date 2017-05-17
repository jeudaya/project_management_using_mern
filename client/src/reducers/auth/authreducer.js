export default function reducer(state={"isAuth":false},action){
    
    switch(action.type){
        case "ADD_USER":
        console.log("Add User Reducer data",action.payload)
        var msg
        if(action.payload.success){
        msg="User Registered Successfully"
         state={...state,data:msg}   
        }
        else{
             msg="User Registration failed"
            state={...state,data:msg}
        }
       
        break;     
        case "LOGIN_USER":
        
        console.log("Add User Reducer data",action.payload)
        var msg
        if(action.payload.success){    
         state={...state,data:action.payload.data,isAuth:true}   
        }
        else{         
            state={...state,data:[],msg:'Login Failed'}
        }
        break; 

        default:
        break;
    }
    return state
}

