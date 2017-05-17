 import axios from 'axios'

export function fetchRequirements(){   
    return function(dispatch){
         
    axios.get('http://localhost:8080/api/getrequirement').then((response)=>{       
        dispatch({type:"FETCH_REQUIREMENTS",payload:response.data.data})
    })
    }

}

export function closeModal(item){   
    return function(dispatch){
         dispatch({type:"CLOSE_MODAL",payload:item})
   
    }
}


export function openModal(item){   
    return function(dispatch){
         dispatch({type:"OPEN_MODAL",payload:item})
   
    }

}

export function editOpenModal(item){   
    return function(dispatch){
         dispatch({type:"EDIT_OPEN_MODAL",payload:item})
   
    }

}
 export function updateRequirement(item){   
    return function(dispatch){         
    axios.put('http://localhost:8080/api/updaterequirement/'+item._id,item).then((response)=>{        
        dispatch({type:"UPDATE_REQUIREMENT",payload:response.data.data[0]})
    })
    }

}


export function addRequirement(item){   
    return function(dispatch){         
    axios.post('http://localhost:8080/api/addrequirement/',item).then((response)=>{        
        dispatch({type:"ADD_REQUIREMENT",payload:response.data.data[0]})
    })
    }

}

 export function deleteRequirement(item){   
    return function(dispatch){         
    axios.delete('http://localhost:8080/api/removerequirement/'+item).then((response)=>{        
        dispatch({type:"DELETE_REQUIREMENT",payload:item})
    })
    }

}

