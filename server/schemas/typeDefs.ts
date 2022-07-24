import { gql } from "apollo-server-express";

const typeDefs = gql`
    type Category {
        _id: ID
        name: String
    }

    type Query {
        categories: [Category]
    }

    type Mutation {
        addCategory(name: String!): Category
    }
`;

export default typeDefs;