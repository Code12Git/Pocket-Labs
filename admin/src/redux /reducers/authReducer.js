import {
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAILURE,
  LOGOUT,

} from "../actionTypes/actionTypes";

const initialState = {
  adminData: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  token: null
};

const authReducer = (state = initialState ,{ type , payload }) => {
  switch (type) {


    // LOGIN
    case ADMIN_LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case ADMIN_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        adminData: payload.user,
        isAuthenticated: true,
        token: payload.token,
        error: null
      };
    case ADMIN_LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload
      };

  
    case LOGOUT:
      return{
        ...state,
        isAuthenticated:false,
        adminData:null,
        token:null
      }  

    default:
      return state;
  }
};

export default authReducer;