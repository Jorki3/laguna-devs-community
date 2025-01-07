import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { useToast } from "@/components/ui/use-toast";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { EventsTable } from "@/components/dashboard/EventsTable";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/login");
      }
      setSession(session);
    });
  }, [navigate]);

  const { data: events, refetch } = useQuery({
    queryKey: ["events"],
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
    <>
      <Navbar />
      <div className="container mx-auto py-32 px-4">
        <DashboardHeader />
        <div className="bg-card rounded-lg shadow">
          <EventsTable events={events} onDelete={handleDelete} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;