"use client"

import { useState } from "react"

// Components
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MultiSelect } from "../MultiSelect"
import { TransferClients } from "../TransferClients"

// Contexts
import { useData } from "../../contexts/DataContext"


// Icons
import { Plus, Edit, Trash2, Users, ArrowRightLeft } from "lucide-react"

export default function User() {
  const { usuarios, addUsuario, updateUsuario, deleteUsuario, clientes } = useData()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [transferUser, setTransferUser] = useState(null)

  const [formData, setFormData] = useState({
    nombreCompleto: "",
    correo: "",
    contraseña: "",
    rol: "",
    clientesAsignados: [],
  })

  const resetForm = () => {
    setFormData({
      nombreCompleto: "",
      correo: "",
      contraseña: "",
      rol: "",
      clientesAsignados: [],
    })
    setEditingUser(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.nombreCompleto || !formData.correo || !formData.rol) return

    const userData = {
      nombreCompleto: formData.nombreCompleto,
      correo: formData.correo,
      contraseña: formData.contraseña,
      rol: formData.rol,
      ...(formData.rol === "Vendedor" && { clientesAsignados: formData.clientesAsignados }),
    }

    if (editingUser) {
      updateUsuario(editingUser.id, userData)
    } else {
      addUsuario(userData)
    }

    resetForm()
    setIsDialogOpen(false)
  }

  const handleEdit = (usuario) => {
    setEditingUser(usuario)
    // Filtrar solo clientes que existen
    const clientesValidos = (usuario.clientesAsignados || []).filter((clienteId) =>
      clientes.some((cliente) => cliente.id === clienteId),
    )
    setFormData({
      nombreCompleto: usuario.nombreCompleto,
      correo: usuario.correo,
      contraseña: usuario.contraseña,
      rol: usuario.rol,
      clientesAsignados: clientesValidos,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id) => {
    if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      deleteUsuario(id)
    }
  }

  const getRoleBadgeColor = (rol) => {
    switch (rol) {
      case "Admin":
        return "bg-red-100 text-red-800"
      case "Supervisor":
        return "bg-blue-100 text-blue-800"
      case "Vendedor":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6" />
          <span className="text-lg font-medium">Gestión de Usuarios</span>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Agregar Usuario
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingUser ? "Editar Usuario" : "Agregar Usuario"}</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="nombreCompleto">Nombre Completo</Label>
                <Input
                  id="nombreCompleto"
                  value={formData.nombreCompleto}
                  onChange={(e) => setFormData((prev) => ({ ...prev, nombreCompleto: e.target.value }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="correo">Correo Electrónico</Label>
                <Input
                  id="correo"
                  type="email"
                  value={formData.correo}
                  onChange={(e) => setFormData((prev) => ({ ...prev, correo: e.target.value }))}
                  required
                  disabled={!!editingUser}
                />
              </div>

              {!editingUser && (
                <div>
                  <Label htmlFor="contraseña">Contraseña</Label>
                  <Input
                    id="contraseña"
                    type="password"
                    value={formData.contraseña}
                    onChange={(e) => setFormData((prev) => ({ ...prev, contraseña: e.target.value }))}
                    required
                  />
                </div>
              )}

              <div>
                <Label htmlFor="rol">Rol</Label>
                <Select
                  value={formData.rol}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, rol: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Supervisor">Supervisor</SelectItem>
                    <SelectItem value="Vendedor">Vendedor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.rol === "Vendedor" && (
                <div>
                  <Label>Clientes Asignados</Label>
                  <MultiSelect
                    selectedClientes={formData.clientesAsignados}
                    onSelectionChange={(clientes) => setFormData((prev) => ({ ...prev, clientesAsignados: clientes }))}
                  />
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  {editingUser ? "Actualizar" : "Agregar"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {usuarios.map((usuario) => (
          <Card key={usuario.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg truncate pr-2" title={usuario.nombreCompleto}>
                  {usuario.nombreCompleto}
                </CardTitle>
                <Badge className={getRoleBadgeColor(usuario.rol)}>{usuario.rol}</Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Correo:</p>
                <p className="text-sm font-medium truncate" title={usuario.correo}>
                  {usuario.correo}
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(usuario)} className="flex-1">
                  <Edit className="w-3 h-3 mr-1" />
                  Editar
                </Button>

                {usuario.rol === "Vendedor" && usuario.clientesAsignados && usuario.clientesAsignados.length > 0 && (
                  <Button size="sm" variant="outline" onClick={() => setTransferUser(usuario)}>
                    <ArrowRightLeft className="w-3 h-3" />
                  </Button>
                )}

                <Button size="sm" variant="destructive" onClick={() => handleDelete(usuario.id)}>
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {transferUser && (
        <TransferClients
          usuario={transferUser}
          isOpen={!!transferUser}
          onClose={() => setTransferUser(null)}
        />
      )}
    </div>
  )
}
