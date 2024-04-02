import { LOGIN_URL } from "constants"
import Axios from "lib/Axios"

export const LogInAPI=({data})=>{
    return Axios.post(LOGIN_URL,{data});
}