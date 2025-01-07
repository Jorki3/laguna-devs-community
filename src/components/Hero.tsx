import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="pt-32 pb-16 px-4">
      <div className="container mx-auto text-center">
        <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/50 text-transparent bg-clip-text">
          Laguna Devs
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Únete a la comunidad tech más grande de La Laguna. Conecta, aprende y
          crece junto a otros desarrolladores.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://chat.whatsapp.com/Lrdy2KsIrza8Qc2iR96E3S">
            <Button size="lg" className="text-lg">
              Únete a la Comunidad
            </Button>
          </a>
          <Button size="lg" variant="secondary" className="text-lg">
            Explorar Eventos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
