import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Producers from "./Producers";
import { Route } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    width: '100vw',
    height: '100vh',
    overflow: 'auto'
  },
  headerSpacer: theme.mixins.toolbar
}));

function Content() {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div className={classes.headerSpacer} />
      <Route path="/Producers" component={Producers} />
    </main>
  );
}

export default Content;
