const initState = {
  // search results
  results: [],
  // create an empty array if the user has no nominations if not use the saved nominations
  nominations: !localStorage.getItem("nominations")
    ? []
    : JSON.parse(localStorage.getItem("nominations")),
  // create an empty object if the user has no nominations if not use the saved nominations
  nominations_indexes: !localStorage.getItem("nominations_indexes")
    ? {}
    : JSON.parse(localStorage.getItem("nominations_indexes")),
  // helps me load while getting search results
  isLoading: false,
  // set total to 0 if there is no nominations otherwise use the amount of nominations
  total: !localStorage.getItem("total")
    ? 0
    : Number(localStorage.getItem("total"))
};
export default initState;
