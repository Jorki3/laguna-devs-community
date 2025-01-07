import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/Navbar";
import { EventForm } from "@/components/EventForm";
import { supabase } from "@/integrations/supabase/client";

const EditEvent = () => {
  const { id } = useParams();

  const { data: event } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-32 px-4">
        <h1 className="text-3xl font-bold mb-8">Editar Evento</h1>
        {event && <EventForm eventId={id} defaultValues={event} />}
      </div>
    </>
  );
};

export default EditEvent;