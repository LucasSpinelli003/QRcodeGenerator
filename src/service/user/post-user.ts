import axios from "axios"
import { CreateUserArgs, UserModel } from "../@types/types"

export const postUser = async (body: CreateUserArgs)=> {
    const res = await axios.post<UserModel>(`http://127.0.0.1:3333/user`,body)
    return res
} 