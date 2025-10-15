import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../hooks/reduxHooks';
import type { UserRoleType } from '../redux/commonTypes/commonTypes';

interface ProtectedRouteProps {
    allowedRoles?: UserRoleType[]; 
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
    const { user } = useAppSelector(state => state.auth);

    

    if (!user) {
        return <Navigate to='/auth' replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" />;
    }


    return <Outlet />;
}


export default ProtectedRoute