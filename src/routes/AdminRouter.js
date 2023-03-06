import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../components/Layouts/AdminLayout";
import Clients from "../pages/Admin/Clients/Clients";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import Services from "../pages/Admin/Services/Services";
import Vendors from "../pages/Admin/Vendors/Vendors";

export default function AdminRouter(props) {
    return (
        <Routes>
            <Route path="/admin" element={<Layout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="vendors" element={<Vendors />} />
                <Route path="clients" element={<Clients />} />
                <Route path="services" element={<Services />} />
                <Route path="/admin" element={<Navigate to="dashboard" />} />
                <Route path="*" element={<Navigate to="dashboard" />} />
            </Route>
        </Routes>
    );
}
