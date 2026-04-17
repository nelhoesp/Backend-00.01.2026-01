const bcrypt = require("bcrypt");

const passEncrypt = async (password) => {
  return (pass = await bcrypt.hash(password, 10));
};

const comparePass = async (password, passwordHash) => {
  const isMatch = await bcrypt.compare(password, passwordHash);
  return isMatch;
};

module.exports = { passEncrypt, comparePass};
