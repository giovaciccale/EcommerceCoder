import jwt from "jsonwebtoken";

function createToken(data) {
  const token = jwt.sign(data, process.env.SECRET, {
    expiresIn: 10 * 100 * 500,
  });
  return token;
}

function verifytoken(token) {
  if (token) {
    const data = jwt.verify(token, process.env.SECRET);
    return data;
  }
  const error = new Error("bad auth token");
  error.statusCode = 401;
  throw error;
}

export { createToken, verifytoken };