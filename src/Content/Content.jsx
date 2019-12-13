import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import Producers from "./Producers";

const useStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  toolbar: theme.mixins.toolbar
}));

function Content(props) {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Container>
        <Producers />
      </Container>
    </main>
  );
}

export default Content;
