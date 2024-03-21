const validatePassword = (req, res, next) => {
    const { password } = req.body;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    if(!password) {
        return res.status(400).json({ message: 'password is required' });
    }
    if(!passwordRegex.test(password)){
        return res.status(400).json({ message: 'Password must contain at least one digit, one lowercase letter, one uppercase letter, one special character, and be at least 8 characters long' });
    };
    next();
};

module.exports = validatePassword;