const Community = () => {
  return (
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
  );
};

export default Community;
