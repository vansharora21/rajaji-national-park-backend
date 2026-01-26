export const verifyAdmin = (req, res, next) => {
  // Placeholder for JWT verification logic
  // const token = req.headers.authorization?.split(" ")[1];
  
  // if (!token) {
  //   return res.status(401).json({ message: "Access denied. No token provided." });
  // }

  // Verify token logic here...
  next();
};