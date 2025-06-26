import { useState } from "react";

// Components
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Button } from "@/components/ui/button";

// Icons
import { Filter, Search } from "lucide-react";

// Data
import { opcionesFiltros } from "../utils/DataGenerator"; 

export default function FilterCard ({ filtros, setFiltros, onLimpiarFiltros}) {
    const handleFiltroChange = (campo, valor) => {
        setFiltros({...filtros, [campo]: valor})
    }

    // Estados para los diálogos
    const [openSellerDialogue, setOpenSellerDialogue] = useState(false);
    const [openFamilyDialogue, setOpenFamilyDialogue] = useState(false);
    const [openCustomerDialogue, setOpenCustomerDialogue] = useState(false);

    return (
        <Card className="mb-6 ml-2 mr-2">
            <CardHeader>
                <div>
                    <CardTitle>Gráficas de Ventas</CardTitle>
                    <CardDescription>Seleccione los filtros para visualizar los datos</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {/* Filtro de Año */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Año</label>
                        <Select value={filtros.año} onValueChange={(value) => handleFiltroChange("año", value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccionar año" />
                            </SelectTrigger>
                            <SelectContent className="mt-1">
                                {opcionesFiltros.años.map((año) => (
                                    <SelectItem key={año} value={año}>
                                        {año}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    { /* Filtro de Mes */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Mes</label>
                        <Select value={filtros.mes} onValueChange={(value) => handleFiltroChange("mes", value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccionar mes" />
                            </SelectTrigger>
                            <SelectContent className="mt-1">
                                {opcionesFiltros.meses.map((mes) => (
                                    <SelectItem key={mes} value={mes}>
                                        {mes}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Filtro de Empresa */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Empresa</label>
                        <Select value={filtros.empresa} onValueChange={(value) => handleFiltroChange("empresa", value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccionar empresa" />
                            </SelectTrigger>
                            <SelectContent className="mt-1">
                                {opcionesFiltros.empresas.map((empresa) => (
                                    <SelectItem key={empresa} value={empresa}>
                                        {empresa}
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
                                    {filtros.vendedor || "Seleccionar vendedor"}
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
                                        <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                                        <CommandGroup>
                                            {opcionesFiltros.vendedores.map((vendedor) => (
                                                <CommandItem key={vendedor} onSelect={() => {
                                                    handleFiltroChange("vendedor", vendedor);
                                                    setOpenSellerDialogue(false);
                                                }}>
                                                    {vendedor}
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
                                    {filtros.familia || "Seleccionar familia"}
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
                                        <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                                        <CommandGroup>
                                            {opcionesFiltros.familias.map((familia) => (
                                                <CommandItem key={familia} onSelect={() => {setOpenFamilyDialogue(false); handleFiltroChange("familia", familia)}}>
                                                    {familia}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </DialogContent>
                        </Dialog>
                    </div>

                    { /*Filtro de Cliente */}
                    <div>
                    <label className="block text-sm font-medium mb-1">Cliente</label>
                        <Dialog open={openCustomerDialogue} onOpenChange={setOpenCustomerDialogue}>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="w-full justify-between">
                                    {filtros.cliente || "Seleccionar cliente"}
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
                                        <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                                        <CommandGroup>
                                            {opcionesFiltros.clientes.map((cliente) => (
                                                <CommandItem key={cliente} onSelect={() => {setOpenCustomerDialogue(false); handleFiltroChange("cliente", cliente)}}>
                                                    {cliente}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                <div className="mt-4">
                    <Button onClick={onLimpiarFiltros} variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2"/>
                        Limpiar filtros
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}