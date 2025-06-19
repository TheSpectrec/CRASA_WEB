"use client"

import { useState } from "react"

// Components
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MultiSelectCompanies } from "../MultiSelectCompanies"

// Contexts
import { useData } from "../../contexts/DataContext"

// Icons
import { Plus, Trash2, Edit, Tag } from "lucide-react"

export default function Brands() {
  const { marcas, empresas, addMarca, updateMarca, deleteMarca } = useData()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingMarca, setEditingMarca] = useState(null)
  const [formData, setFormData] = useState({ nombre: "", empresaIds: "" })

  const resetForm = () => {
    setFormData({ nombre: "", empresaIds: "" })
    setEditingMarca(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.nombre.trim() || !formData.empresaIds.length === 0) return

    if (editingMarca) {
      updateMarca(editingMarca.id, formData)
    } else {
      addMarca(formData)
    }

    resetForm()
    setIsDialogOpen(false)
  }

  const handleEdit = (marca) => {
    setEditingMarca(marca)
    setFormData({ nombre: marca.nombre, empresaIds: marca.empresaIds || [] })
    setIsDialogOpen(true)
  }

  const handleDelete = (id) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta marca?")) {
      deleteMarca(id)
    }
  }

  const getEmpresasNombres = (empresaIds) => {
    if (!empresaIds || empresaIds.length === 0) return "Sin empresas asignadas"
    return empresaIds.map((id) => empresas.find((e) => e.id === id)?.nombre || "Empresa no encontrada")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Tag className="w-6 h-6" />
          <span className="text-lg font-medium">Gestión de Marcas</span>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Agregar Marca
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingMarca ? "Editar Marca" : "Agregar Marca"}</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="nombre">Nombre de la Marca</Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => setFormData((prev) => ({ ...prev, nombre: e.target.value }))}
                  placeholder="Ingrese el nombre de la marca"
                  required
                />
              </div>

              <div>
                <Label>Empresas</Label>
                <MultiSelectCompanies
                  selectedEmpresas={formData.empresaIds}
                  onSelectionChange={(empresas) => setFormData((prev) => ({ ...prev, empresaIds: empresas }))}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  {editingMarca ? "Actualizar" : "Agregar"}
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
        {marcas.map((marca) => (
          <Card key={marca.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Tag className="w-5 h-5 text-purple-600 flex-shrink-0" />
                <span className="truncate" title={marca.nombre}>
                  {marca.nombre}
                </span>
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Empresas:</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {getEmpresasNombres(marca.empresaIds).map((nombre, index) => (
                    <span key={index} className="text-xs bg-[#F7E4D7] text-[#E77A34] px-2 py-1 rounded">
                      {nombre}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(marca)} className="flex-1">
                  <Edit className="w-3 h-3 mr-1" />
                  Editar
                </Button>

                <Button size="sm" variant="destructive" onClick={() => handleDelete(marca.id)}>
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}