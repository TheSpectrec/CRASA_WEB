"use client"

import { useState } from "react"

// Components
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"

// Contexts
import { useData } from "../contexts/DataContext"

// Icons
import { ArrowRightLeft } from "lucide-react"

export function TransferClients ({ usuario, isOpen, onClose }) {
    const { usuarios, clientes, transferirClientes } = useData()
    const [selectedVendedor, setSelectedVendedor] = useState("")
    const [clientesATransferir, setClientesATransferir] = useState([])

    const vendedores = usuarios.filter((u) => u.rol === "Vendedor" && u.id !== usuario.id)
    const clientesDelUsuario = clientes.filter((c) => usuario.clientesAsignados?.includes(c.id))

    const handleClienteToggle = (clienteId) => {
        setClientesATransferir((prev) => 
            prev.includes(clienteId) ? prev.filter((id) => id !== clienteId) : [...prev, clienteId],
        )
    }

    const handleTransferir = () => {
        if (!selectedVendedor || clientesATransferir.length === 0) return

        transferirClientes(usuario.id, selectedVendedor, clientesATransferir)
        setSelectedVendedor("")
        setClientesATransferir([])
        onClose()
    }

    return (
            <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ArrowRightLeft className="w-5 h-5" />
            Transferir Clientes
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Transferir clientes de: <strong>{usuario.nombreCompleto}</strong>
            </p>
          </div>

          <div>
            <Label>Transferir a:</Label>
            <Select value={selectedVendedor} onValueChange={setSelectedVendedor}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar vendedor" />
              </SelectTrigger>
              <SelectContent>
                {vendedores.map((vendedor) => (
                  <SelectItem key={vendedor.id} value={vendedor.id}>
                    {vendedor.nombreCompleto}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Clientes a transferir:</Label>
            <div className="flex items-center space-x-2 p-2 border-b">
              <Checkbox
                checked={clientesATransferir.length === clientesDelUsuario.length && clientesDelUsuario.length > 0}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setClientesATransferir(clientesDelUsuario.map((c) => c.id))
                  } else {
                    setClientesATransferir([])
                  }
                }}
              />
              <Label className="text-sm font-medium">Seleccionar todos</Label>
            </div>
            <ScrollArea className="h-40 border rounded-md p-2 mt-2">
              {clientesDelUsuario.map((cliente) => (
                <div
                  key={cliente.id}
                  className="flex items-center space-x-2 p-2 hover:bg-accent rounded-sm cursor-pointer"
                  onClick={() => handleClienteToggle(cliente.id)}
                >
                  <Checkbox
                    checked={clientesATransferir.includes(cliente.id)}
                    onChange={() => handleClienteToggle(cliente.id)}
                  />
                  <div>
                    <p className="text-sm font-medium">{cliente.nombre}</p>
                    <p className="text-xs text-muted-foreground">Código: {cliente.codigo}</p>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              onClick={handleTransferir}
              disabled={!selectedVendedor || clientesATransferir.length === 0}
              className="flex-1"
            >
              Transferir ({clientesATransferir.length})
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
    )
}