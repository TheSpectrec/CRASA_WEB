import { generateColors } from "../../utils/Colors";

const COLORS = generateColors(150)

export default function ChartLegend({ data, tipoGrafica }) {
  return (
    <div className="overflow-auto max-h-[400px] pr-2">
      <div className="space-y-1">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between text-xs p-1 hover:bg-gray-100 rounded-sm">
            <div className="flex items-center gap-1">
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="font-medium truncate max-w-[120px]" title={item.nombre}>
                {item.nombre}
              </span>
            </div>
            <div className="text-right">
              <div className="font-semibold">
                {tipoGrafica === "Pesos" ? `$${item.valor?.toLocaleString()}` : item.valor}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}