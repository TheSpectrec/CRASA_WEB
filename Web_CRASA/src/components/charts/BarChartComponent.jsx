import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { CHART_COLORS } from "../../utils/Colors";

export default function BarChartComponent({ data, horizontal = false, isGrouped = false, showAll150 = false }) {
    // Para gráficas agrupadas (Cajas por año/mes)
  if (isGrouped) {
    // Calcular el valor máximo de las gráficas agrupadas
    const maxValue = Math.max(...data.flatMap((item) => [item["2023"] || 0, item["2024"] || 0, item["2025"] || 0]))
    const roundedMax = Math.ceil(maxValue / 10) * 10
    const yAxisTicks = Array.from({ length: 11 }, (_, i) => (roundedMax / 10) * i)

    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis domain={[0, roundedMax]} ticks={yAxisTicks} />
          <Tooltip />
          <Legend />
          <Bar dataKey="2023" fill={CHART_COLORS.bars[2023]} name="2023" />
          <Bar dataKey="2024" fill={CHART_COLORS.bars[2024]} name="2024" />
          <Bar dataKey="2025" fill={CHART_COLORS.bars[2025]} name="2025" />
        </BarChart>
      </ResponsiveContainer>
    )
  }

  // Para mostrar todos los 150 clientes como barras verticales
  if (showAll150) {
    if (!data || data.length === 0) {
      return (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">No hay datos de clientes para mostrar</p>
        </div>
      )
    }

    // Calcular el valor máximo y redondearlo hacia arriba a la siguiente decena
    const maxValue = Math.max(...data.map((item) => item.valor))
    const roundedMax = Math.ceil(maxValue / 10) * 10
    const yAxisTicks = Array.from({ length: 11 }, (_, i) => (roundedMax / 10) * i)

    const barWidth = 20
    const spacing = 5
    const totalWidth = data.length * (barWidth + spacing)
    const minWidth = Math.max(totalWidth, 1500)

    return (
      <div className="w-full overflow-x-auto border rounded-lg">
        <div style={{ width: `${minWidth}px`, height: "100%" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }} barCategoryGap="10%" barGap={2}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="index"
                tick={{ fontSize: 8 }}
                interval={Math.floor(data.length / 20)}
                label={{ value: "Cliente #", position: "insideBottom", offset: -40 }}
              />
              <YAxis
                domain={[0, roundedMax]}
                ticks={yAxisTicks}
                label={{ value: "Cajas", angle: -90, position: "insideLeft" }}
              />
              <Tooltip
                formatter={(value) => [value, "Cajas"]}
                labelFormatter={(index) => {
                  const cliente = data.find((item) => item.index === index)
                  return cliente ? `${cliente.nombre} (Cliente #${index})` : `Cliente #${index}`
                }}
              />
              <Bar dataKey="valor" fill={CHART_COLORS.primary} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    )
  }

  // Para gráficas de barras verticales normales (Familias)
  // Calcular el valor máximo y redondearlo hacia arriba a la siguiente decena
  const maxValue = Math.max(...data.map((item) => item.valor))
  const roundedMax = Math.ceil(maxValue / 10) * 10
  const yAxisTicks = Array.from({ length: 11 }, (_, i) => (roundedMax / 10) * i)

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="nombre" angle={-45} textAnchor="end" height={80} interval={0} tick={{ fontSize: 10 }} />
        <YAxis domain={[0, roundedMax]} ticks={yAxisTicks} />
        <Tooltip formatter={(value) => [value, "Cajas"]} labelFormatter={(label) => `${label}`} />
        <Bar dataKey="valor" fill={CHART_COLORS.primary} />
      </BarChart>
    </ResponsiveContainer>
  )
}