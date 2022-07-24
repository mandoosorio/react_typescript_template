import jwt from "jsonwebtoken";

const secret = 'mysecretsshhhhh';
const expiration = '2h';


function authMiddleware({ req }: { req: any }) {
    // allows token to be sent via req.body, req.query, or headers
    let token: any = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const data: any = jwt.verify(token, secret, { maxAge: expiration });
      console.log("DATAAAAAA", data);
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    return req;
  };

function signToken({ firstName, email, _id }: { firstName: string, email: string, _id: string }) {
    const payload = { firstName, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

export { authMiddleware, signToken };


