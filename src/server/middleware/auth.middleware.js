import jwt from 'jsonwebtoken'
import { CatchError, TryError } from '../util/error.js'

const AuthMiddleware = async (req, res, next) => {
    try {
        console.log(req.cookies)
        const accessToken = req.cookies.accessToken
        console.log("access token exists" , !!accessToken)
        if (!accessToken) {
            throw TryError("Unauthorized access", 401)
        }

        const payload = await jwt.verify(accessToken, process.env.AUTH_SECRET)
        console.log("JWT payload" , payload)
        req.session = {
            id: payload.id,
            fullname: payload.fullname,
            email: payload.email,
            role: payload.role
        }
        console.log(req.session)
        next()
    }
    catch (err) {
        CatchError(err, res, "Authentication failedddd")
    }
}

export default AuthMiddleware
