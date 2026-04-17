const { sign, verify } = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (id) => {
  const jwt = sign({ id }, JWT_SECRET, {
    expiresIn: "2h",
  });
  return jwt;
};

const verifyToken = (jwt) => {
  const isOK = verify(jwt, JWT_SECRET);
  return isOK;
};

module.exports = { generateToken, verifyToken };
