import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import './App.css';

// Pages
import Login from './pages/Login.jsx';
import GeneralPage from './pages/GeneralPage.jsx';

// Components
import Navbar from './components/Navbar.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';

// Layout for authenticated routes
const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className="page-content"> {/* Optional: Add a class for page content styling */}
        <Outlet />
      </div>
    </>
  );
};

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
          <Route path="/usuarios" element={<GeneralPage />} />  
          <Route path="/familias" element={<GeneralPage />} />  
          <Route path="/marcas" element={<GeneralPage />} />    
          <Route path="/cuotas" element={<GeneralPage />} />    
          <Route path="/graficas" element={<GeneralPage />} />  
        </Route>
      </Routes>
    </Router>
  </AuthProvider>
  );
}

export default App;
