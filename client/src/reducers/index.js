import { combineReducers } from "redux";
import authReducer from "./authReducer";
import usersReducer from "./userReducer";
import currentUserReducer from "./currentUser";
import transactionReducer from "./transactionReucer";
import getCurrentUser from "./getCurrentUser";
// import questionsReducer from "./questions";
// import usersReducer from "./users";

export default combineReducers({
    authReducer,
    currentUserReducer,
    usersReducer,
    transactionReducer,
    getCurrentUser
    //   questionsReducer,
    //   usersReducer,
});