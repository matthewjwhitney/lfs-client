import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  List,
  ListSubheader
} from "@material-ui/core";

import routes from './routes';
import ListItemLink from './ListItemLink';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    minWidth: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    minWidth: drawerWidth
  },
  headerSpacer: theme.mixins.toolbar,
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function Navigation() {
  const classes = useStyles();
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.headerSpacer} />
      {Object.keys(routes).map(list => (
        <List
          component="nav"
          aria-labelledby={`list-subheader:${list}`}
          subheader={
            <ListSubheader component="div" id={`list-subheader:${list}`}>
              {list}
            </ListSubheader>
          }
        >
          {routes[list].map(route => (
            <ListItemLink
              key={route.path}
              path={route.path}
              icon={route.icon}
              title={route.title}
            />
          ))}
        </List>
      ))}
    </Drawer>
  );
}
