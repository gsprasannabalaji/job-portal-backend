import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
    const token = req.cookies?.["user-creds"];
    if(token == null) return res.status(401).json({ message: 'User is unauthorized' });

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodeToken) => {
        if(err) return res.status(403).json({ message: 'Session is Expired! Please login again.' });

        if(req?.url === "/check-admin-cookie") {
            req.userRole = decodeToken?.role;
        }
        next();
    })
};

export default authenticateToken;