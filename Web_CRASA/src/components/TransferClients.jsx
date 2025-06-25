"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowRightLeft } from "lucide-react"
import { getAll as getAllUsers } from "../api/userService"
import { getAll as getAllCustomers, update as updateCustomer } from "../api/customerService"

export function TransferClients({ usuario, isOpen, onClose }) {
  const [vendedores, setVendedores] = useState([])
  const [clientes, setClientes] = useState([])
  const [clientesATransferir, setClientesATransferir] = useState([])
  const [selectedVendedor, setSelectedVendedor] = useState("")

  useEffect(() => {
    if (isOpen) {
      fetchVendedores()
      fetchClientes()
      setClientesATransferir([])
      setSelectedVendedor("")
    }
  }, [isOpen])

  const fetchVendedores = async () => {
    try {
      const res = await getAllUsers()
      const filtrados = res.data.filter((u) => u.role === "Vendedor" && u.id !== usuario.id)
      setVendedores(filtrados)
    } catch (err) {
      console.error("Error al cargar vendedores:", err)
    }
  }

  const fetchClientes = async () => {
    try {
      const res = await getAllCustomers()
      const asignados = res.data.filter((c) => c.vendedor?.id === usuario.id)
      // Ordenamos alfabéticamente por nombre
      const ordenados = [...asignados].sort((a, b) => (a.name || "").localeCompare(b.name || ""))
      setClientes(ordenados)
    } catch (err) {
      console.error("Error al cargar clientes:", err)
    }
  }

  const toggleCliente = (id) => {
    setClientesATransferir((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    )
  }

const handleTransferir = async () => {
  try {
    const clientesSeleccionados = clientes.filter((c) => clientesATransferir.includes(c.id))

    await Promise.all(
      clientesSeleccionados.map((cliente) =>
        updateCustomer(cliente.id, {
          customerCode: cliente.customerCode,
          name: cliente.name,
          vendedor: { id: selectedVendedor }
        })
      )
    )

    fetchClientes() // Recargar la lista
    onClose()
  } catch (err) {
    console.error("Error al transferir clientes:", err)
  }
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
              Transferir clientes de: <strong>{usuario.name}</strong>
            </p>
          </div>

          <div>
            <Label>Transferir a:</Label>
            <Select value={selectedVendedor} onValueChange={setSelectedVendedor}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar vendedor" />
              </SelectTrigger>
              <SelectContent>
                {vendedores.map((v) => (
                  <SelectItem key={v.id} value={v.id}>
                    {v.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Clientes a transferir:</Label>
            <div className="flex items-center space-x-2 p-2 border-b">
              <Checkbox
                checked={clientesATransferir.length === clientes.length && clientes.length > 0}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setClientesATransferir(clientes.map((c) => c.id))
                  } else {
                    setClientesATransferir([])
                  }
                }}
              />
              <Label className="text-sm font-medium">Seleccionar todos</Label>
            </div>
            <ScrollArea className="h-40 border rounded-md p-2 mt-2">
              {clientes.length > 0 ? (
                clientes.map((cliente) => (
                  <div
                    key={cliente.id}
                    className="flex items-center space-x-2 p-2 hover:bg-accent rounded-sm cursor-pointer"
                    onClick={() => toggleCliente(cliente.id)}
                  >
                    <Checkbox
                      checked={clientesATransferir.includes(cliente.id)}
                      onChange={() => toggleCliente(cliente.id)}
                    />
                    <div>
                      <p className="text-sm font-medium">{cliente.name || "Sin nombre"}</p>
                      <p className="text-xs text-muted-foreground">Código: {cliente.customerCode || "Sin código"}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Este vendedor no tiene clientes asignados
                </p>
              )}
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
