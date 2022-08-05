import React, { useContext } from 'react';
import Context from '../context/Context';

const Table = () => {
  const { filteredPlanets } = useContext(Context);

  const setTableBody = () => (
    <tbody>
      {
        filteredPlanets.map((data) => (
          <tr key={ data.name }>
            <td data-testid="planet-name">{ data.name }</td>
            <td data-testid="planet-rotation">{ data.rotation_period }</td>
            <td>{ data.orbital_period }</td>
            <td>{ data.diameter }</td>
            <td>{ data.climate }</td>
            <td>{ data.gravity }</td>
            <td>{ data.terrain }</td>
            <td>{ data.surface_water }</td>
            <td>{ data.population }</td>
            <td>{ data.films }</td>
            <td>{ data.created }</td>
            <td>{ data.edited }</td>
            <td>{ data.url }</td>
          </tr>
        ))
      }
    </tbody>
  );

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      {filteredPlanets && filteredPlanets.length > 0 && setTableBody()}
    </table>
  );
};

export default Table;
