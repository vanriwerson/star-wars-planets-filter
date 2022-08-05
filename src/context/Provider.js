import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import fetchPlanets from '../services/requestAPI';

const Provider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [order, setOrder] = useState({ column: 'name', sort: 'ASC' });

  // didMount
  useEffect(() => {
    const getPlanets = async () => {
      const data = await fetchPlanets();
      setPlanets(data.results);
      setFilteredPlanets(data.results);
    };

    getPlanets();
  }, []);

  // updatingFilters
  useEffect(() => {
    const updateFilteredPlanets = () => {
      setFilteredPlanets(planets);
      filterByNumericValues.forEach(({ column, comparison, value }) => {
        setFilteredPlanets((prevState) => prevState.filter((planet) => {
          switch (comparison) {
          case 'maior que':
            return Number(planet[column]) > Number(value);

          case 'menor que':
            return Number(planet[column]) < Number(value);

          case 'igual a':
            return Number(planet[column]) === Number(value);

          default:
            return [];
          }
        }));
      });
    };
    updateFilteredPlanets();
  }, [filterByNumericValues, planets]);

  const filterPlanetsByName = ({ target }) => {
    setFilterByName({ name: target.value });
    const filteredList = planets.filter((planet) => planet.name.includes(target.value));
    setFilteredPlanets(target.value ? filteredList : planets);
  };

  const addNumericValueFilter = (filter) => {
    setFilterByNumericValues((prevState) => [...prevState, filter]);
  };

  const removeNumericValueFilter = ({ target }) => {
    const remainingFilters = filterByNumericValues.filter(
      (filter) => filter.column !== target.id,
    );
    setFilterByNumericValues(remainingFilters);
  };

  const ordenateList = (columnSelect, sortSelect) => {
    setOrder({ column: columnSelect, sort: sortSelect });

    let newSort = filteredPlanets.sort(
      (a, b) => Number(a[columnSelect]) - Number(b[columnSelect]),
    );

    if (sortSelect === 'DESC') {
      newSort = filteredPlanets.sort(
        (a, b) => Number(b[columnSelect]) - Number(a[columnSelect]),
      );
    }

    setFilteredPlanets(newSort);
  };

  const value = {
    planets,
    filteredPlanets,
    setFilteredPlanets,
    filterByName,
    filterPlanetsByName,
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
    order,
    ordenateList,
  };

  return (
    <Context.Provider value={ value }>
      { children }
    </Context.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
};

export default Provider;
