import { privateRequest } from '../../helpers/axios';
import {
  FETCH_EXPENSES_REQUEST,
  FETCH_EXPENSES_SUCCESS,
  FETCH_EXPENSES_FAILURE,
  SET_EXPENSE_FILTER,
  UPDATE_EXPENSE_STATUS_SUCCESS,
  UPDATE_EXPENSE_STATUS_FAILURE,
  TOTAL_EXPENSES_SUCCESS,
  TOTAL_EXPENSES_FAILURE,
  TOTAL_EXPENSES_REQUEST,
  EXPENSE_OVER_TIME_FAILURE,
  EXPENSE_OVER_TIME_REQUEST,
  EXPENSE_OVER_TIME_SUCCESS,
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
  } catch(err){
    dispatch({type:UPDATE_EXPENSE_STATUS_FAILURE,payload:getApiErrorMessage(err)})
    toast.error(getApiErrorMessage(err))
  }
}


export const filterExpense = (data) => (dispatch) => {
  console.log(data)
  try{
    dispatch({ type:SET_EXPENSE_FILTER ,payload:data})
  } catch(err){
    toast.error(getApiErrorMessage(err));
  }
}


export const totalExpense = () => async (dispatch) => {
  dispatch({type:TOTAL_EXPENSES_REQUEST})
  try{
    const response = await privateRequest.get('/expense/total-per-category')
    console.log("Response:",response)
    dispatch({ type:TOTAL_EXPENSES_SUCCESS,payload:response.data.data })
  } catch(err){
    dispatch({type:TOTAL_EXPENSES_FAILURE, payload: getApiErrorMessage(err)})
    toast.error(getApiErrorMessage(err))
  }
}


export const expenseOverTime = () => async (dispatch) => {
  dispatch({type:EXPENSE_OVER_TIME_REQUEST})
  try{
    const response = await privateRequest.get('/expense/over-time')
    console.log("Response:",response)
    dispatch({type:EXPENSE_OVER_TIME_SUCCESS,payload:response.data.data})
  }catch(err){
    dispatch({type:EXPENSE_OVER_TIME_FAILURE,payload:getApiErrorMessage(err)})
    toast.error(getApiErrorMessage(err))
  }
}