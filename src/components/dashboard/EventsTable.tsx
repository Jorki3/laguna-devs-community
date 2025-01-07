import { useNavigate } from "react-router-dom";
import { Edit, Trash } from "lucide-react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tables } from "@/integrations/supabase/types";

interface EventsTableProps {
  events: Tables<"events">[] | null;
  onDelete: (id: string) => void;
}

export const EventsTable = ({ events, onDelete }: EventsTableProps) => {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-gray-500";
      case "upcoming":
        return "bg-blue-500";
      case "in_progress":
        return "bg-green-500";
      case "finished":
        return "bg-purple-500";
      case "postponed":
        return "bg-yellow-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Título</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead>Hora</TableHead>
          <TableHead>Lugar</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Precio</TableHead>
          <TableHead>Boletos Disponibles</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events?.map((event) => (
          <TableRow key={event.id}>
            <TableCell>{event.title}</TableCell>
            <TableCell>{format(new Date(event.date), "dd/MM/yyyy")}</TableCell>
            <TableCell>{event.time}</TableCell>
            <TableCell>{event.location}</TableCell>
            <TableCell>
              <Badge className={getStatusColor(event.status)}>
                {event.status === "draft" && "Borrador"}
                {event.status === "upcoming" && "Próximamente"}
                {event.status === "in_progress" && "En curso"}
                {event.status === "finished" && "Finalizado"}
                {event.status === "postponed" && "Pospuesto"}
                {event.status === "cancelled" && "Cancelado"}
              </Badge>
            </TableCell>
            <TableCell>${event.price}</TableCell>
            <TableCell>
              <Badge variant={event.tickets_available > 0 ? "default" : "destructive"}>
                {event.tickets_available} disponibles
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate(`/events/edit/${event.id}`)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(event.id)}
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};