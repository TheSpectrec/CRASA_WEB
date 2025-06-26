"use client"

import { useState, useEffect } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow} from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { Filters } from "@/components/Filters"

import * as XLSX from "xlsx"

export default function FamilyPage() {
    const [datos, setDatos] = useState([])
  const [mes, setMes] = useState("")

    // Obtener el mes actual
  const obtenerMesActual = () => {
    const meses = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ]
    const fechaActual = new Date()
    return meses[fechaActual.getMonth()]
  }

  // Inicializar con el mes actual
  useEffect(() => {
    setMes(obtenerMesActual())
  }, [])

  // Generar datos de ejemplo
  const generarDatos = () => {
    const familias = [
      "Familia A",
      "Familia B",
      "Familia C",
      "Familia D",
      "Familia E",
      "Familia F",
      "Familia G",
      "Familia H",
    ]
    const años = [2023, 2024, 2025]

    const datosGenerados = familias.map((familia) => {
      const fila = { familia }

      años.forEach((año) => {
        // Generar cantidad aleatoria de cajas vendidas (100-2000)
        const cantidad = Math.floor(Math.random() * 1901) + 100
        fila[año] = cantidad
      })

      return fila
    })

    // Calcular totales
    const totales = { familia: "TOTAL" }
    años.forEach((año) => {
      const total = datosGenerados.reduce((sum, fila) => sum + fila[año], 0)
      totales[año] = total
    })

    setDatos([...datosGenerados, totales])
  }

  useEffect(() => {
    generarDatos()
  }, [])

  // Función para exportar datos
  const exportarDatos = (filtrosAplicados) => {
    try {
      const workbook = XLSX.utils.book_new()

      // Preparar datos para Excel
      const datosExcel = datos.map((fila) => ({
        Familia: fila.familia,
        2023: fila[2023] || 0,
        2024: fila[2024] || 0,
        2025: fila[2025] || 0,
        Mes: mes || "Todos",
      }))

      const worksheet = XLSX.utils.json_to_sheet(datosExcel)
      XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte Familias")

      // Agregar filtros si existen
      if (filtrosAplicados.length > 0) {
        const worksheetFiltros = XLSX.utils.json_to_sheet(filtrosAplicados)
        XLSX.utils.book_append_sheet(workbook, worksheetFiltros, "Filtros Aplicados")
      }

      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, "-")
      XLSX.writeFile(workbook, `reporte_familias_${timestamp}.xlsx`)
    } catch (error) {
      console.error("Error al exportar:", error)
      alert("Error al exportar los datos")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="container mx-auto">
        <Filters
          onExportar={exportarDatos}
          titulo="Reporte de Ventas por Familia"
          descripcion="Seleccione los filtros para visualizar los datos"
        />

        <div className="flex items-center space-x-2 mb-4 ml-4">
          <Select value={mes} onValueChange={setMes}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Mes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="Enero">Enero</SelectItem>
              <SelectItem value="Febrero">Febrero</SelectItem>
              <SelectItem value="Marzo">Marzo</SelectItem>
              <SelectItem value="Abril">Abril</SelectItem>
              <SelectItem value="Mayo">Mayo</SelectItem>
              <SelectItem value="Junio">Junio</SelectItem>
              <SelectItem value="Julio">Julio</SelectItem>
              <SelectItem value="Agosto">Agosto</SelectItem>
              <SelectItem value="Septiembre">Septiembre</SelectItem>
              <SelectItem value="Octubre">Octubre</SelectItem>
              <SelectItem value="Noviembre">Noviembre</SelectItem>
              <SelectItem value="Diciembre">Diciembre</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card className="ml-4 mr-4">
          <CardHeader>
            <CardTitle>Cajas Vendidas por Familia</CardTitle>
            <CardDescription>Cantidad de cajas vendidas por cada familia de productos</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Familia</TableHead>
                  <TableHead className="text-right">2023</TableHead>
                  <TableHead className="text-right">2024</TableHead>
                  <TableHead className="text-right">2025</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {datos.map((fila, index) => (
                  <TableRow key={index} className={fila.familia === "TOTAL" ? "bg-gray-100 font-bold" : ""}>
                    <TableCell className="font-medium">{fila.familia}</TableCell>
                    <TableCell className="text-right">{(fila[2023] || 0).toLocaleString()}</TableCell>
                    <TableCell className="text-right">{(fila[2024] || 0).toLocaleString()}</TableCell>
                    <TableCell className="text-right">{(fila[2025] || 0).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}