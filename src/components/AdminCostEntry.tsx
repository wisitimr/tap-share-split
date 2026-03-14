import { useState } from "react";
import { Button } from "@/components/ui/button";
import { mockCars, mockDebts, formatBaht, formatDateBE } from "@/lib/mockData";
import { Plus, Loader2, Fuel, ParkingCircle, Car, Link2, Check, ChevronDown } from "lucide-react";

// Get unique recent trips (by date + car) for sharing parking
const recentTrips = Array.from(
  new Map(
    mockDebts
      .filter((d) => d.status === "pending")
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .map((d) => [`${d.date}-${d.carName}`, d])
  ).values()
);

const VISIBLE_TRIPS = 2;

const AdminCostEntry = () => {
  const [selectedCar, setSelectedCar] = useState(mockCars[0]?.id || "");
  const [gasCost, setGasCost] = useState(mockCars[0]?.defaultGasCost?.toString() || "");
  const [parkingCost, setParkingCost] = useState("0");
  const [saving, setSaving] = useState(false);
  const [shareParking, setShareParking] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [selectedTrips, setSelectedTrips] = useState<string[]>(
    recentTrips.length > 0 ? [recentTrips[0].id] : []
  );

  const toggleTrip = (tripId: string) => {
    setSelectedTrips((prev) =>
      prev.includes(tripId) ? prev.filter((id) => id !== tripId) : [...prev, tripId]
    );
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    setSaving(false);
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        New Trip
      </h3>

      <div className="space-y-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">
            <Car className="mr-1 inline h-3 w-3" /> Select Car
          </label>
          <select
            value={selectedCar}
            onChange={(e) => {
              setSelectedCar(e.target.value);
              const car = mockCars.find(c => c.id === e.target.value);
              if (car) setGasCost(car.defaultGasCost.toString());
            }}
            className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm font-medium"
          >
            {mockCars.map(car => (
              <option key={car.id} value={car.id}>
                {car.name} ({car.licensePlate})
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              <Fuel className="mr-1 inline h-3 w-3" /> Gas Cost (฿)
            </label>
            <input
              type="number"
              value={gasCost}
              onChange={(e) => setGasCost(e.target.value)}
              className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm font-medium"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              <ParkingCircle className="mr-1 inline h-3 w-3" /> Parking (฿)
            </label>
            <input
              type="number"
              value={parkingCost}
              onChange={(e) => setParkingCost(e.target.value)}
              className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm font-medium"
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Share Parking with Previous Trips */}
        {Number(parkingCost) > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Link2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">
                Share parking with previous trips
              </span>
            </div>

            <div className="space-y-1.5 rounded-xl border border-border bg-accent/30 p-2.5">
              {(expanded ? recentTrips : recentTrips.slice(0, VISIBLE_TRIPS)).map((trip) => {
                const isSelected = selectedTrips.includes(trip.id);
                return (
                  <button
                    key={trip.id}
                    type="button"
                    onClick={() => toggleTrip(trip.id)}
                    className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm transition-colors ${
                      isSelected
                        ? "bg-primary/10 text-foreground"
                        : "text-muted-foreground hover:bg-accent"
                    }`}
                  >
                    <div
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-input bg-background"
                      }`}
                    >
                      {isSelected && <Check className="h-3 w-3" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium text-foreground truncate">{trip.carName}</span>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatDateBE(trip.date)}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {trip.headcount} riders · Gas {formatBaht(trip.gasCost)}
                        {trip.parkingCost > 0 && ` · Parking ${formatBaht(trip.parkingCost)}`}
                      </div>
                    </div>
                  </button>
                );
              })}

              {recentTrips.length > VISIBLE_TRIPS && (
                <button
                  type="button"
                  onClick={() => setExpanded(!expanded)}
                  className="flex w-full items-center justify-center gap-1 rounded-lg py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {expanded ? "Show less" : `+${recentTrips.length - VISIBLE_TRIPS} more trips`}
                  <ChevronDown className={`h-3 w-3 transition-transform ${expanded ? "rotate-180" : ""}`} />
                </button>
              )}

              {selectedTrips.length > 0 && (
                <div className="mt-1 rounded-lg bg-primary/5 px-2.5 py-1.5 text-xs text-muted-foreground">
                  Parking {formatBaht(Number(parkingCost))} ÷ {selectedTrips.length + 1} trips ={" "}
                  <strong className="text-foreground">
                    {formatBaht(Number(parkingCost) / (selectedTrips.length + 1))}
                  </strong>{" "}
                  each
                </div>
              )}
            </div>
          </div>
        )}

        {(Number(gasCost) > 0 || Number(parkingCost) > 0) && (
          <div className="rounded-lg bg-accent/50 p-2 text-xs text-muted-foreground">
            Total: <strong className="text-foreground">
              {formatBaht(
                Number(gasCost) +
                  (selectedTrips.length > 0 && Number(parkingCost) > 0
                    ? Number(parkingCost) / (selectedTrips.length + 1)
                    : Number(parkingCost))
              )}
            </strong>
            {selectedTrips.length > 0 && Number(parkingCost) > 0 && (
              <span className="ml-1 text-muted-foreground">(parking shared)</span>
            )}
          </div>
        )}

        <Button
          onClick={handleSave}
          disabled={saving || (!gasCost && !parkingCost)}
          className="w-full"
          size="touch"
        >
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Creating...
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" /> Create
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default AdminCostEntry;
