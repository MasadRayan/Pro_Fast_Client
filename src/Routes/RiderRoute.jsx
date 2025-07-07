import React from 'react';
import useAuth from '../Hooks/useAuth';
import useUserRole from '../Hooks/useUserRole';
import Loading from '../Components/Loading/Loading';

const RiderRoute = ({children}) => {
    const { user, loading } = useAuth();
    const { role, roleLoading } = useUserRole();


    if (loading || roleLoading) {
        return <Loading></Loading>
    }

    if (!user || role !== 'rider') {
        console.log("object");
        return <Navigate to="/forbidden" />;
    }
    return children
};

export default RiderRoute;