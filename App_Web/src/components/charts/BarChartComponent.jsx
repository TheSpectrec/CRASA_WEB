import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import { CHART_COLORS } from "../../utils/Colors"

export default function BarChartComponent({ data, horizontal = false }) {
    if (horizontal) {
        return (
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="nombre" type="category" width={100} />
                    <Tooltip />
                    <Bar dataKey="valor" fill={CHART_COLORS.primary} />
                </BarChart>
            </ResponsiveContainer>
        )
    }

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="2023" fill={CHART_COLORS.bars[2023]} />
                <Bar dataKey="2024" fill={CHART_COLORS.bars[2024]} />
                <Bar dataKey="2025" fill={CHART_COLORS.bars[2025]} />
            </BarChart>
        </ResponsiveContainer>
    )
}