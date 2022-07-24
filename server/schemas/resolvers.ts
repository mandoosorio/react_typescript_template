import { AuthenticationError } from "apollo-server-express";

import { Category } from "../models";

const resolvers = {
    Query: {
        categories: async() => {
            return await Category.find();
        }
    },

    Mutation: {
        addCategory: async(parent: any, args: any) => {
            const category = await Category.create(args);
            return category;
        }
    }
}

export default resolvers;