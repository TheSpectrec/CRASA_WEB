"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const tiposGrafica = ["Cajas", "Vendedor", "Marca", "Cliente", "Familias", "Devoluciones", "Pesos"]

export default function ChartSelector({ tipoGrafica, setTipoGrafica }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tipo de Análisis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {tiposGrafica.map((tipo) => (
            <Button
              key={tipo}
              onClick={() => setTipoGrafica(tipo)}
              variant={tipoGrafica === tipo ? "default" : "outline"}
            >
              {tipo}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
