import "../styles/salesTable.css";

function SalesTable({ data, color }) {
    const colorClasses = {
        headerbg: color === "red" ? "bg-red" : color === "blue" ? "bg-blue" : "bg-green",
        headertext: color === "red" ? "text-red" : color === "blue" ? "text-blue" : "text-green",
        negativeText: "text-negative",
        positiveText: "text-positive",
    }

    // Calculate totals
    const totalQuota = data.reduce((sum, item) => sum + item.quota, 0)
    const totalProgress = data.reduce((sum, item) => sum + item.progress, 0)
    const totalDifference = data.reduce((sum, item) => sum + item.difference, 0)

    return (
        <div className="table-container">
            <table className="sales-table">
                <thead className={`table-header ${colorClasses.headerBg}`}>
                    <tr>
                        <th className={`${colorClasses.headerText} text-left`}>CAJAS</th>
                        <th className={`${colorClasses.headerText} text-right`}>CUOTA</th>
                        <th className={`${colorClasses.headerText} text-right`}>AVANCE</th>
                        <th className={`${colorClasses.headerText} text-right`}>DIFERENCIA</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="totals-row">
                        <td className="font-bold">TOTALES</td>
                        <td className="text-right font-bold">{totalQuota.toLocaleString()}</td>
                        <td className="text-right font-bold">{totalProgress.toLocaleString()}</td>
                        <td
                            className={`text-right font-bold ${totalDifference < 0 ? colorClasses.negativeText : totalDifference > 0 ? colorClasses.positiveText : ""
                                }`}
                        >
                            {totalDifference.toLocaleString()}
                        </td>
                    </tr>

                    {data.map((item, index) => (
                        <tr key={index} className="data-row">
                            <td className="store-name">{item.store}</td>
                            <td className="text-right">{item.quota > 0 ? item.quota.toLocaleString() : "-"}</td>
                            <td className="text-right">{item.progress > 0 ? item.progress.toLocaleString() : "-"}</td>
                            <td
                                className={`text-right ${item.difference < 0 ? colorClasses.negativeText : item.difference > 0 ? colorClasses.positiveText : ""
                                    }`}
                            >
                                {item.difference !== 0 ? item.difference.toLocaleString() : "-"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default SalesTable;