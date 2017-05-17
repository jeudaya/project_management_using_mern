 import axios from 'axios'

export function fetchProjects(){   
    return function(dispatch){
         
    axios.get('http://localhost:8080/api/getprojects').then((response)=>{
        dispatch({type:"FETCH_PROJECTS",payload:response.data.data})
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
 export function updateProject(item){   
    return function(dispatch){         
    axios.put('http://localhost:8080/api/updateproject/'+item._id,item).then((response)=>{        
        dispatch({type:"UPDATE_PROJECT",payload:item})
    })
    }

}


export function addProject(item){   
    return function(dispatch){         
    axios.post('http://localhost:8080/api/addproject/',item).then((response)=>{        
        dispatch({type:"ADD_PROJECT",payload:response.data.data})
    })
    }

}

 export function deleteProject(item){   
    return function(dispatch){         
    axios.delete('http://localhost:8080/api/removeproject/'+item).then((response)=>{        
        dispatch({type:"DELETE_PROJECT",payload:item})
    })
    }

}

