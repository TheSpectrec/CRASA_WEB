import { useState, useEffect } from "react"
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription
} from "@/components/ui/card"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog"
import {
  Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, Search, Check } from "lucide-react"

export default function FilterCard({ filtros, setFiltros, onLimpiarFiltros }) {
  const [openSeller, setOpenSeller] = useState(false)
  const [openFamily, setOpenFamily] = useState(false)
  const [openCustomer, setOpenCustomer] = useState(false)

  const [años, setAños] = useState([])
  const [meses, setMeses] = useState(["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"])
  const [empresas, setEmpresas] = useState([])

  const [vendedores, setVendedores] = useState([])
  const [familias, setFamilias] = useState([])
  const [clientes, setClientes] = useState([])

  useEffect(() => {
    fetch("http://localhost:8080/api/users/vendedores")
      .then(res => res.json())
      .then(data => setVendedores(data))

    fetch("http://localhost:8080/api/families")
      .then(res => res.json())
      .then(data => setFamilias(data))

    fetch("http://localhost:8080/api/customers")
      .then(res => res.json())
      .then(data => setClientes(data))

    fetch("http://localhost:8080/api/companies")
      .then(res => res.json())
      .then(data => setEmpresas(data.map(e => e.name)))

    // Simulación de años reales (puedes reemplazar por endpoint)
    setAños(["2023", "2024", "2025"])
  }, [])

  const toggleSeleccion = (campo, valor) => {
    const actuales = filtros[campo] || []
    const nuevoEstado = actuales.includes(valor)
      ? actuales.filter(v => v !== valor)
      : [...actuales, valor]
    setFiltros({ ...filtros, [campo]: nuevoEstado })
  }

  const renderFiltroMultiple = (label, campo, datos, abierto, setAbierto, display = "name", code = "code") => (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <Dialog open={abierto} onOpenChange={setAbierto}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            {filtros[campo]?.length > 0
              ? `${filtros[campo].length} seleccionado(s)`
              : `Seleccionar ${label.toLowerCase()}`}
            <Search className="h-4 w-4 opacity-50" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader><DialogTitle>Seleccionar {label}</DialogTitle></DialogHeader>
          <Command>
            <CommandInput placeholder={`Buscar ${label.toLowerCase()}...`} />
            <CommandList>
              <CommandEmpty>No se encontraron resultados.</CommandEmpty>
              <CommandGroup>
                {datos.map((item) => {
                  const valor = item[display] || item
                  const codigo = item[code] || ""
                  const isSelected = filtros[campo]?.includes(valor)
                  return (
                    <CommandItem
                      key={valor}
                      onSelect={() => toggleSeleccion(campo, valor)}
                      className={`flex items-start gap-2 px-2 py-2 rounded-md cursor-pointer ${isSelected ? 'bg-muted' : ''}`}
                    >
                      <div className={`w-5 h-5 rounded border flex items-center justify-center mt-1 ${isSelected ? 'bg-primary text-white' : 'border-primary text-transparent'}`}>
                        <Check className="w-3 h-3" />
                      </div>
                      <div className="flex flex-col">
                        <span className={`text-sm font-medium ${isSelected ? 'text-primary' : ''}`}>{valor}</span>
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

  const handleChange = (campo, valor) => setFiltros({ ...filtros, [campo]: valor })

  return (
    <Card className="mb-6 ml-2 mr-2">
      <CardHeader>
        <CardTitle>Gráficas de Ventas</CardTitle>
        <CardDescription>Seleccione los filtros para visualizar los datos</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">Año</label>
            <Select value={filtros.año} onValueChange={(v) => handleChange("año", v)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar año" />
              </SelectTrigger>
              <SelectContent>
                {años.map((año) => (
                  <SelectItem key={año} value={año}>{año}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mes</label>
            <Select value={filtros.mes} onValueChange={(v) => handleChange("mes", v)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar mes" />
              </SelectTrigger>
              <SelectContent>
                {meses.map((mes) => (
                  <SelectItem key={mes} value={mes}>{mes}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Empresa</label>
            <Select value={filtros.empresa} onValueChange={(v) => handleChange("empresa", v)}>
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

          {renderFiltroMultiple("Vendedor", "vendedor", vendedores, openSeller, setOpenSeller)}
          {renderFiltroMultiple("Familia", "familia", familias, openFamily, setOpenFamily)}
          {renderFiltroMultiple("Cliente", "cliente", clientes, openCustomer, setOpenCustomer)}
        </div>

        <div className="mt-4">
          <Button onClick={onLimpiarFiltros} variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Limpiar filtros
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
