import { Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  image?: string;
  onClick?: () => void;
}

export const EventCard = ({
  title,
  date,
  location,
  image,
  onClick,
}: EventCardProps) => {
  return (
    <Card className="overflow-hidden hover:border-primary/50 transition-colors">
      <CardHeader className="p-0">
        <div className="aspect-video bg-muted relative overflow-hidden">
          {image ? (
            <img src={image} alt={title} className="object-cover w-full h-full" />
          ) : (
            <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
              <span className="font-display text-2xl text-primary/20">
                {title[0]}
              </span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="font-display mb-4">{title}</CardTitle>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button onClick={onClick} className="w-full">
          Ver Detalles
        </Button>
      </CardFooter>
    </Card>
  );
};