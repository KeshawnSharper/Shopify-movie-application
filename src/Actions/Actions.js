import axios from "axios";
// Function for searching through movie
export function searchMovies(movie) {
  return (dispatch) => {
    dispatch({ type: "SEARCH_MOVIES_LOADING", isLoading: true });
    axios
      .get(`https://www.omdbapi.com/?apikey=a93a2b73&s=${movie}&type=movie`)
      .then((res) => {
        console.log(res.data.Search);
        dispatch({
          type: "SEARCH_MOVIES",
          isLoading: false,
          results: res.data.Search
        });
      });
  };
}
// function for adding a movie to the nominations
export function addNomination(movie) {
  // if the nominations list in local storage length is 5 no more movies can be added
  if (Number(localStorage.getItem("total")) === 5) {
    return;
  }
  // else
  // * set the local storage nominations list to the previous list plus the wanted movie
  else {
    localStorage.setItem(
      "nominations",
      JSON.stringify([
        ...JSON.parse(localStorage.getItem("nominations")),
        movie
      ])
    );
    // Store all of the ids inside of an object to track if it's in the nominations already
    localStorage.setItem(
      "nominations_indexes",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("nominations_indexes")),
        [movie.imdbID]: 1
      })
    );
    localStorage.setItem("total", Number(localStorage.getItem("total")) + 1);
    return (dispatch) => {
      dispatch({ type: "ADD_NOMINATIONS", nominations: movie });
    };
  }
}
// takes the movie object and uses the imdbID to delete from the local storage
export function deleteNomination(movie) {
  console.log(movie);
  // set the local storage's nomination list to every nomination besides the given movie's imdbID
  localStorage.setItem(
    "nominations",
    JSON.stringify(
      JSON.parse(localStorage.getItem("nominations")).filter((result) => {
        return result.imdbID !== movie.imdbID;
      })
    )
  );
  //  set the requested movie imdb value in the nominations_indexes local storage to 0 to state that it's no longer a nomination
  localStorage.setItem(
    "nominations_indexes",
    JSON.stringify({
      ...JSON.parse(localStorage.getItem("nominations_indexes")),
      [movie.imdbID]: 0
    })
  );
  // add to the local storage's total to track the number of the user's nominations
  localStorage.setItem("total", Number(localStorage.getItem("total") - 1));

  return (dispatch) => {
    // sends the nomination to the reducer to delete for the store
    dispatch({ type: "DELETE_NOMINATION", nomination: movie });
  };
}
