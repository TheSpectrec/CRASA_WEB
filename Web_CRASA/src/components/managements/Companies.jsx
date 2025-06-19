"use client"

import { useState } from "react"

// Components
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Contexts
import { useData } from "../../contexts/DataContext"

// Icons
import { Plus, Edit, Trash2, Building2 } from "lucide-react"

export default function Companies() {
  const { empresas, addEmpresa, updateEmpresa, deleteEmpresa } = useData()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingEmpresa, setEditingEmpresa] = useState(null)
  const [formData, setFormData] = useState({ nombre: "" })

  const resetForm = () => {
    setFormData({ nombre: "" })
    setEditingEmpresa(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.nombre.trim()) return

    if (editingEmpresa) {
      updateEmpresa(editingEmpresa.id, formData)
    } else {
      addEmpresa(formData)
    }

    resetForm()
    setIsDialogOpen(false)
  }

  const handleEdit = (empresa) => {
    setEditingEmpresa(empresa)
    setFormData({ nombre: empresa.nombre })
    setIsDialogOpen(true)
  }

  const handleDelete = (id) => {
    if (confirm("¿Estás seguro de que deseas eliminar esta empresa?")) {
      deleteEmpresa(id)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Building2 className="w-6 h-6" />
          <span className="text-lg font-medium">Gestión de Empresas</span>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Agregar Empresa
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingEmpresa ? "Editar Empresa" : "Agregar Empresa"}</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="nombre">Nombre de la Empresa</Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ nombre: e.target.value })}
                  placeholder="Ingrese el nombre de la empresa"
                  required
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  {editingEmpresa ? "Actualizar" : "Agregar"}
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
        {empresas.map((empresa) => (
          <Card key={empresa.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="truncate" title={empresa.nombre}>
                  {empresa.nombre}
                </span>
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(empresa)} className="flex-1">
                  <Edit className="w-3 h-3 mr-1" />
                  Editar
                </Button>

                <Button size="sm" variant="destructive" onClick={() => handleDelete(empresa.id)}>
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