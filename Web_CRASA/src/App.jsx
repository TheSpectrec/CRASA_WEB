import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import './App.css';

// Pages
import Login from "./pages/Login";
import GeneralPage from "./pages/GeneralPage";
import Managements from "./pages/Managements";
import QuotasPage from "./pages/QuotasPage";

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
          <Route path="/productos" element={<GeneralPage />} />
          <Route path="/cajas" element={<GeneralPage />} />    
          <Route path="/pesos" element={<GeneralPage />} />    
          <Route path="/gestion" element={<Managements />} />  
          <Route path="/familias" element={<GeneralPage />} />  
          <Route path="/marcas" element={<GeneralPage />} />    
          <Route path="/cuotas" element={<QuotasPage />} />    
          <Route path="/graficas" element={<GeneralPage />} />  
        </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App; 