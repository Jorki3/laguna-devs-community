import { Navbar } from "@/components/Navbar";
import { EventCard } from "@/components/EventCard";
import { Button } from "@/components/ui/button";

const Index = () => {
  const upcomingEvents = [
    {
      title: "Taller de Desarrollo Web",
      date: "15 de Marzo, 2024",
      location: "Coworking Laguna",
    },
    {
      title: "Meetup de React Native",
      date: "20 de Marzo, 2024",
      location: "Tech Hub Torreón",
    },
    {
      title: "Conferencia JavaScript",
      date: "5 de Abril, 2024",
      location: "Centro de Convenciones",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/50 text-transparent bg-clip-text">
            Laguna Devs
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Únete a la comunidad tech más grande de La Laguna. Conecta, aprende y crece junto a otros desarrolladores.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg">
              Únete a la Comunidad
            </Button>
            <Button size="lg" variant="secondary" className="text-lg">
              Explorar Eventos
            </Button>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16 px-4 bg-secondary/50">
        <div className="container mx-auto">
          <h2 className="font-display text-3xl font-bold mb-8">Próximos Eventos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event.title} {...event} />
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="font-display text-3xl font-bold mb-6">¿Por qué unirte a Laguna Devs?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-6 rounded-lg bg-secondary">
              <h3 className="font-display text-xl font-bold mb-4">Aprende</h3>
              <p className="text-muted-foreground">Accede a talleres, charlas y recursos de desarrolladores experimentados.</p>
            </div>
            <div className="p-6 rounded-lg bg-secondary">
              <h3 className="font-display text-xl font-bold mb-4">Conecta</h3>
              <p className="text-muted-foreground">Conoce desarrolladores locales y encuentra nuevas oportunidades.</p>
            </div>
            <div className="p-6 rounded-lg bg-secondary">
              <h3 className="font-display text-xl font-bold mb-4">Crece</h3>
              <p className="text-muted-foreground">Desarrolla tus habilidades y avanza en tu carrera tech.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;