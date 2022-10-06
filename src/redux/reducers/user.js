// Esse reducer será responsável por tratar as informações da pessoa usuária
import TYPE_LOGIN from '../actions';

const INITIAL_STATE = {
  email: '',
};

const userLogin = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TYPE_LOGIN:
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
};

export default userLogin;
