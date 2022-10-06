export const getExchangeRates = async (expense) => {
  const currAPI2 = await fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((data) => data);
  const infos = Object.entries(currAPI2);
  expense.exchangeRates = {};
  infos.forEach((entrie) => {
    const [key, value] = entrie;
    expense.exchangeRates[key] = value;
  });
  return expense;
};

export const getExpenseId = (expenseUpdated, expenses) => {
  if (expenses.length === 0) {
    expenseUpdated.id = 0;
  } else {
    expenseUpdated.id = expenses.reduce((acc, exp) => {
      acc = Math.max(acc, exp.id) + 1;
      return acc;
    }, 0);
  }
  return expenseUpdated;
};
