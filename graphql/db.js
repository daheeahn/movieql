import fetch from "node-fetch";

const API_URL = "https://yts.mx/api/v2/list_movies.json?";

export const getMovies = (limit, rating) => {
  let REQUEST_URL = API_URL;
  if (limit > 0) {
    REQUEST_URL += `limit=${limit}`;
  }
  if (rating > 0) {
    REQUEST_URL += `&minimum_rating=${rating}`;
  }
  return fetch(`${REQUEST_URL}`)
    .then(res => res.json())
    .then(json => json.data.movies);
};

export const getMovie = id => {
  const REQUEST_URL = API_URL;
  return fetch(`${REQUEST_URL}`)
    .then(res => res.json())
    .then(json => json.data.movies.find(movie => movie.id === id));
};

export const getSuggestions = id => {
  const REQUEST_URL = API_URL;
  return fetch(`${REQUEST_URL}`)
    .then(res => res.json())
    .then(json =>
      json.data.movies.filter(
        movie => id !== movie.id && id - 2 < movie.id && movie.id < id + 2
      )
    );
};
