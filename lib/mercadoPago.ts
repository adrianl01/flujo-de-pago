import { MercadoPagoConfig, MerchantOrder, Payment } from "mercadopago";
import type { MerchantOrderGetData } from "mercadopago/dist/clients/merchantOrder/get/types";
import type { MerchantOrderCreateData } from "mercadopago/dist/clients/merchantOrder/create/types";
const client = new MercadoPagoConfig({ accessToken: process.env.MP_TOKEN });
const resOrder = new MerchantOrder(client)
export async function getMerchOrder(id: MerchantOrderGetData) {
    const order = await resOrder.get(id);
    console.log(order);
    return order;
}

export async function generateOrder(data: MerchantOrderCreateData) {
    const newOrder = new MerchantOrder(client);
    const body = {

        external_reference: "default",
        preference_id: "Preference identification",
        sponsor_id: null,
        payer: {
            id: 123,
            nickname: "JOHN"
        },
        site_id: "MLA",
        items: [
            {
                id: "item id",
                category_id: "item category",
                currency_id: "ARS",
                description: "item description",
                picture_url: "item picture",
                quantity: 1,
                unit_price: 5,
                title: "item title"
            }
        ],
        application_id: "10000000000000000"

    };
    try {
        const orden = await newOrder.create({ body })
        console.log(orden)
        return orden
    } catch (error) {
        console.log(error)
    }
}


