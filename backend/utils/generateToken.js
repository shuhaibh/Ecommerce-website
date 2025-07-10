const jwt = require('jsonwebtoken')

const createToken = (id, role, isSeller) => {
    try {
        const token = jwt.sign({ id: id, role: role, isSeller: isSeller }, process.env.JWT_SECRET_KEY, { expiresIn: '1h'});
        return token;
    } catch (error) {
        console.log(error);
        throw new Error('Token creation failed', error);
    }
}


module.exports = createToken