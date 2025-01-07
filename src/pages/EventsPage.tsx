import { Navbar } from "@/components/Navbar";
import { EventCard } from "@/components/EventCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

const EventsPage = () => {
  const { data: events, isLoading } = useQuery({
    queryKey: ["featured-events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .neq("status", ["upcoming", "draft"])
        .order("date", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto">
          <h2 className="font-display text-3xl font-bold mb-8">Eventos</h2>
          {isLoading ? (
            <div className="text-center text-muted-foreground">
              Cargando eventos...
            </div>
          ) : events && events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard
                  key={event.id}
                  title={event.title}
                  date={format(new Date(event.date), "dd 'de' MMMM, yyyy")}
                  location={event.location}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              No hay eventos próximos en este momento.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default EventsPage;
