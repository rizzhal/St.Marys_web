import AuthModel from "../model/auth.model.js"
import moment from "moment"
import { CatchError, TryError } from "../util/error.js"

const RefreshMiddleware = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken

        if (!refreshToken) {
            throw TryError("Refresh token not found", 401)
        }

        const user = await AuthModel.findOne({ refreshToken })

        if (!user) {
            throw TryError("Invalid refresh token", 401)
        }

        const today = moment()
        const expiry = moment(user.expiry)

        if (today.isAfter(expiry)) {
            throw TryError("Refresh token expired", 401)
        }

        req.session = {
            id: user.id,
            email: user.email,
            fullname: user.fullname,
            role: user.role
        }

        next()
    }
    catch (err) {
        CatchError(err, res, "Failed to refresh session")
    }
}

export default RefreshMiddleware
