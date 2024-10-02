import type { NextApiRequest, NextApiResponse } from "next";
import { getMerchOrder } from "../../../lib/mercadoPago";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { id, topic } = req.query;
    if (topic == "merchant_order") {
        const order = await getMerchOrder({ merchantOrderId: id as string | number })
        res.json(order);
    }
}