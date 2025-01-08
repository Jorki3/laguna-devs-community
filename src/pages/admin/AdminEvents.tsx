import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { EventsTable } from "@/components/dashboard/EventsTable";

const AdminEvents = () => {
  const { toast } = useToast();

  const { data: events, refetch } = useQuery({
    queryKey: ["admin-events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("events").delete().eq("id", id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo eliminar el evento",
      });
    } else {
      toast({
        title: "Éxito",
        description: "Evento eliminado correctamente",
      });
      refetch();
    }
  };

  return (
    <div className="bg-card rounded-lg shadow">
      <EventsTable events={events} onDelete={handleDelete} />
    </div>
  );
};

export default AdminEvents;