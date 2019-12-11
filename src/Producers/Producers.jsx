import React, { Fragment } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import ProducerCard from "./ProducerCard";
import { getInitials } from "../utils/string";

const useStyles = makeStyles(theme => ({
  displayBlock: {
    display: "block"
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

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error.message}</div>;

  const { producers } = data;

  return (
    <Grid container>
      {producers.map(producer => (
        <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={producer.name}>
          <ProducerCard
            avatar={getInitials(producer.name)}
            header={producer.name}
            placeholder={<Skeleton variant="rect" height={200} />}
            bodyAboveExpand={
              <Box className={classes.displayBlock}>
                <div>Location: {producer.location}</div>
                <div>ProductTypes: {producer.productTypes}</div>
              </Box>
            }
            bodyBelowExpand={
              <Fragment>
                <div>ContactPerson: {producer.contactPerson}</div>
                <div>PhoneNumber: {producer.phoneNumber}</div>
                <div>Email: {producer.email}</div>
                <div>Website: {producer.website}</div>
                <div>Notes: {producer.notes}</div>
              </Fragment>
            }
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default Producers;
