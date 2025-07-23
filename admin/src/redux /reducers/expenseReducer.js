import {
    FETCH_EXPENSES_REQUEST,
    FETCH_EXPENSES_SUCCESS,
    FETCH_EXPENSES_FAILURE,
    UPDATE_EXPENSE_STATUS_REQUEST,
    UPDATE_EXPENSE_STATUS_SUCCESS,
    UPDATE_EXPENSE_STATUS_FAILURE,
    SET_EXPENSE_FILTER,
    TOTAL_EXPENSES_REQUEST,
    TOTAL_EXPENSES_SUCCESS,
    TOTAL_EXPENSES_FAILURE,
    EXPENSE_OVER_TIME_REQUEST,
    EXPENSE_OVER_TIME_SUCCESS,
    EXPENSE_OVER_TIME_FAILURE,
    FETCH_AUDIT_LOGS_REQUEST,
    FETCH_AUDIT_LOGS_SUCCESS,
    FETCH_AUDIT_LOGS_FAILURE
  } from "../actionTypes/actionTypes";
  
  const initialState = {
    expenses: [],
    isLoading: false,
    error: null,
    filter:[],
    totalExpenses:[],
    expenseovertime:[],
    logs:[]
  };
  
  const expenseReducer = (state = initialState, { type, payload }) => {
    switch (type) {
   
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
          filter: state.expenses.filter(expense => expense.category.toLowerCase() === payload.toLowerCase())
        };

      case TOTAL_EXPENSES_REQUEST:
        return {
          ...state,
          isLoading:true
        }

      case TOTAL_EXPENSES_SUCCESS:
        return {
          ...state,
          totalExpenses:payload
        }  

      case TOTAL_EXPENSES_FAILURE:
        return {
          ...state,
          error:payload
        }  

      case EXPENSE_OVER_TIME_REQUEST:
        return {
          ...state,
          isLoading:false
        }  

      case EXPENSE_OVER_TIME_SUCCESS:
        return {
          ...state,
          expenseovertime:payload
        }  
  
      case EXPENSE_OVER_TIME_FAILURE:
        return {
          ...state,
          error:payload
        }

      case FETCH_AUDIT_LOGS_REQUEST:
         return {
          ...state,
          isLoading:true
        }  
      
      case FETCH_AUDIT_LOGS_SUCCESS:{
        return {
          ...state,
          logs:payload
        }
      }  

      case FETCH_AUDIT_LOGS_FAILURE:{
        return {
          ...state,
          error:payload,
          isLoading:false
        }
      }

      default:
        return state;
    }
  };
  
export default expenseReducer;
  