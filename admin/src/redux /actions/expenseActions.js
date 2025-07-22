import { privateRequest } from '../../helpers/axios';
import {
  FETCH_EXPENSES_REQUEST,
  FETCH_EXPENSES_SUCCESS,
  FETCH_EXPENSES_FAILURE,
  SET_EXPENSE_FILTER,
  UPDATE_EXPENSE_STATUS_SUCCESS,
  UPDATE_EXPENSE_STATUS_FAILURE,
} from '../actionTypes/actionTypes';
import toast from 'react-hot-toast';
import { getApiErrorMessage } from '../../utils/errorHandler';


export const getExpenses = () => async (dispatch) => {
  dispatch({ type: FETCH_EXPENSES_REQUEST });
  console.log('Triggered')
  try {
    const response = await privateRequest.get('/expense/all');
    console.log(response.data.data)
    dispatch({ type: FETCH_EXPENSES_SUCCESS, payload: response.data.data });
  } catch (err) {
    dispatch({
      type: FETCH_EXPENSES_FAILURE,
      payload: getApiErrorMessage(err),
    });
    toast.error(getApiErrorMessage(err));
  }
};


export const changeStatus = (id,status) => async (dispatch) => {
  console.log(status)
  try{
    const response = await privateRequest.post(`/expense/${id}/status`,{status:status});
    console.log(response.data.data)
    dispatch({ type: UPDATE_EXPENSE_STATUS_SUCCESS, payload: response.data.data });
  }catch(err){
    dispatch({type:UPDATE_EXPENSE_STATUS_FAILURE,payload:getApiErrorMessage(err)})
    toast.error(getApiErrorMessage(err))
  }
}


export const filterExpense = (data) => (dispatch) => {
  console.log(data)
  try{
    dispatch({ type:SET_EXPENSE_FILTER ,payload:data})
  }catch(err){
    toast.error(getApiErrorMessage(err));
  }
}