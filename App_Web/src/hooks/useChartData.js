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
        return Object.entries(vendedores).map(([vendedor, cajas]) => ({ nombre: vendedor, valor: cajas }))

      case "Marca":
        // Gráfica de barras de cajas por marca
        const marcas = {}
        datosFiltrados.forEach((d) => {
          marcas[d.marca] = (marcas[d.marca] || 0) + d.cajas
        })
        return Object.entries(marcas).map(([marca, cajas]) => ({ nombre: marca, valor: cajas }))

      case "Cliente":
        // Gráfica de barras de cajas por cliente
        const clientes = {}
        datosFiltrados.forEach((d) => {
          clientes[d.cliente] = (clientes[d.cliente] || 0) + d.cajas
        })
        return Object.entries(clientes)
          .map(([cliente, cajas]) => ({ nombre: cliente, valor: cajas }))
          .slice(0, 20)

      case "Producto":
        // Gráfica de barras de veces vendido por producto
        const productos = {}
        datosFiltrados.forEach((d) => {
          productos[d.producto] = (productos[d.producto] || 0) + d.vecesVendido
        })
        return Object.entries(productos).map(([producto, veces]) => ({ nombre: producto, valor: veces }))

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
