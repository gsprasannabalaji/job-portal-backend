const validateFullName = (req, res, next) => {
    const { fullName } = req.body;
    if(!fullName) {
        return res.status(400).json({ message: 'fullName is required' });
    }
    next(); 
};

export default validateFullName;