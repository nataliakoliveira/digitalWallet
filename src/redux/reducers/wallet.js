// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  TYPE_EXPENSE_ADD, TYPE_GET_CURRENCIES, ACTION_UPDATE_TOTAL, TYPE_DELETE_EXPENSES,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  total: 0.00,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TYPE_GET_CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };
  case TYPE_EXPENSE_ADD:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };

  case ACTION_UPDATE_TOTAL:
    return {
      ...state,
      total: action.payload,
    };

  case TYPE_DELETE_EXPENSES:
    return {
      ...state,
      expenses: action.payload.newExpense,
      total: (state.total - action.payload.valueRm).toFixed(2),
    };
  default:
    return state;
  }
};

export default walletReducer;

/* wallet: {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
} */
