import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";

const secureUrl = axios.create({
    // baseURL: "http://localhost:5000"
    baseURL: "https://phero-job-task-server.onrender.com"
})
const useSecureUrl = () => {
    const navigate = useNavigate();
    const {logOut, setLoading} = useContext(AuthContext);

    secureUrl.interceptors.request.use(
        function (config) {
            const token = localStorage.getItem('token');
            if(token){
                config.headers.authorization = `Bearer ${token}`;
            }
            return config;
        },
        function (error) {
            setLoading(false)
            return Promise.reject(error);
        }
    );

    secureUrl.interceptors.response.use(
        function (response){
            return response;
        },
        async (error) => {
            const status = error?.response?.status
            if(status === 401 || status === 403){
                setLoading(true);
                await logOut();
                navigate("/", { replace: true });
                setLoading(false);
            }
            return Promise.reject(error);
        }
    );
    
    return secureUrl;
}

export default useSecureUrl;