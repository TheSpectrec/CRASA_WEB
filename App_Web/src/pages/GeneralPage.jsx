import React, { useState, useEffect, useRef } from "react";
import { Search, Filter, Download } from "lucide-react";

// Components
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/Card";
import { Button } from "../components/Button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/Select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/Dialog";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "../components/Command";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/Table";

export default function GeneralPage() {
  // Referencia para el contenedor principal
  const containerRef = useRef(null);

  // Estados para los filtros
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedSeller, setSelectedSeller] = useState("");
  const [selectedFamily, setSelectedFamily] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");

  // Estados para los diálogos
  const [openSellerDialogue, setOpenSellerDialogue] = useState(false);
  const [openFamilyDialogue, setOpenFamilyDialogue] = useState(false);
  const [openBrandDialogue, setOpenBrandDialogue] = useState(false);
  const [openProductDialogue, setOpenProductDialogue] = useState(false);
  const [openCustomerDialogue, setOpenCustomerDialogue] = useState(false);

  // Datos para las tablas
  const [dataBoxes, setDataBoxes] = useState([]);
  const [dataPesos, setDataPesos] = useState([]);

  // Datos estáticos para las tablas
  const staticDataBoxes = [
    {
      año: "2023",
      enero: "1,250",
      febrero: "1,180",
      marzo: "1,320",
      abril: "1,450",
      mayo: "1,380",
      junio: "1,520",
      julio: "1,680",
      agosto: "1,590",
      septiembre: "1,420",
      octubre: "1,350",
      noviembre: "1,280",
      diciembre: "1,400",
      acumActual: "16,820",
      acumAnterior: "15,540",
      ytd: "16,820",
    },
    {
      año: "2024",
      enero: "1,320",
      febrero: "1,250",
      marzo: "1,420",
      abril: "1,580",
      mayo: "1,480",
      junio: "1,650",
      julio: "1,780",
      agosto: "1,690",
      septiembre: "1,520",
      octubre: "1,450",
      noviembre: "1,380",
      diciembre: "1,500",
      acumActual: "18,020",
      acumAnterior: "16,820",
      ytd: "18,020",
    },
    {
      año: "2025",
      enero: "1,420",
      febrero: "1,350",
      marzo: "1,520",
      abril: "1,680",
      mayo: "1,580",
      junio: "1,750",
      julio: "1,880",
      agosto: "1,790",
      septiembre: "1,620",
      octubre: "1,550",
      noviembre: "1,480",
      diciembre: "1,600",
      acumActual: "19,220",
      acumAnterior: "18,020",
      ytd: "19,220",
    },
    {
      año: "2024 vs 2025",
      isComparison: true,
      diferencia: {
        enero: "7.6%",
        febrero: "8.0%",
        marzo: "7.0%",
        abril: "6.3%",
        mayo: "6.8%",
        junio: "6.1%",
        julio: "5.6%",
        agosto: "5.9%",
        septiembre: "6.6%",
        octubre: "6.9%",
        noviembre: "7.2%",
        diciembre: "6.7%",
        acumActual: "6.7%",
        acumAnterior: "7.1%",
        ytd: "6.7%",
      },
      unidades: {
        enero: "125",
        febrero: "118",
        marzo: "132",
        abril: "145",
        mayo: "138",
        junio: "152",
        julio: "168",
        agosto: "159",
        septiembre: "142",
        octubre: "135",
        noviembre: "128",
        diciembre: "140",
        acumActual: "1,682",
        acumAnterior: "1,554",
        ytd: "1,682",
      },
    },
  ]

  const staticDataPesos = [
    {
      año: "2023",
      enero: "$125,000",
      febrero: "$118,000",
      marzo: "$132,000",
      abril: "$145,000",
      mayo: "$138,000",
      junio: "$152,000",
      julio: "$168,000",
      agosto: "$159,000",
      septiembre: "$142,000",
      octubre: "$135,000",
      noviembre: "$128,000",
      diciembre: "$140,000",
      acumActual: "$1,682,000",
      acumAnterior: "$1,554,000",
      ytd: "$1,682,000",
    },
    {
      año: "2024",
      enero: "$132,000",
      febrero: "$125,000",
      marzo: "$142,000",
      abril: "$158,000",
      mayo: "$148,000",
      junio: "$165,000",
      julio: "$178,000",
      agosto: "$169,000",
      septiembre: "$152,000",
      octubre: "$145,000",
      noviembre: "$138,000",
      diciembre: "$150,000",
      acumActual: "$1,802,000",
      acumAnterior: "$1,682,000",
      ytd: "$1,802,000",
    },
    {
      año: "2025",
      enero: "$142,000",
      febrero: "$135,000",
      marzo: "$152,000",
      abril: "$168,000",
      mayo: "$158,000",
      junio: "$175,000",
      julio: "$188,000",
      agosto: "$179,000",
      septiembre: "$162,000",
      octubre: "$155,000",
      noviembre: "$148,000",
      diciembre: "$160,000",
      acumActual: "$1,922,000",
      acumAnterior: "$1,802,000",
      ytd: "$1,922,000",
    },
    {
      año: "2024 vs 2025",
      isComparison: true,
      diferencia: {
        enero: "7.6%",
        febrero: "8.0%",
        marzo: "7.0%",
        abril: "6.3%",
        mayo: "6.8%",
        junio: "6.1%",
        julio: "5.6%",
        agosto: "5.9%",
        septiembre: "6.6%",
        octubre: "6.9%",
        noviembre: "7.2%",
        diciembre: "6.7%",
        acumActual: "6.7%",
        acumAnterior: "7.1%",
        ytd: "6.7%",
      },
      unidades: {
        enero: "12,500",
        febrero: "11,800",
        marzo: "13,200",
        abril: "14,500",
        mayo: "13,800",
        junio: "15,200",
        julio: "16,800",
        agosto: "15,900",
        septiembre: "14,200",
        octubre: "13,500",
        noviembre: "12,800",
        diciembre: "14,000",
        acumActual: "168,200",
        acumAnterior: "155,400",
        ytd: "168,200",
      },
    },
  ]

  // Inicializar datos estáticos al cargar el componente
  useEffect(() => {
    setDataBoxes(staticDataBoxes);
    setDataPesos(staticDataPesos);
  }, []);

  // Resetear filtros dependientes cuando cambia la empresa
  useEffect(() => {
    if (selectedCompany) {
      setSelectedSeller("");
      setSelectedFamily("");
      setSelectedBrand("");
      setSelectedProduct("");
      setSelectedCustomer("");
    }
  }, [selectedCompany]);

  // Datos de ejemplo
  const companies = ["Comercializadora Eloro", "Con Alimentos", "Conservas La Costeña", "CRASA"]
  const sellers = ["Alfredo", "Carlos", "Quintiliano"]
  const families = ["Agua Natural", "AMI 1.8", "AMI 591", "Arizona", "Naranjada", "Pau Pau", "Vigor", "Sport 600", "Dulces"]
  const brands = ["Con Alimentos", "Costeña", "Estevia", "Jumex", "Metco", "Most Unico"]
  const products = ["Aceitunas sin hueso en bolsa CJ 12/185g", "Agua Natural Mia 15/1000ml Pet", "Ami Frut Pet 12/600ml B Naranja"]
  const customers = ["Abarrotera Fuentes Abad Rivera", "Abarrotera Gomez y Arizmendi", "Cuevas Comercial", "David Vela Flores", "David Charco Mondragon", "Disconsa SA de CV"]

  // Limpiar todos los filtros
  const clearFilters = () => {
    setSelectedCompany("");
    setSelectedSeller("");
    setSelectedFamily("");
    setSelectedBrand("");
    setSelectedProduct("");
    setSelectedCustomer("");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="container mx-auto" ref={containerRef}>
        <Card className="mb-6 ml-2 mr-2">
          <CardHeader>
            <div>
              <CardTitle>Reporte General</CardTitle>
              <CardDescription>Seleccione los filtros para visualizar los datos</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {/* Filtro de Empresa */}
              <div>
                <label className="block text-sm font-medium mb-1">Empresa</label>
                <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar empresa" />
                  </SelectTrigger>
                  <SelectContent className="mt-1">
                    {companies.map((company) => (
                      <SelectItem key={company} value={company}>
                        {company}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Filtro de Vendedor */}
              <div>
                <label className="block text-sm font-medium mb-1">Vendedor</label>
                <Dialog open={openSellerDialogue} onOpenChange={setOpenSellerDialogue}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      {selectedSeller || "Seleccionar vendedor"}
                      <Search className="h-4 w-4 opacity-50" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Seleccionar Vendedor</DialogTitle>
                    </DialogHeader>
                    <Command>
                      <CommandInput placeholder="Buscar vendedor..." />
                      <CommandList>
                        <CommandEmpty>No se encontraron vendedores.</CommandEmpty>
                        <CommandGroup>
                          {sellers.map((seller) => (
                            <CommandItem
                              key={seller}
                              onSelect={() => {
                                setSelectedSeller(seller)
                                setOpenSellerDialogue(false)
                              }}
                            >
                              {seller}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Filtro de Marca */}
              <div>
                <label className="block text-sm font-medium mb-1">Marca</label>
                <Dialog open={openBrandDialogue} onOpenChange={setOpenBrandDialogue}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      {selectedBrand || "Seleccionar marca"}
                      <Search className="h-4 w-4 opacity-50" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Seleccionar Marca</DialogTitle>
                    </DialogHeader>
                    <Command>
                      <CommandInput placeholder="Buscar marca..." />
                      <CommandList>
                        <CommandEmpty>No se encontraron marcas.</CommandEmpty>
                        <CommandGroup>
                          {brands.map((brand) => (
                            <CommandItem
                              key={brand}
                              onSelect={() => {
                                setSelectedBrand(brand)
                                setOpenBrandDialogue(false)
                              }}
                            >
                              {brand}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Filtro de Familia */}
              <div>
                <label className="block text-sm font-medium mb-1">Familia</label>
                <Dialog open={openFamilyDialogue} onOpenChange={setOpenFamilyDialogue}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      {selectedFamily || "Seleccionar familia"}
                      <Search className="h-4 w-4 opacity-50" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Seleccionar Familia</DialogTitle>
                    </DialogHeader>
                    <Command>
                      <CommandInput placeholder="Buscar familia..." />
                      <CommandList>
                        <CommandEmpty>No se encontraron familias.</CommandEmpty>
                        <CommandGroup>
                          {families.map((family) => (
                            <CommandItem
                              key={family}
                              onSelect={() => {
                                setSelectedFamily(family)
                                setOpenFamilyDialogue(false)
                              }}
                            >
                              {family}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Filtro de cliente */}
              <div> 
                <label htmlFor="" className="block text-sm font-medium mb-1">Cliente</label>
                <Dialog open={openCustomerDialogue} onOpenChange={setOpenCustomerDialogue}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      {selectedCustomer || "Seleccionar cliente"}
                      <Search className="h-4 w-4 opacity-50" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Seleccionar Cliente</DialogTitle>
                    </DialogHeader>
                    <Command>
                      <CommandInput placeholder="Buscar cliente..." />
                      <CommandList>
                        <CommandEmpty>No se encontraron clientes.</CommandEmpty>
                        <CommandGroup>
                          {customers.map((customer) => (
                            <CommandItem
                              key={customer}
                              onSelect={() => {
                                setSelectedCustomer(customer)
                                setOpenCustomerDialogue(false)
                              }}
                            >
                              {customer}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Filtro de producto */}
              <div> 
                <label htmlFor="" className="block text-sm font-medium mb-1">Producto</label>
                <Dialog open={openProductDialogue} onOpenChange={setOpenProductDialogue}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      {selectedProduct || "Seleccionar producto"}
                      <Search className="h-4 w-4 opacity-50" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Seleccionar Producto</DialogTitle>
                    </DialogHeader>
                    <Command>
                      <CommandInput placeholder="Buscar producto..." />
                      <CommandList>
                        <CommandEmpty>No se encontraron productos.</CommandEmpty>
                        <CommandGroup>
                          {products.map((product) => (
                            <CommandItem
                              key={product}
                              onSelect={() => {
                                setSelectedProduct(product)
                                setOpenProductDialogue(false)
                              }}
                            >
                              {product}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={clearFilters}>
                    <Filter className="h-4 w-4 mr-2"/>
                    Limpiar filtros
                  </Button>
                </div>
                <Button variant="outline" size="sm" >
                  <Download className="h-4 w-4 mr-2"/>
                  Exportar
                </Button>
              </div>
          </CardContent>
        </Card>

        {/* Tabla de Cajas */}
        <Card className="mb-6 ml-2 mr-2">
          <CardHeader>
            <CardTitle>Tabla de Cajas</CardTitle>
            <CardDescription>Datos por año y mes en cajas</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                <TableHead>Año</TableHead>
                  <TableHead className="text-right">Enero</TableHead>
                  <TableHead className="text-right">Febrero</TableHead>
                  <TableHead className="text-right">Marzo</TableHead>
                  <TableHead className="text-right">Abril</TableHead>
                  <TableHead className="text-right">Mayo</TableHead>
                  <TableHead className="text-right">Junio</TableHead>
                  <TableHead className="text-right">Julio</TableHead>
                  <TableHead className="text-right">Agosto</TableHead>
                  <TableHead className="text-right">Septiembre</TableHead>
                  <TableHead className="text-right">Octubre</TableHead>
                  <TableHead className="text-right">Noviembre</TableHead>
                  <TableHead className="text-right">Diciembre</TableHead>
                  <TableHead className="text-right">Acum. Mes Actual</TableHead>
                  <TableHead className="text-right">Acum. Mes Anterior</TableHead>
                  <TableHead className="text-right">YTD</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataBoxes.map((fila) => 
                fila.isComparison ? (
                  <React.Fragment key={fila.año}>
                    <TableRow>
                      <TableCell className="font-medium" rowSpan={2}>
                        {fila.año}
                      </TableCell>
                      <TableCell className="text-right">{fila.diferencia.enero}</TableCell>
                      <TableCell className="text-right">{fila.diferencia.febrero}</TableCell>
                      <TableCell className="text-right">{fila.diferencia.marzo}</TableCell>
                      <TableCell className="text-right">{fila.diferencia.abril}</TableCell>
                      <TableCell className="text-right">{fila.diferencia.mayo}</TableCell>
                      <TableCell className="text-right">{fila.diferencia.junio}</TableCell>
                      <TableCell className="text-right">{fila.diferencia.julio}</TableCell>
                      <TableCell className="text-right">{fila.diferencia.agosto}</TableCell>
                      <TableCell className="text-right">{fila.diferencia.septiembre}</TableCell>
                      <TableCell className="text-right">{fila.diferencia.octubre}</TableCell>
                      <TableCell className="text-right">{fila.diferencia.noviembre}</TableCell>
                      <TableCell className="text-right">{fila.diferencia.diciembre}</TableCell>
                      <TableCell className="text-right">{fila.diferencia.acumActual}</TableCell>
                      <TableCell className="text-right">{fila.diferencia.acumAnterior}</TableCell>
                      <TableCell className="text-right">{fila.diferencia.ytd}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-right">{fila.unidades.enero}</TableCell>
                      <TableCell className="text-right">{fila.unidades.febrero}</TableCell>
                      <TableCell className="text-right">{fila.unidades.marzo}</TableCell>
                      <TableCell className="text-right">{fila.unidades.abril}</TableCell>
                      <TableCell className="text-right">{fila.unidades.mayo}</TableCell>
                      <TableCell className="text-right">{fila.unidades.junio}</TableCell>
                      <TableCell className="text-right">{fila.unidades.julio}</TableCell>
                      <TableCell className="text-right">{fila.unidades.agosto}</TableCell>
                      <TableCell className="text-right">{fila.unidades.septiembre}</TableCell>
                      <TableCell className="text-right">{fila.unidades.octubre}</TableCell>
                      <TableCell className="text-right">{fila.unidades.noviembre}</TableCell>
                      <TableCell className="text-right">{fila.unidades.diciembre}</TableCell>
                      <TableCell className="text-right">{fila.unidades.acumActual}</TableCell>
                      <TableCell className="text-right">{fila.unidades.acumAnterior}</TableCell>
                      <TableCell className="text-right">{fila.unidades.ytd}</TableCell>
                    </TableRow>
                  </React.Fragment>
                ) : (
                  <TableRow key={fila.año}>
                    <TableCell className="font-medium">
                      {fila.año}
                    </TableCell>
                    <TableCell className="text-right">{fila.enero}</TableCell>
                    <TableCell className="text-right">{fila.febrero}</TableCell>
                    <TableCell className="text-right">{fila.marzo}</TableCell>
                    <TableCell className="text-right">{fila.abril}</TableCell>
                    <TableCell className="text-right">{fila.mayo}</TableCell>
                    <TableCell className="text-right">{fila.junio}</TableCell>
                    <TableCell className="text-right">{fila.julio}</TableCell>
                    <TableCell className="text-right">{fila.agosto}</TableCell>
                    <TableCell className="text-right">{fila.septiembre}</TableCell>
                    <TableCell className="text-right">{fila.octubre}</TableCell>
                    <TableCell className="text-right">{fila.noviembre}</TableCell>
                    <TableCell className="text-right">{fila.diciembre}</TableCell>
                    <TableCell className="text-right">{fila.acumActual}</TableCell>
                    <TableCell className="text-right">{fila.acumAnterior}</TableCell>
                    <TableCell className="text-right">{fila.ytd}</TableCell>
                  </TableRow>
                )
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Tabla de Pesos */}
        <Card className="ml-2 mr-2">
          <CardHeader>
            <CardTitle>Tabla de Pesos</CardTitle>
            <CardDescription>Datos por año y mes en pesos</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Año</TableHead>
                  <TableHead className="text-right">Enero</TableHead>
                  <TableHead className="text-right">Febrero</TableHead>
                  <TableHead className="text-right">Marzo</TableHead>
                  <TableHead className="text-right">Abril</TableHead>
                  <TableHead className="text-right">Mayo</TableHead>
                  <TableHead className="text-right">Junio</TableHead>
                  <TableHead className="text-right">Julio</TableHead>
                  <TableHead className="text-right">Agosto</TableHead>
                  <TableHead className="text-right">Septiembre</TableHead>
                  <TableHead className="text-right">Octubre</TableHead>
                  <TableHead className="text-right">Noviembre</TableHead>
                  <TableHead className="text-right">Diciembre</TableHead>
                  <TableHead className="text-right">Acum. Mes Actual</TableHead>
                  <TableHead className="text-right">Acum. Mes Anterior</TableHead>
                  <TableHead className="text-right">YTD</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataPesos.map((fila) =>
                fila.isComparison ? (
                  <React.Fragment key={fila.año}>
                    <TableRow>
                      <TableCell className="font-medium" rowSpan={2}>
                        {fila.año}
                      </TableCell>
                      <TableCell className="text-right">{fila.diferencia.enero}</TableCell>
                      <TableCell className="text-right">{fila.diferencia.febrero}</TableCell>
                      <TableCell className="text-right">{fila.diferencia.marzo}</TableCell>
                      <TableCell className="text-right">{fila.diferencia.abril}</TableCell>
                      <TableCell className="text-right">{fila.diferencia.mayo}</TableCell>
                      <TableCell className="text-right">{fila.diferencia.junio}</TableCell>
                      <TableCell className="text-right">{fila.diferencia.julio}</TableCell>
                      <TableCell className="text-right">{fila.diferencia.agosto}</TableCell>
                      <TableCell className="text-right">{fila.diferencia.septiembre}</TableCell>
                      <TableCell className="text-right">{fila.diferencia.octubre}</TableCell>
                      <TableCell className="text-right">{fila.diferencia.noviembre}</TableCell>
                      <TableCell className="text-right">{fila.diferencia.diciembre}</TableCell>
                      <TableCell className="text-right">{fila.diferencia.acumActual}</TableCell>
                      <TableCell className="text-right">{fila.diferencia.acumAnterior}</TableCell>
                      <TableCell className="text-right">{fila.diferencia.ytd}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-right">{fila.unidades.enero}</TableCell>
                      <TableCell className="text-right">{fila.unidades.febrero}</TableCell>
                      <TableCell className="text-right">{fila.unidades.marzo}</TableCell>
                      <TableCell className="text-right">{fila.unidades.abril}</TableCell>
                      <TableCell className="text-right">{fila.unidades.mayo}</TableCell>
                      <TableCell className="text-right">{fila.unidades.junio}</TableCell>
                      <TableCell className="text-right">{fila.unidades.julio}</TableCell>
                      <TableCell className="text-right">{fila.unidades.agosto}</TableCell>
                      <TableCell className="text-right">{fila.unidades.septiembre}</TableCell>
                      <TableCell className="text-right">{fila.unidades.octubre}</TableCell>
                      <TableCell className="text-right">{fila.unidades.noviembre}</TableCell>
                      <TableCell className="text-right">{fila.unidades.diciembre}</TableCell>
                      <TableCell className="text-right">{fila.unidades.acumActual}</TableCell>
                      <TableCell className="text-right">{fila.unidades.acumAnterior}</TableCell>
                      <TableCell className="text-right">{fila.unidades.ytd}</TableCell>
                    </TableRow>
                  </React.Fragment>
                ) : (
                  <TableRow ley={fila.año}>
                    <TableCell className="font-medium">{fila.año}</TableCell>
                    <TableCell className="text-right">{fila.enero}</TableCell>
                    <TableCell className="text-right">{fila.febrero}</TableCell>
                    <TableCell className="text-right">{fila.marzo}</TableCell>
                    <TableCell className="text-right">{fila.abril}</TableCell>
                    <TableCell className="text-right">{fila.mayo}</TableCell>
                    <TableCell className="text-right">{fila.junio}</TableCell>
                    <TableCell className="text-right">{fila.julio}</TableCell>
                    <TableCell className="text-right">{fila.agosto}</TableCell>
                    <TableCell className="text-right">{fila.septiembre}</TableCell>
                    <TableCell className="text-right">{fila.octubre}</TableCell>
                    <TableCell className="text-right">{fila.noviembre}</TableCell>
                    <TableCell className="text-right">{fila.diciembre}</TableCell>
                    <TableCell className="text-right">{fila.acumActual}</TableCell>
                    <TableCell className="text-right">{fila.acumAnterior}</TableCell>
                    <TableCell className="text-right">{fila.ytd}</TableCell>
                  </TableRow>
                )
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}