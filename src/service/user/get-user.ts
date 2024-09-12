import axios from "axios";
import { UserModel } from "../@types/types";

export const getUser = async(id: string) =>{
    const res = await axios.get<UserModel>(`localhost:3000/user/${id}`)
    return res
}