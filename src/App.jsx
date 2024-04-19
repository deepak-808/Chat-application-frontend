import { Route, Routes, Outlet, Navigate, BrowserRouter as Router, } from "react-router-dom";
import Dashboard from './components/pages/Dashboard';
import MainLayout from './components/layout-component/MainLayout';
import LoginLayout from './components/layout-component/LoginLayout';
import LoginAndRegister from './components/pages/auth/LoginAndRegister';
import './App.scss';
import { AuthProvider, useAuth } from "./auth/authProvider";
import Car from "./components/pages/customer/Car";
import AddEditCar from "./components/pages/customer/AddEditCar";
import CarModels from "./components/pages/customer/CarModels";
import AddEditCarModel from "./components/pages/customer/AddEditCarModel";
import FuelType from "./components/pages/customer/FuelType";
import Categories from "./components/pages/customer/Categories";
import AddEditFuelType from "./components/pages/customer/AddEditFuelType";
import AddEditCategories from "./components/pages/customer/AddEditCategories";
import AnalyticsCard from "./components/pages/payment";
// import Payment from "./components/pages/payment";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<UnProtectedRoutes />}>
            <Route path="/" element={<LoginLayout />}>
              <Route path="/" element={<LoginAndRegister />} />
            </Route>
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/cars" element={<Car />} />
              <Route path='/cars/add' element={<AddEditCar />}/>
              <Route path="/car/model" element={<CarModels />} />
              <Route path="/car/model/add" element={<AddEditCarModel />} />
              <Route path="/car/fuels-type" element={<FuelType />} />
              <Route path="/car/fuels-type/add" element={<AddEditFuelType />} />
              <Route path="/car/categories" element={<Categories />} />
              <Route path="/car/categories/add" element={<AddEditCategories />} />
              <Route path="/payment" element={<AnalyticsCard />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
const ProtectedRoutes = () => {
  const {user} = useAuth();
  const isAuthenticated = user?.name ? true :  false ;
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};
const UnProtectedRoutes = () => {
  const {user} = useAuth();
  const isAuthenticated = user?.name ? true :  false ;
  return isAuthenticated !== true ? <Outlet /> : <Navigate to="/dashboard" />;
};

export default App;
