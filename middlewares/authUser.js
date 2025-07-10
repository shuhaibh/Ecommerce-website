const jwt = require('jsonwebtoken')

const authUser = (req, res, next) => {
    try {
        const {token} = req.cookies || {};
        if(!token) {
            return res.status(401).json({message: "User not authorized"})
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if(!decodedToken) {
            return res.status(401).json({message: "User not authorized"})
        }

        // if (!decodedToken.isSeller) {
        //     return res.status(403).json({ message: 'Seller access only' });
        // }


        req.user = decodedToken

        next()
    } catch (error) {
        console.log(error)  
        return res.status(401).json({ message: 'Token invalid or expired' })      
    }
}


module.exports = authUser