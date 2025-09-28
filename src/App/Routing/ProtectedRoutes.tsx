// import React from 'react';
// import { Navigate, useLocation } from 'react-router';
// import { useAuth } from '@/Modules/Auth/Hooks/useAuth';
// import GlobalLoader from '@/_shared/Hoc/GlobalLoader';

// interface ProtectedRouteProps {
//     children: React.ReactNode;
//     requiredRole?: string;
// }

// export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
//     children,
// }) => {
//     const { isAuthenticated, loading } = useAuth();
//     const location = useLocation();

//     // Show loading while checking authentication
//     if (loading) {
//         return <GlobalLoader />;
//     }

//     // Redirect to login if not authenticated
//     if (!isAuthenticated) {
//         return <Navigate to="/login" state={{ from: location }} replace />;
//     }

//     // Check role if required
//     //   if (requiredRole && user?.role !== requiredRole) {
//     //     return <Navigate to="/unauthorized" replace />;
//     //   }

//     return <>{children}</>;
// };