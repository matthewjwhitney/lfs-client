import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { makeStyles } from "@material-ui/core/styles";

import { GET_PRODUCERS, ADD_PRODUCER, UPDATE_PRODUCER, DELETE_PRODUCER } from "./queries";
import { useSnackbar } from "notistack";
import ProducerCard from "./ProducerCard";

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

  const { loading, error, data } = useQuery(GET_PRODUCERS);

  const { enqueueSnackbar } = useSnackbar();
  if (error) {
    enqueueSnackbar('Error fetching data', { variant: 'error' });
  };

  if (loading) {
    enqueueSnackbar('Fetching data');
  };

  let producers = [];
  if (data) {
    enqueueSnackbar('Data fetched successfully', { variant: 'success' });
    producers = data.producers

  }
  const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tempus urna et purus vehicula feugiat. Proin non odio feugiat, tempor mauris id, iaculis erat. Etiam mattis id massa in viverra. Vestibulum viverra finibus felis, ac efficitur mi malesuada id. Phasellus et auctor ex, eget tincidunt eros. Nullam pharetra malesuada ipsum sed dapibus. Duis in neque tincidunt, rhoncus justo eget, suscipit odio. Donec eget dictum nisi. Mauris at cursus arcu. Vestibulum mi dui, commodo et accumsan in, consectetur et nisl. Nullam sed scelerisque urna. Maecenas metus risus, euismod sit amet rhoncus in, sodales non quam. Morbi egestas condimentum lacus tempor suscipit. Nulla sit amet pulvinar nisl. Mauris a nunc vitae erat sollicitudin iaculis. Integer justo neque, ornare nec neque sit amet, dapibus sodales ante.'

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

  return producers.map(producer =>
    <ProducerCard
      key={producer.id}
      id={producer.id}
      name={producer.name}
      description={description}
      tags={producer.productTypes}
    />
  );
}
