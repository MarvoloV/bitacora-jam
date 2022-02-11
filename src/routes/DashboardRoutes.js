import { Routes, Route } from 'react-router-dom';
import DashboardPage from '../Pages/DashboardPage';
import NotFound from '../Pages/Error404';
import ProfilePage from '../Pages/ProfilePage/index';

const DashboardRoutes = () => (
  <div>
    <Routes>
      <Route path="dashboard" element={<DashboardPage />} />
      <Route path="profile" element={<ProfilePage />} />
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
