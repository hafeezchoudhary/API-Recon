import axios from "axios";

const API = "http://127.0.0.1:5000/";

export const getBackendStatus = async() =>{
    const response = await axios.get(API)
    return response.data
}

