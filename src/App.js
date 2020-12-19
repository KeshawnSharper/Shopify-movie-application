import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import Nav from "./Nav/Nav";
import { searchMovies } from "./Actions/Actions";
import "./App.css";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch"
    }
  }
}));

function App(props) {
  // textfield styling from material ui
  const classes = useStyles();

  useEffect(() => {
    // if there is no nominations on the browser than create an empty arry
    if (!localStorage.getItem("nominations")) {
      localStorage.setItem("nominations", JSON.stringify([]));
    }
    // Create an empty object if there are no nominations
    if (!localStorage.getItem("movies_indexes")) {
      localStorage.setItem("movies_indexes", JSON.stringify({}));
    }
    // set total to 0 if there isnt any nominations
    if (!localStorage.getItem("total")) {
      localStorage.setItem("total", 0);
    }
  }, []);
  return (
    <>
      {/* text fiels to search movies */}
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="standard-basic"
          style={{ width: "100%" }}
          label="Search Movies"
          width="100%"
          onChange={(e) => {
            props.searchMovies(e.target.value);
          }}
        />
      </form>
      {/*  simple navigation to shuffle from search results and nominations */}
      <Nav />
      {/* if the application is fetching results show the loader  */}
      {props.isLoading ? <div className="loader"></div> : <></>}
    </>
  );
}
function mapStateToProps(state) {
  return {
    results: state.results,
    fav_movies: state.fav_movies,
    isLoading: state.isLoading
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    searchMovies: (movie) => {
      dispatch(searchMovies(movie));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
