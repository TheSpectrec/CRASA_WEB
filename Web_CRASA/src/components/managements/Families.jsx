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

// Icons
import { Plus, Trash2, Edit, Layers, Search } from "lucide-react"

// API
import { getAll as getFamilies, create, update, remove } from "../../api/familyService"
import { getAll as getMarks } from "../../api/markService"

export default function Families() {
  const [familias, setFamilias] = useState([])
  const [marcas, setMarcas] = useState([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingFamilia, setEditingFamilia] = useState(null)
  const [formData, setFormData] = useState({ name: "", markId: "" })
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 20

  useEffect(() => {
    fetchFamilias()
    fetchMarcas()
  }, [])

  const fetchFamilias = async () => {
    try {
      const response = await getFamilies()
      setFamilias(response.data)
    } catch (error) {
      console.error("Error al cargar familias:", error)
    }
  }

  const fetchMarcas = async () => {
    try {
      const response = await getMarks()
      setMarcas(response.data)
    } catch (error) {
      console.error("Error al cargar marcas:", error)
    }
  }

  const resetForm = () => {
    setFormData({ name: "", markId: "" })
    setEditingFamilia(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.markId) return

    const dataToSend = {
      name: formData.name,
      mark: { id: formData.markId }
    }

    try {
      if (editingFamilia) {
        await update(editingFamilia.id, dataToSend)
      } else {
        await create(dataToSend)
      }
      fetchFamilias()
      resetForm()
      setIsDialogOpen(false)
    } catch (error) {
      console.error("Error al guardar familia:", error)
    }
  }

  const handleEdit = (familia) => {
    setEditingFamilia(familia)
    setFormData({
      name: familia.name,
      markId: familia.mark?.id || ""
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta familia?")) {
      try {
        await remove(id)
        fetchFamilias()
      } catch (error) {
        console.error("Error al eliminar familia:", error)
      }
    }
  }

  const getMarcaNombre = (markId) => {
    const marca = marcas.find((m) => m.id === markId)
    return marca ? marca.name : null
  }

  const filteredFamilias = familias.filter((familia) =>
    familia.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredFamilias.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedFamilias = filteredFamilias.slice(startIndex, startIndex + itemsPerPage)

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
              className="pl-8 w-full sm:w-64"
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
                  <Label htmlFor="name">Nombre de la Familia</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Ingrese el nombre de la familia"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="mark">Marca</Label>
                  <Select
                    value={formData.markId}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, markId: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar marca" />
                    </SelectTrigger>
                    <SelectContent>
                      {marcas.map((marca) => (
                        <SelectItem key={marca.id} value={marca.id}>
                          {marca.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">
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
          paginatedFamilias.map((familia) => {
            const marcaNombre = getMarcaNombre(familia.mark?.id)

            return (
              <Card key={familia.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Layers className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span className="truncate" title={familia.name}>
                      {familia.name}
                    </span>
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Marca:</p>
                    {marcaNombre ? (
                      <p className="text-sm font-medium truncate" title={marcaNombre}>
                        {marcaNombre}
                      </p>
                    ) : (
                      <p className="text-xs text-gray-500 italic pt-2 pb-1">No hay marca asignada</p>
                    )}
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
            )
          })
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
