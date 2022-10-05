import React, { Component } from 'react';
import './WalletForm.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TYPE_GET_CURRENCIES, saveInfosThunk } from '../redux/actions';

/* expenses: [{
  "id": 0,
  "value": "3",
  "description": "Hot Dog",
  "currency": "USD",
  "method": "Dinheiro",
  "tag": "Alimentação",
  "exchangeRates": {
    "USD": {
      "code": "USD",
      "name": "Dólar Comercial",
      "ask": "5.6208",
      ...
 */

class WalletForm extends Component {
  state = {
    moeda: 'USD',
    metodo: 'Dinheiro',
    categoria: 'Alimentação',
    description: '',
    valor: '',
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    const currAPI = await fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => data);
    console.log(currAPI);
    const filterCurr = Object.keys(currAPI).filter((curr) => curr !== 'USDT');
    dispatch({ type: TYPE_GET_CURRENCIES, payload: filterCurr });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  getInfos = () => {
    const { valor, description, moeda, metodo, categoria } = this.state;
    const { dispatch } = this.props;
    const expenses = {
      value: valor,
      description,
      currency: moeda,
      method: metodo,
      tag: categoria,
    };
    dispatch(saveInfosThunk(expenses));
    this.setState({
      description: '',
      valor: '',
    });
  };

  render() {
    const { wallet } = this.props;
    const { metodo, moeda, categoria, description, valor } = this.state;
    return (
      <form className="header2">
        <label htmlFor="description-input" className="inputDescricao">
          Descrição da despesa:
          <input
            data-testid="description-input"
            type="text"
            name="description"
            value={ description }
            className="inputDes"
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="tag-input" className="selectCategoria">
          Categoria da despesa
          <select
            data-testid="tag-input"
            className="selectCateg"
            name="categoria"
            value={ categoria }
            onChange={ this.handleChange }
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
            name="valor"
            value={ valor }
            className="inputDesp"
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="method-input" className="selectMetodo">
          Método de pagamento
          {' '}
          <select
            data-testid="method-input"
            className="selectMet"
            name="metodo"
            value={ metodo }
            onChange={ this.handleChange }
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
            name="moeda"
            value={ moeda }
            onChange={ this.handleChange }
          >
            {wallet.currencies.map((currencie, index) => {
              if (currencie === moeda) {
                return (
                  <option
                    value={ currencie }
                    defaultValue={ currencie }
                    key={ index }
                  >
                    {currencie}
                  </option>
                );
              }
              return (<option value={ currencie } key={ index }>{currencie}</option>);
            })}
          </select>
        </label>
        <div>
          <button
            type="button"
            className="submitBtn"
            onClick={ this.getInfos }
          >
            Adicionar despesa

          </button>
        </div>
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
