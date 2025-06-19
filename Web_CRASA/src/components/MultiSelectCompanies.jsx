"use client"

import { use, useState } from "react"

// Components
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"

// Contexts
import { useData } from "../contexts/DataContext"

// Icons
import { ChevronDown } from "lucide-react"

export function MultiSelectCompanies({ selectedEmpresas, onSelectionChange }) {
    const { empresas } = useData()
    const [isOpen, setIsOpen] = useState(false)
    const filteredEmpresas = empresas

    const handleEmpresaToggle = (empresaId) => {
        const newSelection = selectedEmpresas.includes(empresaId)
            ? selectedEmpresas.filter((id) => id !== empresaId)
            : [...selectedEmpresas, empresaId]
        
        onSelectionChange(newSelection)
    }

    const selectedEmpresasNames = empresas
        .filter((empresa) => selectedEmpresas.includes(empresa.id))
        .map((empresa) => empresa.nombre)
    
    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between text-left font-normal">
          <span className="truncate">
            {selectedEmpresas.length === 0
              ? "Seleccionar empresas..."
              : `${selectedEmpresas.length} empresa(s) seleccionada(s)`}
          </span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80 p-0">
        <ScrollArea className="h-60">
          <div className="p-2">
            {filteredEmpresas.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">No se encontraron empresas</p>
            ) : (
              filteredEmpresas.map((empresa) => (
                <div
                  key={empresa.id}
                  className="flex items-center space-x-2 p-2 hover:bg-accent rounded-sm cursor-pointer"
                  onClick={() => handleEmpresaToggle(empresa.id)}
                >
                  <Checkbox
                    checked={selectedEmpresas.includes(empresa.id)}
                    onChange={() => handleEmpresaToggle(empresa.id)}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{empresa.nombre}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        {selectedEmpresas.length > 0 && (
          <div className="p-3 border-t bg-muted/50">
            <p className="text-xs text-muted-foreground mb-2">Seleccionadas:</p>
            <div className="flex flex-wrap gap-1">
              {selectedEmpresasNames.slice(0, 3).map((nombre, index) => (
                <span key={index} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                  {nombre}
                </span>
              ))}
              {selectedEmpresasNames.length > 3 && (
                <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                  +{selectedEmpresasNames.length - 3} más
                </span>
              )}
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
    )

}