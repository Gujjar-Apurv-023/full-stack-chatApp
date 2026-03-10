import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {

  const token = jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,                  // prevent XSS attacks
    sameSite: "lax",                 // allow cross-port requests (5173 → 5000)
    secure: false                    // using HTTP in development
  });

  return token;
};
