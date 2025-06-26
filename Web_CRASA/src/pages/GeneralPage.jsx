"use client"

import React, { useState, useEffect, useRef } from 'react';

// Components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Filters } from '../components/Filters';

// Icons
import { Search, Filter, Download } from 'lucide-react';

// Export Excel
import * as XLSX from 'xlsx';

export default function GeneralPage() {
    // Referencia para el contenedor principal
    const containerRef = useRef(null);

    // Datos para las tablas
    const [datosCajas, setDatosCajas] = useState([]);
    const [datosPesos, setDatosPesos] = useState([]);

    // Datos estáticos para las tablas
    const datosCajasEstaticos = [
        {
            año: "2023",
            enero: "1,250",
            febrero: "1,180",
            marzo: "1,320",
            abril: "1,450",
            mayo: "1,380",
            junio: "1,520",
            julio: "1,680",
            agosto: "1,590",
            septiembre: "1,420",
            octubre: "1,350",
            noviembre: "1,280",
            diciembre: "1,400",
            acumActual: "16,820",
            acumAnterior: "15,540",
            ytd: "16,820",
        },
        {
            año: "2024",
            enero: "1,320",
            febrero: "1,250",
            marzo: "1,420",
            abril: "1,580",
            mayo: "1,480",
            junio: "1,650",
            julio: "1,780",
            agosto: "1,690",
            septiembre: "1,520",
            octubre: "1,450",
            noviembre: "1,380",
            diciembre: "1,500",
            acumActual: "18,020",
            acumAnterior: "16,820",
            ytd: "18,020",
        },
        {
            año: "2025",
            enero: "1,420",
            febrero: "1,350",
            marzo: "1,520",
            abril: "1,680",
            mayo: "1,580",
            junio: "1,750",
            julio: "1,880",
            agosto: "1,790",
            septiembre: "1,620",
            octubre: "1,550",
            noviembre: "1,480",
            diciembre: "1,600",
            acumActual: "19,220",
            acumAnterior: "18,020",
            ytd: "19,220",
        },
        {
            año: "2024 vs 2025",
            isComparison: true,
            diferencia: {
                enero: "7.6%",
                febrero: "8.0%",
                marzo: "7.0%",
                abril: "6.3%",
                mayo: "6.8%",
                junio: "6.1%",
                julio: "5.6%",
                agosto: "5.9%",
                septiembre: "6.6%",
                octubre: "6.9%",
                noviembre: "7.2%",
                diciembre: "6.7%",
                acumActual: "6.7%",
                acumAnterior: "7.1%",
                ytd: "6.7%",
            },
            unidades: {
                enero: "125",
                febrero: "118",
                marzo: "132",
                abril: "145",
                mayo: "138",
                junio: "152",
                julio: "168",
                agosto: "159",
                septiembre: "142",
                octubre: "135",
                noviembre: "128",
                diciembre: "140",
                acumActual: "1,682",
                acumAnterior: "1,554",
                ytd: "1,682",
            },
        },
    ]

    const datosPesosEstaticos = [
        {
            año: "2023",
            enero: "$125,000",
            febrero: "$118,000",
            marzo: "$132,000",
            abril: "$145,000",
            mayo: "$138,000",
            junio: "$152,000",
            julio: "$168,000",
            agosto: "$159,000",
            septiembre: "$142,000",
            octubre: "$135,000",
            noviembre: "$128,000",
            diciembre: "$140,000",
            acumActual: "$1,682,000",
            acumAnterior: "$1,554,000",
            ytd: "$1,682,000",
        },
        {
            año: "2024",
            enero: "$132,000",
            febrero: "$125,000",
            marzo: "$142,000",
            abril: "$158,000",
            mayo: "$148,000",
            junio: "$165,000",
            julio: "$178,000",
            agosto: "$169,000",
            septiembre: "$152,000",
            octubre: "$145,000",
            noviembre: "$138,000",
            diciembre: "$150,000",
            acumActual: "$1,802,000",
            acumAnterior: "$1,682,000",
            ytd: "$1,802,000",
        },
        {
            año: "2025",
            enero: "$142,000",
            febrero: "$135,000",
            marzo: "$152,000",
            abril: "$168,000",
            mayo: "$158,000",
            junio: "$175,000",
            julio: "$188,000",
            agosto: "$179,000",
            septiembre: "$162,000",
            octubre: "$155,000",
            noviembre: "$148,000",
            diciembre: "$160,000",
            acumActual: "$1,922,000",
            acumAnterior: "$1,802,000",
            ytd: "$1,922,000",
        },
        {
            año: "2024 vs 2025",
            isComparison: true,
            diferencia: {
                enero: "7.6%",
                febrero: "8.0%",
                marzo: "7.0%",
                abril: "6.3%",
                mayo: "6.8%",
                junio: "6.1%",
                julio: "5.6%",
                agosto: "5.9%",
                septiembre: "6.6%",
                octubre: "6.9%",
                noviembre: "7.2%",
                diciembre: "6.7%",
                acumActual: "6.7%",
                acumAnterior: "7.1%",
                ytd: "6.7%",
            },
            unidades: {
                enero: "12,500",
                febrero: "11,800",
                marzo: "13,200",
                abril: "14,500",
                mayo: "13,800",
                junio: "15,200",
                julio: "16,800",
                agosto: "15,900",
                septiembre: "14,200",
                octubre: "13,500",
                noviembre: "12,800",
                diciembre: "14,000",
                acumActual: "168,200",
                acumAnterior: "155,400",
                ytd: "168,200",
            },
        },
    ]

    // Inicializar datos estáticos al cargar el componente
    useEffect(() => {
        setDatosCajas(datosCajasEstaticos);
        setDatosPesos(datosPesosEstaticos);
    }, []);

    // Función para exportar datos a Excel
    const exportarDatos = (filtrosAplicados) => {
      try {
      // Crear un nuevo libro de trabajo
      const workbook = XLSX.utils.book_new()

      // Preparar datos de Cajas para Excel
      const datosCajasExcel = []

      datosCajas.forEach((fila) => {
        if (fila.isComparison) {
          // Fila de diferencias porcentuales
          datosCajasExcel.push({
            Año: `${fila.año} - Diferencia %`,
            Enero: fila.diferencia.enero,
            Febrero: fila.diferencia.febrero,
            Marzo: fila.diferencia.marzo,
            Abril: fila.diferencia.abril,
            Mayo: fila.diferencia.mayo,
            Junio: fila.diferencia.junio,
            Julio: fila.diferencia.julio,
            Agosto: fila.diferencia.agosto,
            Septiembre: fila.diferencia.septiembre,
            Octubre: fila.diferencia.octubre,
            Noviembre: fila.diferencia.noviembre,
            Diciembre: fila.diferencia.diciembre,
            "Acum. Mes Actual": fila.diferencia.acumActual,
            "Acum. Mes Anterior": fila.diferencia.acumAnterior,
            YTD: fila.diferencia.ytd,
          })

          // Fila de unidades
          datosCajasExcel.push({
            Año: `${fila.año} - Unidades`,
            Enero: fila.unidades.enero,
            Febrero: fila.unidades.febrero,
            Marzo: fila.unidades.marzo,
            Abril: fila.unidades.abril,
            Mayo: fila.unidades.mayo,
            Junio: fila.unidades.junio,
            Julio: fila.unidades.julio,
            Agosto: fila.unidades.agosto,
            Septiembre: fila.unidades.septiembre,
            Octubre: fila.unidades.octubre,
            Noviembre: fila.unidades.noviembre,
            Diciembre: fila.unidades.diciembre,
            "Acum. Mes Actual": fila.unidades.acumActual,
            "Acum. Mes Anterior": fila.unidades.acumAnterior,
            YTD: fila.unidades.ytd,
          })
        } else {
          datosCajasExcel.push({
            Año: fila.año,
            Enero: fila.enero,
            Febrero: fila.febrero,
            Marzo: fila.marzo,
            Abril: fila.abril,
            Mayo: fila.mayo,
            Junio: fila.junio,
            Julio: fila.julio,
            Agosto: fila.agosto,
            Septiembre: fila.septiembre,
            Octubre: fila.octubre,
            Noviembre: fila.noviembre,
            Diciembre: fila.diciembre,
            "Acum. Mes Actual": fila.acumActual,
            "Acum. Mes Anterior": fila.acumAnterior,
            YTD: fila.ytd,
          })
        }
      })

      // Preparar datos de Pesos para Excel
      const datosPesosExcel = []

      datosPesos.forEach((fila) => {
        if (fila.isComparison) {
          // Fila de diferencias porcentuales
          datosPesosExcel.push({
            Año: `${fila.año} - Diferencia %`,
            Enero: fila.diferencia.enero,
            Febrero: fila.diferencia.febrero,
            Marzo: fila.diferencia.marzo,
            Abril: fila.diferencia.abril,
            Mayo: fila.diferencia.mayo,
            Junio: fila.diferencia.junio,
            Julio: fila.diferencia.julio,
            Agosto: fila.diferencia.agosto,
            Septiembre: fila.diferencia.septiembre,
            Octubre: fila.diferencia.octubre,
            Noviembre: fila.diferencia.noviembre,
            Diciembre: fila.diferencia.diciembre,
            "Acum. Mes Actual": fila.diferencia.acumActual,
            "Acum. Mes Anterior": fila.diferencia.acumAnterior,
            YTD: fila.diferencia.ytd,
          })

          // Fila de unidades
          datosPesosExcel.push({
            Año: `${fila.año} - Unidades`,
            Enero: fila.unidades.enero,
            Febrero: fila.unidades.febrero,
            Marzo: fila.unidades.marzo,
            Abril: fila.unidades.abril,
            Mayo: fila.unidades.mayo,
            Junio: fila.unidades.junio,
            Julio: fila.unidades.julio,
            Agosto: fila.unidades.agosto,
            Septiembre: fila.unidades.septiembre,
            Octubre: fila.unidades.octubre,
            Noviembre: fila.unidades.noviembre,
            Diciembre: fila.unidades.diciembre,
            "Acum. Mes Actual": fila.unidades.acumActual,
            "Acum. Mes Anterior": fila.unidades.acumAnterior,
            YTD: fila.unidades.ytd,
          })
        } else {
          datosPesosExcel.push({
            Año: fila.año,
            Enero: fila.enero,
            Febrero: fila.febrero,
            Marzo: fila.marzo,
            Abril: fila.abril,
            Mayo: fila.mayo,
            Junio: fila.junio,
            Julio: fila.julio,
            Agosto: fila.agosto,
            Septiembre: fila.septiembre,
            Octubre: fila.octubre,
            Noviembre: fila.noviembre,
            Diciembre: fila.diciembre,
            "Acum. Mes Actual": fila.acumActual,
            "Acum. Mes Anterior": fila.acumAnterior,
            YTD: fila.ytd,
          })
        }
      })

      // Crear hojas de trabajo
      const worksheetCajas = XLSX.utils.json_to_sheet(datosCajasExcel)
      const worksheetPesos = XLSX.utils.json_to_sheet(datosPesosExcel)

      // Añadir las hojas al libro
      XLSX.utils.book_append_sheet(workbook, worksheetCajas, "Datos Cajas")
      XLSX.utils.book_append_sheet(workbook, worksheetPesos, "Datos Pesos")

      // Agregar filtros aplicados si existen
      if (filtrosAplicados.length > 0) {
        const worksheetFiltros = XLSX.utils.json_to_sheet(filtrosAplicados)
        XLSX.utils.book_append_sheet(workbook, worksheetFiltros, "Filtros Aplicados")
      }

      // Generar nombre de archivo con fecha y hora
      const now = new Date()
      const timestamp = now.toISOString().slice(0, 19).replace(/:/g, "-")
      const filename = `datos_panel_${timestamp}.xlsx`

      // Descargar el archivo
      XLSX.writeFile(workbook, filename)

      console.log("Datos exportados exitosamente")
    } catch (error) {
      console.error("Error al exportar datos:", error)
      alert("Error al exportar los datos. Por favor, inténtelo de nuevo.")
    }
  }

    return (
        <div className="min-h-screen bg-gray-50 py-6">
      <div className="container mx-auto" ref={containerRef}>
        <Filters 
          onExportar={exportarDatos}
          titulo="Panel de Control de Datos"
          descripcion="Seleccione los filtros para visualizar los datos"
        />

        {/* Tabla de Cajas */}
        <Card className="mb-6 ml-4 mr-4">
          <CardHeader>
            <CardTitle>Tabla de Cajas</CardTitle>
            <CardDescription>Datos por año y mes en cajas</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Año</TableHead>
                  <TableHead className="text-right">Enero</TableHead>
                  <TableHead className="text-right">Febrero</TableHead>
                  <TableHead className="text-right">Marzo</TableHead>
                  <TableHead className="text-right">Abril</TableHead>
                  <TableHead className="text-right">Mayo</TableHead>
                  <TableHead className="text-right">Junio</TableHead>
                  <TableHead className="text-right">Julio</TableHead>
                  <TableHead className="text-right">Agosto</TableHead>
                  <TableHead className="text-right">Septiembre</TableHead>
                  <TableHead className="text-right">Octubre</TableHead>
                  <TableHead className="text-right">Noviembre</TableHead>
                  <TableHead className="text-right">Diciembre</TableHead>
                  <TableHead className="text-right">Acum. Mes Actual</TableHead>
                  <TableHead className="text-right">Acum. Mes Anterior</TableHead>
                  <TableHead className="text-right">YTD</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {datosCajas.map((fila) =>
                  fila.isComparison ? (
                    <React.Fragment key={fila.año}>
                      <TableRow>
                        <TableCell className="font-medium" rowSpan={2}>
                          {fila.año}
                        </TableCell>
                        <TableCell className="text-right">{fila.diferencia.enero}</TableCell>
                        <TableCell className="text-right">{fila.diferencia.febrero}</TableCell>
                        <TableCell className="text-right">{fila.diferencia.marzo}</TableCell>
                        <TableCell className="text-right">{fila.diferencia.abril}</TableCell>
                        <TableCell className="text-right">{fila.diferencia.mayo}</TableCell>
                        <TableCell className="text-right">{fila.diferencia.junio}</TableCell>
                        <TableCell className="text-right">{fila.diferencia.julio}</TableCell>
                        <TableCell className="text-right">{fila.diferencia.agosto}</TableCell>
                        <TableCell className="text-right">{fila.diferencia.septiembre}</TableCell>
                        <TableCell className="text-right">{fila.diferencia.octubre}</TableCell>
                        <TableCell className="text-right">{fila.diferencia.noviembre}</TableCell>
                        <TableCell className="text-right">{fila.diferencia.diciembre}</TableCell>
                        <TableCell className="text-right">{fila.diferencia.acumActual}</TableCell>
                        <TableCell className="text-right">{fila.diferencia.acumAnterior}</TableCell>
                        <TableCell className="text-right">{fila.diferencia.ytd}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="text-right">{fila.unidades.enero}</TableCell>
                        <TableCell className="text-right">{fila.unidades.febrero}</TableCell>
                        <TableCell className="text-right">{fila.unidades.marzo}</TableCell>
                        <TableCell className="text-right">{fila.unidades.abril}</TableCell>
                        <TableCell className="text-right">{fila.unidades.mayo}</TableCell>
                        <TableCell className="text-right">{fila.unidades.junio}</TableCell>
                        <TableCell className="text-right">{fila.unidades.julio}</TableCell>
                        <TableCell className="text-right">{fila.unidades.agosto}</TableCell>
                        <TableCell className="text-right">{fila.unidades.septiembre}</TableCell>
                        <TableCell className="text-right">{fila.unidades.octubre}</TableCell>
                        <TableCell className="text-right">{fila.unidades.noviembre}</TableCell>
                        <TableCell className="text-right">{fila.unidades.diciembre}</TableCell>
                        <TableCell className="text-right">{fila.unidades.acumActual}</TableCell>
                        <TableCell className="text-right">{fila.unidades.acumAnterior}</TableCell>
                        <TableCell className="text-right">{fila.unidades.ytd}</TableCell>
                      </TableRow>
                    </React.Fragment>
                  ) : (
                    <TableRow key={fila.año}>
                      <TableCell className="font-medium">{fila.año}</TableCell>
                      <TableCell className="text-right">{fila.enero}</TableCell>
                      <TableCell className="text-right">{fila.febrero}</TableCell>
                      <TableCell className="text-right">{fila.marzo}</TableCell>
                      <TableCell className="text-right">{fila.abril}</TableCell>
                      <TableCell className="text-right">{fila.mayo}</TableCell>
                      <TableCell className="text-right">{fila.junio}</TableCell>
                      <TableCell className="text-right">{fila.julio}</TableCell>
                      <TableCell className="text-right">{fila.agosto}</TableCell>
                      <TableCell className="text-right">{fila.septiembre}</TableCell>
                      <TableCell className="text-right">{fila.octubre}</TableCell>
                      <TableCell className="text-right">{fila.noviembre}</TableCell>
                      <TableCell className="text-right">{fila.diciembre}</TableCell>
                      <TableCell className="text-right">{fila.acumActual}</TableCell>
                      <TableCell className="text-right">{fila.acumAnterior}</TableCell>
                      <TableCell className="text-right">{fila.ytd}</TableCell>
                    </TableRow>
                  ),
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Tabla de Pesos */}
        <Card className="ml-4 mr-4"> 
          <CardHeader>
            <CardTitle>Tabla de Pesos</CardTitle>
            <CardDescription>Datos por año y mes en pesos</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Año</TableHead>
                  <TableHead className="text-right">Enero</TableHead>
                  <TableHead className="text-right">Febrero</TableHead>
                  <TableHead className="text-right">Marzo</TableHead>
                  <TableHead className="text-right">Abril</TableHead>
                  <TableHead className="text-right">Mayo</TableHead>
                  <TableHead className="text-right">Junio</TableHead>
                  <TableHead className="text-right">Julio</TableHead>
                  <TableHead className="text-right">Agosto</TableHead>
                  <TableHead className="text-right">Septiembre</TableHead>
                  <TableHead className="text-right">Octubre</TableHead>
                  <TableHead className="text-right">Noviembre</TableHead>
                  <TableHead className="text-right">Diciembre</TableHead>
                  <TableHead className="text-right">Acum. Mes Actual</TableHead>
                  <TableHead className="text-right">Acum. Mes Anterior</TableHead>
                  <TableHead className="text-right">YTD</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {datosPesos.map((fila) =>
                  fila.isComparison ? (
                    <React.Fragment key={fila.año}>
                      <TableRow>
                        <TableCell className="font-medium" rowSpan={2}>
                          {fila.año}
                        </TableCell>
                        <TableCell className="text-right">{fila.diferencia.enero}</TableCell>
                        <TableCell className="text-right">{fila.diferencia.febrero}</TableCell>
                        <TableCell className="text-right">{fila.diferencia.marzo}</TableCell>
                        <TableCell className="text-right">{fila.diferencia.abril}</TableCell>
                        <TableCell className="text-right">{fila.diferencia.mayo}</TableCell>
                        <TableCell className="text-right">{fila.diferencia.junio}</TableCell>
                        <TableCell className="text-right">{fila.diferencia.julio}</TableCell>
                        <TableCell className="text-right">{fila.diferencia.agosto}</TableCell>
                        <TableCell className="text-right">{fila.diferencia.septiembre}</TableCell>
                        <TableCell className="text-right">{fila.diferencia.octubre}</TableCell>
                        <TableCell className="text-right">{fila.diferencia.noviembre}</TableCell>
                        <TableCell className="text-right">{fila.diferencia.diciembre}</TableCell>
                        <TableCell className="text-right">{fila.diferencia.acumActual}</TableCell>
                        <TableCell className="text-right">{fila.diferencia.acumAnterior}</TableCell>
                        <TableCell className="text-right">{fila.diferencia.ytd}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="text-right">{fila.unidades.enero}</TableCell>
                        <TableCell className="text-right">{fila.unidades.febrero}</TableCell>
                        <TableCell className="text-right">{fila.unidades.marzo}</TableCell>
                        <TableCell className="text-right">{fila.unidades.abril}</TableCell>
                        <TableCell className="text-right">{fila.unidades.mayo}</TableCell>
                        <TableCell className="text-right">{fila.unidades.junio}</TableCell>
                        <TableCell className="text-right">{fila.unidades.julio}</TableCell>
                        <TableCell className="text-right">{fila.unidades.agosto}</TableCell>
                        <TableCell className="text-right">{fila.unidades.septiembre}</TableCell>
                        <TableCell className="text-right">{fila.unidades.octubre}</TableCell>
                        <TableCell className="text-right">{fila.unidades.noviembre}</TableCell>
                        <TableCell className="text-right">{fila.unidades.diciembre}</TableCell>
                        <TableCell className="text-right">{fila.unidades.acumActual}</TableCell>
                        <TableCell className="text-right">{fila.unidades.acumAnterior}</TableCell>
                        <TableCell className="text-right">{fila.unidades.ytd}</TableCell>
                      </TableRow>
                    </React.Fragment>
                  ) : (
                    <TableRow key={fila.año}>
                      <TableCell className="font-medium">{fila.año}</TableCell>
                      <TableCell className="text-right">{fila.enero}</TableCell>
                      <TableCell className="text-right">{fila.febrero}</TableCell>
                      <TableCell className="text-right">{fila.marzo}</TableCell>
                      <TableCell className="text-right">{fila.abril}</TableCell>
                      <TableCell className="text-right">{fila.mayo}</TableCell>
                      <TableCell className="text-right">{fila.junio}</TableCell>
                      <TableCell className="text-right">{fila.julio}</TableCell>
                      <TableCell className="text-right">{fila.agosto}</TableCell>
                      <TableCell className="text-right">{fila.septiembre}</TableCell>
                      <TableCell className="text-right">{fila.octubre}</TableCell>
                      <TableCell className="text-right">{fila.noviembre}</TableCell>
                      <TableCell className="text-right">{fila.diciembre}</TableCell>
                      <TableCell className="text-right">{fila.acumActual}</TableCell>
                      <TableCell className="text-right">{fila.acumAnterior}</TableCell>
                      <TableCell className="text-right">{fila.ytd}</TableCell>
                    </TableRow>
                  ),
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
    )
} 