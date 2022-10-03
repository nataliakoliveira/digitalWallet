import React, { Component } from 'react';
import './WalletForm.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TYPE_GET_CURRENCIES } from '../redux/actions';

class WalletForm extends Component {
  state = {
    moedaInicial: 'USD',
    metodoPagamento: 'Dinheiro',
    despesaInicial: 'Alimentação',
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    const currAPI = await fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => data);
    console.log(currAPI);
    const filterCurr = Object.keys(currAPI).filter((curr) => curr !== 'USDT');
    console.log(filterCurr);
    dispatch({ type: TYPE_GET_CURRENCIES, payload: filterCurr });
  }

  render() {
    const { wallet } = this.props;
    console.log(wallet);
    const { metodoPagamento, moedaInicial, despesaInicial } = this.state;
    return (
      <form className="header2">
        <label htmlFor="description-input" className="inputDescricao">
          Descrição da despesa:
          <input
            data-testid="description-input"
            type="text"
            className="inputDes"
            onChange={ () => console.log('clicou') }
          />
        </label>

        <label htmlFor="tag-input" className="selectCategoria">
          Categoria da despesa
          <select
            data-testid="tag-input"
            className="selectCateg"
            value={ despesaInicial }
            onChange={ () => console.log('clicou') }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>

        <label htmlFor="value-input" className="inputDespesa">
          Valor da despesa:
          {' '}
          <input
            data-testid="value-input"
            type="number"
            className="inputDesp"
            onChange={ () => console.log('clicou') }
          />
        </label>

        <label htmlFor="method-input" className="selectMetodo">
          Método de pagamento
          {' '}
          <select
            data-testid="method-input"
            className="selectMet"
            value={ metodoPagamento }
            onChange={ () => console.log('clicou') }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="currency-input" className="selectMoeda">
          Moeda
          {' '}
          <select
            data-testid="currency-input"
            className="selectMoed"
            onChange={ () => console.log('clicou') }
          >
            {wallet.currencies.map((currencie, index) => {
              if (currencie === moedaInicial) {
                return (
                  <option
                    value="valor1"
                    defaultValue={ currencie }
                    key={ index }
                  >
                    {currencie}
                  </option>
                );
              }
              return (<option value="valor1" key={ index }>{currencie}</option>);
            })}
          </select>
        </label>
        <div />
      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  wallet: PropTypes.shape({
    currencies: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

const mapStateToProps = (state) => ({ ...state });

export default connect(mapStateToProps)(WalletForm);
