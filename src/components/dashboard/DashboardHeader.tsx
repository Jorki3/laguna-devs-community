import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const DashboardHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">Mis Eventos</h1>
      <Button onClick={() => navigate("/events/new")}>
        <Plus className="w-4 h-4 mr-2" />
        Crear Evento
      </Button>
    </div>
  );
};