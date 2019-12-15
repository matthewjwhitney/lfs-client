import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { makeStyles } from "@material-ui/core/styles";
import { camelCaseToTitle } from "../../utils/string";
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn
} from "@devexpress/dx-react-grid-material-ui";
import { Toolbar, Typography, Paper } from "@material-ui/core";
import { EditingState } from "@devexpress/dx-react-grid";

import { GET_PRODUCERS, ADD_PRODUCER, UPDATE_PRODUCER, DELETE_PRODUCER } from "./queries";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: "100vw"
  }
}));

const getRowId = row => row.id;

function Producers() {
  const classes = useStyles();

  const { loading, error, data } = useQuery(GET_PRODUCERS);

  const [addProducer] = useMutation(
    ADD_PRODUCER,
    {
      update(cache, { data: { addProducer } }) {
        const { producers } = cache.readQuery({ query: GET_PRODUCERS });
        cache.writeQuery({
          query: GET_PRODUCERS,
          data: { producers: producers.concat([addProducer]) },
        });
      }
    }
  );

  const [updateProducer] = useMutation(UPDATE_PRODUCER);

  const [deleteProducer] = useMutation(
    DELETE_PRODUCER,
    {
      update(cache, { data: { deleteProducer } }) {
        const { producers } = cache.readQuery({ query: GET_PRODUCERS });
        cache.writeQuery({
          query: GET_PRODUCERS,
          data: { producers: producers.filter(producer => producer.id !== [deleteProducer][0].id) },
        });
      }
    }
  );

  if (error) return <div>{error.message}</div>;

  let rows = [];
  let columns = [];
  if (data) {
    rows = data.producers
    columns = Object.keys(rows[0]).map(key => ({
      title: camelCaseToTitle(key), name: key
    }));
  }

  const commitChanges = ({ added, changed, deleted }) => {
    if (added && Object.values(added)[0]) {
      addProducer({
        variables: {
          ...Object.values(added)[0],
        }
      })
    }

    if (changed && Object.values(changed)[0]) {
      updateProducer({
        variables: {
          id: Object.keys(changed)[0],
          ...Object.values(changed)[0],
        }
      })
    }

    if (deleted) {
      deleteProducer({ variables: { id: deleted[0] } })
    }
  };

  return (
    <div className={classes.root}>
      <Paper>
        <Toolbar>
          <Typography variant="h5">{!loading && data ? rows[0].__typename : 'No Data'}</Typography>
        </Toolbar>
        <Grid rows={rows} columns={columns} getRowId={getRowId}>
          <EditingState onCommitChanges={commitChanges} />
          <Table />
          <TableHeaderRow />
          <TableEditRow />
          <TableEditColumn showAddCommand showEditCommand showDeleteCommand />
        </Grid>
      </Paper>
    </div>
  );
}

export default Producers;
