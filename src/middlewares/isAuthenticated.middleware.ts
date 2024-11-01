import jwt from "jsonwebtoken"
import { Response, NextFunction} from "express"
import JWTConfig from "../configs/jwt"
import type { AuthenticatedRequest } from "../utils/classes/Request"

const isAuthenticated = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<any> => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({message: "Access Denied", error: true})

    try {
        const decoded = jwt.verify(token, JWTConfig.key)

        req.userId = decoded
        req.token = token

        next()
    } catch (error) {
        console.error(error)
        res.status(401).json({ message: 'Invalid Token', error: true });
    }
}

export default isAuthenticated