import { User } from "../models/users"

export async function getUserById(id: string) {
    const user = new User(id)
    await user.pull()
    return user.data
}