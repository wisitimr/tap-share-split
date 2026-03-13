import { formatBaht, formatDateBE, formatTimeBE, type Trip, mockCars } from "@/lib/mockData";
import { Clock, Bus } from "lucide-react";

interface RecentTripsProps {
  trips: Trip[];
}

const RecentTrips = ({ trips }: RecentTripsProps) => {
  const getCarName = (carId: string) => {
    const car = mockCars.find(c => c.id === carId);
    return car ? car.name : "Unknown";
  };

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
        Recent Trips
      </h3>
      <div className="space-y-2">
        {trips.slice(0, 5).map((trip) => (
          <div
            key={trip.id}
            className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 animate-fade-in"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Bus className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">{getCarName(trip.carId)}</p>
              <p className="text-xs text-muted-foreground">{formatDateBE(trip.date)}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {formatTimeBE(trip.tappedAt)}
              </div>
              <p className="text-xs font-medium text-primary">Trip #{trip.tripNumber}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTrips;
