import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Header.css';

class Header extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="header">
        <div className="h1">💸 Trybe Wallet</div>
        <div data-testid="total-field">🪙 Total de despesas: 0</div>
        <div data-testid="header-currency-field">BRL</div>
        <div data-testid="email-field">
          ✉️
          {' '}
          {user.email}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ ...state });

Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps)(Header);
