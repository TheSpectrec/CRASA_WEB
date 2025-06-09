// Generador de datos de ejemplo
export const generarDatosCompletos = () => {
    const empresas = ["Comercializadora Eloro", "Con Alimentos", "Conservas La Costeña", "CRASA"]
    const vendedores = ["Alfredo", "Carlos", "Javier", "Marco"]
    const familias = ["Agua Natural", "AMI 1.8", "AMI 591", "Arizona", "Naranjada", "Pau Pau", "Vigor", "Sport 600", "Dulces"]
    const marcas = ["Con Alimentos", "Costeña", "Estevia", "Jumex", "Metco", "Most Unico"]
    const productos = ['Aceitunas sin hueso en bolsa CJ 12/185g', "Agua Natural Mia 15/1000ml Pet", "Ami Frut Pet 12/600ml B Naranja"]
    const clientes = ["Abarrotera Fuentes Abad Rivera", "Abarrotera Gomez y Arizmendi", "Cuevas Comercial", "David Vela Flores", "David Charco Mondragon", "Disconsa SA de CV"]
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
  
    const datos = []
  
    for (let i = 0; i < 150; i++) {
      const año = [2023, 2024, 2025][Math.floor(Math.random() * 3)]
      const mes = meses[Math.floor(Math.random() * 12)]
      const empresa = empresas[Math.floor(Math.random() * empresas.length)]
      const vendedor = vendedores[Math.floor(Math.random() * vendedores.length)]
      const familia = familias[Math.floor(Math.random() * familias.length)]
      const marca = marcas[Math.floor(Math.random() * marcas.length)]
      const producto = productos[Math.floor(Math.random() * productos.length)]
      const cliente = clientes[Math.floor(Math.random() * clientes.length)]
  
      const cajas = Math.floor(Math.random() * 50) + 1
      const precioPorCaja = Math.floor(Math.random() * 2000) + 500
      const gasto = cajas * precioPorCaja
  
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
    empresas: ["Comercializadora Eloro", "Con Alimentos", "Conservas La Costeña", "CRASA"],
    vendedores: ["Alfredo", "Carlos", "Quintiliano", "Javier", "Marco"],
    familias: ["Agua Natural", "AMI 1.8", "AMI 591", "Arizona", "Naranjada", "Pau Pau", "Vigor", "Sport 600", "Dulces"],
    productos: ['Aceitunas sin hueso en bolsa CJ 12/185g', "Agua Natural Mia 15/1000ml Pet", "Ami Frut Pet 12/600ml B Naranja"],
    clientes: ["Abarrotera Fuentes Abad Rivera", "Abarrotera Gomez y Arizmendi", "Cuevas Comercial", "David Vela Flores", "David Charco Mondragon", "Disconsa SA de CV"],
    marcas: ["Con Alimentos", "Costeña", "Estevia", "Jumex", "Metco", "Most Unico"]
  }
  