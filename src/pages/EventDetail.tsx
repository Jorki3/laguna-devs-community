import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Calendar, MapPin, Clock, Ticket } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: event, isLoading } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .neq("status", "draft")
        .single();

      if (error) throw error;
      return data;
    },
  });

  const handleBuyTicket = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      toast({
        title: "Inicia sesión",
        description: "Necesitas iniciar sesión para comprar boletos",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    // Here you would implement the ticket purchase logic
    toast({
      title: "¡Éxito!",
      description: "Tu boleto ha sido reservado",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto pt-32 text-center">
          Cargando evento...
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto pt-32 text-center">
          Evento no encontrado
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto pt-32 px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="aspect-video bg-muted mb-8 rounded-lg overflow-hidden">
            <div className="w-full h-full bg-primary/10 flex items-center justify-center">
              <span className="font-display text-6xl text-primary/20">
                {event.title[0]}
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <h1 className="font-display text-4xl font-bold">{event.title}</h1>
              <Badge
                className={
                  event.status === "upcoming"
                    ? "bg-blue-500"
                    : event.status === "in_progress"
                    ? "bg-green-500"
                    : event.status === "finished"
                    ? "bg-purple-500"
                    : event.status === "postponed"
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }
              >
                {event.status === "upcoming" && "Próximamente"}
                {event.status === "in_progress" && "En curso"}
                {event.status === "finished" && "Finalizado"}
                {event.status === "postponed" && "Pospuesto"}
                {event.status === "cancelled" && "Cancelado"}
              </Badge>
            </div>

            <p className="text-lg text-muted-foreground">{event.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>
                    {format(new Date(event.date), "dd 'de' MMMM, yyyy")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Ticket className="w-5 h-5 text-primary" />
                  <span>
                    {event.tickets_available} boletos disponibles - ${event.price}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <Button
                  size="lg"
                  className="w-full"
                  disabled={
                    event.tickets_available === 0 ||
                    event.status === "finished" ||
                    event.status === "cancelled"
                  }
                  onClick={handleBuyTicket}
                >
                  {event.tickets_available === 0
                    ? "Agotado"
                    : event.status === "finished"
                    ? "Evento finalizado"
                    : event.status === "cancelled"
                    ? "Evento cancelado"
                    : "Comprar Boleto"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;