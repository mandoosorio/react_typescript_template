import express, {Request,Response,Application} from "express";
import { ApolloServer } from "apollo-server-express";
import path from "path";

import { authMiddleware } from "./utils/auth";

import { typeDefs, resolvers } from "./schemas";

import db from "./config/connection";

const app:Application = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get("/", (req:Request, res:Response):void => {
    res.sendFile(path.join(__dirname, '../client/'));
});

const startApolloServer = async (typeDefs: any, resolvers: any) => {
    await server.start();
    server.applyMiddleware({ app });
    console.log(typeDefs, resolvers);
    
    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
            console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
        })
    })
};

startApolloServer(typeDefs, resolvers);