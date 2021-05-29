import axios from 'axios'
import {
  USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT,
  USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,
  USER_PROFILE_FAIL, USER_PROFILE_SUCCESS, USER_PROFILE_REQUEST
} from '../constants/userConstants'

export const login=(email, password)=>async(dispatch, getState)=>{
    try {
        dispatch({type: USER_LOGIN_REQUEST})
        const {data}= await axios.post('http://localhost:5000/api/users/login', {email, password})

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        //save loginuser to localstorage
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ?error.response.data.message
            : error.message})
    }
}

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");

  dispatch({
    type: USER_LOGOUT,
  });
};

export const register=(name, email, password)=>async (dispatch)=>{
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });
   
    const { data } = await axios.post("http://localhost:5000/api/users", {
      name,
      email,
      password,
    });

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));

  } catch (err) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
}

export const profileDetails=()=>async(dispatch, getState)=>{
  try {
    dispatch({type: USER_PROFILE_REQUEST})
    const {userlogin: {userInfo}}= getState()
    const header={
      headers:{
        authorization: `Bearer ${userInfo.token}`
      }
    }
    const { data } = await axios.get("http://localhost:5000/api/users/profile", header);
    console.log(data)
    dispatch({
      type: USER_PROFILE_SUCCESS,
      payload: data
    })
    
  } catch (err) {
    dispatch({
      type: USER_PROFILE_FAIL,
      payload: err.response && err.response.data.message? err.response.data.message : err.message
    })
  }
}