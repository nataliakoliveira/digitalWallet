import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpenses } from '../redux/actions';
import './Table.css';
import Loading from './Loading';

class Table extends Component {
  handleRemove = (id) => {
    const { expenses, deletarExpenses } = this.props;
    const filterExpenses = expenses.filter((expense) => expense.id !== id);
    const findExpense = expenses.find((expense) => expense.id === id);
    const value = (findExpense.value
* findExpense.exchangeRates[findExpense.currency].ask).toFixed(2);
    deletarExpenses(filterExpenses, value);
  };

  render() {
    const { expenses, loading } = this.props;
    return (
      <table className="purpleHorizon">
        {loading && <Loading />}
        <caption>Tabela</caption>
        <thead>
          <tr>
            <th data-testid="table-description">Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th data-testid="table-value">Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th data-testid="table-edition">Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr
              key={ expense.id }
            >
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{Number(expense.value).toFixed(2)}</td>
              <td>{expense.exchangeRates[expense.currency].name}</td>
              <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
              <td>
                {(expense.value
* expense.exchangeRates[expense.currency].ask).toFixed(2)}

              </td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => this.handleRemove(expense.id) }
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
Table.propTypes = {
  expenses: PropTypes.arrayOf(Object).isRequired,
  deletarExpenses: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  loading: state.user.loading,
});

const mapDispatchToProps = (dispatch) => ({
  deletarExpenses: (expenseAtt, valorRm) => dispatch(deleteExpenses(expenseAtt, valorRm)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
