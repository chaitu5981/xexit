import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AuthProvider from "./AuthProvider";
import ProtectedLayout from "./pages/ProtectedLayout";
import EmpDashboard from "./pages/EmpDashboard";
import ExEmpDashboard from "./pages/ExEmpDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import RoleRedirect from "./pages/RoleRedirect";
import { ToastContainer } from "react-toastify";
const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RoleRedirect />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedLayout role="emp" />}>
            <Route path="/emp" element={<EmpDashboard />} />
          </Route>
          <Route element={<ProtectedLayout role="exEmp" />}>
            <Route path="/exEmp" element={<ExEmpDashboard />} />
          </Route>
          <Route element={<ProtectedLayout role="hr" />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
          <Route path="/not-found" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" />
    </AuthProvider>
  );
};
export default App;
