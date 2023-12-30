const jwt = require("jsonwebtoken");
const { createCustomError } = require("../errors/custom-error");

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(createCustomError("No token provided", 400));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { email } = decoded;
    req.user = { email };
    next();
  } catch (error) {
    req.userAuthError = error;
    return next(
      createCustomError("Not authorized to access this route" + error, 400)
    );
  }
};

module.exports = authenticationMiddleware;
