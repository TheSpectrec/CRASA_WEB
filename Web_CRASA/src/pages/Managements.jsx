"use client"

import { useState, useRef } from "react"

// Components
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Contexts
import { DataProvider } from "../contexts/DataContext"

// Icons
import { Users, Building2, Tag, Layers, Package, UserCheck, FolderOpenDot } from "lucide-react"

// Gestion Components
import User from "../components/managements/Users"
import Companies from "../components/managements/Companies"
import Brands from "../components/managements/Marks"
import Families from "../components/managements/Families"
import Products from "../components/managements/Products"
import Clients from "../components/managements/Customers"

const modules = [
    { id: "usuarios", name: "Gestión de Usuarios", icon: Users },
    { id: "empresas", name: "Gestión de Empresas", icon: Building2 },
    { id: "marcas", name: "Gestión de Marcas", icon: Tag },
    { id: "familias", name: "Gestión de Familias", icon: Layers },
    { id: "productos", name: "Gestión de Productos", icon: Package },
    { id: "clientes", name: "Gestión de Clientes", icon: UserCheck },
]

function ModuleSelect({ activeModule, setActiveModule }) {
    return (
        <div className="w-64">
            <Select value={activeModule} onValueChange={setActiveModule}>
                <SelectTrigger>
                    <SelectValue placeholder="Seleccionar módulo" />
                </SelectTrigger>
                <SelectContent>
                    {modules.map((module) => {
                        const Icon = module.icon
                        return (
                            <SelectItem key={module.id} value={module.id}>
                                <div className="flex items-center gap-2">
                                    <Icon className="w-4 h-4" />
                                    {module.name}
                                </div>
                            </SelectItem>
                        )
                    })}
                </SelectContent>
            </Select>
        </div>
    )
}

function MainContent({ activeModule, setActiveModule }) {
    const renderModule = () => {
        switch (activeModule) {
            case "usuarios":
                return <User />
            case "empresas":
                return <Companies />    
            case "marcas":
                return <Brands />   
            case "familias":
                return <Families />     
            case "productos":
                return <Products />  
            case "clientes":
                return <Clients />      
            default:
                return <User />
        }
    }

    const currentModule = modules.find((m) => m.id === activeModule)
    const Icon = currentModule?.icon || Users

    return (
        <div className="flex-1 p-6">
            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <FolderOpenDot className="w-8 h-8 text-[#744737]" />
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Sistema de Gestión</h1>
                    </div>

                    <ModuleSelect activeModule={activeModule} setActiveModule={setActiveModule} />
                </div>

                <p className="text-gray-600 dark:text-gray-400">Administra y gestiona los datos del sistema</p>
            </div>
            {renderModule()}
            </div>
    )
}

export default function Managements() {
    const [activeModule, setActiveModule] = useState("usuarios")
    // Referencia para el contenedor principal
    const containerRef = useRef(null);

    return (
        <DataProvider>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto" ref={containerRef}>
                    <MainContent activeModule={activeModule} setActiveModule={setActiveModule} />
                </div>
            </div>
        </DataProvider>
    )
}



