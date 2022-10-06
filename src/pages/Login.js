import React from 'react';
import './Login.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TYPE_LOGIN } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    disabled: true,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => this.validarInput());
  };

  handleClick = (event) => {
    console.log('testando se entrou aq');
    event.preventDefault();
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch({ type: TYPE_LOGIN, email });
    history.push('/carteira');
  };

  validarInput = () => {
    const { email, password } = this.state;
    const minPassword = 5;
    // https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
    const emailRegex = /\S+@\S+\.\S+/.test(email);
    const validarSenha = password.length > minPassword;
    if (emailRegex && validarSenha) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  };

  render() {
    const { email, password, disabled } = this.state;
    return (
      <div className="login">
        <p className="pLogin">💸 Trybe Wallet</p>
        <form>
          <label htmlFor="email-input">
            <input
              data-testid="email-input"
              type="text"
              value={ email }
              name="email"
              placeholder="Email"
              className="email"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password-input">
            <input
              data-testid="password-input"
              type="password"
              value={ password }
              placeholder="Senha"
              name="password"
              className="password"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            className="buttonLogin"
            disabled={ disabled }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
      </div>

    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({ ...state });

export default connect(mapStateToProps)(Login);
