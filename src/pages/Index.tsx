import { Navbar } from "@/components/Navbar";
import Hero from "@/components/landing/Hero";
import Community from "@/components/landing/Comunnity";
import EventsSection from "@/components/landing/EventsSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <EventsSection />
      <Community />
    </div>
  );
};

export default Index;
