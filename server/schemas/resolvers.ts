import { AuthenticationError } from "apollo-server-express";
import { Category, Order, Product, User } from "../models";
import { signToken } from '../utils/auth';
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_4eC39HqLyjWDarjtT1zdp7dc', { apiVersion: "2020-08-27" });

const resolvers = {
    Query: {
        categories: async () => {
            return await Category.find();
        },
        products: async (parent: any, { category, name }: { category: string, name: any }) => {
            const params: { [index: string]: any } = {};

            if (category) {
                params.category = category;
            }

            if (name) {
                params.name = {
                    $regex: name
                };
            }

            return await Product.find(params).populate('category');
        },
        product: async (parent: any, { _id }: { _id: string}) => {
            return await Product.findById(_id).populate('category');
        },
        user: async (parent: any, args: any, context: any) => {
            if (context.user) {
                const user: any = await User.findById(context.user._id).populate({
                    path: 'orders.products',
                    populate: 'category'
                });

                user.orders.sort((a: any, b: any) => b.purchaseDate - a.purchaseDate);

                return user;
            }

            throw new AuthenticationError('Not logged in');
        },
        order: async (parent: any, { _id }: { _id: any }, context: any) => {
            if (context.user) {
                const user: any = await User.findById(context.user._id).populate({
                    path: 'orders.products',
                    populate: 'category'
                });

                return user.orders.id(_id);
            }

            throw new AuthenticationError('Not logged in');
        },
        checkout: async (parent: any, args: any, context: any) => {
            const url = new URL(context.headers.referer).origin;
            const order = new Order({ products: args.products });
            const line_items = [];

            const { products }: { [index: string]: any } = await order.populate('products');

            for (let i = 0; i < products.length; i++) {
                const product = await stripe.products.create({
                    name: products[i].name,
                    description: products[i].description,
                    images: [`${url}/images/${products[i].image}`]
                });

                const price = await stripe.prices.create({
                    product: product.id,
                    unit_amount: products[i].price * 100,
                    currency: 'usd',
                });

                line_items.push({
                    price: price.id,
                    quantity: 1
                });
            }

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items,
                mode: 'payment',
                success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${url}/`
            });

            return { session: session.id };
        }
    },

    Mutation: {
        addCategory: async (parent: any, args: any) => {
            const category = await Category.create(args);
            return category;
        },
        addUser: async (parent: any, args: any) => {
            const user: any = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        addOrder: async (parent: any, { products }: { products: any }, context: any) => {
            console.log(context);
            if (context.user) {
                const order = new Order({ products });

                await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

                return order;
            }

            throw new AuthenticationError('Not logged in');
        },
        updateUser: async (parent: any, args: any, context: any) => {
            if (context.user) {
                return await User.findByIdAndUpdate(context.user._id, args, { new: true });
            }

            throw new AuthenticationError('Not logged in');
        },
        updateProduct: async (parent: any, { _id, quantity }:{ _id: any, quantity: any }) => {
            const decrement = Math.abs(quantity) * -1;

            return await Product.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
        },
        login: async (parent: any, { email, password }: { email: string, password: string }) => {
            const user: any = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        }
    }
}

export default resolvers;