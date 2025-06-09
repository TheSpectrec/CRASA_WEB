import { Card, CardContent, CardHeader, CardTitle } from "../Card";
import { Button } from "../Button";

const tiposGrafica = ["Cajas", "Vendedor", "Marca", "Producto", "Pesos"]

export default function ChartSelector({ tipoGrafica, setTipoGrafica }) {
    return (
        <Card className="mb-6 ml-2 mr-2">
            <CardHeader>
                <div>
                    <CardTitle>Tipo de Análisis</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2">
                    {tiposGrafica.map((tipo) => (
                        <Button
                            key={tipo}
                            variant={tipoGrafica === tipo ? "default" : "outline"}
                            onClick={() => setTipoGrafica(tipo)}
                        >
                            {tipo}
                        </Button>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}