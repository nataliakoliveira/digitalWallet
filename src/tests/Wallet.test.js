import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import Wallet from '../pages/Wallet';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

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
    const descriptionInput = screen.getByTestId('description-input');
    expect(descriptionInput).toBeInTheDocument();
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
  it('testar o header da tabela', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();
    const description = screen.getByTestId('table-description');
    const value = screen.getByTestId('table-value');
    const edition = screen.getByTestId('table-edition');
    expect(description).toBeInTheDocument();
    expect(edition).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    /* const tabelaTitulos = [
      'Descrição',
      'Tag',
      'Método de pagamento',
      'Valor',
      'Moeda',
      'Câmbio utilizado',
      'Valor convertido',
      'Moeda de conversão',
      'Editar/Excluir',
    ];
    tabelaTitulos.forEach((titulo) => {
      expect(screen.getByText(titulo)).toBeInTheDocument();
    }); */
  });
});
