"use client"

import { createContext, useContext, useState } from "react"

const DataContext = createContext(undefined)

// Datos iniciales de ejemplo
const initialData = {
  usuarios: [
    {
      id: "1",
      nombreCompleto: "Juan Pérez",
      correo: "juan@empresa.com",
      contraseña: "123456",
      rol: "Admin",
    },
    {
      id: "2",
      nombreCompleto: "María García",
      correo: "maria@empresa.com",
      contraseña: "123456",
      rol: "Vendedor",
      clientesAsignados: ["1", "2"],
    },
  ],
  empresas: [
    { id: "1", nombre: "Empresa ABC" },
    { id: "2", nombre: "Corporación XYZ" },
  ],
  marcas: [
    { id: "1", nombre: "Marca Premium", empresaIds: ["1"] },
    { id: "2", nombre: "Marca Económica", empresaIds: ["2"] },
  ],
  familias: [
    { id: "1", nombre: "Electrónicos", marcaId: "1" },
    { id: "2", nombre: "Hogar", marcaId: "2" },
  ],
  productos: [
    { id: "1", codigo: "001", descripcion: "Smartphone Premium", precio: 999.99, familiaId: "1" },
    { id: "2", codigo: "002", descripcion: "Aspiradora Hogar", precio: 299.99, familiaId: "2" },
  ],
  clientes: [
    { id: "1", codigo: "001", nombre: "Cliente Mayorista A" },
    { id: "2", codigo: "002", nombre: "Cliente Minorista B" },
    { id: "3", codigo: "003", nombre: "Cliente Corporativo C" },
  ],
}

export function DataProvider({ children }) {
  const [usuarios, setUsuarios] = useState(initialData.usuarios)
  const [empresas, setEmpresas] = useState(initialData.empresas)
  const [marcas, setMarcas] = useState(initialData.marcas)
  const [familias, setFamilias] = useState(initialData.familias)
  const [productos, setProductos] = useState(initialData.productos)
  const [clientes, setClientes] = useState(initialData.clientes)

  // Funciones para usuarios
  const addUsuario = (usuario) => {
    const newUsuario = { ...usuario, id: Date.now().toString() }
    setUsuarios((prev) => [...prev, newUsuario])
  }

  const updateUsuario = (id, usuario) => {
    setUsuarios((prev) => prev.map((u) => (u.id === id ? { ...u, ...usuario } : u)))
  }

  const deleteUsuario = (id) => {
    setUsuarios((prev) => prev.filter((u) => u.id !== id))
  }

  const transferirClientes = (fromUserId, toUserId, clienteIds) => {
    setUsuarios((prev) =>
      prev.map((u) => {
        if (u.id === fromUserId) {
          return {
            ...u,
            clientesAsignados: u.clientesAsignados?.filter((c) => !clienteIds.includes(c)) || [],
          }
        }
        if (u.id === toUserId) {
          const clientesActuales = u.clientesAsignados || []
          const nuevosClientes = clienteIds.filter((clienteId) => !clientesActuales.includes(clienteId))
          return {
            ...u,
            clientesAsignados: [...clientesActuales, ...nuevosClientes],
          }
        }
        return u
      }),
    )
  }

  // Funciones para empresas
  const addEmpresa = (empresa) => {
    const newEmpresa = { ...empresa, id: Date.now().toString() }
    setEmpresas((prev) => [...prev, newEmpresa])
  }

  const updateEmpresa = (id, empresa) => {
    setEmpresas((prev) => prev.map((e) => (e.id === id ? { ...e, ...empresa } : e)))
  }

  const deleteEmpresa = (id) => {
    setEmpresas((prev) => prev.filter((e) => e.id !== id))
  }

  // Funciones para marcas
  const addMarca = (marca) => {
    const newMarca = { ...marca, id: Date.now().toString() }
    setMarcas((prev) => [...prev, newMarca])
  }

  const updateMarca = (id, marca) => {
    setMarcas((prev) => prev.map((m) => (m.id === id ? { ...m, ...marca } : m)))
  }

  const deleteMarca = (id) => {
    setMarcas((prev) => prev.filter((m) => m.id !== id))
  }

  // Funciones para familias
  const addFamilia = (familia) => {
    const newFamilia = { ...familia, id: Date.now().toString() }
    setFamilias((prev) => [...prev, newFamilia])
  }

  const updateFamilia = (id, familia) => {
    setFamilias((prev) => prev.map((f) => (f.id === id ? { ...f, ...familia } : f)))
  }

  const deleteFamilia = (id) => {
    setFamilias((prev) => prev.filter((f) => f.id !== id))
  }

  // Funciones para productos
  const addProducto = (producto) => {
    const newProducto = { ...producto, id: Date.now().toString() }
    setProductos((prev) => [...prev, newProducto])
  }

  const updateProducto = (id, producto) => {
    setProductos((prev) => prev.map((p) => (p.id === id ? { ...p, ...producto } : p)))
  }

  const deleteProducto = (id) => {
    setProductos((prev) => prev.filter((p) => p.id !== id))
  }

  // Funciones para clientes
  const addCliente = (cliente) => {
    const newCliente = { ...cliente, id: Date.now().toString() }
    setClientes((prev) => [...prev, newCliente])
  }

  const updateCliente = (id, cliente) => {
    setClientes((prev) => prev.map((c) => (c.id === id ? { ...c, ...cliente } : c)))
  }

  const deleteCliente = (id) => {
    // Solo remover cliente de vendedores que lo tengan asignado
    setUsuarios((prev) =>
      prev.map((usuario) => ({
        ...usuario,
        clientesAsignados: usuario.clientesAsignados?.filter((clienteId) => clienteId !== id) || [],
      })),
    )

    // Eliminar el cliente
    setClientes((prev) => prev.filter((c) => c.id !== id))
  }

  const value = {
    usuarios,
    empresas,
    marcas,
    familias,
    productos,
    clientes,
    addUsuario,
    updateUsuario,
    deleteUsuario,
    transferirClientes,
    addEmpresa,
    updateEmpresa,
    deleteEmpresa,
    addMarca,
    updateMarca,
    deleteMarca,
    addFamilia,
    updateFamilia,
    deleteFamilia,
    addProducto,
    updateProducto,
    deleteProducto,
    addCliente,
    updateCliente,
    deleteCliente,
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider")
  }
  return context
}
