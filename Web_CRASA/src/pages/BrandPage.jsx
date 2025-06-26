"use client"

import { useState, useEffect } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow} from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { Filters } from "@/components/Filters"

import * as XLSX from "xlsx"

export default function BrandPage() {
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
    const clientes = ["Cliente 1", "Cliente 2", "Cliente 3", "Cliente 4", "Cliente 5", "Cliente 6"]
    const marcas = ["Marca 1", "Marca 2", "Marca 3", "Marca 4", "Marca 5", "Marca 6", "Marca 7", "Marca 8", "Marca 9"]
    const años = [2023, 2024, 2025]

    const datosGenerados = clientes.map((cliente) => {
      const fila = { cliente }

      años.forEach((año) => {
        marcas.forEach((marca) => {
          // Generar cantidad aleatoria de cajas (0-150)
          const cantidad = Math.floor(Math.random() * 151)
          fila[`${marca}_${año}`] = cantidad
        })
      })

      return fila
    })

    // Calcular totales
    const totales = { cliente: "TOTAL" }
    años.forEach((año) => {
      marcas.forEach((marca) => {
        const total = datosGenerados.reduce((sum, fila) => sum + fila[`${marca}_${año}`], 0)
        totales[`${marca}_${año}`] = total
      })
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
      const datosExcel = datos.map((fila) => {
        const filaExcel = { Cliente: fila.cliente }

        // Agregar columnas por año y marca
        const años = [2023, 2024, 2025]
        const marcas = [
          "Marca 1",
          "Marca 2",
          "Marca 3",
          "Marca 4",
          "Marca 5",
          "Marca 6",
          "Marca 7",
          "Marca 8",
          "Marca 9",
        ]

        años.forEach((año) => {
          marcas.forEach((marca) => {
            filaExcel[`${marca} ${año}`] = fila[`${marca}_${año}`] || 0
          })
        })

        return filaExcel
      })

      const worksheet = XLSX.utils.json_to_sheet(datosExcel)
      XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte Marcas")

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
      XLSX.writeFile(workbook, `reporte_marcas_${timestamp}.xlsx`)
    } catch (error) {
      console.error("Error al exportar:", error)
      alert("Error al exportar los datos")
    }
  }

  const marcas = ["Marca 1", "Marca 2", "Marca 3", "Marca 4", "Marca 5", "Marca 6", "Marca 7", "Marca 8", "Marca 9"]
  const años = [2023, 2024, 2025]

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="container mx-auto">
        <Filters
          onExportar={exportarDatos}
          titulo="Reporte de Ventas por Marca"
          descripcion="Seleccione los filtros para visualizar los datos"
        />

        <div className="mb-4 flex items-center space-x-2 ml-4">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Mes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los meses</SelectItem>
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
            <CardTitle>Cajas Compradas por Marca</CardTitle>
            <CardDescription>Cantidad de cajas compradas por cada cliente por marca</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead rowSpan={2} className="border-r">
                      Cliente
                    </TableHead>
                    {años.map((año) => (
                      <TableHead key={año} colSpan={marcas.length} className="text-center border-r">
                        {año}
                      </TableHead>
                    ))}
                  </TableRow>
                  <TableRow>
                    {años.map((año) =>
                      marcas.map((marca) => (
                        <TableHead key={`${año}-${marca}`} className="text-center text-xs">
                          {marca}
                        </TableHead>
                      )),
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {datos.map((fila, index) => (
                    <TableRow key={index} className={fila.cliente === "TOTAL" ? "bg-gray-100 font-bold" : ""}>
                      <TableCell className="font-medium border-r">{fila.cliente}</TableCell>
                      {años.map((año) =>
                        marcas.map((marca) => (
                          <TableCell key={`${año}-${marca}`} className="text-center">
                            {fila[`${marca}_${año}`] || 0}
                          </TableCell>
                        )),
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}