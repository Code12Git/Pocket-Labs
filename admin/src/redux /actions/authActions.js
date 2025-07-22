import { publicRequest } from '../../helpers/axios';
import { 
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAILURE,
} from '../actionTypes/actionTypes';
import toast from 'react-hot-toast';
import { getApiErrorMessage } from '../../utils/errorHandler';


export const  adminLogin = (credentials, navigate) => async (dispatch) => {
  dispatch({ type: ADMIN_LOGIN_REQUEST });
  try {
    const response = await publicRequest.post('/auth/login', credentials);
    dispatch({
      type: ADMIN_LOGIN_SUCCESS,
      payload: {
        user: response.data.data.user,
        token: response.data.data.token
      }
    });
    toast.success("User Logged In Successfully");
    navigate('/');
  } catch (err) {
    dispatch({
      type: ADMIN_LOGIN_FAILURE,
      payload: err?.response?.data?.code?.message || 
              err?.response?.data?.message || 
              err?.message || 
              'Login failed'
    });
    toast.error(getApiErrorMessage(err));
  }
};

