import { useState } from "react";
import { Button } from "@/components/ui/button";
import { mockCars, mockDebts, formatBaht, formatDateBE } from "@/lib/mockData";
import { Plus, Loader2, Fuel, ParkingCircle, Car, Link2, Check } from "lucide-react";

// Get unique recent trips (by date + car) for sharing parking
const recentTrips = Array.from(
  new Map(
    mockDebts
      .filter((d) => d.status === "pending")
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .map((d) => [`${d.date}-${d.carName}`, d])
  ).values()
);

const AdminCostEntry = () => {
  const [selectedCar, setSelectedCar] = useState(mockCars[0]?.id || "");
  const [gasCost, setGasCost] = useState(mockCars[0]?.defaultGasCost?.toString() || "");
  const [parkingCost, setParkingCost] = useState("0");
  const [saving, setSaving] = useState(false);
  const [shareParking, setShareParking] = useState(false);
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

        {(Number(gasCost) > 0 || Number(parkingCost) > 0) && (
          <div className="rounded-lg bg-accent/50 p-2 text-xs text-muted-foreground">
            Total: <strong className="text-foreground">{formatBaht(Number(gasCost) + Number(parkingCost))}</strong>
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
