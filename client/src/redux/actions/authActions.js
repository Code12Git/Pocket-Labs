import { publicRequest } from '../../helpers/axios';
import { 
  REGISTER_REQUEST, 
  REGISTER_SUCCESS, 
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from '../actionTypes/actionTypes';
import toast from 'react-hot-toast';
import { getApiErrorMessage } from '../../utils/errorHandler';

export const registerUser = (data, navigate) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const response = await publicRequest.post('/auth/register', data);
    dispatch({ 
      type: REGISTER_SUCCESS, 
      payload: {
        user: response.data.user,
        token: response.data.token
      }
    });
    toast.success("User Registered Successfully");
    navigate('/login');
  } catch (err) {
    dispatch({
      type: REGISTER_FAILURE,
      payload: err?.response?.data?.code?.message || 
              err?.response?.data?.message || 
              err?.message || 
              'Registration failed'
    });
    toast.error(getApiErrorMessage(err));
  }
};

export const loginUser = (credentials, navigate) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const response = await publicRequest.post('/auth/login', credentials);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        user: response.data.data.user,
        token: response.data.data.token
      }
    });
    toast.success("User Logged In Successfully");
    navigate('/expense');
  } catch (err) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: err?.response?.data?.code?.message || 
              err?.response?.data?.message || 
              err?.message || 
              'Login failed'
    });
    toast.error(getApiErrorMessage(err));
  }
};


export const logout = () => async (dispatch) => {
  try{
    localStorage.removeItem('persist:root')
    dispatch({ type:LOGOUT })
    toast.success('User Logout Successfully')
  }catch(err){
    toast.error(getApiErrorMessage(err));
  }
}