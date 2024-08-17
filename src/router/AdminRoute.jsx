import { useContext } from "react"
import { AuthContext } from "../providers/AuthProviders"
import { Navigate, useLocation } from "react-router-dom";


const AdminRoute = ({children}) => {
    const {user, loading, logOut, setUser} = useContext(AuthContext);

    const location = useLocation();


    if(loading){
        return <div className="h-screen flex items-center justify-center">
            <h1>Loading...</h1>
        </div>
    }

    if(user?.role !== "admin"){
        setUser(null)
        logOut()
        return <Navigate to="/" state={{from: location}} replace />
    }

    if(user && user?.role === "admin"){
        return children
    }
    
}

export default AdminRoute;