import { Routes, Route, BrowserRouter } from 'react-router-dom';
import DashboardRoutes from './DashboardRoutes';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage/index';
import ForgotPasswordPage from '../Pages/ForgotPasswordPage';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
      <Route path="/pages" element={<DashboardRoutes />} />
    </Routes>
  </BrowserRouter>
);
export default AppRouter;
