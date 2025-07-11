"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import PieChartComponent from "./PieChartComponent"
import BarChartComponent from "./BarChartComponent"
import ScatterChartComponent from "./ScatterChartComponent"
import ChartLegend from "./ChartLegend"

export default function MainChart({ tipoGrafica, datosGraficas }) {
  const getChartDescription = () => {
    const descriptions = {
      Cajas: "Cantidad de cajas vendidas por año y mes",
      Vendedor: "Distribución de cajas por vendedor",
      Marca: `Cajas vendidas por marca (${datosGraficas?.length || 0} marcas)`,
      Cliente: `Cajas compradas por cliente (${datosGraficas?.length || 0} clientes)`,
      Familias: `Cajas vendidas por familia de productos (${datosGraficas?.length || 0} familias)`,
      Devoluciones: `Cajas devueltas por cliente (${datosGraficas?.length || 0} clientes)`,
      Pesos: "Distribución de gastos por cliente",
    }
    return descriptions[tipoGrafica] || ""
  }

  const renderChart = () => {
    if (tipoGrafica === "Cajas") {
      return <BarChartComponent data={datosGraficas} isGrouped={true} />
    }

    if (tipoGrafica === "Vendedor" || tipoGrafica === "Pesos") {
      return <PieChartComponent data={datosGraficas} tipoGrafica={tipoGrafica} />
    }

    if (tipoGrafica === "Cliente" || tipoGrafica === "Familias" || tipoGrafica === "Devoluciones") {
      return <ScatterChartComponent data={datosGraficas} tipoGrafica={tipoGrafica} />
    }

    // Para Marca - gráficas de barras verticales
    return <BarChartComponent data={datosGraficas} horizontal={false} />
  }

  const showLegend = tipoGrafica === "Vendedor" || tipoGrafica === "Pesos"

  return (
    <Card>
      <CardHeader>
        <CardTitle>Análisis por {tipoGrafica}</CardTitle>
        <CardDescription>{getChartDescription()}</CardDescription>

        {/* Instrucciones para gráficas de dispersión */}
        {(tipoGrafica === "Cliente" || tipoGrafica === "Familias" || tipoGrafica === "Devoluciones") && (
          <div className="mt-2 p-2 bg-blue-50 rounded-md">
            <p className="text-sm text-blue-700">
              💡 <strong>Tip:</strong> Cada punto representa un{" "}
              {tipoGrafica === "Cliente"
                ? "cliente"
                : tipoGrafica === "Familias"
                  ? "familia de productos"
                  : tipoGrafica === "Devoluciones"
                    ? "cliente con devoluciones"
                    : "elemento"}
              . Pasa el cursor sobre los puntos para ver detalles.
            </p>
          </div>
        )}

        {/* Instrucciones para gráficas de barras */}
        {tipoGrafica === "Marca" && (
          <div className="mt-2 p-2 bg-green-50 rounded-md">
            <p className="text-sm text-green-700">
              💡 <strong>Tip:</strong> Cada barra representa una marca. Las barras están ordenadas de mayor a menor
              cantidad de cajas vendidas.
            </p>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-[500px]">{renderChart()}</div>
          {showLegend && (
            <div className="mt-4">
              <ChartLegend data={datosGraficas} tipoGrafica={tipoGrafica} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
