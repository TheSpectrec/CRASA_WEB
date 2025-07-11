"use client"

import { useMemo } from "react"

export const useChartData = (datosFiltrados, tipoGrafica) => {
  return useMemo(() => {
    switch (tipoGrafica) {
      case "Cajas":
        // Gráfica de columnas agrupadas por año y mes
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
        return meses.map((mes) => {
          const datos2023 = datosFiltrados
            .filter((d) => d.año === 2023 && d.mes === mes)
            .reduce((sum, d) => sum + d.cajas, 0)
          const datos2024 = datosFiltrados
            .filter((d) => d.año === 2024 && d.mes === mes)
            .reduce((sum, d) => sum + d.cajas, 0)
          const datos2025 = datosFiltrados
            .filter((d) => d.año === 2025 && d.mes === mes)
            .reduce((sum, d) => sum + d.cajas, 0)
          return { mes, 2023: datos2023, 2024: datos2024, 2025: datos2025 }
        })

      case "Vendedor":
        // Gráfica pastel de cajas por vendedor
        const vendedores = {}
        datosFiltrados.forEach((d) => {
          vendedores[d.vendedor] = (vendedores[d.vendedor] || 0) + d.cajas
        })
        return Object.entries(vendedores).map(([vendedor, cajas]) => ({
          nombre: vendedor,
          valor: cajas,
        }))

      case "Marca":
        // Gráfica de barras verticales de cajas por marca (9 marcas)
        const marcas = {}
        datosFiltrados.forEach((d) => {
          marcas[d.marca] = (marcas[d.marca] || 0) + d.cajas
        })
        return Object.entries(marcas)
          .map(([marca, cajas]) => ({ nombre: marca, valor: cajas }))
          .sort((a, b) => b.valor - a.valor)

      case "Cliente":
        // Gráfica de dispersión de cajas por cliente (150 clientes)
        const clientes = {}
        datosFiltrados.forEach((d) => {
          clientes[d.cliente] = (clientes[d.cliente] || 0) + d.cajas
        })
        return Object.entries(clientes)
          .map(([cliente, cajas]) => ({
            nombre: cliente,
            valor: cajas,
          }))
          .sort((a, b) => b.valor - a.valor)

      case "Familias":
        // Gráfica de dispersión de cajas vendidas por familia (85 familias)
        const familias = {}
        datosFiltrados.forEach((d) => {
          familias[d.familia] = (familias[d.familia] || 0) + d.cajas
        })
        return Object.entries(familias)
          .map(([familia, cajas]) => ({ nombre: familia, valor: cajas }))
          .sort((a, b) => b.valor - a.valor)

      case "Devoluciones":
        // Gráfica de dispersión de cajas devueltas por cliente (150 clientes)
        const clientesDevoluciones = {}
        datosFiltrados.forEach((d) => {
          clientesDevoluciones[d.cliente] = (clientesDevoluciones[d.cliente] || 0) + d.cajasDevueltas
        })
        return Object.entries(clientesDevoluciones)
          .map(([cliente, cajasDevueltas]) => ({
            nombre: cliente,
            valor: cajasDevueltas,
          }))
          .sort((a, b) => b.valor - a.valor)

      case "Pesos":
      default:
        // Gráfica pastel de gastos por cliente
        return datosFiltrados.map((cliente) => ({
          nombre: cliente.cliente,
          valor: cliente.gasto,
        }))
    }
  }, [datosFiltrados, tipoGrafica])
}
