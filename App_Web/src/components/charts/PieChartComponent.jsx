import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { generateColors } from "../../utils/Colors";

const COLORS = generateColors(150)

export default function PieChartComponent({ data, tipoGrafica }) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={140}
                fill="#8884d8"
                dataKey="valor"
                nameKey="nombre"
                label={false}
                >
                    {
                        data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))
                    }
                </Pie>
                <Tooltip
                    content={({ active, payload }) => {
                        if (active && payload && payload.length > 0) {
                            const data = payload[0]?.payload
                            if (!data) return null
                            return (
                                <div className="bg-white p-3 border rounded-lg shadow-lg">
                                    <p className="font-semibold">{data.nombre}</p>
                                    <p className="text-sm">
                                        {tipoGrafica === "Pesos" ? `Gasto: $${data.valor?.toLocaleString()}` : `Cajas: ${data.valor}`}
                                    </p>
                                </div>
                            )
                        }
                        return null
                    }}
                />
            </PieChart>
        </ResponsiveContainer>
    )
}