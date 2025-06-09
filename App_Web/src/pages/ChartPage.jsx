import { useState, useMemo } from "react"

// Data
import { generarDatosCompletos } from "../utils/dataGenerator"
import { useFilters } from "../hooks/useFilters"
import { useChartData } from "../hooks/useChartData"

// Components
import FilterCard from "../components/FilterCard"
import MainChart from "../components/charts/MainChart"
import ChartSelector from "../components/charts/ChartSelector"

export default function ChartPage() {
    const [busqueda, setBusqueda] = useState("")
    const [tipoGrafica, setTipoGrafica] = useState("Pesos")

    // Generar datos una sola vez
    const datosCompletos = useMemo(() => generarDatosCompletos(), [])

    // Hook para manejar filtros
    const { filtros, setFiltros, datosFiltrados, limpiarFiltros } = useFilters(datosCompletos)

    // Hook para manejar datos de gráfica
    const datosGraficas = useChartData(datosFiltrados, tipoGrafica)

    return (
        <div className="min-h-screen bg-gray-50 py-6">
            <div className="container mx-auto">
                <FilterCard filtros={filtros} setFiltros={setFiltros} onLimpiarFiltros={limpiarFiltros} />

                <ChartSelector tipoGrafica={tipoGrafica} setTipoGrafica={setTipoGrafica} />

                <MainChart tipoGrafica={tipoGrafica} datosGraficas={datosGraficas} />
            </div>
        </div>
    )
}