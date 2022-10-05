import React from 'react';
import { screen } from '@testing-library/react';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('testar informações do componente Wallet', () => {
  it('Testar se existem os componentes no Header', () => {
    renderWithRouterAndRedux(<Wallet />);
    const titulo = screen.getByText(/💸 trybe wallet/i);
    expect(titulo).toBeInTheDocument();
  });
  it('testar se existe um campo para adicionar o valor da despesa', async () => {
    renderWithRouterAndRedux(<Wallet />, '/carteira');
    const valorInput = await screen.findByTestId(/value-input/i);
    expect(valorInput).toBeInTheDocument();
  });
});
