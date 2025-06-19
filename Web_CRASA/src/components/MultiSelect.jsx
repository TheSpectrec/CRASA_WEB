"use client"

import { useState } from "react"

// Components
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"

// Contexts
import { useData } from "../contexts/DataContext"

// Icons
import { Search, ChevronDown } from "lucide-react"

export function MultiSelect ({ selectedClientes, onSelectionChange }) {
    const { clientes } = useData()
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")

    const filteredClientes = clientes.filter(
        (cliente) =>
            cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cliente.codigo.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const handleClienteToggle = (clienteId) => {
        const newSelection = selectedClientes.includes(clienteId)
        ? selectedClientes.filter((id) => id !== clienteId)
        : [...selectedClientes, clienteId]

        onSelectionChange(newSelection)
    }

    const selectedClientesNames = clientes
    .filter((cliente) => selectedClientes.includes(cliente.id))
    .map((cliente) => cliente.nombre)

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between text-left font-normal">
          <span className="truncate">
            {selectedClientes.length === 0
              ? "Seleccionar clientes..."
              : `${selectedClientes.length} cliente(s) seleccionado(s)`}
          </span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80 p-0">
        <div className="p-3 border-b">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar clientes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        <ScrollArea className="h-60">
          <div className="p-2">
            {filteredClientes.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">No se encontraron clientes</p>
            ) : (
              filteredClientes.map((cliente) => (
                <div
                  key={cliente.id}
                  className="flex items-center space-x-2 p-2 hover:bg-accent rounded-sm cursor-pointer"
                  onClick={() => handleClienteToggle(cliente.id)}
                >
                  <Checkbox
                    checked={selectedClientes.includes(cliente.id)}
                    onChange={() => handleClienteToggle(cliente.id)}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{cliente.nombre}</p>
                    <p className="text-xs text-muted-foreground">Código: {cliente.codigo}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        {selectedClientes.length > 0 && (
          <div className="p-3 border-t bg-muted/50">
            <p className="text-xs text-muted-foreground mb-2">Seleccionados:</p>
            <div className="flex flex-wrap gap-1">
              {selectedClientesNames.slice(0, 3).map((nombre, index) => (
                <span key={index} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                  {nombre}
                </span>
              ))}
              {selectedClientesNames.length > 3 && (
                <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                  +{selectedClientesNames.length - 3} más
                </span>
              )}
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
    )
}