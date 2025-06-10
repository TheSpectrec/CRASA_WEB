import { useState } from "react";

// Components
import { UserList } from "./UserList";
import { UserFormModal } from "./Modal/UserFormModal"
import { Button } from "./Button"

// Icons
import { PlusCircle } from "lucide-react";

export default function UserManagement() {
    const [users, setUsers] = useState([
        {
            id: 1,
            name: "Usuario 1",
            email: "usuario1@example.com",
            role: "Administrador"
        },
        {
            id: 2,
            name: "Usuario 2",
            email: "usuario2@example.com",
            role: "Supervisor"
        },
        {
            id: 3,
            name: "Usuario 3",
            email: "usuario3@example.com",
            role: "Vendedor"
        }
    ])

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)

    const handleAddUser = () => {
        setCurrentUser(null)
        setIsModalOpen(true)
    }

    const handleEditUser = (user) => {
        setCurrentUser(user)
        setIsModalOpen(true)
    }

    const handleDeleteUser = (userId) => {
        setUsers(users.filter((user) => user.id !== userId))
    }

    const handleSaveUser = (user) => {
        if (user.id) {
            // Editar usuario existente
            setUsers(users.map((u) => (u.id === user.id ? user : u)))
        } else {
            // Agregar nuevo usuario
            const newUser = {
                ...user,
                id: Math.max(0, ...users.map((u) => u.id)) + 1,
            }
            setUsers([...users, newUser])
        }
        setIsModalOpen(false)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Gestión de Usuarios</h1>
                <Button onClick={handleAddUser}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Agregar Usuario
                </Button>
            </div>

            <UserList users={users} onEdit={handleEditUser} onDelete={handleDeleteUser} />

            <UserFormModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                user={currentUser}
                onSave={handleSaveUser}
            />
        </div>
    )
}