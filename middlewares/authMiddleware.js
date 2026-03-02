import jwt from "jsonwebtoken";

export const userAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization?.split(" ")[1];
    if (!authHeader) {
        next('Auth Failed');
    }
    try {
        const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        next('Authentication failed');
    }
};
