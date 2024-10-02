import { firestore } from "../firestore";
const collection = firestore.collection("orders");

export class Order {
    ref: FirebaseFirestore.DocumentReference;
    data: any
    id: string
    constructor(id) {
        this.id = id
        this.ref = collection.doc(id)
    }
    async pull() {
        const snap = await this.ref.get()
        this.data = snap.data()
    }
    async push() {
        this.ref.update(this.data)
    }

    static async createNewOrder(newOrderdata = {}) {
        console.log(newOrderdata)
        const newOrderSnap = await collection.add(newOrderdata)
        const newOrder = new Order(newOrderSnap.id)
        newOrder.data = newOrderdata
        return newOrder
    }
}