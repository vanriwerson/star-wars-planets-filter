import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { act } from 'react-dom/test-utils';

describe('Verificar a primeira renderização do App', () => {
  it('Deve haver um título e um subtítulo', () => {
    render(<App />);
    const title = screen.getByRole('heading', { name: /star wars/i, level: 1 });
    expect(title).toBeInTheDocument();

    const subtitle = screen.getByText(/planets search/i);
    expect(subtitle).toBeInTheDocument();
  });

  it('Deve haver um campo para filtrar os planetas por nome', () => {
    render(<App />);
    const textInput = screen.getByRole('textbox', { name: /filtrar por nome:/i })
    expect(textInput).toBeInTheDocument();
  });

  it('Deve haver 3 menus dropdown', () => {
    render(<App />);
    const selects = screen.getAllByRole('combobox');
    expect(selects).toHaveLength(3);
  });

  it('Deve haver um campo para inserção de valores numéricos', () => {
    render(<App />);
    const valueInput = screen.getByRole('spinbutton', { name: /valor/i });
    expect(valueInput).toBeInTheDocument();
  });

  it('Deve haver um botão para adicionar filtros', () => {
    render(<App />);
    const addFilter = screen.getByRole('button', { name: /filtrar/i });
    expect(addFilter).toBeInTheDocument();
  });

  it('Deve haver um botão para limpar todos os filtros', () => {
    render(<App />);
    const clearFilters = screen.getByRole('button', { name: /limpar todos os filtros/i });
    expect(clearFilters).toBeInTheDocument();
  });

  it('Deve haver uma tabela com os dados trazidos da API', async () => {
    await act(async () => {
      render(<App />)
    });
    const tableHeaders = screen.getAllByRole('columnheader');
    expect(tableHeaders).toHaveLength(13);

    const lastRow = await screen.findByText(/kamino/i);
    expect(lastRow).toBeInTheDocument();
  });
});
