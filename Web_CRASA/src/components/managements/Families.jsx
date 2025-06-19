"use client"

import { useState } from "react"

// Components
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

// Contexts
import { useData } from "../../contexts/DataContext"

// Icons
import { Plus, Trash2, Edit, Layers, Search } from "lucide-react"

export default function Families() {
    const { familias, marcas, addFamilia, updateFamilia, deleteFamilia } = useData()
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingFamilia, setEditingFamilia] = useState(null)
    const [formData, setFormData] = useState({ nombre: "", marcaId: "" })
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1)

    const itemsPerPage = 20
    const filteredFamilias = familias.filter((familia) => familia.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
    const totalPages = Math.ceil(filteredFamilias.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedFamilias = filteredFamilias.slice(startIndex, startIndex + itemsPerPage)

    const resetForm = () => {
        setFormData({ nombre: "", marcaId: "" })
        setEditingFamilia(null)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!formData.nombre.trim() || !formData.marcaId) return

        if (editingFamilia) {
            updateFamilia(editingFamilia.id, formData)
        } else {
            addFamilia(formData)
        }

        resetForm()
        setIsDialogOpen(false)
    }

    const handleEdit = (familia) => {
        setEditingFamilia(familia)
        setFormData({ nombre: familia.nombre, marcaId: familia.marcaId })
        setIsDialogOpen(true)
    }

    const handleDelete = (id) => {
        if (confirm("¿Estás seguro de que quieres eliminar esta familia?")) {
            deleteFamilia(id)
        }
    }

    const getMarcaNombre = (marcaId) => {
        return
    }

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value)
        setCurrentPage(1) 
    }

    return (
        <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex items-center gap-2">
          <Layers className="w-6 h-6" />
          <span className="text-lg font-medium">Gestión de Familias</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar familias..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-8 w-full sm:w-64 bg-white"
            />
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="w-4 h-4 mr-2" />
                Agregar Familia
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{editingFamilia ? "Editar Familia" : "Agregar Familia"}</DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="nombre">Nombre de la Familia</Label>
                  <Input
                    id="nombre"
                    value={formData.nombre}
                    onChange={(e) => setFormData((prev) => ({ ...prev, nombre: e.target.value }))}
                    placeholder="Ingrese el nombre de la familia"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="marca">Marca</Label>
                  <Select
                    value={formData.marcaId}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, marcaId: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar marca" />
                    </SelectTrigger>
                    <SelectContent>
                      {marcas.map((marca) => (
                        <SelectItem key={marca.id} value={marca.id}>
                          {marca.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button type="submit">
                    {editingFamilia ? "Actualizar" : "Agregar"}
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
        {paginatedFamilias.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <Layers className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              {searchTerm ? "No se encontraron familias" : "No hay familias registradas"}
            </p>
          </div>
        ) : (
          paginatedFamilias.map((familia) => (
            <Card key={familia.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Layers className="w-5 h-5 text-purple-600 flex-shrink-0" />
                  <span className="truncate" title={familia.nombre}>
                    {familia.nombre}
                  </span>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Marca:</p>
                  <p className="text-sm font-medium truncate" title={getMarcaNombre(familia.marcaId)}>
                    {getMarcaNombre(familia.marcaId)}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(familia)} className="flex-1">
                    <Edit className="w-3 h-3 mr-1" />
                    Editar
                  </Button>

                  <Button size="sm" variant="destructive" onClick={() => handleDelete(familia.id)}>
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
