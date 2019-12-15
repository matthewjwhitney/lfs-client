import gql from "graphql-tag";

export const GET_PRODUCERS = gql`
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
    id
  }
}
`;

export const ADD_PRODUCER = gql`
mutation(
  $name: String
  $location: String
  $productTypes: String
  $contactPerson: String
  $phoneNumber: String
  $email: String
  $website: String
  $notes: String
) {
    addProducer(
      name: $name
      location: $location
      productTypes: $productTypes
      contactPerson: $contactPerson
      phoneNumber: $phoneNumber
      email: $email
      website: $website
      notes: $notes
    ) {
        id
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

export const UPDATE_PRODUCER = gql`
mutation(
  $id: ID!
  $name: String
  $location: String
  $productTypes: String
  $contactPerson: String
  $phoneNumber: String
  $email: String
  $website: String
  $notes: String
) {
    updateProducer(
      id: $id
      name: $name
      location: $location
      productTypes: $productTypes
      contactPerson: $contactPerson
      phoneNumber: $phoneNumber
      email: $email
      website: $website
      notes: $notes
    ) {
        id
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

export const DELETE_PRODUCER = gql`
mutation(
  $id: ID!
) {
    deleteProducer(id: $id) {
      id
    }
  }
`;