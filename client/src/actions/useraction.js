
 import axios from 'axios'
export function fetchUser(){   
    return function(dispatch){
         
    axios.get('http://localhost:8080/api/getusers').then((response)=>{
        dispatch({type:"FETCH_USERS",payload:response.data.data})
    })
    }

}


export function fetchUserRequirement(id){   
    return function(dispatch){
    axios.get('http://localhost:8080/api/getuserrequirements/'+id).then((response)=>{
        dispatch({type:"FETCH_USER_REQ",payload:response.data.data})
    })
    }
}


export function fetchProjectRequirement(userid,projectid){   
    return function(dispatch){
        console.log("fetchUserRequirement")
    axios.get('http://localhost:8080/api/getuserrequirements/'+userid+'/'+projectid).then((response)=>{
      console.log("response",response.data)
        dispatch({type:"FETCH_PROJECT_REQ",payload:response.data.data})
    })
    }
}
 export function updateUserRequirement(item,userid){   
    return function(dispatch){         
    axios.put('http://localhost:8080/api/updateuserrequirement/'+item._id+'/'+userid,item).then((response)=>{        
        dispatch({type:"UPDATE_USER_REQUIREMENT",payload:response.data.data})
    })
    }

}

 export function deleteUser(item){   
    return function(dispatch){         
    axios.delete('http://localhost:8080/api/removeuser/'+item).then((response)=>{        
        dispatch({type:"DELETE_USERS",payload:item})
    })
    }

}
export function openModal(item){   
    return function(dispatch){
         dispatch({type:"OPEN_MODAL",payload:item})
   
    }

}
export function closeModal(item){   
    return function(dispatch){
         dispatch({type:"CLOSE_MODAL",payload:item})
   
    }
}
export function editOpenModal(item){   
    return function(dispatch){
         dispatch({type:"EDIT_OPEN_MODAL",payload:item})
   
    }

}
 export function updateUser(item){   
    return function(dispatch){         
    axios.put('http://localhost:8080/api/updateuser/'+item._id,item).then((response)=>{        
        dispatch({type:"UPDATE_USER",payload:item})
    })
    }

}

 export function addUser(item){   
    return function(dispatch){         
    axios.post('http://localhost:8080/api/adduser',item).then((response)=>{        
        console.log("RESPONSE",response.data)
        dispatch({type:"ADD_USER",payload:response.data.data})
    })
    }

}




