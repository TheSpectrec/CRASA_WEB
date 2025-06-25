import { Treemap, ResponsiveContainer, Tooltip } from "recharts"
import { generateColors } from "../../utils/Colors"

const COLORS = generateColors(150)

export default function TreemapComponent({ data }) {
  // Convertir datos para treemap
  const treemapData = data.map((item, index) => ({
    name: item.nombre,
    size: item.valor,
    fill: COLORS[index % COLORS.length],
  }))

  const CustomizedContent = (props) => {
    const { depth, x, y, width, height, index, payload, name } = props

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: payload?.fill || COLORS[index % COLORS.length],
            stroke: "#fff",
            strokeWidth: 2,
            strokeOpacity: 1,
          }}
        />
        {depth === 1 && width > 50 && height > 20 && (
          <text
            x={x + width / 2}
            y={y + height / 2}
            textAnchor="middle"
            fill="#fff"
            fontSize={10}
            dominantBaseline="middle"
          >
            {name && name.length > 10 ? name.substring(0, 10) + "..." : name}
          </text>
        )}
        {depth === 1 && width > 50 && height > 35 && (
          <text
            x={x + width / 2}
            y={y + height / 2 + 12}
            textAnchor="middle"
            fill="#fff"
            fontSize={8}
            dominantBaseline="middle"
          >
            {payload?.size}
          </text>
        )}
      </g>
    )
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <Treemap
        data={treemapData}
        dataKey="size"
        aspectRatio={4 / 3}
        stroke="#fff"
        fill="#8884d8"
        content={CustomizedContent}
      >
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length > 0) {
              const data = payload[0]?.payload
              if (!data) return null
              return (
                <div className="bg-white p-3 border rounded-lg shadow-lg">
                  <p className="font-semibold">{data.name}</p>
                  <p className="text-sm">Cajas: {data.size}</p>
                </div>
              )
            }
            return null
          }}
        />
      </Treemap>
    </ResponsiveContainer>
  )
}
