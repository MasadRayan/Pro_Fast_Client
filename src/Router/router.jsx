import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Coverage from "../Pages/Coverage/Coverage";
import Loading from "../Components/Loading/Loading";
import PrivateRoute from "../Routes/PrivateRoute";
import SendParcel from "../Pages/SendParcel/SendParcel";
import DashboardLayout from "../Layouts/DashboardLayout";
import MyParcels from "../Pages/Dashboard/MyParcels/MyParcels";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import BeARider from "../Pages/BeARider/BeARider";
import PendingRider from "../Pages/Dashboard/PendingRider/PendingRider";
import ActiveRiders from "../Pages/Dashboard/ActiveRiders/ActiveRiders";
import MakeAdmin from "../Pages/Dashboard/MakeAdmin/MakeAdmin";
import AdminRoute from "../Routes/AdminRoute";
import Forbidden from "../Components/Forbidden/Forbidden";
import AssignRider from "../Pages/Dashboard/AssignRider/AssignRider";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'coverage',
                Component: Coverage,
                loader: () => fetch('./outletData.json'),
                hydrateFallbackElement: <Loading></Loading>
            },
            {
                path: 'forbidden',
                Component: Forbidden
            },
            {
                path: '/sendParcel',
                element: <PrivateRoute>
                    <SendParcel></SendParcel>
                </PrivateRoute>,
                loader: () => fetch('./outletData.json'),
                hydrateFallbackElement: <Loading></Loading>
            },
            {
                path: 'beARider',
                element: <PrivateRoute>
                    <BeARider></BeARider>
                </PrivateRoute>,
                loader: () => fetch('./outletData.json'),
                hydrateFallbackElement: <Loading></Loading>
            },
            
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: "login",
                Component: Login,
            },
            {
                path: 'register',
                Component: Register,
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute>
            <DashboardLayout></DashboardLayout>
        </PrivateRoute>,
        children: [
            {
                index: true,
                Component: DashboardHome,
            },
            {
                path: 'myParcels',
                Component: MyParcels,
            },
            {
                path: 'payment/:id',
                Component: Payment,
            },
            {
                path: 'paymentHistory',
                Component: PaymentHistory,
            },
            {
                path: 'assignRider',
                element: <AdminRoute>
                    <AssignRider></AssignRider>
                </AdminRoute>
            },
            {
                path: 'pendingRider',
                element: <AdminRoute>
                    <PendingRider></PendingRider>
                </AdminRoute>
            },
            {
                path: 'activeRider',
                element: <AdminRoute>
                    <ActiveRiders></ActiveRiders>
                </AdminRoute>
            },
            {
                path: 'makeAdmin',
                element: <AdminRoute>
                    <MakeAdmin></MakeAdmin>
                </AdminRoute>
            }
        ]
    }
])