import { useState, useEffect } from "react";
import { Mail, Lock } from "lucide-react";
import logo from "../assets/CRASA.svg";
import "../styles/Login.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [gradientPosition, setGradientPosition] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("");

        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        setLoading(true);

        // Simulación de inicio de sesión
        try {
            // Aquí iría la lógica de autenticación real
            await new Promise((resolve) => setTimeout(resolve, 1000));
            alert("Login successful!");
            console.log("Iniciando sesión con:", { email, password });
            // Redirección después del inicio de sesión exitoso
        } catch (err) {
            console.error("Error al iniciar sesión:", err);
            setError("Error al iniciar sesión. Verifique sus credenciales.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-[700px] mx-auto grid md:grid-cols-9 shadow-md rounded-md overflow-hidden border border-gray-200">
      {/* Columna de branding */}
      <div className="hidden md:flex md:col-span-3 animated-gradient items-center justify-center p-8 border-r border-gray-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent animate-pulse opacity-50"></div>
        <div className="flex flex-col items-center z-10 transition-all duration-700 hover:scale-110 hover:rotate-3">
          <img src={logo} alt="CRASA Logo" className="h-32 w-auto drop-shadow-lg" />
        </div>
      </div>

      {/* Formulario de login */}
      <div className="md:col-span-6 border-0 shadow-none rounded-none bg-white">
        <div className="space-y-1 pt-6 pb-5 px-6">
          <div className="md:hidden flex items-center gap-2 mb-4">
            <img src={logo} alt="CRASA Logo" className="h-10 w-auto" />
          </div>
          <h2 className="text-left text-xl font-semibold text-gray-800">Iniciar sesión</h2>
          <p className="text-left text-sm text-gray-500">Ingrese sus credenciales para acceder al sistema</p>
        </div>
        <div className="px-6 py-0">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded text-sm">{error}</div>
            )}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-sm text-left font-medium text-gray-700">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-[#E87D38]" />
                <input
                  id="email"
                  type="email"
                  placeholder="nombre@empresa.com"
                  className="pl-10 h-10 text-sm border border-gray-300 rounded-md w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                <a href="#" className="text-xs font-medium text-[#744737] hover:text-[#E87D38] hover:underline">
                  ¿Olvidó su contraseña?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-[#E87D38]" />
                <input
                  id="password"
                  type="password"
                  className="pl-10 h-10 text-sm border border-gray-300 rounded-md w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="pt-2">
              <button
                type="submit"
                className="w-full h-10 flex items-center justify-center text-sm font-medium bg-[#744737] hover:bg-[#664437] text-white rounded-md transition-colors"
                disabled={loading}
              >
                {loading ? "Iniciando sesión..." : "Iniciar sesión"}
              </button>
            </div>
          </form>
        </div>
        <div className="flex flex-col pt-4 px-6 pb-6">
          <div className="text-xs text-center text-gray-500 mt-3 pt-3 border-t border-gray-200">
            <p>Este es un sistema privado. El uso no autorizado está prohibido.</p>
            <p className="mt-1">© 2025 CRASA Representaciones S.A. de C.V. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </div>
    )
}