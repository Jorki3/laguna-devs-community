import { Navbar } from "@/components/Navbar";
import { EventForm } from "@/components/EventForm";

const CreateEvent = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-32 px-4">
        <h1 className="text-3xl font-bold mb-8">Crear Nuevo Evento</h1>
        <EventForm />
      </div>
    </>
  );
};

export default CreateEvent;