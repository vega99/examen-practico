import { LOG_OUT, LOG_IN } from "../actions/auth";

let user = localStorage.getItem("userQA")
? JSON.parse(localStorage.getItem("userQA"))
: "";

const initialState = {
userDetails: "" || user,
isAuth: user ? true : false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case  LOG_IN:
      return {
        userDetails: action.user,
        isAuth: true
      }      
    case LOG_OUT:
      return {
        userDetails: "",
        isAuth: false
      }
    default:
      return state;
  }
}