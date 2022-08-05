import React, { useContext, useState } from 'react';
import Context from '../context/Context';

const OrderSelect = () => {
  const {
    ordenateList,
  } = useContext(Context);

  const [column, setColumn] = useState('population');
  const [sort, setSort] = useState('ASC');

  const setOrdinate = () => {
    ordenateList(column, sort);
  };

  return (
    <section>
      <label htmlFor="columnSort">
        Ordenar
        <select
          data-testid="column-sort"
          name="columnSort"
          id="columnSort"
          onChange={ (e) => setColumn(e.target.value) }
          value={ column }
        >
          <option>population</option>
          <option>orbital_period</option>
          <option>diameter</option>
          <option>rotation_period</option>
          <option>surface_water</option>
        </select>
      </label>

      <label htmlFor="ASC">
        Ascendente
        <input
          type="radio"
          data-testid="column-sort-input-asc"
          id="ASC"
          value="ASC"
          name="direction"
          onClick={ (e) => setSort(e.target.value) }
        />
      </label>

      <label htmlFor="DESC">
        Descendente
        <input
          type="radio"
          data-testid="column-sort-input-desc"
          id="DESC"
          value="DESC"
          name="direction"
          onClick={ (e) => setSort(e.target.value) }
        />
      </label>

      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ setOrdinate }
      >
        Ordenar
      </button>
    </section>
  );
};

export default OrderSelect;
