import type { NextApiRequest, NextApiResponse } from "next";
import parseToken from "parse-bearer-token"
import { decode } from "jsonwebtoken";
import { User } from "../../lib/users";

async function handler(req: NextApiRequest, res: NextApiResponse, decodedToken) {
    const user = new User(decodedToken.userId)
    await user.pull()
    res.send(user.data)
}

function authMiddleware(callback) {
    return function (req: NextApiRequest, res: NextApiResponse) {
        const token = parseToken(req);
        if (!token) {
            res.status(401).send({ message: "no hay token" })
        }
        const decodedToken = decode(token)
        console.log(decodedToken)

        if (decodedToken) {
            callback(req, res, decodedToken)
        } else {
            res.status(401).send({ message: "token no autorizado" })
        }
    }

}

export default authMiddleware(handler)