import { Routes, Route } from 'react-router-dom';
import CreateAccountPage from '../Pages/CreateAccountPage';
import CreateOperationPage from '../Pages/CreateOperationPage';
import DashboardPage from '../Pages/DashboardPage';
import NotFound from '../Pages/Error404';
import OperationsPage from '../Pages/OperationsPage';
import ProfilePage from '../Pages/ProfilePage/index';
import ReportAccount from '../Pages/ReportAccount';
import CalculatorPage from '../Pages/CalculatorPage/index';
import ViewOperationPage from '../Pages/ViewOperationPage/index';

const DashboardRoutes = () => (
  <Routes>
    <Route path="home" element={<DashboardPage />} />
    <Route path="profile" element={<ProfilePage />} />
    <Route path="createaccount" element={<CreateAccountPage />} />
    <Route path="reportaccount/:id" element={<ReportAccount />} />
    <Route path="createOperation" element={<CreateOperationPage />} />
    <Route path="calculator" element={<CalculatorPage />} />
    <Route path="operations" element={<OperationsPage />}>
      {/* <Route path="viewoperation/:id" element={<ViewOperationPage />} /> */}
    </Route>
    <Route path="viewoperation/:id" element={<ViewOperationPage />} />
    {/* <Route path="marvel" element={<MarvelScreen />} />
        <Route path="dc" element={<DcScreen />} />
        <Route path="search" element={<SearchScreen />} />
        <Route path="hero/:heroeId" element={<HeroScreen />} />
        <Route path="/" element={<MarvelScreen />} /> */}
    <Route path="/*" element={<NotFound />} />
  </Routes>
);

export default DashboardRoutes;
