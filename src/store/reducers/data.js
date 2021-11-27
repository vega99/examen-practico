import { SET_DATA, SET_LOADING } from "../actions/data";

const initialState = {
  questions: [],
  answers: [],
  users: [],
  isLoading: false  
}


export default (state = initialState, action) =>  {
  switch (action.type) {
    case SET_DATA:
      return {                
        questions: action.data.questions,
        answers: action.data.answers,    
        users: action.data.users, 
        isLoading: false   
      }
    case SET_LOADING: 
      return {
        ...state,
        isLoading: action.isLoading
      }
    default:
      return state;
  }
}