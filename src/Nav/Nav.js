import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Banner from "../Banner/Banner";
import { connect } from "react-redux";
import "./Nav.css";
import { addNomination, deleteNomination } from "../Actions/Actions";
import Grid from "@material-ui/core/Grid";
// styling and tab navigation set up I'm not really sure about it's functionality but I know how to use it
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));
// ignore all of the previous code as I said before I'm not sure of it's functionality
function Nav(props) {
  // styles the navigation
  const classes = useStyles();

  const { results, nominations, nominations_indexes, total } = props;
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Search" {...a11yProps(0)} />
          <Tab label="Nominations" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      {/* this is what will display when the user clicks on the search tab  */}
      <TabPanel value={value} index={0}>
        {/*  when the total of nominations reaches 5 a banner will display  */}
        <div className={classes.root}>
          {total === 5 ? <Banner /> : <></>}
          <br />
          <Grid container spacing={6}>
            {/*  displays the search results  */}
            {results.map((result) => (
              <Grid container item xs={12} md={4} spacing={3}>
                <div class="card">
                  <img
                    src={result.Poster}
                    alt="Avatar"
                    style={{ width: "100%" }}
                  />
                  <div class="container">
                    <h4>
                      <b>{result.Title}</b>
                    </h4>
                    <p>{result.Year}</p>
                    {/*  if there are 5 nominations a button doesn't display */}
                    {total === 5 ? (
                      <></>
                    ) : // if this movie isn't in the user's nominations list then display the add nomination button
                    nominations_indexes[result.imdbID] !== 1 ? (
                      <button
                        onClick={(e) => {
                          props.addNomination(result);
                        }}
                      >
                        {" "}
                        Add to Nominations{" "}
                      </button>
                    ) : (
                      // If the movie is in the user's nomination list then display the delete nomination button
                      <button
                        onClick={(e) => {
                          props.deleteNomination(result);
                        }}
                      >
                        {" "}
                        Delete Nomination{" "}
                      </button>
                    )}
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      </TabPanel>
      {/*  this is the nominations list aka what you'' see after clicking the nominations tab */}
      <TabPanel value={value} index={1}>
        {total === 5 ? <Banner /> : <></>}
        <br />
        <div className={classes.root}>
          <Grid container spacing={6}>
            {nominations.map((result) => (
              <Grid container item xs={12} md={4} spacing={3}>
                <div class="card">
                  <img
                    src={result.Poster}
                    alt="Avatar"
                    style={{ width: "300px" }}
                  />
                  <div class="container">
                    <h4>
                      <b>{result.Title}</b>
                    </h4>
                    <p>{result.Year}</p>
                    {/* since this is the nomimations list every button that shows displays is the delete one  */}

                    <button onClick={(e) => props.deleteNomination(result)}>
                      {" "}
                      Delete Nomination{" "}
                    </button>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      </TabPanel>
    </div>
  );
}
// redux and state set up
function mapStateToProps(state) {
  return {
    results: state.results,
    nominations: state.nominations,
    nominations_indexes: state.nominations_indexes,
    total: state.total
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    addNomination: (movie) => {
      dispatch(addNomination(movie));
    },
    deleteNomination: (movie) => {
      dispatch(deleteNomination(movie));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
