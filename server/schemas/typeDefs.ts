import { gql } from "apollo-server-express";

const typeDefs = gql`
    type Category {
        _id: String
        name: String
    }
    type Product {
        _id: String
        name: String
        description: String
        image: String
        quantity: Int
        price: Float
        category: Category
    }
    type Order {
        _id: String
        purchaseDate: String
        products: [Product]
    }
    type User {
        _id: ID
        firstName: String
        lastName: String
        email: String
        orders: [Order]
    }
    type Checkout {
        session: ID
    }
    type Auth {
        token: ID
        user: User
    }

    input UserInput {
        firstName: String!
        lastName: String!
        email: String!
        password: String!
    }

    type Query {
        categories: [Category]
        products(category: String, name: String): [Product]
        product(_id: String!): Product
        user: User
        order(_id: ID!): Order
        checkout(products: [ID]!): Checkout
    }

    type Mutation {
        addCategory(name: String!): Category
        addUser(userInput: UserInput!): Auth
        addOrder(products: [ID]!): Order
        updateUser(firstName: String, lastName: String, email: String, password: String): User
        updateProduct(_id: ID!, quantity: Int!): Product
        login(email: String!, password: String!): Auth
    }
`;

export default typeDefs;