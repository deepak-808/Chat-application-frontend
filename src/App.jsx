import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import './App.css'
import { AuthProvider, useAuth } from './context/authProvider';
import Dashboard from './view/Dashboard'
import Login from './view/auth/Login'
import LoginLayout from './components/layout-component/LoginLayout';
import MainLayout from './components/layout-component/MainLayout';


function App() {
 
  return (
    <AuthProvider>
      <Routes>
        <Route element={<UnProtectedRoutes />}>
          <Route path="/" element={<LoginLayout />}>
            <Route path="/login" element={<Login isSignInPage={true} />} />
            <Route path="/register" element={<Login isSignInPage={false} />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  )
}

const ProtectedRoutes = () => {
  const { user, token } = useAuth();
  const isAuthenticated = user?.username && token ? true : false;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
const UnProtectedRoutes = () => {
  const { user, token } = useAuth();
  const isAuthenticated = user?.username && token ? true : false;
  return isAuthenticated !== true ? <Outlet /> : <Navigate to="/dashboard" />;
};

export default App
