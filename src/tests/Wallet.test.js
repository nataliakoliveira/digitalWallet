import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import WalletForm from '../components/WalletForm';
import App from '../App';

describe('testar informações do componente Wallet', () => {
  it('Testar se existem os componentes no Header', () => {
    renderWithRouterAndRedux(<Wallet />);
    const titulo = screen.getByText(/💸 trybe wallet/i);
    expect(titulo).toBeInTheDocument();
    const brl = screen.getByTestId('header-currency-field');
    expect(brl).toBeInTheDocument();
  });
  it('testar se existe campos de input', () => {
    renderWithRouterAndRedux(<Wallet />);
    const valorInput = screen.getByTestId('value-input');
    expect(valorInput).toBeInTheDocument();
    const tag = screen.getByRole('combobox', {
      name: /categoria da despesa/i,
    });
    expect(tag).toBeInTheDocument();
    const method = screen.getByRole('combobox', {
      name: /método de pagamento/i,
    });
    expect(method).toBeInTheDocument();
    const moeda = screen.getByRole('combobox', {
      name: /moeda/i,
    });
    expect(moeda).toBeInTheDocument();
    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();
  });
  it('testar se a despesa é renderizada', () => {
    renderWithRouterAndRedux(<Wallet />);
    const descriptionInput = screen.getByTestId('description-input');
    const valorInput = screen.getByRole('spinbutton', {
      name: /valor da despesa:/i,
    });
    const btn = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });
    userEvent.type(descriptionInput, '1 dolar');
    userEvent.type(valorInput, 1);
    userEvent.click(btn);
  });
});
describe('Testa efetivamente a carteira', () => {
  it('Verifica se existem os campos necessários', () => {
    renderWithRouterAndRedux(<WalletForm />);
    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    expect(valueInput).toBeInTheDocument();
    expect(valueInput).toHaveTextContent('');
    expect(descriptionInput).toBeInTheDocument();
    expect(descriptionInput).toHaveTextContent('');
    expect(currencyInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
  });
  it('testar se esta adicionando despesa', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const btnAdd = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });
    userEvent.click(btnAdd);
    await waitForElementToBeRemoved(() => screen.getByText('Carregando'));
    const tag = screen.getByRole('cell', {
      name: /alimentação/i,
    });
    expect(tag).toBeInTheDocument();
    const btnDeletar = screen.getByTestId('delete-btn');
    userEvent.click(btnDeletar);
    await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
    const tag2 = screen.getByRole('cell', {
      name: /alimentação/i,
    });
    expect(tag2).not.toBeInTheDocument();
  });
});
