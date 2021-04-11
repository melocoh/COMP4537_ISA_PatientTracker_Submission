import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const auth = async (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    return res.status(401).json({msg: "No token, authorization denied"});
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWTTOKEN);

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({msg: "Token is not valid"});
  }
};

export default auth;