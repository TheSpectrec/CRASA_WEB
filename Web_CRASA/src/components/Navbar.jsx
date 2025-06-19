import { useState } from "react";
import { ChevronDown, LogOut, Menu, X } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import logo from "../assets/CRASA.svg";
import "../styles/Navbar.css";


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const handleLogout = () => {
        console.log("Cerrando sesión...");
    }

    const createRipple = (event) => {
        const button = event.currentTarget;
        const circle = document.createElement("span");
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        const react = button.getBoundingClientRect();
        circle.style.left = `${event.clientX - rect.left - radius}px`
        circle.style.top = `${event.clientY - rect.top - radius}px`
        circle.classList.add("ripple")

        const ripple = button.getElementsByClassName("ripple")[0];
        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);
    }

    const navigationItems = [
        { name: "General", href: "/general" },
        { name: "Productos", href: "/productos" },
        { name: "Cajas", href: "/cajas" },
        { name: "Pesos", href: "/pesos" },
        { name: "Gestión", href: "/gestion" },
    ]

    const otrosItems = [
        { name: "Familias", href: "/familias" },
        { name: "Marcas", href: "/marcas" },
        { name: "Cuotas", href: "/cuotas" },
        { name: "Gráficas", href: "/graficas" },
    ]

    const isActiveRoute = (href) => location.pathname === href;
    const isOtrosActive = otrosItems.some((item) => location.pathname === item.href);

    return (
        <header className="navbar-header">
            <div className="navbar-container">
                {/* Logo */}
                <div className="navbar-logo">
                    <Link to="/general" className="logo-link">
                        <img src={logo} alt="CRASA" className="logo" />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="navbar-desktop">
                    <nav className="nav-menu">
                        {navigationItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`nav-item ${isActiveRoute(item.href) ? "nav-item-active" : ""}`}
                                onClick={createRipple}
                            >
                                <span className="nav-text">{item.name}</span>
                            </Link>
                        ))}

                        {/* Dropdown para Otros */}
                        <div className="dropdown">
                            <button onClick={createRipple} className={`dropdown-trigger ${isOtrosActive ? "dropdown-active" : ""}`}>
                                <span className="dropdown-text">
                                    Otros
                                    <ChevronDown className="dropdown-icon" />
                                </span>
                            </button>
                            <div className="dropdown-content">
                                {otrosItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className={`dropdown-item ${isActiveRoute(item.href) ? "dropdown-item-active" : ""}`}
                                        onClick={createRipple}
                                    >
                                        <span className="dropdown-item-text">{item.name}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </nav>

                    {/* Logout Button */}
                    <button
                        onClick={(e) => {
                            createRipple(e);
                            handleLogout();
                        }}
                        className="logout-btn"
                    >
                        <LogOut className="logout-icon" />
                        <span className="logout-text">Cerrar sesión</span>
                    </button>
                </div>

                {/* Mobile Navigation */}
                <div className="navbar-mobile">
                    <button
                        onClick={(e) => {
                            createRipple(e);
                            setIsOpen(!isOpen);
                        }}
                        className="mobile-menu-btn"
                    >
                        <Menu className="mobile-menu-icon" />
                    </button>

                    {/* Mobile Menu Overlay */}
                    {isOpen && (
                        <div className="menu-overlay">
                            <div className="mobile-menu">
                                <div className="mobile-header">
                                    <div className="mobile-logo">
                                        <Link to="/general" className="logo-link">
                                            <img src={logo} alt="CRASA" className="logo" />
                                        </Link>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            createRipple(e);
                                            setIsOpen(false);
                                        }}
                                        className="mobile-close-btn"
                                    >
                                        <X className="mobile-close-icon" />
                                    </button>
                                </div>
                                <nav className="mobile-nav">
                                    {navigationItems.map((item) => (
                                        <Link
                                            key={item.name}
                                            to={item.href}
                                            onClick={(e) => {
                                                createRipple(e)
                                                setIsOpen(false)
                                            }}
                                            className={`mobile-nav-item ${isActiveRoute(item.href) ? "mobile-nav-item-active" : ""}`}
                                        >
                                            <span className="mobile-nav-text">{item.name}</span>
                                        </Link>
                                    ))}

                                    {/* Otros en móvil */}
                                    <div className="mobile-section">
                                        <p className="mobile-section-title">Otros</p>
                                        {otrosItems.map((item) => (
                                            <Link
                                                key={item.name}
                                                to={item.href}
                                                onClick={(e) => {
                                                    createRipple(e)
                                                    setIsOpen(false)
                                                }}
                                                className={`mobile-sub-item ${isActiveRoute(item.href) ? "mobile-sub-item-active" : ""}`}
                                            >
                                                <span className="mobile-sub-text">{item.name}</span>
                                            </Link>
                                        ))}
                                    </div>

                                    {/* Cerrar Sesión en móvil */}
                                    <div className="mobile-logout-section">
                                        <button
                                            onClick={(e) => {
                                                createRipple(e)
                                                handleLogout()
                                            }}
                                            className="mobile-logout-btn"
                                        >
                                            <LogOut className="mobile-logout-icon" />
                                            <span className="mobile-logout-text">Cerrar Sesión</span>
                                        </button>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Navbar;