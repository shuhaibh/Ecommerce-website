const jwt = require('jsonwebtoken')

const authAdmin = (req, res, next) => {
    try {
        const {token} = req.cookies
        if(!token) {
            return res.status(401).json({message: "User not authorized"})
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if(!decodedToken) {
            return res.status(401).json({message: "User not authorized"})
        }

        console.log(decodedToken.role)
        if(decodedToken.role != "admin") {
            return res.status(401).json({message: "Admin access only"})
        }

        req.user = decodedToken

        next()
    } catch (error) {
        console.log(error)        
    }
}


module.exports = authAdmin