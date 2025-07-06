"use client"

import { useState, useEffect } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Badge } from "@/components/ui/badge"

import { Search, Filter, Download, X, Check } from "lucide-react"

export function Filters({ onExportar, titulo = "Panel de Control de Datos", descripcion = "Seleccione los filtros para visualizar los datos" }) {
    // Estados para los filtros
  const [empresasSeleccionadas, setEmpresasSeleccionadas] = useState([])
  const [vendedoresSeleccionados, setVendedoresSeleccionados] = useState([])
  const [marcasSeleccionadas, setMarcasSeleccionadas] = useState([])
  const [familiasSeleccionadas, setFamiliasSeleccionadas] = useState([])
  const [clientesSeleccionados, setClientesSeleccionados] = useState([])
  const [productosSeleccionados, setProductosSeleccionados] = useState([])

  // Estados para los diálogos
  const [dialogoEmpresaAbierto, setDialogoEmpresaAbierto] = useState(false)
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

  // Funciones para manejar selección múltiple
  const toggleSelection = (item, selectedItems, setSelectedItems) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((selected) => selected !== item))
    } else {
      setSelectedItems([...selectedItems, item])
    }
  }

  const removeSelection = (item, selectedItems, setSelectedItems) => {
    setSelectedItems(selectedItems.filter((selected) => selected !== item))
  }

  // Resetear filtros dependientes cuando cambian las empresas
  useEffect(() => {
    if (empresasSeleccionadas.length > 0) {
      setVendedoresSeleccionados([])
      setMarcasSeleccionadas([])
      setFamiliasSeleccionadas([])
      setClientesSeleccionados([])
      setProductosSeleccionados([])
    }
  }, [empresasSeleccionadas])

  // Limpiar todos los filtros
  const limpiarFiltros = () => {
    setEmpresasSeleccionadas([])
    setVendedoresSeleccionados([])
    setMarcasSeleccionadas([])
    setFamiliasSeleccionadas([])
    setClientesSeleccionados([])
    setProductosSeleccionados([])
  }

  // Obtener filtros aplicados
  const getFiltrosAplicados = () => {
    const filtros = []
    if (empresasSeleccionadas.length > 0) filtros.push({ Filtro: "Empresas", Valor: empresasSeleccionadas.join(", ") })
    if (vendedoresSeleccionados.length > 0)
      filtros.push({ Filtro: "Vendedores", Valor: vendedoresSeleccionados.join(", ") })
    if (marcasSeleccionadas.length > 0) filtros.push({ Filtro: "Marcas", Valor: marcasSeleccionadas.join(", ") })
    if (familiasSeleccionadas.length > 0) filtros.push({ Filtro: "Familias", Valor: familiasSeleccionadas.join(", ") })
    if (clientesSeleccionados.length > 0) filtros.push({ Filtro: "Clientes", Valor: clientesSeleccionados.join(", ") })
    if (productosSeleccionados.length > 0)
      filtros.push({ Filtro: "Productos", Valor: productosSeleccionados.join(", ") })
    return filtros
  }

  // Componente para mostrar selecciones multiples
  const MultiSelectDisplay = ({ label, selectedItems, onRemove, onOpenDialog, placeholder }) => (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <div className="min-h-[40px] border border-input rounded-md p-2 bg-background">
        {selectedItems.length === 0 ? (
          <Button
            variant="ghost"
            className="w-full justify-between h-auto p-1 text-muted-foreground"
            onClick={onOpenDialog}
          >
            {placeholder}
            <Search className="h-4 w-4 opacity-50" />
          </Button>
        ) : (
          <div className="flex flex-wrap gap-1">
            {selectedItems.map((item) => (
              <Badge key={item} variant="secondary" className="text-xs">
                {item}
                <button
                  onClick={() => onRemove(item)}
                  className="ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={onOpenDialog}>
              <Search className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )

  // Componente para diálogo de selección múltiple
  const MultiSelectDialog = ({ title, items, selectedItems, onToggle, isOpen, onOpenChange }) => (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Command>
          <CommandInput placeholder={`Buscar ${title.toLowerCase()}...`} />
          <CommandList>
            <CommandEmpty>No se encontraron elementos.</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem key={item} onSelect={() => onToggle(item)}>
                  <div className="flex items-center space-x-2 w-full">
                    <div className="flex items-center justify-center w-4 h-4 border border-primary rounded">
                      {selectedItems.includes(item) && <Check className="h-3 w-3 text-primary" />}
                    </div>
                    <span>{item}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              selectedItems.forEach((item) => onToggle(item))
            }}
          >
            Limpiar selección
          </Button>
          <Button size="sm" onClick={() => onOpenChange(false)}>
            Aplicar ({selectedItems.length})
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )

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
          <MultiSelectDisplay
            label="Empresa"
            selectedItems={empresasSeleccionadas}
            onRemove={(item) => removeSelection(item, empresasSeleccionadas, setEmpresasSeleccionadas)}
            onOpenDialog={() => setDialogoEmpresaAbierto(true)}
            placeholder="Seleccionar empresas"
          />

          {/* Filtro de Vendedor */}
          <MultiSelectDisplay
            label="Vendedor"
            selectedItems={vendedoresSeleccionados}
            onRemove={(item) => removeSelection(item, vendedoresSeleccionados, setVendedoresSeleccionados)}
            onOpenDialog={() => setDialogoVendedorAbierto(true)}
            placeholder="Seleccionar vendedores"
          />

          {/* Filtro de Marca */}
          <MultiSelectDisplay
            label="Marca"
            selectedItems={marcasSeleccionadas}
            onRemove={(item) => removeSelection(item, marcasSeleccionadas, setMarcasSeleccionadas)}
            onOpenDialog={() => setDialogoMarcaAbierto(true)}
            placeholder="Seleccionar marcas"
          />

          {/* Filtro de Familia */}
          <MultiSelectDisplay
            label="Familia"
            selectedItems={familiasSeleccionadas}
            onRemove={(item) => removeSelection(item, familiasSeleccionadas, setFamiliasSeleccionadas)}
            onOpenDialog={() => setDialogoFamiliaAbierto(true)}
            placeholder="Seleccionar familias"
          />

          {/* Filtro de Cliente */}
          <MultiSelectDisplay
            label="Cliente"
            selectedItems={clientesSeleccionados}
            onRemove={(item) => removeSelection(item, clientesSeleccionados, setClientesSeleccionados)}
            onOpenDialog={() => setDialogoClienteAbierto(true)}
            placeholder="Seleccionar clientes"
          />

          {/* Filtro de Producto */}
          <MultiSelectDisplay
            label="Producto"
            selectedItems={productosSeleccionados}
            onRemove={(item) => removeSelection(item, productosSeleccionados, setProductosSeleccionados)}
            onOpenDialog={() => setDialogoProductoAbierto(true)}
            placeholder="Seleccionar productos"
          />
        </div>

        {/* Diálogos de selección múltiple */}
        <MultiSelectDialog
          title="Seleccionar Empresas"
          items={empresas}
          selectedItems={empresasSeleccionadas}
          onToggle={(item) => toggleSelection(item, empresasSeleccionadas, setEmpresasSeleccionadas)}
          isOpen={dialogoEmpresaAbierto}
          onOpenChange={setDialogoEmpresaAbierto}
        />

        <MultiSelectDialog
          title="Seleccionar Vendedores"
          items={vendedores}
          selectedItems={vendedoresSeleccionados}
          onToggle={(item) => toggleSelection(item, vendedoresSeleccionados, setVendedoresSeleccionados)}
          isOpen={dialogoVendedorAbierto}
          onOpenChange={setDialogoVendedorAbierto}
        />

        <MultiSelectDialog
          title="Seleccionar Marcas"
          items={marcas}
          selectedItems={marcasSeleccionadas}
          onToggle={(item) => toggleSelection(item, marcasSeleccionadas, setMarcasSeleccionadas)}
          isOpen={dialogoMarcaAbierto}
          onOpenChange={setDialogoMarcaAbierto}
        />

        <MultiSelectDialog
          title="Seleccionar Familias"
          items={familias}
          selectedItems={familiasSeleccionadas}
          onToggle={(item) => toggleSelection(item, familiasSeleccionadas, setFamiliasSeleccionadas)}
          isOpen={dialogoFamiliaAbierto}
          onOpenChange={setDialogoFamiliaAbierto}
        />

        <MultiSelectDialog
          title="Seleccionar Clientes"
          items={clientes}
          selectedItems={clientesSeleccionados}
          onToggle={(item) => toggleSelection(item, clientesSeleccionados, setClientesSeleccionados)}
          isOpen={dialogoClienteAbierto}
          onOpenChange={setDialogoClienteAbierto}
        />

        <MultiSelectDialog
          title="Seleccionar Productos"
          items={productos}
          selectedItems={productosSeleccionados}
          onToggle={(item) => toggleSelection(item, productosSeleccionados, setProductosSeleccionados)}
          isOpen={dialogoProductoAbierto}
          onOpenChange={setDialogoProductoAbierto}
        />

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={limpiarFiltros}>
              <Filter className="h-4 w-4 mr-2" />
              Limpiar filtros
            </Button>
            {/* Mostrar resumen de filtros aplicados */}
            <div className="text-sm text-muted-foreground">
              {getFiltrosAplicados().length > 0 && (
                <span>
                  {getFiltrosAplicados().length} filtro{getFiltrosAplicados().length !== 1 ? "s" : ""}
                </span>
              )}
            </div>
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