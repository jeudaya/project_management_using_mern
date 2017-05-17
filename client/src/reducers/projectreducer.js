export default function reducer(state={
    projectdata: [],
    modalIsOpen: false,
    modalTitle: "",
    project: {}
},action){
   
    switch(action.type){
        case "FETCH_PROJECTS":
       state = {...state, projectdata: action.payload }
        break;
              case "CLOSE_MODAL":
            state = {...state, modalIsOpen: action.payload.modalIsOpen, project: {} }
            break;

              case "OPEN_MODAL":
            state = {...state, modalIsOpen: action.payload.modalIsOpen, modalTitle: action.payload.modalTitle, project: action.payload.project }
            break;

              case "EDIT_OPEN_MODAL":
            state = {...state, modalIsOpen: action.payload.modalIsOpen, modalTitle: action.payload.modalTitle, project: action.payload.project }
            break;

             case "UPDATE_PROJECT":
       
        const newProject = [...state.projectdata]
          const projectToUpdate = newProject.findIndex(project => project._id === action.payload._id)
            newProject[projectToUpdate] = action.payload;
           state = {...state, modalIsOpen: false, user: {},projectdata:newProject}
        break;

 case "DELETE_PROJECT":
            state = {...state, projectdata: state.projectdata.filter(project => project._id !== action.payload) }
            break;

                 case "ADD_PROJECT":
      
            state = {...state, projectdata:[...state.projectdata,action.payload],modalIsOpen:false, project:{} }
            break;
        default:
        break;
    }
    return state
}