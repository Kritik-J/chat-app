import crypto from "crypto";

const PASSWORD_LENGTH = 256;
const SALT_LENGTH = 64;
const ITERATIONS = 1000;
const DIGEST = "sha256";
const BYTE_TO_STRING_ENCODING = "hex";

export const generateHash = (password) => {
  const salt = crypto
    .randomBytes(SALT_LENGTH)
    .toString(BYTE_TO_STRING_ENCODING);
  const hash = crypto
    .pbkdf2Sync(password, salt, ITERATIONS, PASSWORD_LENGTH, DIGEST)
    .toString(BYTE_TO_STRING_ENCODING);
  return { salt, hash, iterations: ITERATIONS };
};

export const verifyHash = (password, salt, hash, iterations) => {
  const newHash = crypto
    .pbkdf2Sync(password, salt, iterations, PASSWORD_LENGTH, DIGEST)
    .toString(BYTE_TO_STRING_ENCODING);
  return hash === newHash;
};

export const removeHash = (user) => {
  user.hash = undefined;
  user.salt = undefined;
  user.iterations = undefined;
  return user;
};
