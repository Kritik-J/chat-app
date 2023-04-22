import { removeHash } from "./password.js";

const createSendToken = (user, statusCode, req, res) => {
  const token = user.generateAuthToken();

  //options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  };

  // Remove password from output
  // user.hash = undefined;
  // user.salt = undefined;
  // user.iterations = undefined;

  user = removeHash(user);

  res.status(statusCode).cookie("jwttoken", token, options).json({
    status: "success",
    user,
    token,
  });
};

export default createSendToken;
