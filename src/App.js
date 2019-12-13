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

import Header from "./Header";
import SideBar from "./SideBar";
import Content from "./Content";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  }
}));

const client = new ApolloClient({
  uri: process.env.REACT_APP_SERVER_URI
});

function App() {
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
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline>
            <Header />
            <SideBar />
            <Content />
          </CssBaseline>
        </div>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
