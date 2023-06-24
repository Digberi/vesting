import { HomePage, DistributePage, StopVestingPage, ChangeAdminPage, NotFoundPage } from '@pages';
import { Route, Routes } from 'react-router-dom';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/distribute" element={<DistributePage />} />
      <Route path="/stop" element={<StopVestingPage />} />
      <Route path="/change-admin" element={<ChangeAdminPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
