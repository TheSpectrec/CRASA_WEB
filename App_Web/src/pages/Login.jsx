import { useState } from "react";
import { Shield, Mail, Lock } from "lucide-react";
import logo from "../../public/CRASA.svg"

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

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
        <div className="max-w-[900px] mx-auto grid md:grid-cols-7 shadow-md rounded-md overflow-hidden border border-gray-200">
      {/* Columna de branding */}
      <div className="hidden md:flex md:col-span-2 bg-gradient-to-tl from-[#F3DB30] via-[#E87D38] to-[#744737] bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-500 items-center justify-center p-8 border-r border-gray-200">
        <div className="flex flex-col items-center">
          <Shield className="h-20 w-20 text-gray-700" />
        </div>
      </div>

      {/* Formulario de login */}
      <div className="md:col-span-5 border-0 shadow-none rounded-none bg-white">
        <div className="space-y-1 pt-6 pb-5 px-6">
          <div className="md:hidden flex items-center gap-2 mb-4">
            <Shield className="h-6 w-6 text-gray-700" />
            <span className="text-sm font-semibold tracking-tight">EMPRESA S.A.</span>
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