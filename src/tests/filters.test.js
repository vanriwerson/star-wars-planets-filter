import React from 'react';
import { cleanup, render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockResponse from './mocks/mockAPI';
import App from '../App';

describe('Verificar o correto funcionamento dos filtros', () => {
  beforeEach(async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockResponse)
    })
    await act(async () => {
        render(<App />)
    })
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('Deve ser possível filtrar por nome', async () => {
    const textInput = screen.getByRole('textbox', { name: /filtrar por nome:/i });
    userEvent.type(textInput, 'oo');

    const planetTatooine = await screen.findByText(/tatooine/i);
    const planetNaboo = await screen.findByText(/naboo/i);

    expect(planetTatooine).toBeInTheDocument();
    expect(planetNaboo).toBeInTheDocument();
  });

  it('Deve ser possível adicionar e remover filtros de valores numéricos', async() => {
    const columnSelect = screen.getByRole('combobox', { name: /coluna/i });
    const operatorSelect = screen.getByRole('combobox', { name: /operador/i });
    const valueInput = screen.getByRole('spinbutton', { name: /valor/i });
    const addFilter = screen.getByRole('button', { name: /filtrar/i });

    // firstFilter
    userEvent.selectOptions(columnSelect, 'diameter');
    userEvent.selectOptions(operatorSelect, 'maior que');
    userEvent.type(valueInput, '9000');
    userEvent.click(addFilter);

    // secondFilter
    userEvent.selectOptions(columnSelect, 'population');
    userEvent.selectOptions(operatorSelect, 'menor que');
    userEvent.type(valueInput, '1000000');
    userEvent.click(addFilter);

    let filters = await screen.findAllByTestId('filter');
    expect(filters).toHaveLength(2);

    const removeFilterButtons = screen.getAllByRole('button', { name: /x/i });
    userEvent.click(removeFilterButtons[0]);
    filters = await screen.findAllByTestId('filter');
    expect(filters).toHaveLength(1);

    const expectedFilteredPlanets = ['Tatooine', 'Alderaan', 'Yavin IV',
      'Bespin', 'Endor', 'Naboo', 'Kamino'];
    const filteredPlanets = await screen.findAllByTestId('planet-name');
    expect(filteredPlanets.map((element) => element.innerHTML)).toEqual(expectedFilteredPlanets);
  });

  it('Deve ser possivel ordenar colunas em ordem crescente ou decrescente', async () => {
    const sortSelect = screen.getByRole('combobox', { name: /ordenar/i });
    const ascInput = screen.getByText(/ascendente/i);
    const descInput = screen.getByText(/descendente/i)
    const sortButton = screen.getByTestId('column-sort-button');
    const expectedAscOrder = ['12', '18', '23', '23', '23', '24', '24', '24', '26', '27'];
    const expectedDescOrder = ['27', '26', '24', '24', '24', '23', '23', '23', '18', '12'];

    userEvent.selectOptions(sortSelect, 'rotation_period')
    userEvent.click(ascInput);
    userEvent.click(sortButton);

    let sorted = await screen.findAllByTestId('planet-rotation');
    expect(sorted.map((element) => element.innerHTML)).toEqual(expectedAscOrder);

    userEvent.click(descInput);
    userEvent.click(sortButton);

    sorted = await screen.findAllByTestId('planet-rotation');
    expect(sorted.map((element) => element.innerHTML)).toEqual(expectedDescOrder);
  });

  it('Um filtro numérico deve retornar os valores corretos para o operador "maior que"', async () => {
    const columnSelect = screen.getByRole('combobox', { name: /coluna/i });
    const operatorSelect = screen.getByRole('combobox', { name: /operador/i });
    const valueInput = screen.getByRole('spinbutton', { name: /valor/i });
    const addFilter = screen.getByRole('button', { name: /filtrar/i });
    
    userEvent.selectOptions(columnSelect, 'diameter');
    userEvent.selectOptions(operatorSelect, 'maior que');
    userEvent.type(valueInput, '100000');
    userEvent.click(addFilter);

    const expectedGreaterThan = ['Bespin'];
    const filteredPlanets = await screen.findAllByTestId('planet-name');
    expect(filteredPlanets.map((element) => element.innerHTML)).toEqual(expectedGreaterThan);
  });

  it('Um filtro numérico deve retornar os valores corretos para o operador "menor que"', async () => {
    const columnSelect = screen.getByRole('combobox', { name: /coluna/i });
    const operatorSelect = screen.getByRole('combobox', { name: /operador/i });
    const valueInput = screen.getByRole('spinbutton', { name: /valor/i });
    const addFilter = screen.getByRole('button', { name: /filtrar/i });
    
    userEvent.selectOptions(columnSelect, 'rotation_period');
    userEvent.selectOptions(operatorSelect, 'menor que');
    userEvent.type(valueInput, '15');
    userEvent.click(addFilter);

    const expectedMinorThan = ['Bespin'];
    const filteredPlanets = await screen.findAllByTestId('planet-name');
    expect(filteredPlanets.map((element) => element.innerHTML)).toEqual(expectedMinorThan);
  });

  it('Um filtro numérico deve retornar os valores corretos para o operador "igual a"', async () => {
    const columnSelect = screen.getByRole('combobox', { name: /coluna/i });
    const operatorSelect = screen.getByRole('combobox', { name: /operador/i });
    const valueInput = screen.getByRole('spinbutton', { name: /valor/i });
    const addFilter = screen.getByRole('button', { name: /filtrar/i });
    
    userEvent.selectOptions(columnSelect, 'population');
    userEvent.selectOptions(operatorSelect, 'igual a');
    userEvent.type(valueInput, '1000');
    userEvent.click(addFilter);

    const expectedEqualTo = ['Yavin IV'];
    const filteredPlanets = await screen.findAllByTestId('planet-name');
    expect(filteredPlanets.map((element) => element.innerHTML)).toEqual(expectedEqualTo);
  });
});