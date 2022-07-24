Use .ts for pure TypeScript files.
Use .tsx for files which contain JSX.
For example, a React component would be .tsx, but a file containing helper functions would be .ts.

if client folder is not accessible in repository, remove the hidden .git folder then run the following command form root directory: git rm --cached client
you should now be able to push the changes and client will become accessible

to run server, use these commands:
npm run tsc
node build/server



Resources:
https://javascript.plainenglish.io/typescript-with-node-and-express-js-why-when-and-how-eb6bc73edd5d
https://mongoosejs.com/docs/typescript/schemas.html