import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { makeStyles } from "@material-ui/core/styles";
import { camelCaseToTitle } from "../../utils/string";
import Paper from "@material-ui/core/Paper";
import "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow
} from "@devexpress/dx-react-grid-material-ui";
import { Toolbar, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: "100%"
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
      id
    }
  }
`;

function Producers() {
  const classes = useStyles();
  const { loading, error, data } = useQuery(PRODUCERS);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error.message}</div>;

  const { producers } = data;
  const columns = Object.keys(producers[0]).map(key => ({ title: camelCaseToTitle(key), name: key }
  ));
  return (
    <div className={classes.root}>
      <Paper>
        <Toolbar>
          <Typography variant="h6">
            {producers[0].__typename}
          </Typography>
        </Toolbar>
        <Grid rows={producers} columns={columns}>
          <Table />
          <TableHeaderRow />
        </Grid>
      </Paper>
    </div>
  );
}

export default Producers;
