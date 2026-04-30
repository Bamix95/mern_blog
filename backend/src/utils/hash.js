import bcrypt from "bcryptjs";

export const hashValue = async (plainValue, saltRounds = 12) => {
  return bcrypt.hash(plainValue, saltRounds);
};

export const compareValue = async (plainValue, hashedValue) => {
  return bcrypt.compare(plainValue, hashedValue);
};
