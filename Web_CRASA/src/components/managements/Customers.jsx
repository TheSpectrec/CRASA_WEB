"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog"
import { Plus, Trash2, Edit, UserCheck, Search } from "lucide-react"

import { getAll, create, update, remove } from "../../api/customerService"

export default function Customers() {
  const [clientes, setClientes] = useState([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCliente, setEditingCliente] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [formData, setFormData] = useState({ customerCode: "", name: "" })
  const [vendedores, setVendedores] = useState([])

  const itemsPerPage = 20

  useEffect(() => {
    fetchClientes(),
    fetchVendedores()
  }, [])

  const fetchVendedores = async () => {
  try {
    const res = await fetch("http://localhost:8080/api/users/vendedores")
    const data = await res.json()
    setVendedores(data)
  } catch (error) {
    console.error("Error al cargar vendedores:", error)
  }
}

  const fetchClientes = async () => {
    try {
      const response = await getAll()
      setClientes(response.data)
    } catch (error) {
      console.error("Error al cargar clientes:", error)
    }
  }

  const resetForm = () => {
    setFormData({ customerCode: "", name: "" })
    setEditingCliente(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.customerCode.trim() || !formData.name.trim()) return

    const codigoExiste = clientes.some(c =>
      c.customerCode === formData.customerCode && (!editingCliente || c.id !== editingCliente.id)
    )

    if (codigoExiste) {
      alert("El código ya existe. Por favor, utiliza otro.")
      return
    }

    const payload = {
  customerCode: formData.customerCode,
  name: formData.name,
  ...(formData.vendedor && formData.vendedor.id ? { vendedor: formData.vendedor } : {})
}


    try {
      if (editingCliente) {
        await update(editingCliente.id, payload)
      } else {
        await create(payload)
      }
      fetchClientes()
      resetForm()
      setIsDialogOpen(false)
    } catch (error) {
      console.error("Error al guardar cliente:", error)
    }
  }

  const handleEdit = (cliente) => {
    setEditingCliente(cliente)
    setFormData({ customerCode: cliente.customerCode, name: cliente.name })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id) => {
    if (confirm("¿Estás seguro de que quieres eliminar este cliente?")) {
      try {
        await remove(id)
        fetchClientes()
      } catch (error) {
        console.error("Error al eliminar cliente:", error)
      }
    }
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const filteredClientes = clientes.filter(c =>
    (c.name?.toLowerCase() ?? "").includes(searchTerm.toLowerCase()) ||
    (c.customerCode?.toLowerCase() ?? "").includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredClientes.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedClientes = filteredClientes.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex items-center gap-2">
          <UserCheck className="w-6 h-6" />
          <span className="text-lg font-medium">Gestión de Clientes</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar clientes..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-8 w-full sm:w-64"
            />
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="w-4 h-4 mr-2" />
                Agregar Cliente
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{editingCliente ? "Editar Cliente" : "Agregar Cliente"}</DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="codigo">Código</Label>
                  <Input
                    id="codigo"
                    value={formData.customerCode}
                    onChange={(e) => setFormData(prev => ({ ...prev, customerCode: e.target.value }))}
                    placeholder="Código único del cliente"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="nombre">Nombre del Cliente</Label>
                  <Input
                    id="nombre"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Nombre completo del cliente"
                    required
                  />
                </div>

                <div>
  <Label htmlFor="vendedor">Vendedor</Label>
  <select
    id="vendedor"
    className="w-full border border-gray-300 rounded px-3 py-2"
    value={formData.vendedor?.id || ""}
    onChange={(e) =>
      setFormData((prev) => ({
        ...prev,
        vendedor: e.target.value ? { id: e.target.value } : null,
      }))
    }
  >
    <option value="">-- Selecciona un vendedor --</option>
    {vendedores.map((v) => (
      <option key={v.id} value={v.id}>
        {v.name}
      </option>
    ))}
  </select>
</div>


                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">
                    {editingCliente ? "Actualizar" : "Agregar"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {paginatedClientes.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <UserCheck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              {searchTerm ? "No se encontraron clientes" : "No hay clientes registrados"}
            </p>
          </div>
        ) : (
          paginatedClientes.map((cliente) => (
            <Card key={cliente.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg flex items-center gap-2 truncate pr-2" title={cliente.name}>
                    <UserCheck className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="truncate">{cliente.name}</span>
                  </CardTitle>
                  <Badge variant="secondary" className="font-mono text-xs">{cliente.customerCode}</Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Código:</p>
                  <p className="text-sm font-medium font-mono">{cliente.customerCode}</p>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(cliente)} className="flex-1">
                    <Edit className="w-3 h-3 mr-1" />
                    Editar
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(cliente.id)}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <Button variant="outline" size="sm" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            Anterior
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className="w-8 h-8 p-0"
              >
                {page}
              </Button>
            ))}
          </div>
          <Button variant="outline" size="sm" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
            Siguiente
          </Button>
        </div>
      )}
    </div>
  )
}
