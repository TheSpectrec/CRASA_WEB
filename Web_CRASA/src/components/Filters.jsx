"use client"

import { useState, useEffect } from "react"
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog"
import {
  Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList
} from "@/components/ui/command"
import { Search, Filter, Download, Check } from "lucide-react"

export function Filters({ onExportar, titulo = "Panel de Control de Datos", descripcion = "Seleccione los filtros para visualizar los datos" }) {
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState("")
  const [empresas, setEmpresas] = useState([])

  const [vendedores, setVendedores] = useState([])
  const [vendedorSeleccionado, setVendedorSeleccionado] = useState([])

  const [marcas, setMarcas] = useState([])
  const [familias, setFamilias] = useState([])
  const [clientes, setClientes] = useState([])
  const [productos, setProductos] = useState([])

  const [marcaSeleccionada, setMarcaSeleccionada] = useState([])
  const [familiaSeleccionada, setFamiliaSeleccionada] = useState([])
  const [clienteSeleccionado, setClienteSeleccionado] = useState([])
  const [productoSeleccionado, setProductoSeleccionado] = useState([])

  const [dialogoVendedorAbierto, setDialogoVendedorAbierto] = useState(false)
  const [dialogoMarcaAbierto, setDialogoMarcaAbierto] = useState(false)
  const [dialogoFamiliaAbierto, setDialogoFamiliaAbierto] = useState(false)
  const [dialogoClienteAbierto, setDialogoClienteAbierto] = useState(false)
  const [dialogoProductoAbierto, setDialogoProductoAbierto] = useState(false)

  useEffect(() => {
    fetch("http://localhost:8080/api/companies")
      .then(res => res.json())
      .then(data => setEmpresas(data.map(e => e.name)))

    fetch("http://localhost:8080/api/users/vendedores")
      .then(res => res.json())
      .then(data => setVendedores(data))

    fetch("http://localhost:8080/api/marks")
      .then(res => res.json())
      .then(data => setMarcas(data))

    fetch("http://localhost:8080/api/families")
      .then(res => res.json())
      .then(data => setFamilias(data))

    fetch("http://localhost:8080/api/customers")
      .then(res => res.json())
      .then(data => setClientes(data))

    fetch("http://localhost:8080/api/products")
      .then(res => res.json())
      .then(data => setProductos(data))
  }, [])

  useEffect(() => {
    if (empresaSeleccionada) {
      setVendedorSeleccionado([])
      setMarcaSeleccionada([])
      setFamiliaSeleccionada([])
      setClienteSeleccionado([])
      setProductoSeleccionado([])
    }
  }, [empresaSeleccionada])

  const limpiarFiltros = () => {
    setEmpresaSeleccionada("")
    setVendedorSeleccionado([])
    setMarcaSeleccionada([])
    setFamiliaSeleccionada([])
    setClienteSeleccionado([])
    setProductoSeleccionado([])
  }

  const getFiltrosAplicados = () => {
    const filtros = []
    if (empresaSeleccionada) filtros.push({ Filtro: "Empresa", Valor: empresaSeleccionada })
    if (vendedorSeleccionado.length) filtros.push({ Filtro: "Vendedor", Valor: vendedorSeleccionado })
    if (marcaSeleccionada.length) filtros.push({ Filtro: "Marca", Valor: marcaSeleccionada })
    if (familiaSeleccionada.length) filtros.push({ Filtro: "Familia", Valor: familiaSeleccionada })
    if (clienteSeleccionado.length) filtros.push({ Filtro: "Cliente", Valor: clienteSeleccionado })
    if (productoSeleccionado.length) filtros.push({ Filtro: "Producto", Valor: productoSeleccionado })
    return filtros
  }

  const renderDialogFiltroMultiple = (label, seleccionados, open, setOpen, dataList, setSeleccionados, nameField = 'name', codeField = 'code') => (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            {seleccionados.length ? `${seleccionados.length} seleccionado(s)` : `Seleccionar ${label.toLowerCase()}`}
            <Search className="h-4 w-4 opacity-50" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader><DialogTitle>Seleccionar {label}</DialogTitle></DialogHeader>
          <Command>
            <CommandInput placeholder={`Buscar ${label.toLowerCase()}...`} />
            <CommandList>
              <CommandEmpty>No se encontraron {label.toLowerCase()}s.</CommandEmpty>
              <CommandGroup>
                {dataList.map((item) => {
                  const display = item[nameField] || item
                  const codigo = item[codeField] || ''
                  const isSelected = seleccionados.includes(display)
                  return (
                    <CommandItem
                      key={display}
                      onSelect={() => {
                        setSeleccionados(prev =>
                          isSelected ? prev.filter(i => i !== display) : [...prev, display]
                        )
                      }}
                      className={`flex items-start gap-2 px-2 py-2 rounded-md cursor-pointer ${isSelected ? 'bg-muted' : ''}`}
                    >
                      <div className={`w-5 h-5 rounded border flex items-center justify-center mt-1 ${isSelected ? 'bg-primary text-white' : 'border-primary text-transparent'}`}>
                        <Check className="w-3 h-3" />
                      </div>
                      <div className="flex flex-col">
                        <span className={`text-sm font-medium ${isSelected ? 'text-primary' : ''}`}>{display}</span>
                        {codigo && <span className="text-xs text-muted-foreground">Código: {codigo}</span>}
                      </div>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </div>
  )

  return (
    <Card className="mb-6 ml-4 mr-4">
      <CardHeader>
        <CardTitle className="mb-1">{titulo}</CardTitle>
        <CardDescription>{descripcion}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">Empresa</label>
            <Select value={empresaSeleccionada} onValueChange={setEmpresaSeleccionada}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar empresa" />
              </SelectTrigger>
              <SelectContent>
                {empresas.map((empresa) => (
                  <SelectItem key={empresa} value={empresa}>{empresa}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {renderDialogFiltroMultiple("Vendedor", vendedorSeleccionado, dialogoVendedorAbierto, setDialogoVendedorAbierto, vendedores, setVendedorSeleccionado)}
          {renderDialogFiltroMultiple("Marca", marcaSeleccionada, dialogoMarcaAbierto, setDialogoMarcaAbierto, marcas, setMarcaSeleccionada)}
          {renderDialogFiltroMultiple("Familia", familiaSeleccionada, dialogoFamiliaAbierto, setDialogoFamiliaAbierto, familias, setFamiliaSeleccionada)}
          {renderDialogFiltroMultiple("Cliente", clienteSeleccionado, dialogoClienteAbierto, setDialogoClienteAbierto, clientes, setClienteSeleccionado)}
          {renderDialogFiltroMultiple("Producto", productoSeleccionado, dialogoProductoAbierto, setDialogoProductoAbierto, productos, setProductoSeleccionado)}
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={limpiarFiltros}>
              <Filter className="h-4 w-4 mr-2" />
              Limpiar filtros
            </Button>
          </div>
          <Button variant="outline" size="sm" onClick={() => onExportar && onExportar(getFiltrosAplicados())}>
            <Download className="h-4 w-4 mr-2" />
            Exportar datos
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
