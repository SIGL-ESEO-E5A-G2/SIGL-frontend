import { Navigate, Route, Routes } from "react-router-dom";

import Login from './pages/Login';

export default function ({ loadUser }) {

    return <Routes>
        <Route path="/*" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login loadUser={loadUser} />} />
    </Routes>
}