import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  CLEAR_ERRORS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
} from "../constants/userConstanat";


// login user
export function login(email, password) {
 
  return async function(dispatch) {
    try {
      dispatch({ type: LOGIN_REQUEST });

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(
        `/api/v1/login`,
        { email, password },
        config
      );

      dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    }
  };
}
// resgister user
export function signUp(signupData){
    
    return async function(dispatch){
       try {
            dispatch({ type: REGISTER_USER_REQUEST });
            const config = {
              headers: { "Content-Type": "multipart/form-data" },
            };

             const { data } = await axios.post(
               `/api/v1/register`,
               signupData,
               config
             );

             dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });

         

       } catch (error) {
           dispatch({type : REGISTER_USER_FAIL , payload : error.response.data.message})
       }

    }

}

// Load User (user Profile) if logged in before

export const load_UserProfile = () => async (dispatch) =>{

 try {
  dispatch({ type: LOAD_USER_REQUEST });

  const { data } = await axios.get("api/v1/profile");

  dispatch({type : LOAD_USER_SUCCESS , payload : data.user})
  
 } catch (error) {
    dispatch({type : LOAD_USER_FAIL , payload : error.response.data.message})
 }

}


// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};