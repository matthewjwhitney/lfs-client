import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2)
  }
}));

const PRODUCERS = gql`
  {
    producers {
      name
      location
      productTypes
      contactPerson
      phoneNumber
      email
      website
      notes
    }
  }
`;

function Producers() {
  const classes = useStyles();
  const { loading, error, data } = useQuery(PRODUCERS);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  const { producers } = data;

  return (
    <Grid container>
      {producers.map(producer => (
        <Grid item xs={3} key={producer.name}>
          <Paper className={classes.paper}>
            <h2>{producer.name}</h2>
            <p>location: {producer.location}</p>
            <p>productTypes: {producer.productTypes}</p>
            <p>contactPerson: {producer.contactPerson}</p>
            <p>phoneNumber: {producer.phoneNumber}</p>
            <p>email: {producer.email}</p>
            <p>website: {producer.website}</p>
            <p>notes: {producer.notes}</p>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

export default Producers;
