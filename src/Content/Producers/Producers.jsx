import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { makeStyles } from "@material-ui/core/styles";

import { GET_PRODUCERS, ADD_PRODUCER, UPDATE_PRODUCER, DELETE_PRODUCER } from "./queries";
import DataTable from "../../components/DataTable";
import { useSnackbar } from "notistack";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: "100vw"
  }
}));

export default function Producers() {
  const classes = useStyles();

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

  let producers = [];

  const { loading, error, data } = useQuery(GET_PRODUCERS);

  const { enqueueSnackbar } = useSnackbar();
  if (error) {
    enqueueSnackbar('Error fetching data', { variant: 'error' });
  };

  if (loading) {
    enqueueSnackbar('Fetching data');
  };

  if (data) {
    enqueueSnackbar('Data fetched successfully', { variant: 'success' });
    producers = data.producers

  }
  const title = !loading && data ? producers[0].__typename : 'No Data'

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
      <DataTable
        commitChanges={commitChanges}
        rows={producers}
        title={title}
      />
    </div>
  );
}
