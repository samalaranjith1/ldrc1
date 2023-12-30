const userRoleMiddleware = async (req, res, next) => {
  console.log("hi i am from userRolMIddleware");
  console.log(req.url);
  next();
  //   const authHeader = req.headers.authorization;

  //   if (!authHeader || !authHeader.startsWith("Bearer ")) {
  //     throw new UnauthenticatedError("No token provided");
  //   }

  //   const token = authHeader.split(" ")[1];

  //   try {
  //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //     const { id, username } = decoded;
  //     req.user = { id, username };
  //     next();
  //   } catch (error) {
  //     throw new UnauthenticatedError("Not authorized to access this route");
  //   }
};

module.exports = userRoleMiddleware;
