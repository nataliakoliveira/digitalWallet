import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Header.css';

class Header extends Component {
  render() {
    const { user, wallet } = this.props;
    return (
      <div className="header">
        <div className="h1">💸 Trybe Wallet</div>
        <div>
          <span data-testid="total-field">
            {wallet.total}
          </span>
          <span data-testid="header-currency-field">BRL</span>
        </div>
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
  wallet: PropTypes.shape({
    total: PropTypes.number,
  }).isRequired,
};

export default connect(mapStateToProps)(Header);
