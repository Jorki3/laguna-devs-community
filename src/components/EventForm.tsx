import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

interface EventFormProps {
  eventId?: string;
  defaultValues?: EventFormValues;
}

interface EventFormValues {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  status: string;
  price: number;
  tickets_available: number;
}

export const EventForm = ({ eventId, defaultValues }: EventFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm<EventFormValues>({
    defaultValues: defaultValues || {
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      status: "draft",
      price: 0,
      tickets_available: 0,
    },
  });

  const onSubmit = async (data: EventFormValues) => {
    try {
      const { error } = eventId
        ? await supabase
            .from("events")
            .update(data)
            .eq("id", eventId)
        : await supabase.from("events").insert([
            {
              ...data,
              created_by: (await supabase.auth.getUser()).data.user?.id,
            },
          ]);

      if (error) throw error;

      toast({
        title: "Éxito",
        description: `Evento ${eventId ? "actualizado" : "creado"} correctamente`,
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Hubo un error al guardar el evento",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hora</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lugar</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tickets_available"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Boletos Disponibles</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">
          {eventId ? "Actualizar Evento" : "Crear Evento"}
        </Button>
      </form>
    </Form>
  );
};