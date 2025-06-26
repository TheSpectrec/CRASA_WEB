import { useState, useMemo } from "react";

// Data
import { generarDatosCompletos } from "../utils/DataGenerator";
import { useFilters } from "../hooks/useFilters";
import { useChartData } from "../hooks/useChartData";

// Components
import ChartSelector from "../components/charts/ChartSelector";
import MainChart from "../components/charts/MainChart";
import FilterCard from "../components/FilterCard";

export default function ChartPage() {
    const [busqueda, setBusqueda] = useState("");
    const [tipoGrafica, setTipoGrafica] = useState("Cajas");

    // Generar datos una sola vez
    const datosCompletos = useMemo(() => generarDatosCompletos(), []);

    // Hook para manejar filtros
    const { filtros, setFiltros, datosFiltrados, limpiarFiltros } = useFilters(datosCompletos);

    // Hook para generar datos de gráficas
    const datosGraficas = useChartData(datosFiltrados, tipoGrafica);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7x1 mx-auto space-y-6">
                <FilterCard filtros={filtros} setFiltros={setFiltros} limpiarFiltros={limpiarFiltros} />

                <ChartSelector tipoGrafica={tipoGrafica} setTipoGrafica={setTipoGrafica} />

                <MainChart tipoGrafica={tipoGrafica} datosGraficas={datosGraficas} />
            </div>
        </div>
    )
}