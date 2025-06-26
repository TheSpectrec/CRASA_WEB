// Generador de datos de ejemplo
export const generarDatosCompletos = () => {
  const nombres = [
    "Juan García",
    "María López",
    "Carlos Pérez",
    "Ana Martínez",
    "Luis González",
    "Pedro Ramírez",
    "Sofia Torres",
    "Miguel Flores",
    "Lucía Rivera",
    "Fernando Gómez",
    "Carmen Díaz",
    "Roberto Silva",
    "Elena Morales",
    "Diego Castro",
    "Valentina Cruz",
    "Andrés Herrera",
    "Patricia Medina",
    "Raúl Vargas",
    "Mónica Ortiz",
    "Sergio Ramos",
    "Andrea Romero",
    "Héctor Álvarez",
    "Beatriz Mendoza",
    "Francisco Reyes",
    "Daniela Torres",
    "José Flores",
    "Paula Rivera",
    "Antonio Gómez",
    "Natalia Díaz",
    "Manuel Morales",
    "Carolina Cruz",
    "Roberto Herrera",
    "Elena Medina",
    "Diego Vargas",
    "Carmen Ortiz",
  ]

  const empresas = ["Empresa A", "Empresa B", "Empresa C", "Empresa D", "Empresa E"]
  const vendedores = ["Pedro Ramírez", "Sofia Torres", "Miguel Flores", "Lucía Rivera", "Fernando Gómez"]


  // Generar 85 familias diferentes
  const familias = []
  const categoriasFamilias = [
    "Electrónicos",
    "Hogar",
    "Oficina",
    "Deportes",
    "Salud",
    "Belleza",
    "Automotriz",
    "Construcción",
    "Jardinería",
    "Mascotas",
    "Bebés",
    "Juguetes",
    "Libros",
    "Música",
    "Películas",
    "Videojuegos",
    "Ropa",
    "Calzado",
    "Accesorios",
    "Joyería",
    "Relojes",
    "Perfumes",
    "Maquillaje",
    "Cuidado Personal",
    "Alimentación",
    "Bebidas",
    "Snacks",
    "Dulces",
    "Panadería",
    "Carnes",
    "Lácteos",
    "Frutas",
    "Verduras",
    "Cereales",
    "Condimentos",
    "Conservas",
    "Congelados",
    "Orgánicos",
    "Dietéticos",
    "Suplementos",
  ]

  for (let i = 0; i < 85; i++) {
    if (i < categoriasFamilias.length) {
      familias.push(categoriasFamilias[i])
    } else {
      familias.push(
        `${categoriasFamilias[i % categoriasFamilias.length]} ${Math.floor(i / categoriasFamilias.length) + 1}`,
      )
    }
  }

  // 9 marcas diferentes
  const marcas = ["Samsung", "LG", "Sony", "Panasonic", "Philips", "Apple", "Xiaomi", "Huawei", "TCL"]

  // Generar 85 productos diferentes
  const productos = []
  const tiposProductos = [
    'Televisor 32"',
    'Televisor 43"',
    'Televisor 55"',
    'Televisor 65"',
    "Refrigerador",
    "Lavadora",
    "Microondas",
    "Laptop",
    "Smartphone",
    "Tablet",
    "Monitor",
    "Teclado",
    "Mouse",
    "Impresora",
    "Router",
    "Cámara",
    "Audífonos",
    "Bocinas",
    "Smartwatch",
    "Consola",
  ]

  for (let i = 0; i < 85; i++) {
    const tipoBase = tiposProductos[i % tiposProductos.length]
    const marca = marcas[i % marcas.length]
    productos.push(`${marca} ${tipoBase} ${i + 1}`)
  }

  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]

  // Generar 150 clientes únicos
  const clientes = []
  for (let i = 0; i < 150; i++) {
    const nombreBase = nombres[i % nombres.length]
    clientes.push(`${nombreBase} ${i + 1}`)
  }

  const datos = []

  for (let i = 0; i < 150; i++) {
    const año = [2023, 2024, 2025][Math.floor(Math.random() * 3)]
    const mes = meses[Math.floor(Math.random() * 12)]
    const empresa = empresas[Math.floor(Math.random() * empresas.length)]
    const vendedor = vendedores[Math.floor(Math.random() * vendedores.length)]
    const familia = familias[Math.floor(Math.random() * familias.length)]
    const marca = marcas[Math.floor(Math.random() * marcas.length)]
    const producto = productos[Math.floor(Math.random() * productos.length)]
    const cliente = clientes[i] // Usar cliente único

    const cajas = Math.floor(Math.random() * 50) + 1
    const precioPorCaja = Math.floor(Math.random() * 2000) + 500
    const gasto = cajas * precioPorCaja

    // Generar devoluciones (0-20% de las cajas compradas)
    const cajasDevueltas = Math.floor(Math.random() * (cajas * 0.2))

    datos.push({
      id: i + 1,
      año,
      mes,
      empresa,
      vendedor,
      familia,
      marca,
      producto,
      cliente,
      cajas,
      gasto,
      cajasDevueltas,
      vecesVendido: Math.floor(Math.random() * 10) + 1,
    })
  }

  return datos.sort((a, b) => b.gasto - a.gasto)
}

// Opciones para los filtros
export const opcionesFiltros = {
  años: ["2023", "2024", "2025"],
  meses: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
  empresas: ["Empresa A", "Empresa B", "Empresa C", "Empresa D", "Empresa E"],
  vendedores: ["Pedro Ramírez", "Sofia Torres", "Miguel Flores", "Lucía Rivera", "Fernando Gómez"],
  familias: [
    "Electrónicos",
    "Hogar",
    "Oficina",
    "Deportes",
    "Salud",
    "Belleza",
    "Automotriz",
    "Construcción",
    "Jardinería",
    "Mascotas",
    "Bebés",
    "Juguetes",
    "Libros",
    "Música",
    "Películas",
    "Videojuegos",
    "Ropa",
    "Calzado",
    "Accesorios",
    "Joyería",
    "Relojes",
    "Perfumes",
    "Maquillaje",
    "Cuidado Personal",
    "Alimentación",
    "Bebidas",
    "Snacks",
    "Dulces",
    "Panadería",
    "Carnes",
    "Lácteos",
    "Frutas",
    "Verduras",
    "Cereales",
    "Condimentos",
    "Conservas",
    "Congelados",
    "Orgánicos",
    "Dietéticos",
    "Suplementos",
  ],
  clientes: ["Abarrotera Fuentes Abad Rivera", "Abarrotera Gomez y Arizmendi", "Cuevas Comercial", "David Vela Flores", "David Charco Mondragon", "Disconsa SA de CV"],

}
