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
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"

import { Plus, Trash2, Edit, Package, Search } from "lucide-react"

import { getAll as getProducts, create, update, remove } from "../../api/productService"
import { getAll as getFamilies } from "../../api/familyService"

export default function Products() {
  const [productos, setProductos] = useState([])
  const [familias, setFamilias] = useState([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProducto, setEditingProducto] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [formData, setFormData] = useState({ description: "", price: "", familyId: "" })

  const itemsPerPage = 20

  useEffect(() => {
    fetchProducts()
    fetchFamilies()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await getProducts()
      setProductos(response.data)
    } catch (error) {
      console.error("Error al obtener productos:", error)
    }
  }

  const fetchFamilies = async () => {
    try {
      const response = await getFamilies()
      setFamilias(response.data)
    } catch (error) {
      console.error("Error al obtener familias:", error)
    }
  }

  const resetForm = () => {
    setFormData({ description: "", price: "", familyId: "" })
    setEditingProducto(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.description.trim() || !formData.price || !formData.familyId) return

    const productoData = {
      description: formData.description,
      price: parseFloat(formData.price),
      family: { id: formData.familyId }
    }

    try {
      if (editingProducto) {
        await update(editingProducto.code, productoData)
      } else {
        await create(productoData)
      }

      fetchProducts()
      resetForm()
      setIsDialogOpen(false)
    } catch (error) {
      console.error("Error al guardar producto:", error)
    }
  }

  const handleEdit = (producto) => {
    const familiaExiste = familias.some(f => f.id === producto.family?.id)
    setEditingProducto(producto)
    setFormData({
      description: producto.description,
      price: producto.price.toString(),
      familyId: familiaExiste ? producto.family.id : "",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (code) => {
    if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      try {
        await remove(code)
        fetchProducts()
      } catch (error) {
        console.error("Error al eliminar producto:", error)
      }
    }
  }

  const getFamiliaNombre = (familyId) => {
    return familias.find((f) => f.id === familyId)?.name || "Familia no encontrada"
  }

  const filteredProductos = productos.filter((producto) =>
    producto.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredProductos.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProductos = filteredProductos.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="space-y-6">
      {/* Encabezado y buscador */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex items-center gap-2">
          <Package className="w-6 h-6" />
          <span className="text-lg font-medium">Gestión de Productos</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-full sm:w-64"
            />
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="w-4 h-4 mr-2" />
                Agregar Producto
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{editingProducto ? "Editar Producto" : "Agregar Producto"}</DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="description">Descripción</Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="price">Precio</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label>Familia</Label>
                  <Select
                    value={formData.familyId}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, familyId: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar familia" />
                    </SelectTrigger>
                    <SelectContent>
                      {familias.map((familia) => (
                        <SelectItem key={familia.id} value={familia.id}>
                          {familia.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">
                    {editingProducto ? "Actualizar" : "Agregar"}
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

      {/* Lista de productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {paginatedProductos.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              {searchTerm ? "No se encontraron productos" : "No hay productos registrados"}
            </p>
          </div>
        ) : (
          paginatedProductos.map((producto) => (
            <Card key={producto.code} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg flex items-center gap-2 truncate pr-2" title={producto.description}>
                    <Package className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="truncate">{producto.description}</span>
                  </CardTitle>
                  <Badge variant="secondary" className="font-mono text-xs">
                    ${producto.price.toFixed(2)}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Familia:</p>
                  <p className="text-sm font-medium truncate">{getFamiliaNombre(producto.family?.id)}</p>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(producto)} className="flex-1">
                    <Edit className="w-3 h-3 mr-1" />
                    Editar
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(producto.code)}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <Button variant="outline" size="sm" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            Anterior
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i + 1}
                size="sm"
                variant={currentPage === i + 1 ? "default" : "outline"}
                onClick={() => setCurrentPage(i + 1)}
                className="w-8 h-8 p-0"
              >
                {i + 1}
              </Button>
            ))}
          </div>

          <Button variant="outline" size="sm" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
            Siguiente
          </Button>
        </div>
      )}
    </div>
  )
}
