import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from '../store';
import DashboardRoutes from './DashboardRoutes';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage/index';
import ForgotPasswordPage from '../Pages/ForgotPasswordPage';
import ResetPassword from '../Components/ResetPassword';
import NotFound from '../Pages/Error404/index';

const { store } = configureStore();
const AppRouter = () => (
  <Provider store={store}>
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
  </Provider>
);
export default AppRouter;
