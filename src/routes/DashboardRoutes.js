import { Routes, Route } from 'react-router-dom';
import CreateAccountPage from '../Pages/CreateAccountPage';
import CreateOperationPage from '../Pages/CreateOperationPage';
import DashboardPage from '../Pages/DashboardPage';
import NotFound from '../Pages/Error404';
import OperationsPage from '../Pages/OperationsPage';
import ProfilePage from '../Pages/ProfilePage/index';
import ReportAccount from '../Pages/ReportAccount';

const DashboardRoutes = () => (
  <div>
    <Routes>
      <Route path="home" element={<DashboardPage />} />
      <Route path="profile" element={<ProfilePage />} />
      <Route path="createaccount" element={<CreateAccountPage />} />
      <Route path="reportaccount/:id" element={<ReportAccount />} />
      <Route path="operations" element={<OperationsPage />} />
      <Route path="createOperation" element={<CreateOperationPage />} />
      {/* <Route path="marvel" element={<MarvelScreen />} />
        <Route path="dc" element={<DcScreen />} />
        <Route path="search" element={<SearchScreen />} />
        <Route path="hero/:heroeId" element={<HeroScreen />} />
        <Route path="/" element={<MarvelScreen />} /> */}
      <Route path="/*" element={<NotFound />} />
    </Routes>
  </div>
);

export default DashboardRoutes;
