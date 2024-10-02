import type { NextApiRequest, NextApiResponse } from "next";
import { generateOrder } from "../../../lib/mercadoPago";
import parseToken from "parse-bearer-token"
import { User } from "../../../lib/users";
import { Order } from "../../../lib/models/order";
import { decode } from "../../../lib/jwt";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { productId } = req.query as any
    const token = parseToken(req) as any;
    const decodedToken = decode(token) as any
    console.log("token:", decodedToken)
    if (!token) { res.status(401) }
    const order = await Order.createNewOrder({
        additionalInfo: req.body,
        productId,
        userId: decodedToken.userId
    })

    const user = new User(decodedToken.userId)
    user.pull()
    // const resOrder = await generateOrder({ body: req.body as any })
    res.json(order.data)
}

