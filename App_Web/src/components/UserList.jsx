// Components
import { Card, CardContent, CardHeader, CardFooter } from "./Card"
import { Button } from "./Button"

// Icons
import { Pencil, Trash2, Mail, UserCircle } from "lucide-react"

export function UserList({ users, onEdit, onDelete }) {
    return (
        <div>
            {users.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground">No se encontraron usuarios</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {users.map((user) => (
                        <Card key={user.id} className="overflow-hidden">
                            <CardHeader className="pb-2 flex flex-row justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-lg">{user.name}</h3>
                                </div>
                            </CardHeader>
                            <CardContent className="pb-3">
                                <div className="flex items-center text-sm text-muted-foreground mb-2">
                                    <UserCircle className="mr-2 h-4 w-4" />
                                    {user.role}
                                </div>
                                <div className="flex items-center text-sm">
                                    <Mail className="mr-2 h-4 w-4" />
                                    {user.email}
                                </div>
                            </CardContent>
                            <CardFooter className="pt-3 flex justify-end gap-2">
                                <Button variant="ghost" size="sm" onClick={() => onEdit(user)}>
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Editar
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => onDelete(user.id)} className="text-destructive hover:text-destructive hover:bg-destructive-10">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Eliminar
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}