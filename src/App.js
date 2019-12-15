import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import CssBaseline from "@material-ui/core/CssBaseline";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  ThemeProvider,
  createMuiTheme,
  makeStyles
} from "@material-ui/core/styles";
import { SnackbarProvider } from 'notistack';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas, faSeedling, faEdit, faSave, faTrash, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons'

import Header from "./Header";
import Navigation from "./Navigation";
import Content from "./Content";
import { BrowserRouter } from "react-router-dom";

library.add(fas, faSeedling, faEdit, faSave, faTrash, faTimes, faPlus)

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  }
}));

const client = new ApolloClient({
  uri: process.env.REACT_APP_SERVER_URI
});

export default function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light"
        }
      }),
    [prefersDarkMode]
  );

  const classes = useStyles();
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <div className={classes.root}>
            <CssBaseline>
              <SnackbarProvider maxSnack={3}>
                <Header />
                <Navigation />
                <Content />
              </SnackbarProvider>
            </CssBaseline>
          </div>
        </ThemeProvider>
      </BrowserRouter>
    </ApolloProvider>
  );
}
