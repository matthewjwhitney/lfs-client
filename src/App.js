import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

import Producers from "./Producers";

const client = new ApolloClient({
  uri: process.env.REACT_APP_SERVER_URI
});

function App() {
  return (
    <ApolloProvider client={client}>
      <CssBaseline>
        <Container>
          <Producers />
        </Container>
      </CssBaseline>
    </ApolloProvider>
  );
}

export default App;
