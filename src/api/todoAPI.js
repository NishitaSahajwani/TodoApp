
import { axiosObject } from "../App";

export async function getAllData(){
    const response = await axiosObject.get("posts")
    if(response.status === 200)
    {
        return response.data
    }
    return "todo not get";
}