import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader?.split(' ')[1];
    if(token == null) return res.status(401).json({ message: 'User is unauthorized' });

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err) => {
        if(err) return res.status(403).json({ message: 'Session is Expired! Please login again.' });
        next();
    })
};

export default authenticateToken;