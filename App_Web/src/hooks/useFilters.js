"use client"

import { useState, useMemo } from "react"

export const useFilters = (datosCompletos) => {
  const [filtros, setFiltros] = useState({
    año: "",
    mes: "",
    empresa: "",
    vendedor: "",
    familia: "",
    cliente: "",
  })

  const datosFiltrados = useMemo(() => {
    return datosCompletos.filter((item) => {
      return (
        (!filtros.año || item.año.toString() === filtros.año) &&
        (!filtros.mes || item.mes === filtros.mes) &&
        (!filtros.empresa || item.empresa === filtros.empresa) &&
        (!filtros.vendedor || item.vendedor === filtros.vendedor) &&
        (!filtros.familia || item.familia === filtros.familia) &&
        (!filtros.cliente || item.cliente.toLowerCase().includes(filtros.cliente.toLowerCase()))
      )
    })
  }, [datosCompletos, filtros])

  const limpiarFiltros = () => {
    setFiltros({
      año: "",
      mes: "",
      empresa: "",
      vendedor: "",
      familia: "",
      cliente: "",
    })
  }

  return {
    filtros,
    setFiltros,
    datosFiltrados,
    limpiarFiltros,
  }
}
