export default function reducer(state={
    requirementdata: [],
    modalIsOpen: false,
    modalTitle: "",
    requirement: {}
},action){
   
    switch(action.type){
        case "FETCH_REQUIREMENTS":
       state = {...state, requirementdata: action.payload }
        break;
              case "CLOSE_MODAL":
            state = {...state, modalIsOpen: action.payload.modalIsOpen, requirement: {} }
            break;

              case "OPEN_MODAL":
            state = {...state, modalIsOpen: action.payload.modalIsOpen, modalTitle: action.payload.modalTitle, requirement: action.payload.requirement }
            break;

              case "EDIT_OPEN_MODAL":
            state = {...state, modalIsOpen: action.payload.modalIsOpen, modalTitle: action.payload.modalTitle, requirement: action.payload.requirement }
            break;

             case "UPDATE_REQUIREMENT":
       
        const newRequirement = [...state.requirementdata]
          const requirementToUpdate = newRequirement.findIndex(requirement => requirement._id === action.payload._id)
            newRequirement[requirementToUpdate] = action.payload;
           state = {...state, modalIsOpen: false, user: {},requirementdata:newRequirement}
        break;

 case "DELETE_REQUIREMENT":
            state = {...state, requirementdata: state.requirementdata.filter(requirement => requirement._id !== action.payload) }
            break;

                 case "ADD_REQUIREMENT":
      
            state = {...state, requirementdata:[...state.requirementdata,action.payload],modalIsOpen:false, requirement:{} }
            break;
        default:
        break;
    }
    return state
}