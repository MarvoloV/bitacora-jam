import { Routes, Route, BrowserRouter } from 'react-router-dom';
import DashboardRoutes from './DashboardRoutes';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage/index';
import ForgotPasswordPage from '../Pages/ForgotPasswordPage';
import ResetPassword from '../Components/ResetPassword';
import NotFound from '../Pages/Error404/index';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route path="/pages/*" element={<DashboardRoutes />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
export default AppRouter;
