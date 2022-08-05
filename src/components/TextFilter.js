import React, { useContext } from 'react';
import Context from '../context/Context';

const TextFilter = () => {
  const {
    filterByName: { name }, filterPlanetsByName,
  } = useContext(Context);

  return (
    <label htmlFor="nameFilter">
      Filtrar por nome:
      { ' ' }
      <input
        type="text"
        data-testid="name-filter"
        name="nameFilter"
        id="nameFilter"
        onChange={ (e) => filterPlanetsByName(e) }
        value={ name }
      />
    </label>
  );
};

export default TextFilter;
