"use client"

import { useEffect, useState } from "react"

// Components
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"

import { MultiSelect } from "../MultiSelect"
import { TransferClients } from "../TransferClients"

import { Plus, Edit, Trash2, Users, ArrowRightLeft } from "lucide-react"

// API
import {
  getAll as getAllUsers,
  createUser,
  updateUser,
  deleteUser
} from "../../api/userService"
import { getAll as getAllCustomers } from "../../api/customerService"

export default function UsersComponent() {
  const [usuarios, setUsuarios] = useState([])
  const [clientes, setClientes] = useState([])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [transferUser, setTransferUser] = useState(null)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    clientesAsignados: [],
  })

  useEffect(() => {
    fetchUsers()
    fetchClientes()
  }, [])

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers()
      setUsuarios(res.data)
    } catch (err) {
      console.error("Error al cargar usuarios:", err)
    }
  }

  const fetchClientes = async () => {
    try {
      const res = await getAllCustomers()
      setClientes(res.data)
    } catch (err) {
      console.error("Error al cargar clientes:", err)
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "",
      clientesAsignados: [],
    })
    setEditingUser(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = {
      name: formData.name,
      email: formData.email,
      ...(formData.password && { password: formData.password }),
      role: formData.role,
      ...(formData.role === "Vendedor" && { clientesAsignados: formData.clientesAsignados }),
    }

    try {
      if (editingUser) {
        await updateUser(editingUser.id, payload)
      } else {
        await createUser(payload)
      }
      fetchUsers()
      setIsDialogOpen(false)
      resetForm()
    } catch (err) {
      console.error("Error al guardar usuario:", err)
    }
  }

  const handleEdit = (usuario) => {
    const clientesValidos = (usuario.clientesAsignados || []).filter((id) =>
      clientes.some((c) => c.id === id)
    )

    setEditingUser(usuario)
    setFormData({
      name: usuario.name,
      email: usuario.email,
      password: "",
      role: usuario.role,
      clientesAsignados: clientesValidos,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id) => {
    if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      try {
        await deleteUser(id)
        fetchUsers()
      } catch (err) {
        console.error("Error al eliminar usuario:", err)
      }
    }
  }

  const getRoleBadgeColor = (rol) => {
  switch (rol) {
    case "Administrador":
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
                <Label htmlFor="name">Nombre Completo</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  required
                  disabled={!!editingUser}
                />
              </div>

              {!editingUser && (
                <div>
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                    required
                  />
                </div>
              )}

              <div>
                <Label>Rol</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, role: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Administrador">Administrador</SelectItem>
                    <SelectItem value="Supervisor">Supervisor</SelectItem>
                    <SelectItem value="Vendedor">Vendedor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.role === "Vendedor" && (
                <div>
                  <Label>Clientes Asignados</Label>
                  <MultiSelect
                    selectedClientes={formData.clientesAsignados}
                    onSelectionChange={(clientes) =>
                      setFormData((prev) => ({ ...prev, clientesAsignados: clientes }))
                    }
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
                <CardTitle className="text-lg truncate pr-2" title={usuario.name}>
                  {usuario.name}
                </CardTitle>
                <Badge className={getRoleBadgeColor(usuario.role)}>{usuario.role}</Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Correo:</p>
                <p className="text-sm font-medium truncate">{usuario.email}</p>
              </div>

              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(usuario)} className="flex-1">
                  <Edit className="w-3 h-3 mr-1" />
                  Editar
                </Button>

                {usuario.role === "Vendedor" && usuario.clientesAsignados?.length > 0 && (
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
