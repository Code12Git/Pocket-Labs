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
    SET_EXPENSE_FILTER
  } from "../actionTypes/actionTypes";
  
  const initialState = {
    expenses: [],
    isLoading: false,
    error: null,
    filter: null
  };
  
  const expenseReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      // ADD EXPENSE
      case ADD_EXPENSE_REQUEST:
        return {
          ...state,
          isLoading: true,
          error: null
        };
      case ADD_EXPENSE_SUCCESS:
        return {
          ...state,
          isLoading: false,
          expenses: [...state.expenses, payload],
          error: null
        };
      case ADD_EXPENSE_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: payload
        };
  
      // FETCH EXPENSES
      case FETCH_EXPENSES_REQUEST:
        return {
          ...state,
          isLoading: true,
          error: null
        };
      case FETCH_EXPENSES_SUCCESS:
        return {
          ...state,
          isLoading: false,
          expenses: payload,
          error: null
        };
      case FETCH_EXPENSES_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: payload
        };
  
      // UPDATE STATUS
      case UPDATE_EXPENSE_STATUS_REQUEST:
        return {
          ...state,
          isLoading: true,
          error: null
        };
      case UPDATE_EXPENSE_STATUS_SUCCESS:
        return {
          ...state,
          isLoading: false,
          expenses: state.expenses.map(expense =>
            expense._id === payload._id ? payload : expense
          ),
          error: null
        };
      case UPDATE_EXPENSE_STATUS_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: payload
        };
  
      // FILTER EXPENSES (admin)
      case SET_EXPENSE_FILTER:
        return {
          ...state,
          filter: payload
        };
  
      default:
        return state;
    }
  };
  
export default expenseReducer;
  