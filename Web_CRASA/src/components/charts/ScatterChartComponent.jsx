import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { CHART_COLORS } from "../../utils/colors"

export default function ScatterChartComponent({ data, tipoGrafica }) {
  // Convertir datos para scatter plot
  const scatterData = data.map((item, index) => ({
    x: index + 1,
    y: item.valor,
    nombre: item.nombre,
  }))

  // Calcular el valor máximo y redondearlo hacia arriba a la siguiente decena
  const maxValue = Math.max(...data.map((item) => item.valor))
  const roundedMax = Math.ceil(maxValue / 10) * 10

  // Crear 10 divisiones en el eje Y
  const yAxisTicks = Array.from({ length: 11 }, (_, i) => (roundedMax / 10) * i)

  const getLabels = () => {
    switch (tipoGrafica) {
      case "Cliente":
        return {
          xLabel: "Número de Cliente",
          yLabel: "Cantidad de Cajas",
          tooltipLabel: "Cajas",
        }
      case "Familias":
        return {
          xLabel: "Número de Familia",
          yLabel: "Cantidad de Cajas",
          tooltipLabel: "Cajas",
        }
      case "Devoluciones":
        return {
          xLabel: "Número de Cliente",
          yLabel: "Cajas Devueltas",
          tooltipLabel: "Cajas Devueltas",
        }
      default:
        return {
          xLabel: "Número de Elemento",
          yLabel: "Valor",
          tooltipLabel: "Valor",
        }
    }
  }

  const labels = getLabels()

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart data={scatterData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          type="number"
          dataKey="x"
          name={labels.xLabel}
          domain={[1, data.length]}
          label={{ value: labels.xLabel, position: "insideBottom", offset: -10 }}
        />
        <YAxis
          type="number"
          dataKey="y"
          name={labels.yLabel}
          domain={[0, roundedMax]}
          ticks={yAxisTicks}
          label={{ value: labels.yLabel, angle: -90, position: "insideLeft" }}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length > 0) {
              const data = payload[0]?.payload
              if (!data) return null
              return (
                <div className="bg-white p-3 border rounded-lg shadow-lg">
                  <p className="font-semibold">{data.nombre}</p>
                  <p className="text-sm">
                    {labels.tooltipLabel}: {data.y}
                  </p>
                  <p className="text-sm">#{data.x}</p>
                </div>
              )
            }
            return null
          }}
        />
        <Scatter dataKey="y" fill={CHART_COLORS.primary} />
      </ScatterChart>
    </ResponsiveContainer>
  )
}
