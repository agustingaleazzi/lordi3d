import { combineReducers } from "redux";

import userReducer from "./User/user.reducer";

//combine all reducers
export default combineReducers({
    user: userReducer
});