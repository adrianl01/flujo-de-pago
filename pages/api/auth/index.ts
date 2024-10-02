import { NextApiRequest, NextApiResponse } from "next";
import { sendCode } from "../../../lib/controllers/auth";
import { sendEmail } from "../../../lib/mailjet";

export default async function (req: NextApiRequest, res: NextApiResponse) {

    const auth = await sendCode(req.body.email)

    // email sender comentado pero funcionando😉
    // const sendEmailRes = await sendEmail(auth.data)

    res.send(auth.data)
}