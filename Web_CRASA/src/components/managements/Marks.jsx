"use client"

import { useEffect, useState } from "react"

// Components
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Icons
import { Plus, Trash2, Edit, Tag } from "lucide-react"

// API
import { getAll as getAllMarks, create, update, remove } from "../../api/markService"
import { getAll as getAllCompanies } from "../../api/companyService"

export default function Marks() {
  const [marcas, setMarcas] = useState([])
  const [empresas, setEmpresas] = useState([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingMarca, setEditingMarca] = useState(null)
  const [formData, setFormData] = useState({ name: "", companyId: "" })

  const fetchMarcas = async () => {
    try {
      const response = await getAllMarks()
      setMarcas(response.data)
    } catch (error) {
      console.error("Error al cargar marcas:", error)
    }
  }

  const fetchEmpresas = async () => {
    try {
      const response = await getAllCompanies()
      setEmpresas(response.data)
    } catch (error) {
      console.error("Error al cargar empresas:", error)
    }
  }

  useEffect(() => {
    fetchMarcas()
    fetchEmpresas()
  }, [])

  const resetForm = () => {
    setFormData({ name: "", companyId: "" })
    setEditingMarca(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.companyId) return

    const dataToSend = {
      name: formData.name,
      company: { id: formData.companyId }
    }

    try {
      if (editingMarca) {
        await update(editingMarca.id, dataToSend)
      } else {
        await create(dataToSend)
      }
      fetchMarcas()
      resetForm()
      setIsDialogOpen(false)
    } catch (error) {
      console.error("Error al guardar marca:", error)
    }
  }

  const handleEdit = (marca) => {
    setEditingMarca(marca)
    setFormData({
      name: marca.name,
      companyId: marca.company?.id || ""
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta marca?")) {
      try {
        await remove(id)
        fetchMarcas()
      } catch (error) {
        console.error("Error al eliminar marca:", error)
      }
    }
  }

  const getEmpresaNombre = (companyId) => {
    return empresas.find((e) => e.id === companyId)?.name || "Empresa no encontrada"
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
                <Label htmlFor="name">Nombre de la Marca</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Ingrese el nombre de la marca"
                  required
                />
              </div>

              <div>
                <Label>Empresa</Label>
                <Select
                  value={formData.companyId}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, companyId: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar empresa" />
                  </SelectTrigger>
                  <SelectContent>
                    {empresas.map((empresa) => (
                      <SelectItem key={empresa.id} value={empresa.id}>
                        {empresa.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
        {marcas.map((marca) => {
          const empresaNombre = getEmpresaNombre(marca.company?.id)

          return (
            <Card key={marca.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Tag className="w-5 h-5 text-purple-600 flex-shrink-0" />
                  <span className="truncate" title={marca.name}>
                    {marca.name}
                  </span>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Empresa:</p>
                  <p className="text-sm font-medium truncate">
                    {empresaNombre}
                  </p>
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
          )
        })}
      </div>
    </div>
  )
}
