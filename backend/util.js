import jwt from "jsonwebtoken";
import config from "./config.js";
const getToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    config.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
};

const takeToken = (admin) => {
  return jwt.sign(
    {
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      isAdmin: admin.isAdmin,
    },
    config.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
};

const isAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const onlyToken = token.slice(7, token.length);
    jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({ msg: "Invaid Token" });
      }
      req.user = decode;
      next();
      return;
    });
  } else {
    return res.status(401).send({ msg: "Token is not supplied" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.admin && req.admin.isAdmin) {
    return next();
  }
  return res.status(401).send({ msg: "Admin Token is not valid" });
};

export { getToken, isAdmin, isAuth, takeToken };
