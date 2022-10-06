import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import responseApi from './helpers/mockData';

describe('Verificar página de Login', () => {
  it('testar o título, os inputs e o botão', () => {
    renderWithRouterAndRedux(<App />);
    const titulo = screen.getByText(/💸 trybe wallet/i);
    expect(titulo).toBeInTheDocument();
    const email = screen.getByRole('textbox');
    expect(email).toBeInTheDocument();
    const senha = screen.getByPlaceholderText(/senha/i);
    expect(senha).toBeInTheDocument();
    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button).toBeInTheDocument();
  });

  it(`Teste se a aplicação é redirecionada para a rota /carteira,
  ao clicar no botão e se as informações sao renderizadas`, () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const email = screen.getByRole('textbox');
    const senha = screen.getByPlaceholderText(/senha/i);
    const button = screen.getByRole('button', { name: /entrar/i });
    userEvent.type(email, 'email@provider.com');
    userEvent.type(senha, '123456');
    userEvent.click(button);
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });

  it('testa se a requisição foi chamada', () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(responseApi),
    });
  });

  it('Teste se o botão é habilitado ao colocar email e senha validos', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByRole('textbox');
    const senha = screen.getByPlaceholderText(/senha/i);
    const button = screen.getByRole('button', { name: /entrar/i });
    userEvent.type(email, 'email@provider.com');
    userEvent.type(senha, '123456');
    expect(button).toBeEnabled();
  });

  it('testar se é desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button).toBeDisabled();
  });
});
