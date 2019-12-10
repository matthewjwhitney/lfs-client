import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import Producers from "./Producers";

const client = new ApolloClient({
  uri: process.env.serverURI
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Producers />
    </ApolloProvider>
  );
}

export default App;
