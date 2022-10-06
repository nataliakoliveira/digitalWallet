// Coloque aqui suas actions
import { getExchangeRates, getExpenseId } from '../../util/util';

export const TYPE_LOGIN = 'TYPE_LOGIN';
export const TYPE_GET_CURRENCIES = 'TYPE_GET_CURRENCIES';
export const SAVE_INFOS = 'SAVE_INFOS';
export const TYPE_EXPENSE_ADD = 'TYPE_EXPENSE_ADD';
export const ACTION_UPDATE_TOTAL = 'ACTION_UPDATE_TOTAL';
export const TYPE_DELETE_EXPENSES = 'TYPE_DELETE_EXPENSES';
export const CHANGE_LOADING = 'CHANGE_LOADING';

export const actionExpenseADD = (expense) => ({
  type: TYPE_EXPENSE_ADD,
  payload: expense,
});

export const actionUpdateTotal = (total) => ({
  type: ACTION_UPDATE_TOTAL,
  payload: total,
});

export const deleteExpenses = (newExpense, valueRm) => ({
  type: TYPE_DELETE_EXPENSES,
  payload: { newExpense, valueRm },
});

export const loadingAction = (visible) => ({
  type: CHANGE_LOADING,
  payload: visible,
});

export const saveInfosThunk = (expense) => async (dispatch, getState) => {
  dispatch(loadingAction(true));
  expense = await getExchangeRates(expense);
  const { wallet: { expenses } } = getState();
  let expenseUpdated = {};
  expenseUpdated = getExpenseId(expenseUpdated, expenses);
  expenseUpdated = { id: expenseUpdated.id, ...expense };
  let totalExpense = 0;
  expenses.forEach((exp) => {
    totalExpense += exp.value * exp.exchangeRates[exp.currency].ask;
  });
  totalExpense += expenseUpdated.value
  * expenseUpdated.exchangeRates[expenseUpdated.currency].ask;
  console.log(totalExpense);
  dispatch(actionExpenseADD(expenseUpdated));
  dispatch(actionUpdateTotal(totalExpense.toFixed(2)));
  dispatch(loadingAction(false));
};
