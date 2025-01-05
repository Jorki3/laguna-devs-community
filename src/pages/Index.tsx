import { Navbar } from "@/components/Navbar";
import { EventCard } from "@/components/EventCard";
import { Button } from "@/components/ui/button";

const Index = () => {
  const upcomingEvents = [
    {
      title: "Web Development Workshop",
      date: "March 15, 2024",
      location: "Coworking Laguna",
    },
    {
      title: "React Native Meetup",
      date: "March 20, 2024",
      location: "Tech Hub Torreón",
    },
    {
      title: "JavaScript Conference",
      date: "April 5, 2024",
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
            Laguna Devs Community
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Join the largest tech community in La Laguna. Connect, learn, and grow with fellow developers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg">
              Join Community
            </Button>
            <Button size="lg" variant="secondary" className="text-lg">
              Explore Events
            </Button>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16 px-4 bg-secondary/50">
        <div className="container mx-auto">
          <h2 className="font-display text-3xl font-bold mb-8">Upcoming Events</h2>
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
          <h2 className="font-display text-3xl font-bold mb-6">Why Join Laguna Devs?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-6 rounded-lg bg-secondary">
              <h3 className="font-display text-xl font-bold mb-4">Learn</h3>
              <p className="text-muted-foreground">Access workshops, talks, and resources from experienced developers.</p>
            </div>
            <div className="p-6 rounded-lg bg-secondary">
              <h3 className="font-display text-xl font-bold mb-4">Connect</h3>
              <p className="text-muted-foreground">Network with local developers and find new opportunities.</p>
            </div>
            <div className="p-6 rounded-lg bg-secondary">
              <h3 className="font-display text-xl font-bold mb-4">Grow</h3>
              <p className="text-muted-foreground">Build your skills and advance your career in tech.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;