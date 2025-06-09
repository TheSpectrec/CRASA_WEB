import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../Card";
import PieChartComponent from "./PieChartComponent";
import BarChartComponent from "./BarChartComponent";
import ChartLegend from "./ChartLegend";

export default function MainChart({ tipoGrafica, datosGraficas }) {
    const getChartDescription = () => {
      const descriptions = {
        Cajas: "Cantidad de cajas vendidas por año y mes",
        Vendedor: "Distribución de cajas por vendedor",
        Marca: "Cajas vendidas por marca",
        Cliente: "Cajas compradas por cliente",
        Producto: "Veces vendido cada producto",
        Pesos: "Distribución de gastos por cliente",
      }
      return descriptions[tipoGrafica] || ""
    }
  
    const renderChart = () => {
      if (tipoGrafica === "Cajas") {
        return <BarChartComponent data={datosGraficas} horizontal={false} />
      }
  
      if (tipoGrafica === "Vendedor" || tipoGrafica === "Pesos") {
        return <PieChartComponent data={datosGraficas} tipoGrafica={tipoGrafica} />
      }
  
      // Para Marca, Cliente, Producto - gráficas de barras horizontales
      return <BarChartComponent data={datosGraficas} horizontal={true} />
    }
  
    const showLegend = tipoGrafica === "Vendedor" || tipoGrafica === "Pesos"
  
    return (
      <Card className="mb-6 ml-2 mr-2">
        <CardHeader>
          <CardTitle>Análisis por {tipoGrafica}</CardTitle>
          <CardDescription>{getChartDescription()}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-[400px]">{renderChart()}</div>
            {showLegend && <ChartLegend data={datosGraficas} tipoGrafica={tipoGrafica} />}
          </div>
        </CardContent>
      </Card>
    )
  }
