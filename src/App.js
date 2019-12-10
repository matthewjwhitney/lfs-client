import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import Producers from "./Producers";

const client = new ApolloClient({
  uri: process.env.REACT_APP_SERVER_URI
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Producers />
    </ApolloProvider>
  );
}

export default App;
