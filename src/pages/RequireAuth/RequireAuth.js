import { useLocation, Navigate, Outlet } from "react-router-dom"
import { AUTH_TOKEN } from "../../constants/authToken"

const RequireAuth = () => {
    const token = localStorage.getItem(AUTH_TOKEN)
    const location = useLocation()

    return (
        token
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} />
    )
}
export default RequireAuth