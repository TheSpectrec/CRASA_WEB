"use client"

import { useEffect, useState } from "react"

// Components
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Icons
import { Plus, Edit, Trash2, Building2 } from "lucide-react"

// API
import { getAll, create, update, remove } from "../../api/companyService"

export default function Companies() {
  const [empresas, setEmpresas] = useState([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingEmpresa, setEditingEmpresa] = useState(null)
  const [formData, setFormData] = useState({ name: "" })

  const fetchEmpresas = async () => {
    try {
      const response = await getAll()
      setEmpresas(response.data)
    } catch (error) {
      console.error("Error al cargar empresas:", error)
    }
  }

  useEffect(() => {
    fetchEmpresas()
  }, [])

  const resetForm = () => {
    setFormData({ name: "" }) // ✅ ahora se usa 'name'
    setEditingEmpresa(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.name.trim()) return // ✅ se valida 'name'
    try {
      if (editingEmpresa) {
        await update(editingEmpresa.id, formData)
      } else {
        await create(formData)
      }
      fetchEmpresas()
      resetForm()
      setIsDialogOpen(false)
    } catch (error) {
      console.error("Error al guardar empresa:", error)
    }
  }

  const handleEdit = (empresa) => {
    setEditingEmpresa(empresa)
    setFormData({ name: empresa.name }) // ✅ correcto
    setIsDialogOpen(true)
  }

  const handleDelete = async (id) => {
    if (confirm("¿Estás seguro de que deseas eliminar esta empresa?")) {
      try {
        await remove(id)
        fetchEmpresas()
      } catch (error) {
        console.error("Error al eliminar empresa:", error)
      }
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
                <Label htmlFor="name">Nombre de la Empresa</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ name: e.target.value })}
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
                <span className="truncate" title={empresa.name || "Sin nombre"}>
                  {empresa.name || "Sin nombre"}
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
