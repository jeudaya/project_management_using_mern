export default function reducer(state = {
    userdata: [],
    modalIsOpen: false,
    modalTitle: "",
    user: {},
    userreq:[],
    projectreq:[],
    index:""
}, action) {
    switch (action.type) {
        case "FETCH_USERS":
            state = {...state, userdata: action.payload }
            break;

            case "FETCH_USER_REQ":
            state = {...state, userreq:action.payload}
            break;

            case "FETCH_PROJECT_REQ":
            state = {...state, projectreq:action.payload}
            break;
              case "UPDATE_USER_REQUIREMENT":             
           state = {...state, userreq:action.payload}           
            break;
        case "DELETE_USERS":
            state = {...state, userdata: state.userdata.filter(user => user._id !== action.payload) }
            break;
        case "OPEN_MODAL":
            state = {...state, modalIsOpen: action.payload.modalIsOpen, modalTitle: action.payload.modalTitle, user: action.payload.user }
            break;
        case "CLOSE_MODAL":
            state = {...state, modalIsOpen: action.payload.modalIsOpen, user: {} }
            break;


        case "EDIT_OPEN_MODAL":
            state = {...state, modalIsOpen: action.payload.modalIsOpen, modalTitle: action.payload.modalTitle, user: action.payload.user,index:action.payload.index }
            break;
        case "UPDATE_USER":
       
        const newUser = [...state.userdata]
          const userToUpdate = newUser.findIndex(user => user._id === action.payload._id)
            newUser[userToUpdate] = action.payload;
           state = {...state, modalIsOpen: false, user: {},userdata:newUser}
        break;
         case "ADD_USER":
            console.log("add user",action.payload)
            state = {...state, userdata:[...state.userdata,action.payload],modalIsOpen:false, user:{} }
            break;
    }
    return state

}
