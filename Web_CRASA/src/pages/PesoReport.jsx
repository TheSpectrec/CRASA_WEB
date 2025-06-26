"use client"

import { useState, useEffect } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow} from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { Filters } from "@/components/Filters"

import * as XLSX from "xlsx"

export default function PesoReport() {
    const [datos, setDatos] = useState([])
  const [selectedMonth, setSelectedMonth] = useState("")
  
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
    setSelectedMonth(obtenerMesActual())
  }, [])

  // Generar datos de ejemplo
  const generarDatos = () => {
    const clientes = [
      "Cliente 1",
      "Cliente 2",
      "Cliente 3",
      "Cliente 4",
      "Cliente 5",
      "Cliente 6",
      "Cliente 7",
      "Cliente 8",
    ]
    const años = [2023, 2024, 2025]

    const datosGenerados = clientes.map((cliente) => {
      const fila = { cliente }

      años.forEach((año) => {
        // Generar cantidad aleatoria de pesos (10,000 - 500,000)
        const cantidad = Math.floor(Math.random() * 490000) + 10000
        fila[año] = cantidad
      })

      return fila
    })

    // Calcular totales
    const totales = { cliente: "TOTAL" }
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
        Cliente: fila.cliente,
        2023: fila[2023] ? `$${fila[2023].toLocaleString()}` : "$0",
        2024: fila[2024] ? `$${fila[2024].toLocaleString()}` : "$0",
        2025: fila[2025] ? `$${fila[2025].toLocaleString()}` : "$0",
      }))

      const worksheet = XLSX.utils.json_to_sheet(datosExcel)
      XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte Pesos")

      // Agregar filtros si existen
      const filtrosExportados = [...filtrosAplicados]
      if (selectedMonth) {
        filtrosExportados.push({ Filtro: "Mes", Valor: selectedMonth })
      }

      if (filtrosExportados.length > 0) {
        const worksheetFiltros = XLSX.utils.json_to_sheet(filtrosExportados)
        XLSX.utils.book_append_sheet(workbook, worksheetFiltros, "Filtros Aplicados")
      }

      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, "-")
      XLSX.writeFile(workbook, `reporte_pesos_${timestamp}.xlsx`)
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
          titulo="Reporte de Pesos"
          descripcion="Seleccione los filtros para visualizar los datos"
        />

        <div className="mb-4 flex items-center space-x-2 ml-4">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Mes" />
            </SelectTrigger>
            <SelectContent>
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
            <CardTitle>Pesos por Cliente</CardTitle>
            <CardDescription>Total de pesos por cada cliente</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="text-right">2023</TableHead>
                  <TableHead className="text-right">2024</TableHead>
                  <TableHead className="text-right">2025</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {datos.map((fila, index) => (
                  <TableRow key={index} className={fila.cliente === "TOTAL" ? "bg-gray-100 font-bold" : ""}>
                    <TableCell className="font-medium">{fila.cliente}</TableCell>
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