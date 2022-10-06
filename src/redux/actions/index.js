// Coloque aqui suas actions
const TYPE_LOGIN = 'TYPE_LOGIN';
export const TYPE_GET_CURRENCIES = 'TYPE_GET_CURRENCIES';
export const SAVE_INFOS = 'SAVE_INFOS';
export default TYPE_LOGIN;
export const TYPE_EXPENSE_ADD = 'TYPE_EXPENSE_ADD';
export const ACTION_UPDATE_TOTAL = 'ACTION_UPDATE_TOTAL';
export const TYPE_DELETE_EXPENSES = 'TYPE_DELETE_EXPENSES';

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

export const saveInfosThunk = (expense) => async (dispatch, getState) => {
  const currAPI2 = await fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((data) => data);
  const infos = Object.entries(currAPI2);
  expense.exchangeRates = {};
  infos.forEach((entrie) => {
    const [key, value] = entrie;
    expense.exchangeRates[key] = value;
  });
  const { wallet: { expenses } } = getState();
  let expenseUpdated = {};
  if (expenses.length === 0) {
    expenseUpdated.id = 0;
  } else {
    expenseUpdated.id = expenses.reduce((acc, exp) => {
      acc = Math.max(acc, exp.id) + 1;
      return acc;
    }, 0);
  }
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
};
