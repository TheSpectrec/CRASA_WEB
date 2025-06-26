"use client"

import { useState, useEffect } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"

import { Search, Filter, Download } from "lucide-react"

export function Filters({ onExportar, titulo = "Panel de Control de Datos", descripcion = "Seleccione los filtros para visualizar los datos" }) {
    // Estados para los filtros
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState("")
  const [vendedorSeleccionado, setVendedorSeleccionado] = useState("")
  const [marcaSeleccionada, setMarcaSeleccionada] = useState("")
  const [familiaSeleccionada, setFamiliaSeleccionada] = useState("")
  const [clienteSeleccionado, setClienteSeleccionado] = useState("")
  const [productoSeleccionado, setProductoSeleccionado] = useState("")

  // Estados para los diálogos
  const [dialogoVendedorAbierto, setDialogoVendedorAbierto] = useState(false)
  const [dialogoMarcaAbierto, setDialogoMarcaAbierto] = useState(false)
  const [dialogoFamiliaAbierto, setDialogoFamiliaAbierto] = useState(false)
  const [dialogoClienteAbierto, setDialogoClienteAbierto] = useState(false)
  const [dialogoProductoAbierto, setDialogoProductoAbierto] = useState(false)

  // Datos de ejemplo
  const empresas = ["Empresa A", "Empresa B", "Empresa C"]

  const vendedores = [
    "Juan Pérez",
    "María López",
    "Carlos Rodríguez",
    "Ana Martínez",
    "Pedro Sánchez",
    "Laura Gómez",
    "Roberto Fernández",
    "Sofía Torres",
    "Miguel Ramírez",
    "Daniela Ortiz",
    "Javier Ruiz",
    "Valentina Castro",
    "Alejandro Díaz",
  ]

  const marcas = ["Marca 1", "Marca 2", "Marca 3", "Marca 4", "Marca 5", "Marca 6", "Marca 7", "Marca 8", "Marca 9"]

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

  const clientes = [
    "Cliente 1",
    "Cliente 2",
    "Cliente 3",
    "Cliente 4",
    "Cliente 5",
    "Cliente 6",
    "Cliente 7",
    "Cliente 8",
    "Cliente 9",
    "Cliente 10",
  ]

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

  // Resetear filtros dependientes cuando cambia la empresa
  useEffect(() => {
    if (empresaSeleccionada) {
      setVendedorSeleccionado("")
      setMarcaSeleccionada("")
      setFamiliaSeleccionada("")
      setClienteSeleccionado("")
      setProductoSeleccionado("")
    }
  }, [empresaSeleccionada])

  // Limpiar todos los filtros
  const limpiarFiltros = () => {
    setEmpresaSeleccionada("")
    setVendedorSeleccionado("")
    setMarcaSeleccionada("")
    setFamiliaSeleccionada("")
    setClienteSeleccionado("")
    setProductoSeleccionado("")
  }

  // Obtener filtros aplicados
  const getFiltrosAplicados = () => {
    const filtros = []
    if (empresaSeleccionada) filtros.push({ Filtro: "Empresa", Valor: empresaSeleccionada })
    if (vendedorSeleccionado) filtros.push({ Filtro: "Vendedor", Valor: vendedorSeleccionado })
    if (marcaSeleccionada) filtros.push({ Filtro: "Marca", Valor: marcaSeleccionada })
    if (familiaSeleccionada) filtros.push({ Filtro: "Familia", Valor: familiaSeleccionada })
    if (clienteSeleccionado) filtros.push({ Filtro: "Cliente", Valor: clienteSeleccionado })
    if (productoSeleccionado) filtros.push({ Filtro: "Producto", Valor: productoSeleccionado })
    return filtros
  }

  return (
    <Card className="mb-6 ml-4 mr-4">
      <CardHeader>
        <div>
          <CardTitle className="mb-1">{titulo}</CardTitle>
          <CardDescription>{descripcion}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* Filtro de Empresa */}
          <div>
            <label className="block text-sm font-medium mb-1">Empresa</label>
            <Select value={empresaSeleccionada} onValueChange={setEmpresaSeleccionada}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar empresa" />
              </SelectTrigger>
              <SelectContent>
                {empresas.map((empresa) => (
                  <SelectItem key={empresa} value={empresa}>
                    {empresa}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Filtro de Vendedor */}
          <div>
            <label className="block text-sm font-medium mb-1">Vendedor</label>
            <Dialog open={dialogoVendedorAbierto} onOpenChange={setDialogoVendedorAbierto}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {vendedorSeleccionado || "Seleccionar vendedor"}
                  <Search className="h-4 w-4 opacity-50" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Seleccionar Vendedor</DialogTitle>
                </DialogHeader>
                <Command>
                  <CommandInput placeholder="Buscar vendedor..." />
                  <CommandList>
                    <CommandEmpty>No se encontraron vendedores.</CommandEmpty>
                    <CommandGroup>
                      {vendedores.map((vendedor) => (
                        <CommandItem
                          key={vendedor}
                          onSelect={() => {
                            setVendedorSeleccionado(vendedor)
                            setDialogoVendedorAbierto(false)
                          }}
                        >
                          {vendedor}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </DialogContent>
            </Dialog>
          </div>

          {/* Filtro de Marca */}
          <div>
            <label className="block text-sm font-medium mb-1">Marca</label>
            <Dialog open={dialogoMarcaAbierto} onOpenChange={setDialogoMarcaAbierto}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {marcaSeleccionada || "Seleccionar marca"}
                  <Search className="h-4 w-4 opacity-50" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Seleccionar Marca</DialogTitle>
                </DialogHeader>
                <Command>
                  <CommandInput placeholder="Buscar marca..." />
                  <CommandList>
                    <CommandEmpty>No se encontraron marcas.</CommandEmpty>
                    <CommandGroup>
                      {marcas.map((marca) => (
                        <CommandItem
                          key={marca}
                          onSelect={() => {
                            setMarcaSeleccionada(marca)
                            setDialogoMarcaAbierto(false)
                          }}
                        >
                          {marca}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </DialogContent>
            </Dialog>
          </div>

          {/* Filtro de Familia */}
          <div>
            <label className="block text-sm font-medium mb-1">Familia</label>
            <Dialog open={dialogoFamiliaAbierto} onOpenChange={setDialogoFamiliaAbierto}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {familiaSeleccionada || "Seleccionar familia"}
                  <Search className="h-4 w-4 opacity-50" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Seleccionar Familia</DialogTitle>
                </DialogHeader>
                <Command>
                  <CommandInput placeholder="Buscar familia..." />
                  <CommandList>
                    <CommandEmpty>No se encontraron familias.</CommandEmpty>
                    <CommandGroup>
                      {familias.map((familia) => (
                        <CommandItem
                          key={familia}
                          onSelect={() => {
                            setFamiliaSeleccionada(familia)
                            setDialogoFamiliaAbierto(false)
                          }}
                        >
                          {familia}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </DialogContent>
            </Dialog>
          </div>

          {/* Filtro de Cliente */}
          <div>
            <label className="block text-sm font-medium mb-1">Cliente</label>
            <Dialog open={dialogoClienteAbierto} onOpenChange={setDialogoClienteAbierto}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {clienteSeleccionado || "Seleccionar cliente"}
                  <Search className="h-4 w-4 opacity-50" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Seleccionar Cliente</DialogTitle>
                </DialogHeader>
                <Command>
                  <CommandInput placeholder="Buscar cliente..." />
                  <CommandList>
                    <CommandEmpty>No se encontraron clientes.</CommandEmpty>
                    <CommandGroup>
                      {clientes.map((cliente) => (
                        <CommandItem
                          key={cliente}
                          onSelect={() => {
                            setClienteSeleccionado(cliente)
                            setDialogoClienteAbierto(false)
                          }}
                        >
                          {cliente}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </DialogContent>
            </Dialog>
          </div>

          {/* Filtro de Producto */}
          <div>
            <label className="block text-sm font-medium mb-1">Producto</label>
            <Dialog open={dialogoProductoAbierto} onOpenChange={setDialogoProductoAbierto}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {productoSeleccionado || "Seleccionar producto"}
                  <Search className="h-4 w-4 opacity-50" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Seleccionar Producto</DialogTitle>
                </DialogHeader>
                <Command>
                  <CommandInput placeholder="Buscar producto..." />
                  <CommandList>
                    <CommandEmpty>No se encontraron productos.</CommandEmpty>
                    <CommandGroup>
                      {productos.map((producto) => (
                        <CommandItem
                          key={producto}
                          onSelect={() => {
                            setProductoSeleccionado(producto)
                            setDialogoProductoAbierto(false)
                          }}
                        >
                          {producto}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </DialogContent>
            </Dialog>
          </div>
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