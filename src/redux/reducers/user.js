// Esse reducer será responsável por tratar as informações da pessoa usuária
import { TYPE_LOGIN, CHANGE_LOADING } from '../actions';

const INITIAL_STATE = {
  email: '',
  loading: false,
};

const userLogin = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TYPE_LOGIN:
    return {
      ...state,
      email: action.email,
    };
  case CHANGE_LOADING:
    return {
      ...state,
      loading: action.payload,
    };
  default:
    return state;
  }
};

export default userLogin;
