import { Navbar } from "@/components/Navbar";
import Hero from "@/components/Hero";
import { EventCard } from "@/components/EventCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

const Index = () => {
  const { data: events, isLoading } = useQuery({
    queryKey: ["featured-events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .in("status", ["upcoming", "in_progress"])
        .order("date", { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Events Section */}
      <section className="py-16 px-4 bg-secondary/50">
        <div className="container mx-auto">
          <h2 className="font-display text-3xl font-bold mb-8">
            Próximos Eventos
          </h2>
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

      {/* Community Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="font-display text-3xl font-bold mb-6">
            ¿Por qué unirte a Laguna Devs?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-6 rounded-lg bg-secondary">
              <h3 className="font-display text-xl font-bold mb-4">Aprende</h3>
              <p className="text-muted-foreground">
                Accede a talleres, charlas y recursos de desarrolladores
                experimentados.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-secondary">
              <h3 className="font-display text-xl font-bold mb-4">Conecta</h3>
              <p className="text-muted-foreground">
                Conoce desarrolladores locales y encuentra nuevas oportunidades.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-secondary">
              <h3 className="font-display text-xl font-bold mb-4">Crece</h3>
              <p className="text-muted-foreground">
                Desarrolla tus habilidades y avanza en tu carrera tech.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
