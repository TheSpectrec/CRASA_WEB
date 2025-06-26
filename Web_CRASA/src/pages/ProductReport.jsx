"use client"

import { useState, useEffect } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { Filters } from "../components/Filters"

import * as XLSX from "xlsx"

export default function ProductReport() {
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
    const productos = [
      "Producto A",
      "Producto B",
      "Producto C",
      "Producto D",
      "Producto E",
      "Producto F",
      "Producto G",
      "Producto H",
      "Producto I",
      "Producto J",
    ]
    const años = [2023, 2024, 2025]

    const datosGenerados = productos.map((producto) => {
      const fila = { producto }

      años.forEach((año) => {
        // Generar cantidad aleatoria de cajas vendidas (50-1000)
        const cantidad = Math.floor(Math.random() * 951) + 50
        fila[año] = cantidad
      })

      return fila
    })

    // Calcular totales
    const totales = { producto: "TOTAL" }
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
        Producto: fila.producto,
        2023: fila[2023] || 0,
        2024: fila[2024] || 0,
        2025: fila[2025] || 0,
      }))

      const worksheet = XLSX.utils.json_to_sheet(datosExcel)
      XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte Productos")

      // Agregar filtros si existen
      const filtrosExport = [...filtrosAplicados]
      if (selectedMonth) {
        filtrosExport.push({ Filtro: "Mes", Valor: selectedMonth })
      }

      if (filtrosExport.length > 0) {
        const worksheetFiltros = XLSX.utils.json_to_sheet(filtrosExport)
        XLSX.utils.book_append_sheet(workbook, worksheetFiltros, "Filtros Aplicados")
      }

      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, "-")
      XLSX.writeFile(workbook, `reporte_productos_${timestamp}.xlsx`)
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
          titulo="Reporte de Ventas por Producto"
          descripcion="Seleccione los filtros para visualizar los datos"
        />

        <div className="mb-4 ml-4">
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
            <CardTitle>Cajas Vendidas por Producto</CardTitle>
            <CardDescription>Cantidad de cajas vendidas por cada producto</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Producto</TableHead>
                  <TableHead className="text-right">2023</TableHead>
                  <TableHead className="text-right">2024</TableHead>
                  <TableHead className="text-right">2025</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {datos.map((fila, index) => (
                  <TableRow key={index} className={fila.producto === "TOTAL" ? "bg-gray-100 font-bold" : ""}>
                    <TableCell className="font-medium">{fila.producto}</TableCell>
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