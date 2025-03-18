import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";

import { AuthContext} from "../contexts/AuthContext.js"

const RouteGuard = ({children}) => {
    
    const { user } = useContext(AuthContext);

    if (!user.accessToken) {
        return <Navigate to='/login' replace/>
    }    

    return children ? children : <Outlet/>
}

export default RouteGuard;