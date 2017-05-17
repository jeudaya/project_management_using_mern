 import axios from 'axios';
 import {Route,browserHistory} from 'react-router';
export function registerUser(userdata){
    console.log("Calling function !!!-RegisterUser")
    return function(dispatch){
         
    axios.post('http://localhost:8080/api/adduser',userdata).then((response)=>{         
        if(response.data.success)
        {
        console.log("Registered Successfully")
        dispatch({type:"ADD_USER",payload:response.data})
         browserHistory.push('/login');
    }else{
          console.log("Registeration failed")
        dispatch({type:"ADD_USER",payload:response.data})
        }
    })
    }

}
export function loginUser(userdata){
    console.log("Calling function !!!-RegisterUser")
    return function(dispatch){
         
    axios.post('http://localhost:8080/api/loginuser',userdata).then((response)=>{         
        if(response.data.success)
        {
        
      
        dispatch({type:"LOGIN_USER",payload:response.data})
        if(response.data.data.isAdmin){
            
            localStorage.setItem('userdetails',JSON.stringify(response.data.data))
            browserHistory.push('/dashboardadmin');
        }
        else{
            console.log("Normal User")
          
            localStorage.setItem('userdetails',JSON.stringify(response.data.data))
              browserHistory.push('/dashboard');
        }
        
         
    }else{
          console.log("Login failed")
        dispatch({type:"LOGIN_USER",payload:response.data})
        }
    })
    }
}



