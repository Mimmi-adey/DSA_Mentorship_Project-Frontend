// AdminRoute.tsx
import { Navigate } from 'react-router-dom';
import type { ReactElement } from 'react';

const AdminRoute = ({ children }: { children: ReactElement }) => {
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');

  if (!token || role !== 'admin') {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;