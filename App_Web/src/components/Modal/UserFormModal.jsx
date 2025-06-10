import { useState, useEffect } from "react";

// Components
import { Button } from "../Button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "../Filter/Dialog";
import { Input } from "../Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../Filter/Select";

export function UserFormModal({ isOpen, onClose, user, onSave }) {
    const [formData, setFormData] = useState({
        id: 0,
        name: "",
        email: "",
        role: ""
    })

    useEffect(() => {
        if (user) {
            setFormData(user)
        } else {
            setFormData({
                id: 0,
                name: "",
                email: "",
                role: ""
            })
        }
    }, [user, isOpen])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSave(formData)
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>{user ? "Editar Usuario" : "Agregar Usuario"}</DialogTitle>
                        <DialogDescription>
                            {user ? "Modifica los datos del usuario." : "Completa los datos para crear un nuevo usuario."}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <label htmlFor="name" className="text-sm font-medium">Nombre</label>
                            <Input 
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Ingrese nombre de usuario"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="email" className="text-sm font-medium">Email</label>
                            <Input 
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Ingrese correo electrónico"
                                required
                            />
                        </div>

                        <div className="grid gap-2">
                            <label htmlFor="role" className="text-sm font-medium">Rol</label>
                            <Select
                                value={formData.role} onValueChange={(value) => handleSelectChange("role", value)}
                            >
                                <SelectTrigger id="role">
                                    <SelectValue placeholder="Seleccionar rol" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Admin">Administrador</SelectItem>
                                    <SelectItem value="Supervisor">Supervisor</SelectItem>
                                    <SelectItem value="Vendedor">Vendedor</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
                        <Button type="submit">{user ? "Actualizar" : "Agregar"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}