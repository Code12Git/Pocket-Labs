import { privateRequest, publicRequest } from '../../helpers/axios';
import {
  ADD_EXPENSE_REQUEST,
  ADD_EXPENSE_SUCCESS,
  ADD_EXPENSE_FAILURE,
  FETCH_EXPENSES_REQUEST,
  FETCH_EXPENSES_SUCCESS,
  FETCH_EXPENSES_FAILURE,
  UPDATE_EXPENSE_STATUS_REQUEST,
  UPDATE_EXPENSE_STATUS_SUCCESS,
  UPDATE_EXPENSE_STATUS_FAILURE,
} from '../actionTypes/actionTypes';
import toast from 'react-hot-toast';
import { getApiErrorMessage } from '../../utils/errorHandler';

// Create Expense (Employee)
export const createExpense = (data) => async (dispatch) => {
  dispatch({ type: ADD_EXPENSE_REQUEST });
  try {
    const response = await privateRequest.post('/expense', data);
    dispatch({ type: ADD_EXPENSE_SUCCESS, payload: response.data });
    toast.success('Expense added successfully!');
  } catch (err) {
    dispatch({
      type: ADD_EXPENSE_FAILURE,
      payload: getApiErrorMessage(err),
    });
    toast.error(getApiErrorMessage(err));
  }
};

// Get Expenses (Employee or Admin)
export const getExpenses = () => async (dispatch) => {
  dispatch({ type: FETCH_EXPENSES_REQUEST });
  console.log('Triggered')
  try {
    const response = await privateRequest.get('/expense');
    console.log(response)
    dispatch({ type: FETCH_EXPENSES_SUCCESS, payload: response.data.data });
  } catch (err) {
    dispatch({
      type: FETCH_EXPENSES_FAILURE,
      payload: getApiErrorMessage(err),
    });
    toast.error(getApiErrorMessage(err));
  }
};

// Update Expense Status (Admin Only)
export const updateExpenseStatus = (expenseId, status) => async (dispatch) => {
  dispatch({ type: UPDATE_EXPENSE_STATUS_REQUEST });
  try {
    const response = await publicRequest.patch(`/expenses/${expenseId}/status`, { status });
    dispatch({ type: UPDATE_EXPENSE_STATUS_SUCCESS, payload: response.data });
    toast.success('Expense status updated!');
  } catch (err) {
    dispatch({
      type: UPDATE_EXPENSE_STATUS_FAILURE,
      payload: getApiErrorMessage(err),
    });
    toast.error(getApiErrorMessage(err));
  }
};
