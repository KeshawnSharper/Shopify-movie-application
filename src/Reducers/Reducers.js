import initState from "./initState";

export const StoreReducer = (state = initState, action) => {
  switch (action.type) {
    // sets state.isLoading to false
    case "SEARCH_MOVIES_LOADING":
      return {
        ...state,
        isLoading: true
      };
    // sends the results of the search if not empty. If it the results are create an empty array

    case "SEARCH_MOVIES":
      return {
        ...state,
        results: action.results ? action.results : [],
        isLoading: false
      };
    // adds nominations to state.
    case "ADD_NOMINATIONS":
      return {
        ...state,
        nominations: [...state.nominations, action.nominations],
        // set the nomination's imdbId to 1 inside the nominations_indexes to keep track of which movies are saved
        nominations_indexes: {
          ...state.nominations_indexes,
          [action.nominations.imdbID]: 1
        },
        total: Number(state.total + 1)
      };
    case "DELETE_NOMINATION":
      return {
        ...state,
        nominations: state.nominations.filter((nomination) => {
          return nomination.imdbID !== action.nomination.imdbID;
        }),
        nominations_indexes: {
          ...state.nominations_indexes,
          [action.nomination.imdbID]: 0
        },
        total: Number(state.total - 1)
      };
    default:
      return initState;
  }
};
