import { Card } from "@/components/ui/card";
import "../styles/SalesSummary.css";

function SalesSummary({ title, color, quota, progress, difference }) {
    const colorClasses = {
        bg: color === "red" ? "bg-red-light" : color === "blue" ? "bg-blue-light" : "bg-green-light",
        border: color === "red" ? "border-red" : color === "blue" ? "border-blue" : "border-green",
        text: color === "red" ? "text-red-dark" : color === "blue" ? "text-blue-dark" : "text-green-dark",
    }

    return (
        <Card className={`summary-card ${colorClasses.bg} ${colorClasses.border}`}>
            <div className="summary-content">
                <h3 className={`summary-title ${colorClasses.text}`}>{title}</h3>

                <div className="summary-stats">
                    <div className="stat-item">
                        <p className="stat-label">CUOTA</p>
                        <p className="stat-value">{quota.toLocaleString()}</p>
                    </div>
                    <div className="stat-item">
                        <p className="stat-label">AVANCE</p>
                        <p className="stat-value">{progress.toLocaleString()}</p>
                    </div>
                    <div className="stat-item">
                        <p className="stat-label">DIFERENCIA</p>
                        <p className={`stat-value ${difference < 0 ? "text-negative" : "text-positive"}`}>
                            {difference.toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default SalesSummary;