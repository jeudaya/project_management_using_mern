
import { combineReducers } from "redux"

import user from "./userreducer"
import project from "./projectreducer"
import dashboard from "./dashboardreducer"
import auth from './auth/authreducer'
import requirement from './requirementreducer'

export default combineReducers({
  user,
  project,
  auth,
  dashboard,
  requirement
})