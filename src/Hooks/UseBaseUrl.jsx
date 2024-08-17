import axios from "axios";

const baseUrl = axios.create({
    // baseURL: "http://localhost:5000"
    baseURL: "https://my-store-backend-nine.vercel.app"
})

export default baseUrl;