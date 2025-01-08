import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Database } from "@/integrations/supabase/types";

type AppRole = Database["public"]["Enums"]["app_role"];

interface Profile {
  id: string;
  username: string | null;
  user_roles: {
    role: AppRole;
  }[];
}

const AdminUsers = () => {
  const { toast } = useToast();

  const { data: users, refetch } = useQuery<Profile[]>({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select(`
          id,
          username,
          user_roles (
            role
          )
        `)
        .returns<Profile[]>();

      if (error) throw error;
      return data;
    },
  });

  const handleRoleChange = async (userId: string, newRole: AppRole) => {
    const { error } = await supabase
      .from("user_roles")
      .update({ role: newRole })
      .eq("user_id", userId);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo actualizar el rol del usuario",
      });
    } else {
      toast({
        title: "Éxito",
        description: "Rol actualizado correctamente",
      });
      refetch();
    }
  };

  return (
    <div className="bg-card rounded-lg shadow p-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Usuario</TableHead>
            <TableHead>Rol Actual</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.username || "Sin nombre"}</TableCell>
              <TableCell>{user.user_roles[0]?.role || "user"}</TableCell>
              <TableCell>
                <Select
                  defaultValue={user.user_roles[0]?.role || "user"}
                  onValueChange={(value: AppRole) =>
                    handleRoleChange(user.id, value)
                  }
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">Usuario</SelectItem>
                    <SelectItem value="admin">Administrador</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminUsers;