import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import './App.css';

// Pages
import Login from "./pages/Login";
import GeneralPage from "./pages/GeneralPage";
import Managements from "./pages/Managements";
import QuotasPage from "./pages/QuotasPage";
import ChartPage from "./pages/ChartPage";
import BoxReport from "./pages/BoxReport";
import FamilyPage from "./pages/FamilyPage";
import BrandPage from "./pages/BrandPage";
import PesoReport from "./pages/PesoReport";
import ProductReport from "./pages/ProductReport";

// Contexts
import { AuthProvider } from './contexts/AuthContext'

// Components
import Navbar from "./components/Navbar";

const MainLayout = () => {
    return (
        <>
        <Navbar />
        <div className="page-content">
        <Outlet />
        </div>
        </>
    )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

          <Route element={<MainLayout />}>
          <Route path="/general" element={<GeneralPage />} />
          <Route path="/productos" element={<ProductReport />} />
          <Route path="/cajas" element={<BoxReport />} />    
          <Route path="/pesos" element={<PesoReport />} />    
          <Route path="/gestion" element={<Managements />} />  
          <Route path="/familias" element={<FamilyPage />} />  
          <Route path="/marcas" element={<BrandPage />} />    
          <Route path="/cuotas" element={<QuotasPage />} />    
          <Route path="/graficas" element={<ChartPage />} />  
        </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App; 