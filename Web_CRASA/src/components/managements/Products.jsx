"use client"

import { useState } from "react"

// Components
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

// Contexts
import { useData } from "../../contexts/DataContext"

// Icons
import { Plus, Trash2, Edit, Package, Search } from "lucide-react"

export default function Products() {
    const { productos, familias, addProducto, updateProducto, deleteProducto } = useData()
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingProducto, setEditingProducto] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [formData, setFormData] = useState({ codigo: "", descripcion: "", precio: "", familiaId: "" })

    const itemsPerPage = 20
    const filteredProductos = productos.filter((producto) => 
        producto.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        producto.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const totalPages = Math.ceil(filteredProductos.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedProductos = filteredProductos.slice(startIndex, startIndex + itemsPerPage)

    const resetForm = () => {
        setFormData({ codigo: "", descripcion: "", precio: "", familiaId: "" })
        setEditingProducto(null)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!formData.codigo.trim() || !formData.descripcion.trim() || !formData.precio || !formData.familiaId) return

        const codigoExiste = productos.some((p) => p.codigo === formData.codigo && (!editingProducto || p.id !== editingProducto.id))

        if (codigoExiste) {
            alert("El código del producto ya existe. Ingrese un código diferente.")
            return
        }

        const productoData = {
            codigo: formData.codigo,
            descripcion: formData.descripcion,
            precio: Number.parseFloat(formData.precio),
            familiaId: formData.familiaId
        }

        if (editingProducto) {
            updateProducto(editingProducto.id, productoData)
        } else {
            addProducto(productoData)
        }

        resetForm()
        setIsDialogOpen(false)
    }

    const handleEdit = (producto) => {
        setEditingProducto(producto)
        setFormData({ 
            codigo: producto.codigo, 
            descripcion: producto.descripcion, 
            precio: producto.precio.toString(), 
            familiaId: producto.familiaId 
        })
        setIsDialogOpen(true)
    }

    const handleDelete = (id) => {
        if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
            deleteProducto(id)
        }
    }

    const getFamiliaNombre = (familiaId) => {
        return familias.find((f) => f.id === familiaId)?.nombre || "Familia no encontrada"
    }

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value)
        setCurrentPage(1) 
    }

    return (
        <div className="space-y-6">
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
              onChange={handleSearchChange}
              className="pl-8 w-full sm:w-64 bg-white"
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
                  <Label htmlFor="codigo">Código</Label>
                  <Input
                    id="codigo"
                    value={formData.codigo}
                    onChange={(e) => setFormData((prev) => ({ ...prev, codigo: e.target.value }))}
                    placeholder="Código único del producto"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="descripcion">Descripción</Label>
                  <Input
                    id="descripcion"
                    value={formData.descripcion}
                    onChange={(e) => setFormData((prev) => ({ ...prev, descripcion: e.target.value }))}
                    placeholder="Descripción del producto"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="precio">Precio</Label>
                  <Input
                    id="precio"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.precio}
                    onChange={(e) => setFormData((prev) => ({ ...prev, precio: e.target.value }))}
                    placeholder="0.00"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="familia">Familia</Label>
                  <Select
                    value={formData.familiaId}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, familiaId: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar familia" />
                    </SelectTrigger>
                    <SelectContent>
                      {familias.map((familia) => (
                        <SelectItem key={familia.id} value={familia.id}>
                          {familia.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button type="submit">
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
            <Card key={producto.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg truncate flex items-center gap-2">
                    <Package className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="truncate" title={producto.descripcion}>
                      {producto.descripcion}
                    </span>
                  </CardTitle>
                  <Badge variant="secondary" className="font-mono text-xs">
                    {producto.codigo}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">Precio:</p>
                    <p className="text-lg font-bold text-green-600">${producto.precio.toFixed(2)}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Familia:</p>
                  <p className="text-sm font-medium truncate" title={getFamiliaNombre(producto.familiaId)}>
                    {getFamiliaNombre(producto.familiaId)}
                  </p>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(producto)} className="flex-1">
                    <Edit className="w-3 h-3 mr-1" />
                    Editar
                  </Button>

                  <Button size="sm" variant="destructive" onClick={() => handleDelete(producto.id)}>
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