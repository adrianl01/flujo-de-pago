import type { NextApiRequest, NextApiResponse } from "next";
import { compareAsc } from "date-fns";

import { generate } from "../../lib/jwt";
import { Auth } from "../../models/auth";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { email } = req.body as any;
    console.log("function api token");
    console.log(req.body);
    const newEmail = await Auth.findByEmail(email);

    const date = newEmail.data.expires.toDate();
    const currentDate = new Date();
    const expDate = compareAsc(date, currentDate);
    if (expDate == -1) {
        res.send({ message: "código expirado" })
    } else if (expDate !== -1) {
        // token se genera en base del userId
        const token = generate({ userId: newEmail.data.userId })
        res.send({ token })
    }
}