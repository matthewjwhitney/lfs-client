import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Producers from "./Producers";

const useStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
  },
  headerSpacer: theme.mixins.toolbar
}));

function Content(props) {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div className={classes.headerSpacer} />
      <Producers />
    </main>
  );
}

export default Content;
