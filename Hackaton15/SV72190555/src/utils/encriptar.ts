// const bcrypt = require("bcrypt");
import bcrypt from "bcrypt";

export const passEncrypt = async (password: string) => {
  const pass = await bcrypt.hash(password, 10);
  return pass;
};

export const comparePass = async (password: string, passwordHash: string) => {
  const isMatch = await bcrypt.compare(password, passwordHash);
  return isMatch;
};
