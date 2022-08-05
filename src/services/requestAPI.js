const fetchPlanets = async () => {
  const END_POINT = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const reponse = await fetch(END_POINT);
  const data = await reponse.json();
  return data;
};

export default fetchPlanets;
