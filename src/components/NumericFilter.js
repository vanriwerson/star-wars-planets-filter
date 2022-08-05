import React, { useContext, useState } from 'react';
import Context from '../context/Context';
import handleSelectChange from '../helpers/handleSelectChange';
import OrderSelect from './OrderSelect';

const options = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

const NumericFilter = () => {
  const {
    planets,
    setFilteredPlanets,
    columnFilter,
    setColumnFilter,
    comparisonFilter,
    setComparisonFilter,
    valueFilter,
    setValueFilter,
    filterByNumericValues,
    setFilterByNumericValues,
    addNumericValueFilter,
    removeNumericValueFilter,
  } = useContext(Context);

  const [columnOptions, setColumnOptions] = useState(options);

  const handleNumericFilter = () => {
    const currentFilter = {
      column: columnFilter,
      comparison: comparisonFilter,
      value: valueFilter,
    };
    addNumericValueFilter(currentFilter);

    const remainingOptions = columnOptions.filter((option) => option !== columnFilter);
    setColumnOptions(remainingOptions);
    setColumnFilter(remainingOptions[0]);
  };

  const clearAllFilters = () => {
    setFilteredPlanets(planets);
    setFilterByNumericValues([]);
  };

  return (
    <section>
      <label htmlFor="columnFilter">
        Coluna
        <select
          data-testid="column-filter"
          name="columnFilter"
          id="columnFilter"
          onChange={ (e) => handleSelectChange(e, setColumnFilter) }
          value={ columnFilter }
        >
          {columnOptions.map((column) => (
            <option key={ column }>{ column }</option>
          ))}
        </select>
      </label>

      <label htmlFor="comparisonFilter">
        Operador
        <select
          data-testid="comparison-filter"
          name="comparisonFilter"
          id="comparisonFilter"
          onChange={ (e) => handleSelectChange(e, setComparisonFilter) }
          value={ comparisonFilter }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
      </label>

      <label htmlFor="valueFilter">
        Valor
        <input
          type="number"
          data-testid="value-filter"
          name="valueFilter"
          id="valueFilter"
          onChange={ (e) => handleSelectChange(e, setValueFilter) }
          value={ valueFilter }
        />
      </label>

      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleNumericFilter }
      >
        Filtrar
      </button>

      <div>
        {filterByNumericValues.length > 0 && (
          filterByNumericValues.map(({ column, comparison, value }) => (
            <p
              key={ column }
              data-testid="filter"
            >
              {`${column} ${comparison} ${value}`}
              <button
                type="button"
                id={ column }
                onClick={ (e) => removeNumericValueFilter(e) }
              >
                X
              </button>
            </p>
          ))
        )}
      </div>

      <OrderSelect />

      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ clearAllFilters }
      >
        Limpar todos os filtros
      </button>
    </section>
  );
};

export default NumericFilter;
