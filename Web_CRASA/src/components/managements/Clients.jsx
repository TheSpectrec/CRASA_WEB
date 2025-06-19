"use client"

import { useState } from "react"

// Components
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

// Contexts
import { useData } from "../../contexts/DataContext"

// Icons
import { Plus, Trash2, Edit, UserCheck, Search } from "lucide-react"

export default function Clients() {
    const { clientes, addCliente, updateCliente, deleteCliente } = useData()
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingCliente, setEditingCliente] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [formData, setFormData] = useState({ codigo: "", nombre: "" })

    const itemsPerPage = 20
    const filteredClientes = clientes.filter((cliente) =>
        cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cliente.codigo.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const totalPages = Math.ceil(filteredClientes.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedClientes = filteredClientes.slice(startIndex, startIndex + itemsPerPage)

    const resetForm = () => {
        setFormData({ codigo: "", nombre: "" })
        setEditingCliente(null)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!formData.codigo.trim() || !formData.nombre.trim()) return

        const codigoExiste = clientes.some((c) => c.codigo === formData.codigo && (!editingCliente || c.id !== editingCliente.id))

        if (codigoExiste) {
            alert("El código ya existe. Por favor, utiliza otro.")
            return
        }

        if (editingCliente) {
            updateCliente(editingCliente.id, formData)
        } else {
            addCliente(formData)
        }

        resetForm()
        setIsDialogOpen(false)
    }

    const handleEdit = (cliente) => {
        setEditingCliente(cliente)
        setFormData({ codigo: cliente.codigo, nombre: cliente.nombre })
        setIsDialogOpen(true)
    }

    const handleDelete = (id) => {
        if (confirm("¿Estás seguro de que quieres eliminar este cliente?")) {
            deleteCliente(id)
        }
    }

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value)
        setCurrentPage(1) 
    }

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
              className="pl-8 w-full sm:w-64 bg-white"
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
                    value={formData.codigo}
                    onChange={(e) => setFormData((prev) => ({ ...prev, codigo: e.target.value }))}
                    placeholder="Código único del cliente"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="nombre">Nombre del Cliente</Label>
                  <Input
                    id="nombre"
                    value={formData.nombre}
                    onChange={(e) => setFormData((prev) => ({ ...prev, nombre: e.target.value }))}
                    placeholder="Nombre completo del cliente"
                    required
                  />
                </div>

                <div className="flex justify-end  gap-2 pt-4">
                  <Button type="submit">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
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
                  <CardTitle className="text-lg truncate flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="truncate" title={cliente.nombre}>
                      {cliente.nombre}
                    </span>
                  </CardTitle>
                  <Badge variant="secondary" className="font-mono text-xs">
                    {cliente.codigo}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Código:</p>
                  <p className="text-sm font-medium font-mono">{cliente.codigo}</p>
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
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
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

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </Button>
        </div>
      )}
    </div>
    )
}